document.addEventListener('DOMContentLoaded', function() {
    console.log("know-officer-tool.js: DOM content loaded. Initializing local officer tool script.");

    // Getting references to the HTML elements
    const findOfficerBtn = document.getElementById('find-officer-btn');
    const stateSelect = document.getElementById('state-select');
    const districtInput = document.getElementById('district-input');
    // Removed pincodeInput as per request
    const officerResultsSection = document.getElementById('officer-results-section');
    const officerList = document.getElementById('officer-list');

    // Check if essential elements are found
    if (!findOfficerBtn) console.error("know-officer-tool.js Error: 'find-officer-btn' element not found.");
    if (!stateSelect) console.error("know-officer-tool.js Error: 'state-select' element not found.");
    if (!districtInput) console.error("know-officer-tool.js Error: 'district-input' element not found.");
    // Removed pincodeInput check
    if (!officerResultsSection) console.error("know-officer-tool.js Error: 'officer-results-section' not found. This is crucial for displaying results.");
    if (!officerList) console.error("know-officer-tool.js Error: 'officer-list' not found.");

    // Sample Data for Local Officers (Illustrative - Real data needs external API/database)
    // Pincode removed from officer entries. Health and Irrigation links removed from state data.
    // Added general_help_portal_link for demonstration.
    const officerData = {
        'uttar-pradesh': {
            state_portal_link: 'https://up.gov.in/',
            police_portal_link: 'https://uppolice.gov.in/',
            revenue_portal_link: 'https://bhulekh.up.nic.in/',
            general_help_portal_link: 'https://jansunwai.up.nic.in/', // Example of a general helping portal
            'lucknow': [
                { designation: 'District Magistrate (DM)', name: 'Shri Surya Pratap Singh (Mock)', contact: 'dm.lko@up.gov.in', address: 'DM Office, Collectorate, Lucknow' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Smt. Ritu Sharma (Mock)', contact: 'spcity.lko@uppolice.gov.in', address: 'SP City Office, Lalbagh, Lucknow' },
                { designation: 'Municipal Commissioner', name: 'Dr. Alok Kumar (Mock)', contact: 'commissioner.lmc@nic.in', address: 'Nagar Nigam Office, Lalbagh, Lucknow' },
                { designation: 'Chief Development Officer (CDO)', name: 'Shri Vikas Gupta (Mock)', contact: 'cdo.lko@up.gov.in', address: 'CDO Office, Lucknow' },
                { designation: 'Assistant Engineer (AE) - PWD', name: 'Er. Rajesh Kumar (Mock)', contact: 'ae.pwd.lko@up.gov.in', address: 'PWD Office, Lucknow' },
                { designation: 'Junior Engineer (JE) - Jal Nigam', name: 'Er. Suman Devi (Mock)', contact: 'je.jalnigam.lko@up.gov.in', address: 'Jal Nigam Office, Lucknow' }
            ],
            'kanpur': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Vivek Gupta (Mock)', contact: 'dm.knp@up.gov.in', address: 'DM Office, Collectorate, Kanpur' },
                { designation: 'Superintendent of Police (SP) - Rural', name: 'Shri Anil Verma (Mock)', contact: 'sprural.knp@uppolice.gov.in', address: 'SP Rural Office, Kanpur' },
                { designation: 'Chief Medical Officer (CMO)', name: 'Dr. Neha Sharma (Mock)', contact: 'cmo.knp@up.gov.in', address: 'CMO Office, Kanpur' },
                { designation: 'Block Development Officer (BDO) - Kalyanpur', name: 'Mr. Alok Singh (Mock)', contact: 'bdo.kalyanpur@up.gov.in', address: 'BDO Office, Kalyanpur, Kanpur' }
            ],
            'agra': [
                { designation: 'District Magistrate (DM)', name: 'Shri Manoj Kumar (Mock)', contact: 'dm.agra@up.gov.in', address: 'DM Office, Collectorate, Agra' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Smt. Priya Singh (Mock)', contact: 'ssp.agra@uppolice.gov.in', address: 'SSP Office, Agra' },
                { designation: 'Tehsildar - Sadar', name: 'Mr. Ramesh Kumar (Mock)', contact: 'tehsildar.sadar.agra@up.gov.in', address: 'Tehsil Office, Sadar, Agra' },
                { designation: 'Assistant Engineer (AE) - Jal Nigam', name: 'Er. Alok Verma (Mock)', contact: 'ae.jalnigam.agra@up.gov.in', address: 'Jal Nigam Office, Agra' }
            ],
            'varanasi': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Ramesh Chandra (Mock)', contact: 'dm.vns@up.gov.in', address: 'DM Office, Collectorate, Varanasi' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Shri Vivek Yadav (Mock)', contact: 'spcity.vns@uppolice.gov.in', address: 'SP City Office, Varanasi' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Ritu Singh (Mock)', contact: 'je.pwd.vns@up.gov.in', address: 'PWD Office, Varanasi' },
                { designation: 'Chief Medical Officer (CMO)', name: 'Dr. Suman Devi (Mock)', contact: 'cmo.vns@up.gov.in', address: 'CMO Office, Varanasi' }
            ],
            'prayagraj': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Anjali Devi (Mock)', contact: 'dm.pry@up.gov.in', address: 'DM Office, Prayagraj' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Pawan Gupta (Mock)', contact: 'sp.pry@uppolice.gov.in', address: 'SP Office, Prayagraj' },
                { designation: 'Sub-Divisional Magistrate (SDM) - Sadar', name: 'Mr. Rajesh Dixit (Mock)', contact: 'sdm.sadar.pry@up.gov.in', address: 'SDM Office, Sadar, Prayagraj' }
            ],
            'meerut': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Saurabh Sharma (Mock)', contact: 'dm.mrt@up.gov.in', address: 'DM Office, Meerut' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Smt. Neha Verma (Mock)', contact: 'ssp.mrt@uppolice.gov.in', address: 'SSP Office, Meerut' },
                { designation: 'Block Development Officer (BDO) - Sardhana', name: 'Ms. Pooja Singh (Mock)', contact: 'bdo.sardhana@up.gov.in', address: 'BDO Office, Sardhana, Meerut' }
            ],
            'ghaziabad': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Vivek Jain (Mock)', contact: 'dm.gzb@up.gov.in', address: 'DM Office, Ghaziabad' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Shri Amit Singh (Mock)', contact: 'ssp.gzb@uppolice.gov.in', address: 'SSP Office, Ghaziabad' },
                { designation: 'Municipal Commissioner', name: 'Mr. Rakesh Kumar (Mock)', contact: 'commissioner.gzb@nic.in', address: 'Nagar Nigam Office, Ghaziabad' }
            ],
            'bareilly': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Ritu Agrawal (Mock)', contact: 'dm.brly@up.gov.in', address: 'DM Office, Bareilly' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Kumar Gaurav (Mock)', contact: 'sp.brly@uppolice.gov.in', address: 'SP Office, Bareilly' },
                { designation: 'Tehsildar - Bareilly', name: 'Mr. Vivek Sharma (Mock)', contact: 'tehsildar.brly@up.gov.in', address: 'Tehsil Office, Bareilly' }
            ],
            'aligarh': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Dinesh Sharma (Mock)', contact: 'dm.aligarh@up.gov.in', address: 'DM Office, Aligarh' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Yadav (Mock)', contact: 'sp.aligarh@uppolice.gov.in', address: 'SP Office, Aligarh' },
                { designation: 'Assistant Engineer (AE) - Electricity', name: 'Er. Alok Singh (Mock)', contact: 'ae.elect.aligarh@up.gov.in', address: 'Electricity Board, Aligarh' }
            ],
            'gorakhpur': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Sanjay Singh (Mock)', contact: 'dm.gkp@up.gov.in', address: 'DM Office, Gorakhpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rahul Kumar (Mock)', contact: 'sp.gkp@uppolice.gov.in', address: 'SP Office, Gorakhpur' },
                { designation: 'Junior Engineer (JE) - Rural Engineering', name: 'Er. Suman Gupta (Mock)', contact: 'je.re.gkp@up.gov.in', address: 'Rural Engineering Office, Gorakhpur' }
            ]
        },
        'maharashtra': {
            state_portal_link: 'https://www.maharashtra.gov.in/',
            police_portal_link: 'https://mahapolice.gov.in/',
            revenue_portal_link: 'https://mahabhulekh.maharashtra.gov.in/',
            general_help_portal_link: 'https://grievances.maharashtra.gov.in/', // Example of a general helping portal
            'mumbai': [
                { designation: 'District Collector', name: 'Smt. Priya Deshmukh (Mock)', contact: 'collector.mumbai@nic.in', address: 'Collector Office, Bandra, Mumbai' },
                { designation: 'Commissioner of Police', name: 'Shri Rajesh Patil (Mock)', contact: 'cp.mumbai@mahapolice.gov.in', address: 'Police Headquarters, Crawford Market, Mumbai' },
                { designation: 'Municipal Commissioner (BMC)', name: 'Dr. Sanjay Raut (Mock)', contact: 'mc.bmc@nic.in', address: 'BMC Headquarters, Fort, Mumbai' },
                { designation: 'Assistant Engineer (AE) - BMC Water Dept', name: 'Er. Ashok Sharma (Mock)', contact: 'ae.water.mumbai@bmc.gov.in', address: 'BMC Water Dept, Mumbai' }
            ],
            'pune': [
                { designation: 'District Collector', name: 'Shri Rohan Joshi (Mock)', contact: 'collector.pune@nic.in', address: 'Collector Office, Pune' },
                { designation: 'Commissioner of Police', name: 'Smt. Kavita Sharma (Mock)', contact: 'cp.pune@mahapolice.gov.in', address: 'Police Commissionerate, Pune' },
                { designation: 'CEO, Zilla Parishad', name: 'Mr. Anand Kulkarni (Mock)', contact: 'ceo.zp.pune@mahapanchayat.gov.in', address: 'Zilla Parishad Office, Pune' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Smita Patil (Mock)', contact: 'je.pwd.pune@mahapwd.gov.in', address: 'PWD Office, Pune' }
            ],
            'nagpur': [
                { designation: 'District Collector', name: 'Mr. Vikas Agrawal (Mock)', contact: 'collector.nagpur@nic.in', address: 'Collector Office, Nagpur' },
                { designation: 'Commissioner of Police', name: 'Smt. Smita Rao (Mock)', contact: 'cp.nagpur@mahapolice.gov.in', address: 'Police Commissionerate, Nagpur' },
                { designation: 'Assistant Engineer (AE) - MSEDCL', name: 'Er. Rohit Deshmukh (Mock)', contact: 'ae.msedcl.nagpur@mahapower.gov.in', address: 'MSEDCL Office, Nagpur' }
            ],
            'nashik': [
                { designation: 'District Collector', name: 'Dr. Rajeshwari Iyer (Mock)', contact: 'collector.nashik@nic.in', address: 'Collector Office, Nashik' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ashok Kumar (Mock)', contact: 'sp.nashik@mahapolice.gov.in', address: 'SP Office, Nashik' },
                { designation: 'Junior Engineer (JE) - Water Supply', name: 'Er. Pooja Sharma (Mock)', contact: 'je.water.nashik@mahaws.gov.in', address: 'Water Supply Dept, Nashik' }
            ],
            'aurangabad': [
                { designation: 'District Collector', name: 'Shri Anand Deshpande (Mock)', contact: 'collector.aurangabad@nic.in', address: 'Collector Office, Aurangabad' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Kadam (Mock)', contact: 'sp.aurangabad@mahapolice.gov.in', address: 'SP Office, Aurangabad' }
            ],
            'solapur': [
                { designation: 'District Collector', name: 'Mr. Vijay Patil (Mock)', contact: 'collector.solapur@nic.in', address: 'Collector Office, Solapur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ganesh Jadhav (Mock)', contact: 'sp.solapur@mahapolice.gov.in', address: 'SP Office, Solapur' }
            ],
            'kolhapur': [
                { designation: 'District Collector', name: 'Ms. Smita More (Mock)', contact: 'collector.kolhapur@nic.in', address: 'Collector Office, Kolhapur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rohan Gaikwad (Mock)', contact: 'sp.kolhapur@mahapolice.gov.in', address: 'SP Office, Kolhapur' }
            ],
            'amravati': [
                { designation: 'District Collector', name: 'Mr. Sachin Joshi (Mock)', contact: 'collector.amravati@nic.in', address: 'Collector Office, Amravati' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Anjali Raut (Mock)', contact: 'sp.amravati@mahapolice.gov.in', address: 'SP Office, Amravati' }
            ],
            'latur': [
                { designation: 'District Collector', name: 'Dr. Vivek Kulkarni (Mock)', contact: 'collector.latur@nic.in', address: 'Collector Office, Latur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Prakash Singh (Mock)', contact: 'sp.latur@mahapolice.gov.in', address: 'SP Office, Latur' }
            ],
            'dhule': [
                { designation: 'District Collector', name: 'Ms. Priya Sharma (Mock)', contact: 'collector.dhule@nic.in', address: 'Collector Office, Dhule' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ajay Patil (Mock)', contact: 'sp.dhule@mahapolice.gov.in', address: 'SP Office, Dhule' }
            ]
        },
        'delhi': {
            state_portal_link: 'https://delhi.gov.in/',
            police_portal_link: 'https://delhipolice.gov.in/',
            general_help_portal_link: 'https://delhi.gov.in/eprocurement/citizen-services/', // Example of a general helping portal
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
                { designation: 'Deputy Commissioner of Police (North)', name: 'Shri Rahul Verma (Mock)', contact: 'dcp.north@delhipolice.gov.in', address: 'DCP Office, Civil Lines, Delhi' },
                { designation: 'Assistant Engineer (AE) - MCD', name: 'Er. Suresh Kumar (Mock)', contact: 'ae.mcd.north@delhi.gov.in', address: 'MCD Office, North Delhi' }
            ],
            'south delhi': [
                { designation: 'District Magistrate (South)', name: 'Mr. Sanjay Gupta (Mock)', contact: 'dm.south@nic.in', address: 'DM Office, Saket, Delhi' },
                { designation: 'Deputy Commissioner of Police (South)', name: 'Smt. Kiran Devi (Mock)', contact: 'dcp.south@delhipolice.gov.in', address: 'DCP Office, Hauz Khas, Delhi' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Neha Singh (Mock)', contact: 'je.pwd.south@delhi.gov.in', address: 'PWD Office, South Delhi' }
            ],
            'east delhi': [
                { designation: 'District Magistrate (East)', name: 'Ms. Ritu Singh (Mock)', contact: 'dm.east@nic.in', address: 'DM Office, Preet Vihar, Delhi' },
                { designation: 'Deputy Commissioner of Police (East)', name: 'Shri Vineet Kumar (Mock)', contact: 'dcp.east@delhipolice.gov.in', address: 'DCP Office, Mandawali, Delhi' }
            ],
            'west delhi': [
                { designation: 'District Magistrate (West)', name: 'Mr. Alok Verma (Mock)', contact: 'dm.west@nic.in', address: 'DM Office, Rajouri Garden, Delhi' },
                { designation: 'Deputy Commissioner of Police (West)', name: 'Smt. Pooja Rani (Mock)', contact: 'dcp.west@delhipolice.gov.in', address: 'DCP Office, Janakpuri, Delhi' }
            ],
            'north west delhi': [
                { designation: 'District Magistrate (North West)', name: 'Shri Rajesh Kumar (Mock)', contact: 'dm.nw@nic.in', address: 'DM Office, Kanjhawala, Delhi' },
                { designation: 'Deputy Commissioner of Police (North West)', name: 'Mr. Suresh Yadav (Mock)', contact: 'dcp.nw@delhipolice.gov.in', address: 'DCP Office, Rohini, Delhi' }
            ],
            'south west delhi': [
                { designation: 'District Magistrate (South West)', name: 'Ms. Kiran Gupta (Mock)', contact: 'dm.sw@nic.in', address: 'DM Office, Kapashera, Delhi' },
                { designation: 'Deputy Commissioner of Police (South West)', name: 'Shri Manoj Sharma (Mock)', contact: 'dcp.sw@delhipolice.gov.in', address: 'DCP Office, Dwarka, Delhi' }
            ],
            'north east delhi': [
                { designation: 'District Magistrate (North East)', name: 'Mr. Vivek Singh (Mock)', contact: 'dm.ne@nic.in', address: 'DM Office, Seelampur, Delhi' },
                { designation: 'Deputy Commissioner of Police (North East)', name: 'Smt. Rekha Devi (Mock)', contact: 'dcp.ne@delhipolice.gov.in', address: 'DCP Office, Bhajanpura, Delhi' }
            ],
            'shahdara': [
                { designation: 'District Magistrate (Shahdara)', name: 'Shri Amit Kumar (Mock)', contact: 'dm.shahdara@nic.in', address: 'DM Office, Nand Nagri, Delhi' },
                { designation: 'Deputy Commissioner of Police (Shahdara)', name: 'Mr. Rahul Gupta (Mock)', contact: 'dcp.shahdara@delhipolice.gov.in', address: 'DCP Office, Vivek Vihar, Delhi' }
            ]
        },
        'bihar': {
            state_portal_link: 'https://state.bihar.gov.in/',
            police_portal_link: 'https://biharpolice.bih.nic.in/',
            general_help_portal_link: 'https://jansunwai.bihar.gov.in/', // Example of a general helping portal
            'patna': [
                { designation: 'District Magistrate (DM)', name: 'Shri Alok Kumar (Mock)', contact: 'dm.patna@bih.nic.in', address: 'DM Office, Collectorate, Patna' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Smt. Preeti Devi (Mock)', contact: 'spcity.patna@bihpolice.gov.in', address: 'SP City Office, Patna' },
                { designation: 'Assistant Engineer (AE) - Rural Works', name: 'Er. Manoj Yadav (Mock)', contact: 'ae.rwd.patna@bih.nic.in', address: 'Rural Works Dept, Patna' }
            ],
            'gaya': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Rakesh Singh (Mock)', contact: 'dm.gaya@bih.nic.in', address: 'DM Office, Collectorate, Gaya' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Anand Kumar (Mock)', contact: 'sp.gaya@bihpolice.gov.in', address: 'SP Office, Gaya' },
                { designation: 'Junior Engineer (JE) - Electricity', name: 'Er. Suman Kumari (Mock)', contact: 'je.elect.gaya@bih.nic.in', address: 'Electricity Board, Gaya' }
            ],
            'muzaffarpur': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Kavita Dubey (Mock)', contact: 'dm.muzaffarpur@bih.nic.in', address: 'DM Office, Muzaffarpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Verma (Mock)', contact: 'sp.muzaffarpur@bihpolice.gov.in', address: 'SP Office, Muzaffarpur' }
            ],
            'bhagalpur': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sanjeev Kumar (Mock)', contact: 'dm.bhagalpur@bih.nic.in', address: 'DM Office, Bhagalpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Singh (Mock)', contact: 'sp.bhagalpur@bihpolice.gov.in', address: 'SP Office, Bhagalpur' }
            ],
            'darbhanga': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Alok Kumar (Mock)', contact: 'dm.darbhanga@bih.nic.in', address: 'DM Office, Darbhanga' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.darbhanga@bihpolice.gov.in', address: 'SP Office, Darbhanga' }
            ],
            'nalanda': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Ritu Kumari (Mock)', contact: 'dm.nalanda@bih.nic.in', address: 'DM Office, Nalanda' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Amit Gupta (Mock)', contact: 'sp.nalanda@bihpolice.gov.in', address: 'SP Office, Nalanda' }
            ],
            'purnia': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sanjay Kumar (Mock)', contact: 'dm.purnia@bih.nic.in', address: 'DM Office, Purnia' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Kiran Devi (Mock)', contact: 'sp.purnia@bihpolice.gov.in', address: 'SP Office, Purnia' }
            ],
            'rohtas': [
                { designation: 'District Magistrate (DM)', name: 'Shri Prakash Singh (Mock)', contact: 'dm.rohtas@bih.nic.in', address: 'DM Office, Rohtas' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Sharma (Mock)', contact: 'sp.rohtas@bihpolice.gov.in', address: 'SP Office, Rohtas' }
            ],
            'saran': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Pooja Kumari (Mock)', contact: 'dm.saran@bih.nic.in', address: 'DM Office, Saran' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Kumar (Mock)', contact: 'sp.saran@bihpolice.gov.in', address: 'SP Office, Saran' }
            ],
            'east champaran': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Anand Prakash (Mock)', contact: 'dm.eastchamparan@bih.nic.in', address: 'DM Office, East Champaran' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ritu Singh (Mock)', contact: 'sp.eastchamparan@bihpolice.gov.in', address: 'SP Office, East Champaran' }
            ]
        },
        'west-bengal': {
            state_portal_link: 'https://wb.gov.in/',
            police_portal_link: 'https://www.westbengalpolice.gov.in/',
            general_help_portal_link: 'https://wb.gov.in/portal/web/guest/citizen-services', // Example of a general helping portal
            'kolkata': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Indrani Bose (Mock)', contact: 'dm.kol@wb.gov.in', address: 'DM Office, Alipore, Kolkata' },
                { designation: 'Commissioner of Police', name: 'Shri Sourav Das (Mock)', contact: 'cp.kol@kolkatapolice.gov.in', address: 'Police Headquarters, Lalbazar, Kolkata' },
                { designation: 'Assistant Engineer (AE) - KMC', name: 'Er. Debashish Roy (Mock)', contact: 'ae.kmc.kol@wb.gov.in', address: 'KMC Office, Kolkata' }
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
            ],
            'n24parganas': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sayan Mitra (Mock)', contact: 'dm.n24p@wb.gov.in', address: 'DM Office, North 24 Parganas' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Ghosh (Mock)', contact: 'sp.n24p@wbp.gov.in', address: 'SP Office, North 24 Parganas' }
            ],
            'south 24 parganas': [
                { designation: 'District Magistrate (DM)', name: 'Shri Ayan Chatterjee (Mock)', contact: 'dm.s24p@wb.gov.in', address: 'DM Office, South 24 Parganas' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Debabrata Sen (Mock)', contact: 'sp.s24p@wbp.gov.in', address: 'SP Office, South 24 Parganas' }
            ],
            'hooghly': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Priti Sarkar (Mock)', contact: 'dm.hooghly@wb.gov.in', address: 'DM Office, Hooghly' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Biswajit Das (Mock)', contact: 'sp.hooghly@wbp.gov.in', address: 'SP Office, Hooghly' }
            ],
            'paschim medinipur': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sourav Roy (Mock)', contact: 'dm.paschim@wb.gov.in', address: 'DM Office, Paschim Medinipur' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ananya Dutta (Mock)', contact: 'sp.paschim@wbp.gov.in', address: 'SP Office, Paschim Medinipur' }
            ],
            'purba medinipur': [
                { designation: 'District Magistrate (DM)', name: 'Shri Rakesh Majumdar (Mock)', contact: 'dm.purba@wb.gov.in', address: 'DM Office, Purba Medinipur' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Subhankar Ghosh (Mock)', contact: 'sp.purba@wbp.gov.in', address: 'SP Office, Purba Medinipur' }
            ],
            'malda': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Indrani Sen (Mock)', contact: 'dm.malda@wb.gov.in', address: 'DM Office, Malda' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Arindam Pal (Mock)', contact: 'sp.malda@wbp.gov.in', address: 'SP Office, Malda' }
            ]
        },
        'madhya-pradesh': {
            state_portal_link: 'https://mp.gov.in/',
            police_portal_link: 'https://mppolice.gov.in/',
            general_help_portal_link: 'https://cmhelpline.mp.gov.in/', // Example of a general helping portal
            'bhopal': [
                { designation: 'District Collector', name: 'Ms. Surbhi Jain (Mock)', contact: 'collector.bhopal@mp.gov.in', address: 'Collectorate, Bhopal' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.bhopal@mppolice.gov.in', address: 'SP Office, Bhopal' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Alok Verma (Mock)', contact: 'je.pwd.bhopal@mp.gov.in', address: 'PWD Office, Bhopal' }
            ],
            'indore': [
                { designation: 'District Collector', name: 'Shri Rajesh Kumar (Mock)', contact: 'collector.indore@mp.gov.in', address: 'Collectorate, Indore' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Meena Singh (Mock)', contact: 'sp.indore@mppolice.gov.in', address: 'SP Office, Indore' },
                { designation: 'Assistant Engineer (AE) - Electricity', name: 'Er. Rakesh Gupta (Mock)', contact: 'ae.elect.indore@mp.gov.in', address: 'Electricity Board, Indore' }
            ],
            'gwalior': [
                { designation: 'District Collector', name: 'Mr. Anuj Pathak (Mock)', contact: 'collector.gwalior@mp.gov.in', address: 'Collectorate, Gwalior' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ruchi Sharma (Mock)', contact: 'sp.gwalior@mppolice.gov.in', address: 'SP Office, Gwalior' }
            ],
            'jabalpur': [
                { designation: 'District Collector', name: 'Dr. Priyanka Gupta (Mock)', contact: 'collector.jabalpur@mp.gov.in', address: 'Collectorate, Jabalpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vikram Singh (Mock)', contact: 'sp.jabalpur@mppolice.gov.in', address: 'SP Office, Jabalpur' }
            ],
            'ujjain': [
                { designation: 'District Collector', name: 'Ms. Pooja Verma (Mock)', contact: 'collector.ujjain@mp.gov.in', address: 'Collectorate, Ujjain' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Kumar (Mock)', contact: 'sp.ujjain@mppolice.gov.in', address: 'SP Office, Ujjain' }
            ],
            'sagar': [
                { designation: 'District Collector', name: 'Mr. Alok Gupta (Mock)', contact: 'collector.sagar@mp.gov.in', address: 'Collectorate, Sagar' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Divya Singh (Mock)', contact: 'sp.sagar@mppolice.gov.in', address: 'SP Office, Sagar' }
            ],
            'rewa': [
                { designation: 'District Collector', name: 'Shri Manoj Patel (Mock)', contact: 'collector.rewa@mp.gov.in', address: 'Collectorate, Rewa' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Vikas Sharma (Mock)', contact: 'sp.rewa@mppolice.gov.in', address: 'SP Office, Rewa' }
            ],
            'satna': [
                { designation: 'District Collector', name: 'Ms. Ritu Agrawal (Mock)', contact: 'collector.satna@mp.gov.in', address: 'Collectorate, Satna' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Kumar Gaurav (Mock)', contact: 'sp.satna@mppolice.gov.in', address: 'SP Office, Satna' }
            ],
            'chhindwara': [
                { designation: 'District Collector', name: 'Mr. Dinesh Sharma (Mock)', contact: 'collector.chhindwara@mp.gov.in', address: 'Collectorate, Chhindwara' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Yadav (Mock)', contact: 'sp.chhindwara@mppolice.gov.in', address: 'SP Office, Chhindwara' }
            ],
            'burhanpur': [
                { designation: 'District Collector', name: 'Dr. Sanjay Singh (Mock)', contact: 'collector.burhanpur@mp.gov.in', address: 'Collectorate, Burhanpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rahul Kumar (Mock)', contact: 'sp.burhanpur@mppolice.gov.in', address: 'SP Office, Burhanpur' }
            ]
        },
        'rajasthan': {
            state_portal_link: 'https://rajasthan.gov.in/',
            police_portal_link: 'https://police.rajasthan.gov.in/',
            revenue_portal_link: 'https://land.rajasthan.gov.in/',
            general_help_portal_link: 'https://sampark.rajasthan.gov.in/', // Example of a general helping portal
            'jaipur': [
                { designation: 'District Collector', name: 'Shri Pawan Kumar (Mock)', contact: 'collector.jaipur@raj.nic.in', address: 'Collectorate, Jaipur' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Sharma (Mock)', contact: 'sp.jaipur@rajpolice.gov.in', address: 'SP Office, Jaipur' },
                { designation: 'Assistant Engineer (AE) - Water Resources', name: 'Er. Suresh Jain (Mock)', contact: 'ae.water.jaipur@raj.gov.in', address: 'Water Resources Dept, Jaipur' }
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
            ],
            'ajmer': [
                { designation: 'District Collector', name: 'Shri Rajesh Kumar (Mock)', contact: 'collector.ajmer@raj.nic.in', address: 'Collectorate, Ajmer' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Divya Sharma (Mock)', contact: 'sp.ajmer@rajpolice.gov.in', address: 'SP Office, Ajmer' }
            ],
            'bikaner': [
                { designation: 'District Collector', name: 'Mr. Sanjay Gupta (Mock)', contact: 'collector.bikaner@raj.nic.in', address: 'Collectorate, Bikaner' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rahul Verma (Mock)', contact: 'sp.bikaner@rajpolice.gov.in', address: 'SP Office, Bikaner' }
            ],
            'bharatpur': [
                { designation: 'District Collector', name: 'Ms. Kiran Devi (Mock)', contact: 'collector.bharatpur@raj.nic.in', address: 'Collectorate, Bharatpur' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Manoj Sharma (Mock)', contact: 'sp.bharatpur@rajpolice.gov.in', address: 'SP Office, Bharatpur' }
            ],
            'alwar': [
                { designation: 'District Collector', name: 'Mr. Vivek Singh (Mock)', contact: 'collector.alwar@raj.nic.in', address: 'Collectorate, Alwar' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rekha Devi (Mock)', contact: 'sp.alwar@rajpolice.gov.in', address: 'SP Office, Alwar' }
            ],
            'sikar': [
                { designation: 'District Collector', name: 'Shri Amit Kumar (Mock)', contact: 'collector.sikar@raj.nic.in', address: 'Collectorate, Sikar' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Gupta (Mock)', contact: 'sp.sikar@rajpolice.gov.in', address: 'SP Office, Sikar' }
            ],
            'pali': [
                { designation: 'District Collector', name: 'Ms. Ritu Singh (Mock)', contact: 'collector.pali@raj.nic.in', address: 'Collectorate, Pali' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vineet Kumar (Mock)', contact: 'sp.pali@rajpolice.gov.in', address: 'SP Office, Pali' }
            ]
        },
        'gujarat': {
            state_portal_link: 'https://gujarat.gov.in/',
            police_portal_link: 'https://police.gujarat.gov.in/',
            revenue_portal_link: 'https://revenuedepartment.gujarat.gov.in/',
            general_help_portal_link: 'https://cmogujarat.gov.in/cm-helpline/', // Example of a general helping portal
            'ahmedabad': [
                { designation: 'District Collector', name: 'Shri Dhruv Patel (Mock)', contact: 'collector.ahmedabad@gujarat.gov.in', address: 'Collector Office, Ahmedabad' },
                { designation: 'Commissioner of Police', name: 'Smt. Neha Shah (Mock)', contact: 'cp.ahmedabad@gujaratpolice.gov.in', address: 'Police Commissionerate, Ahmedabad' },
                { designation: 'Junior Engineer (JE) - AMC', name: 'Er. Jignesh Patel (Mock)', contact: 'je.amc.ahd@gujarat.gov.in', address: 'AMC Office, Ahmedabad' }
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
            ],
            'gandhinagar': [
                { designation: 'District Collector', name: 'Shri Hitesh Shah (Mock)', contact: 'collector.gandhinagar@gujarat.gov.in', address: 'Collector Office, Gandhinagar' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Preeti Patel (Mock)', contact: 'sp.gandhinagar@gujaratpolice.gov.in', address: 'SP Office, Gandhinagar' }
            ],
            'bhavnagar': [
                { designation: 'District Collector', name: 'Mr. Jignesh Modi (Mock)', contact: 'collector.bhavnagar@gujarat.gov.in', address: 'Collector Office, Bhavnagar' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Dave (Mock)', contact: 'sp.bhavnagar@gujaratpolice.gov.in', address: 'SP Office, Bhavnagar' }
            ],
            'jamnagar': [
                { designation: 'District Collector', name: 'Ms. Pooja Sharma (Mock)', contact: 'collector.jamnagar@gujarat.gov.in', address: 'Collector Office, Jamnagar' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Anand Gupta (Mock)', contact: 'sp.jamnagar@gujaratpolice.gov.in', address: 'SP Office, Jamnagar' }
            ],
            'junagadh': [
                { designation: 'District Collector', name: 'Mr. Sanjay Patel (Mock)', contact: 'collector.junagadh@gujarat.gov.in', address: 'Collector Office, Junagadh' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Kiran Mehta (Mock)', contact: 'sp.junagadh@gujaratpolice.gov.in', address: 'SP Office, Junagadh' }
            ],
            'anand': [
                { designation: 'District Collector', name: 'Shri Vivek Shah (Mock)', contact: 'collector.anand@gujarat.gov.in', address: 'Collector Office, Anand' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Patel (Mock)', contact: 'sp.anand@gujaratpolice.gov.in', address: 'SP Office, Anand' }
            ],
            'kutch': [
                { designation: 'District Collector', name: 'Ms. Ritu Desai (Mock)', contact: 'collector.kutch@gujarat.gov.in', address: 'Collector Office, Kutch' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ashok Sharma (Mock)', contact: 'sp.kutch@gujaratpolice.gov.in', address: 'SP Office, Kutch' }
            ]
        },
        'karnataka': {
            state_portal_link: 'https://karnataka.gov.in/',
            police_portal_link: 'https://ksp.gov.in/',
            revenue_portal_link: 'https://landrecords.karnataka.gov.in/',
            general_help_portal_link: 'https://sevasindhu.karnataka.gov.in/Sevasindhu/English', // Example of a general helping portal
            'bengaluru': [
                { designation: 'District Commissioner', name: 'Smt. Lakshmi Rao (Mock)', contact: 'dc.bengaluru@nic.in', address: 'DC Office, Bengaluru Urban' },
                { designation: 'Commissioner of Police', name: 'Shri Kiran Reddy (Mock)', contact: 'cp.bengaluru@ksp.gov.in', address: 'Police Commissionerate, Bengaluru' },
                { designation: 'Assistant Engineer (AE) - BWSSB', name: 'Er. Ramesh Bhat (Mock)', contact: 'ae.bwssb.blr@karnataka.gov.in', address: 'BWSSB Office, Bengaluru' }
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
            ],
            'belagavi': [
                { designation: 'District Commissioner', name: 'Shri Vivek Kulkarni (Mock)', contact: 'dc.belagavi@nic.in', address: 'DC Office, Belagavi' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Anand Desai (Mock)', contact: 'sp.belagavi@ksp.gov.in', address: 'SP Office, Belagavi' }
            ],
            'gulbarga': [
                { designation: 'District Commissioner', name: 'Ms. Pooja Reddy (Mock)', contact: 'dc.gulbarga@nic.in', address: 'DC Office, Gulbarga' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Kumar (Mock)', contact: 'sp.gulbarga@ksp.gov.in', address: 'SP Office, Gulbarga' }
            ],
            'davangere': [
                { designation: 'District Commissioner', name: 'Mr. Sanjay Patil (Mock)', contact: 'dc.davangere@nic.in', address: 'DC Office, Davangere' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Kiran Rao (Mock)', contact: 'sp.davangere@ksp.gov.in', address: 'SP Office, Davangere' }
            ],
            'ballari': [
                { designation: 'District Commissioner', name: 'Shri Ashok Kumar (Mock)', contact: 'dc.ballari@nic.in', address: 'DC Office, Ballari' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Dinesh Sharma (Mock)', contact: 'sp.ballari@ksp.gov.in', address: 'SP Office, Ballari' }
            ],
            'tumakuru': [
                { designation: 'District Commissioner', name: 'Ms. Ritu Singh (Mock)', contact: 'dc.tumakuru@nic.in', address: 'DC Office, Tumakuru' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Yadav (Mock)', contact: 'sp.tumakuru@ksp.gov.in', address: 'SP Office, Tumakuru' }
            ],
            'bidar': [
                { designation: 'District Commissioner', name: 'Mr. Anand Gupta (Mock)', contact: 'dc.bidar@nic.in', address: 'DC Office, Bidar' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Devi (Mock)', contact: 'sp.bidar@ksp.gov.in', address: 'SP Office, Bidar' }
            ]
        },
        'tamil-nadu': {
            state_portal_link: 'https://www.tn.gov.in/',
            police_portal_link: 'https://www.tnpolice.gov.in/',
            revenue_portal_link: 'https://eservices.tn.gov.in/eservicesnew/land/chitta.html',
            general_help_portal_link: 'https://cmcell.tn.gov.in/', // Example of a general helping portal
            'chennai': [
                { designation: 'District Collector', name: 'Dr. Kavya Murthy (Mock)', contact: 'collector.chennai@tn.nic.in', address: 'Collectorate, Chennai' },
                { designation: 'Commissioner of Police', name: 'Shri Prakash Raj (Mock)', contact: 'cp.chennai@tnpolice.gov.in', address: 'Police Commissionerate, Chennai' },
                { designation: 'Assistant Engineer (AE) - CMWSSB', name: 'Er. Karthik S. (Mock)', contact: 'ae.cmwssb.chn@tn.gov.in', address: 'CMWSSB Office, Chennai' }
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
            ],
            'salem': [
                { designation: 'District Collector', name: 'Ms. Priya Devi (Mock)', contact: 'collector.salem@tn.nic.in', address: 'Collectorate, Salem' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Kumar (Mock)', contact: 'sp.salem@tnpolice.gov.in', address: 'SP Office, Salem' }
            ],
            'vellore': [
                { designation: 'District Collector', name: 'Mr. Vivek Singh (Mock)', contact: 'collector.vellore@tn.nic.in', address: 'Collectorate, Vellore' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Anjali Sharma (Mock)', contact: 'sp.vellore@tnpolice.gov.in', address: 'SP Office, Vellore' }
            ],
            'erode': [
                { designation: 'District Collector', name: 'Shri Sanjay Gupta (Mock)', contact: 'collector.erode@tn.nic.in', address: 'Collectorate, Erode' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Yadav (Mock)', contact: 'sp.erode@tnpolice.gov.in', address: 'SP Office, Erode' }
            ],
            'tirunelveli': [
                { designation: 'District Collector', name: 'Ms. Kiran Devi (Mock)', contact: 'collector.tirunelveli@tn.nic.in', address: 'Collectorate, Tirunelveli' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Manoj Kumar (Mock)', contact: 'sp.tirunelveli@tnpolice.gov.in', address: 'SP Office, Tirunelveli' }
            ],
            'thanjavur': [
                { designation: 'District Collector', name: 'Mr. Dinesh Kumar (Mock)', contact: 'collector.thanjavur@tn.nic.in', address: 'Collectorate, Thanjavur' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Devi (Mock)', contact: 'sp.thanjavur@tnpolice.gov.in', address: 'SP Office, Thanjavur' }
            ],
            'kanyakumari': [
                { designation: 'District Collector', name: 'Dr. Anand Kumar (Mock)', contact: 'collector.kanyakumari@tn.nic.in', address: 'Collectorate, Kanyakumari' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.kanyakumari@tnpolice.gov.in', address: 'SP Office, Kanyakumari' }
            ]
        }
    };

    // Function to display officer details
    function displayOfficerDetails() {
        console.log(`know-officer-tool.js: displayOfficerDetails called.`);
        
        const selectedState = stateSelect.value;
        const districtName = districtInput.value.trim().toLowerCase(); // Get and clean district input
        const pincode = pincodeInput.value.trim(); // Get pincode input

        officerList.innerHTML = ''; // Clear previous results
        officerResultsSection.classList.remove('hidden'); // Ensure results section is visible

        let officersFound = false;
        let officersToDisplay = [];
        let statePortalLink = '';
        let policePortalLink = '';
        let revenuePortalLink = '';
        let generalHelpPortalLink = ''; // New: General Helping Portal Link

        if (!selectedState || !districtName) {
            officerList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">Please select a State and enter a District/City to find officer details.</li>`;
            return;
        }

        // Get state-specific portal links
        if (officerData[selectedState]) {
            statePortalLink = officerData[selectedState].state_portal_link || '';
            policePortalLink = officerData[selectedState].police_portal_link || '';
            revenuePortalLink = officerData[selectedState].revenue_portal_link || '';
            generalHelpPortalLink = officerData[selectedState].general_help_portal_link || ''; // Get General Helping Portal Link
            // Removed healthPortalLink, pwdPortalLink, ruralDevPortalLink, irrigationPortalLink
        }

        // Primary lookup by State and District/City
        if (officerData[selectedState] && officerData[selectedState][districtName]) {
            officersToDisplay = officerData[selectedState][districtName];
            officersFound = true;

            // If pincode is provided, try to filter further (illustrative)
            if (pincode) {
                const filteredByPincode = officersToDisplay.filter(officer => officer.pincode === pincode);
                if (filteredByPincode.length > 0) {
                    officersToDisplay = filteredByPincode;
                } else {
                    // If no officers match the pincode in the given district,
                    // still show district-level officers but add a note.
                    const noPincodeMatchNote = document.createElement('li');
                    noPincodeMatchNote.classList.add('bg-orange-50', 'p-4', 'rounded-lg', 'mb-2', 'text-base', 'leading-relaxed', 'text-orange-800');
                    noPincodeMatchNote.innerHTML = `**Note:** No officers found matching pincode ${pincode} in ${districtName}. Displaying general officers for ${districtName}.`;
                    officerList.appendChild(noPincodeMatchNote);
                }
            }
        } 
        
        if (officersToDisplay.length > 0) {
            officersToDisplay.forEach(officer => {
                const li = document.createElement('li');
                li.classList.add('bg-green-50', 'p-4', 'rounded-lg', 'mb-2', 'text-base', 'leading-relaxed', 'text-green-800');
                li.innerHTML = `
                    <strong>Designation:</strong> ${officer.designation}<br>
                    <strong>Name:</strong> ${officer.name}<br>
                    <strong>Contact:</strong> <a href="mailto:${officer.contact}" class="text-blue-700 hover:underline">${officer.contact}</a><br>
                    <strong>Office Address:</strong> ${officer.address}
                    ${officer.pincode ? `<br><strong>Pincode:</strong> ${officer.pincode}` : ''}
                `;
                officerList.appendChild(li);
            });
            officersFound = true; // Ensure this is true if any officers are displayed
        }

        if (!officersFound) {
            officerList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">No officer details found for ${districtName}, ${stateSelect.options[stateSelect.selectedIndex].textContent}${pincode ? ` (Pincode: ${pincode})` : ''}. Please check the spelling or try another location.</li>`;
        }

        // Add a general note about data accuracy and SEO focus, including official links
        const dataNote = document.createElement('li');
        dataNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mb-2', 'text-sm', 'leading-relaxed', 'text-blue-800', 'mt-4');
        dataNote.innerHTML = `
            **Important Note:** The officer details provided are for illustrative purposes based on sample data. For official and up-to-date information, please refer to the respective State Government's official websites or contact the relevant departments directly.
            <br><br>
            **Official Government Portals for ${stateSelect.options[stateSelect.selectedIndex].textContent}:**
            <ul>
                ${statePortalLink ? `<li><a href="${statePortalLink}" target="_blank" class="text-blue-700 hover:underline">State Government Portal</a></li>` : ''}
                ${policePortalLink ? `<li><a href="${policePortalLink}" target="_blank" class="text-blue-700 hover:underline">State Police Department</a></li>` : ''}
                ${revenuePortalLink ? `<li><a href="${revenuePortalLink}" target="_blank" class="text-blue-700 hover:underline">State Revenue/Land Records Portal</a></li>` : ''}
                ${generalHelpPortalLink ? `<li><a href="${generalHelpPortalLink}" target="_blank" class="text-blue-700 hover:underline">General Citizen Help Portal</a></li>` : ''}
                <li>For specific departmental (e.g., Health, PWD, Rural Development, Irrigation, Electricity, Water Supply) or local body (e.g., Municipal Corporation, Zilla Parishad) officer details, please visit their respective official websites or contact their main offices.</li>
            </ul>
            <br>
            **SEO & Real-World Impact:** To truly "create a stir" on Google and provide the most valuable resource, this tool would need:
            <ul>
                <li>**Real-time, comprehensive data** from official government APIs or regularly updated databases.</li>
                <li>**High accuracy and authority** verified by legal/government experts.</li>
                <li>**Extensive coverage** of all districts, sub-districts, and relevant officer types (e.g., BDO, Tehsildar, AE, JE, Police Station SHOs, etc.) with their current contact details.</li>
                <li>**Superior User Experience (UX)** and fast loading times.</li>
                <li>**Strong backlink profile** from reputable sources.</li>
                <li>**Continuous content updates** to reflect changes in officer postings and contact information.</li>
            </ul>
            Currently, this tool serves as a functional demonstration of how such a service *could* work.
        `;
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
