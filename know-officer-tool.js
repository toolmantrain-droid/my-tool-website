document.addEventListener('DOMContentLoaded', function() {
    console.log("know-officer-tool.js: DOM content loaded. Initializing local officer tool script.");

    // Getting references to the HTML elements
    const findOfficerBtn = document.getElementById('find-officer-btn');
    const stateSelect = document.getElementById('state-select');
    const districtInput = document.getElementById('district-input');
    const officerResultsSection = document.getElementById('officer-results-section');
    const officerList = document.getElementById('officer-list');

    // Check if essential elements are found
    if (!findOfficerBtn) console.error("know-officer-tool.js Error: 'find-officer-btn' element not found.");
    if (!stateSelect) console.error("know-officer-tool.js Error: 'state-select' element not found.");
    if (!districtInput) console.error("know-officer-tool.js Error: 'district-input' element not found.");
    if (!officerResultsSection) console.error("know-officer-tool.js Error: 'officer-results-section' not found. This is crucial for displaying results.");
    if (!officerList) console.error("know-officer-tool.js Error: 'officer-list' not found.");

    // Sample Data for Local Officers (Illustrative - Real data needs external API/database)
    // This data is expanded to include more states and districts for demonstration.
    const officerData = {
        'uttar-pradesh': {
            'lucknow': [
                { designation: 'District Magistrate (DM)', name: 'Shri Surya Pratap Singh (Mock)', contact: 'dm.lko@up.gov.in', address: 'DM Office, Collectorate, Lucknow' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Smt. Ritu Sharma (Mock)', contact: 'spcity.lko@uppolice.gov.in', address: 'SP City Office, Lalbagh, Lucknow' },
                { designation: 'Municipal Commissioner', name: 'Dr. Alok Kumar (Mock)', contact: 'commissioner.lmc@nic.in', address: 'Nagar Nigam Office, Lalbagh, Lucknow' }
            ],
            'kanpur': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Vivek Gupta (Mock)', contact: 'dm.knp@up.gov.in', address: 'DM Office, Collectorate, Kanpur' },
                { designation: 'Superintendent of Police (SP) - Rural', name: 'Shri Anil Verma (Mock)', contact: 'sprural.knp@uppolice.gov.in', address: 'SP Rural Office, Kanpur' },
                { designation: 'Chief Medical Officer (CMO)', name: 'Dr. Neha Sharma (Mock)', contact: 'cmo.knp@up.gov.in', address: 'CMO Office, Kanpur' }
            ],
            'agra': [
                { designation: 'District Magistrate (DM)', name: 'Shri Manoj Kumar (Mock)', contact: 'dm.agra@up.gov.in', address: 'DM Office, Collectorate, Agra' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Smt. Priya Singh (Mock)', contact: 'ssp.agra@uppolice.gov.in', address: 'SSP Office, Agra' }
            ],
            'varanasi': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Ramesh Chandra (Mock)', contact: 'dm.vns@up.gov.in', address: 'DM Office, Collectorate, Varanasi' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Shri Vivek Yadav (Mock)', contact: 'spcity.vns@uppolice.gov.in', address: 'SP City Office, Varanasi' }
            ]
        },
        'maharashtra': {
            'mumbai': [
                { designation: 'District Collector', name: 'Smt. Priya Deshmukh (Mock)', contact: 'collector.mumbai@nic.in', address: 'Collector Office, Bandra, Mumbai' },
                { designation: 'Commissioner of Police', name: 'Shri Rajesh Patil (Mock)', contact: 'cp.mumbai@mahapolice.gov.in', address: 'Police Headquarters, Crawford Market, Mumbai' },
                { designation: 'Municipal Commissioner (BMC)', name: 'Dr. Sanjay Raut (Mock)', contact: 'mc.bmc@nic.in', address: 'BMC Headquarters, Fort, Mumbai' }
            ],
            'pune': [
                { designation: 'District Collector', name: 'Shri Rohan Joshi (Mock)', contact: 'collector.pune@nic.in', address: 'Collector Office, Pune' },
                { designation: 'Commissioner of Police', name: 'Smt. Kavita Sharma (Mock)', contact: 'cp.pune@mahapolice.gov.in', address: 'Police Commissionerate, Pune' },
                { designation: 'CEO, Zilla Parishad', name: 'Mr. Anand Kulkarni (Mock)', contact: 'ceo.zp.pune@mahapanchayat.gov.in', address: 'Zilla Parishad Office, Pune' }
            ],
            'nagpur': [
                { designation: 'District Collector', name: 'Mr. Vikas Agrawal (Mock)', contact: 'collector.nagpur@nic.in', address: 'Collector Office, Nagpur' },
                { designation: 'Commissioner of Police', name: 'Smt. Smita Rao (Mock)', contact: 'cp.nagpur@mahapolice.gov.in', address: 'Police Commissionerate, Nagpur' }
            ],
            'nashik': [
                { designation: 'District Collector', name: 'Dr. Rajeshwari Iyer (Mock)', contact: 'collector.nashik@nic.in', address: 'Collector Office, Nashik' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ashok Kumar (Mock)', contact: 'sp.nashik@mahapolice.gov.in', address: 'SP Office, Nashik' }
            ]
        },
        'delhi': {
            'central delhi': [
                { designation: 'District Magistrate (Central)', name: 'Ms. Anjali Singh (Mock)', contact: 'dm.central@nic.in', address: 'DM Office, Daryaganj, Delhi' },
                { designation: 'Deputy Commissioner of Police (Central)', name: 'Mr. Vikram Kumar (Mock)', contact: 'dcp.central@delhipolice.gov.in', address: 'DCP Office, Kamla Market, Delhi' }
            ],
            'new delhi': [
                { designation: 'District Magistrate (New Delhi)', name: 'Mr. Vivek Sharma (Mock)', contact: 'dm.nd@nic.in', address: 'DM Office, Jamnagar House, New Delhi' },
                { designation: 'Deputy Commissioner of Police (New Delhi)', name: 'Ms. Pooja Gupta (Mock)', contact: 'dcp.nd@delhipolice.gov.in', address: 'DCP Office, Parliament Street, New Delhi' }
            ],
            'north delhi': [
                { designation: 'District Magistrate (North)', name: 'Smt. Divya Sharma (Mock)', contact: 'dm.north@nic.in', address: 'DM Office, Alipur, Delhi' },
                { designation: 'Deputy Commissioner of Police (North)', name: 'Shri Rahul Verma (Mock)', contact: 'dcp.north@delhipolice.gov.in', address: 'DCP Office, Civil Lines, Delhi' }
            ],
            'south delhi': [
                { designation: 'District Magistrate (South)', name: 'Mr. Sanjay Gupta (Mock)', contact: 'dm.south@nic.in', address: 'DM Office, Saket, Delhi' },
                { designation: 'Deputy Commissioner of Police (South)', name: 'Smt. Kiran Devi (Mock)', contact: 'dcp.south@delhipolice.gov.in', address: 'DCP Office, Hauz Khas, Delhi' }
            ]
        },
        'bihar': {
            'patna': [
                { designation: 'District Magistrate (DM)', name: 'Shri Alok Kumar (Mock)', contact: 'dm.patna@bih.nic.in', address: 'DM Office, Collectorate, Patna' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Smt. Preeti Devi (Mock)', contact: 'spcity.patna@bihpolice.gov.in', address: 'SP City Office, Patna' }
            ],
            'gaya': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Rakesh Singh (Mock)', contact: 'dm.gaya@bih.nic.in', address: 'DM Office, Collectorate, Gaya' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Anand Kumar (Mock)', contact: 'sp.gaya@bihpolice.gov.in', address: 'SP Office, Gaya' }
            ],
            'muzaffarpur': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Kavita Dubey (Mock)', contact: 'dm.muzaffarpur@bih.nic.in', address: 'DM Office, Muzaffarpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Verma (Mock)', contact: 'sp.muzaffarpur@bihpolice.gov.in', address: 'SP Office, Muzaffarpur' }
            ],
            'bhagalpur': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sanjeev Kumar (Mock)', contact: 'dm.bhagalpur@bih.nic.in', address: 'DM Office, Bhagalpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Singh (Mock)', contact: 'sp.bhagalpur@bihpolice.gov.in', address: 'SP Office, Bhagalpur' }
            ]
        },
        'west-bengal': {
            'kolkata': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Indrani Bose (Mock)', contact: 'dm.kol@wb.gov.in', address: 'DM Office, Alipore, Kolkata' },
                { designation: 'Commissioner of Police', name: 'Shri Sourav Das (Mock)', contact: 'cp.kol@kolkatapolice.gov.in', address: 'Police Headquarters, Lalbazar, Kolkata' }
            ],
            'howrah': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Anirban Ghosh (Mock)', contact: 'dm.howrah@wb.gov.in', address: 'DM Office, Howrah' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rupa Devi (Mock)', contact: 'sp.howrah@wbp.gov.in', address: 'SP Office, Howrah' }
            ],
            'darjeeling': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Alok Sen (Mock)', contact: 'dm.darjeeling@wb.gov.in', address: 'DM Office, Darjeeling' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Bimal Gurung (Mock)', contact: 'sp.darjeeling@wbp.gov.in', address: 'SP Office, Darjeeling' }
            ],
            'bardhaman': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Priyanka Roy (Mock)', contact: 'dm.bardhaman@wb.gov.in', address: 'DM Office, Bardhaman' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Subrata Das (Mock)', contact: 'sp.bardhaman@wbp.gov.in', address: 'SP Office, Bardhaman' }
            ]
        },
        'madhya-pradesh': {
            'bhopal': [
                { designation: 'District Collector', name: 'Ms. Surbhi Jain (Mock)', contact: 'collector.bhopal@mp.gov.in', address: 'Collectorate, Bhopal' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.bhopal@mppolice.gov.in', address: 'SP Office, Bhopal' }
            ],
            'indore': [
                { designation: 'District Collector', name: 'Shri Rajesh Kumar (Mock)', contact: 'collector.indore@mp.gov.in', address: 'Collectorate, Indore' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Meena Singh (Mock)', contact: 'sp.indore@mppolice.gov.in', address: 'SP Office, Indore' }
            ],
            'gwalior': [
                { designation: 'District Collector', name: 'Mr. Anuj Pathak (Mock)', contact: 'collector.gwalior@mp.gov.in', address: 'Collectorate, Gwalior' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ruchi Sharma (Mock)', contact: 'sp.gwalior@mppolice.gov.in', address: 'SP Office, Gwalior' }
            ],
            'jabalpur': [
                { designation: 'District Collector', name: 'Dr. Priyanka Gupta (Mock)', contact: 'collector.jabalpur@mp.gov.in', address: 'Collectorate, Jabalpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vikram Singh (Mock)', contact: 'sp.jabalpur@mppolice.gov.in', address: 'SP Office, Jabalpur' }
            ]
        },
        'rajasthan': {
            'jaipur': [
                { designation: 'District Collector', name: 'Shri Pawan Kumar (Mock)', contact: 'collector.jaipur@raj.nic.in', address: 'Collectorate, Jaipur' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Sharma (Mock)', contact: 'sp.jaipur@rajpolice.gov.in', address: 'SP Office, Jaipur' }
            ],
            'jodhpur': [
                { designation: 'District Collector', name: 'Dr. Amit Gupta (Mock)', contact: 'collector.jodhpur@raj.nic.in', address: 'Collectorate, Jodhpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Yadav (Mock)', contact: 'sp.jodhpur@rajpolice.gov.in', address: 'SP Office, Jodhpur' }
            ],
            'udaipur': [
                { designation: 'District Collector', name: 'Ms. Neha Rathore (Mock)', contact: 'collector.udaipur@raj.nic.in', address: 'Collectorate, Udaipur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vijay Singh (Mock)', contact: 'sp.udaipur@rajpolice.gov.in', address: 'SP Office, Udaipur' }
            ],
            'kota': [
                { designation: 'District Collector', name: 'Mr. Alok Jain (Mock)', contact: 'collector.kota@raj.nic.in', address: 'Collectorate, Kota' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Preeti Sharma (Mock)', contact: 'sp.kota@rajpolice.gov.in', address: 'SP Office, Kota' }
            ]
        },
        'gujarat': {
            'ahmedabad': [
                { designation: 'District Collector', name: 'Shri Dhruv Patel (Mock)', contact: 'collector.ahmedabad@gujarat.gov.in', address: 'Collector Office, Ahmedabad' },
                { designation: 'Commissioner of Police', name: 'Smt. Neha Shah (Mock)', contact: 'cp.ahmedabad@gujaratpolice.gov.in', address: 'Police Commissionerate, Ahmedabad' }
            ],
            'surat': [
                { designation: 'District Collector', name: 'Mr. Vijay Desai (Mock)', contact: 'collector.surat@gujarat.gov.in', address: 'Collector Office, Surat' },
                { designation: 'Commissioner of Police', name: 'Shri Ramesh Gupta (Mock)', contact: 'cp.surat@gujaratpolice.gov.in', address: 'Police Commissionerate, Surat' }
            ],
            'vadodara': [
                { designation: 'District Collector', name: 'Ms. Pooja Mehta (Mock)', contact: 'collector.vadodara@gujarat.gov.in', address: 'Collector Office, Vadodara' },
                { designation: 'Commissioner of Police', name: 'Shri Anand Patel (Mock)', contact: 'cp.vadodara@gujaratpolice.gov.in', address: 'Police Commissionerate, Vadodara' }
            ],
            'rajkot': [
                { designation: 'District Collector', name: 'Mr. Sanjay Kumar (Mock)', contact: 'collector.rajkot@gujarat.gov.in', address: 'Collector Office, Rajkot' },
                { designation: 'Commissioner of Police', name: 'Smt. Kiran Sharma (Mock)', contact: 'cp.rajkot@gujaratpolice.gov.in', address: 'Police Commissionerate, Rajkot' }
            ]
        },
        'karnataka': {
            'bengaluru': [
                { designation: 'District Commissioner', name: 'Smt. Lakshmi Rao (Mock)', contact: 'dc.bengaluru@nic.in', address: 'DC Office, Bengaluru Urban' },
                { designation: 'Commissioner of Police', name: 'Shri Kiran Reddy (Mock)', contact: 'cp.bengaluru@ksp.gov.in', address: 'Police Commissionerate, Bengaluru' }
            ],
            'mysuru': [
                { designation: 'District Commissioner', name: 'Mr. Suresh Kumar (Mock)', contact: 'dc.mysuru@nic.in', address: 'DC Office, Mysuru' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Deepa Nambiar (Mock)', contact: 'sp.mysuru@ksp.gov.in', address: 'SP Office, Mysuru' }
            ],
            'mangalore': [
                { designation: 'District Commissioner', name: 'Dr. Anjali Devi (Mock)', contact: 'dc.mangalore@nic.in', address: 'DC Office, Mangalore' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Prakash Shetty (Mock)', contact: 'sp.mangalore@ksp.gov.in', address: 'SP Office, Mangalore' }
            ],
            'hubli': [
                { designation: 'District Commissioner', name: 'Mr. Rajesh Kumar (Mock)', contact: 'dc.hubli@nic.in', address: 'DC Office, Hubli' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Sarita Patil (Mock)', contact: 'sp.hubli@ksp.gov.in', address: 'SP Office, Hubli' }
            ]
        },
        'tamil-nadu': {
            'chennai': [
                { designation: 'District Collector', name: 'Dr. Kavya Murthy (Mock)', contact: 'collector.chennai@tn.nic.in', address: 'Collectorate, Chennai' },
                { designation: 'Commissioner of Police', name: 'Shri Prakash Raj (Mock)', contact: 'cp.chennai@tnpolice.gov.in', address: 'Police Commissionerate, Chennai' }
            ],
            'coimbatore': [
                { designation: 'District Collector', name: 'Smt. Deepa Menon (Mock)', contact: 'collector.coimbatore@tn.nic.in', address: 'Collectorate, Coimbatore' },
                { designation: 'Commissioner of Police', name: 'Shri Ganesh Kumar (Mock)', contact: 'cp.coimbatore@tnpolice.gov.in', address: 'Police Commissionerate, Coimbatore' }
            ],
            'madurai': [
                { designation: 'District Collector', name: 'Mr. Karthik Raja (Mock)', contact: 'collector.madurai@tn.nic.in', address: 'Collectorate, Madurai' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Lakshmi Priya (Mock)', contact: 'sp.madurai@tnpolice.gov.in', address: 'SP Office, Madurai' }
            ],
            'tiruchirappalli': [
                { designation: 'District Collector', name: 'Dr. Anand Rao (Mock)', contact: 'collector.trichy@tn.nic.in', address: 'Collectorate, Tiruchirappalli' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Babu (Mock)', contact: 'sp.trichy@tnpolice.gov.in', address: 'SP Office, Tiruchirappalli' }
            ]
        }
    };

    // Function to display officer details
    function displayOfficerDetails() {
        console.log(`know-officer-tool.js: displayOfficerDetails called.`);
        
        const selectedState = stateSelect.value;
        const districtName = districtInput.value.trim().toLowerCase(); // Get and clean district input

        officerList.innerHTML = ''; // Clear previous results
        officerResultsSection.classList.remove('hidden'); // Ensure results section is visible

        let officersFound = false;

        if (!selectedState || !districtName) {
            officerList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">Please select a State and enter a District/City to find officer details.</li>`;
            return;
        }

        if (officerData[selectedState] && officerData[selectedState][districtName]) {
            const officers = officerData[selectedState][districtName];
            officers.forEach(officer => {
                const li = document.createElement('li');
                li.classList.add('bg-green-50', 'p-4', 'rounded-lg', 'mb-2', 'text-base', 'leading-relaxed', 'text-green-800');
                li.innerHTML = `
                    <strong>Designation:</strong> ${officer.designation}<br>
                    <strong>Name:</strong> ${officer.name}<br>
                    <strong>Contact:</strong> <a href="mailto:${officer.contact}" class="text-blue-700 hover:underline">${officer.contact}</a><br>
                    <strong>Office Address:</strong> ${officer.address}
                `;
                officerList.appendChild(li);
                officersFound = true;
            });
        } 
        
        if (!officersFound) {
            officerList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">No officer details found for ${districtName}, ${stateSelect.options[stateSelect.selectedIndex].textContent}. Please check the spelling or try another location.</li>`;
        }

        // Add a general note about data accuracy
        const dataNote = document.createElement('li');
        dataNote.innerHTML = `**Important Note:** The officer details provided are for illustrative purposes based on sample data. For official and up-to-date information, please refer to the respective State Government's official websites or contact the relevant departments directly.`;
        dataNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mb-2', 'text-sm', 'leading-relaxed', 'text-blue-800', 'mt-4');
        officerList.appendChild(dataNote);
        console.log("know-officer-tool.js: Officer details displayed.");
    }
    
    // Event listener for the "Find Officer" button
    if (findOfficerBtn) {
        findOfficerBtn.addEventListener('click', function() {
            console.log("know-officer-tool.js: 'Find Officer' button clicked. Attempting to display officer details.");
            displayOfficerDetails();
        });
    } else {
        console.error("know-officer-tool.js Initialization Error: 'find-officer-btn' element not found.");
    }
});
