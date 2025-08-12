document.addEventListener('DOMContentLoaded', function() {
    console.log("know-officer-tool.js: DOM content loaded. Initializing local officer tool script.");

    // Getting references to the HTML elements
    const findOfficerBtn = document.getElementById('find-officer-btn');
    const stateSelect = document.getElementById('state-select');
    const districtInput = document.getElementById('district-input');
    const pincodeInput = document.getElementById('pincode-input'); // Pincode Input
    const officerResultsSection = document.getElementById('officer-results-section');
    const officerList = document.getElementById('officer-list');

    // Check if essential elements are found
    if (!findOfficerBtn) console.error("know-officer-tool.js Error: 'find-officer-btn' element not found.");
    if (!stateSelect) console.error("know-officer-tool.js Error: 'state-select' element not found.");
    if (!districtInput) console.error("know-officer-tool.js Error: 'district-input' element not found.");
    if (!pincodeInput) console.error("know-officer-tool.js Error: 'pincode-input' element not found.");
    if (!officerResultsSection) console.error("know-officer-tool.js Error: 'officer-results-section' not found. This is crucial for displaying results.");
    if (!officerList) console.error("know-officer-tool.js Error: 'officer-list' not found.");

    // Sample Data for Local Officers (Illustrative - Real data needs external API/database)
    // This data is expanded to include more states and districts for demonstration.
    // Added state_portal_link, police_portal_link, revenue_portal_link, health_portal_link, pwd_portal_link, rural_dev_portal_link for each state.
    const officerData = {
        'uttar-pradesh': {
            state_portal_link: 'https://up.gov.in/',
            police_portal_link: 'https://uppolice.gov.in/',
            revenue_portal_link: 'https://bhulekh.up.nic.in/',
            health_portal_link: 'https://uphealth.up.nic.in/',
            pwd_portal_link: 'https://uppwd.gov.in/',
            rural_dev_portal_link: 'https://rural.up.nic.in/',
            'lucknow': [
                { designation: 'District Magistrate (DM)', name: 'Shri Surya Pratap Singh (Mock)', contact: 'dm.lko@up.gov.in', address: 'DM Office, Collectorate, Lucknow', pincode: '226001' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Smt. Ritu Sharma (Mock)', contact: 'spcity.lko@uppolice.gov.in', address: 'SP City Office, Lalbagh, Lucknow', pincode: '226001' },
                { designation: 'Municipal Commissioner', name: 'Dr. Alok Kumar (Mock)', contact: 'commissioner.lmc@nic.in', address: 'Nagar Nigam Office, Lalbagh, Lucknow', pincode: '226001' },
                { designation: 'Chief Development Officer (CDO)', name: 'Shri Vikas Gupta (Mock)', contact: 'cdo.lko@up.gov.in', address: 'CDO Office, Lucknow', pincode: '226001' },
                { designation: 'Assistant Engineer (AE) - PWD', name: 'Er. Rajesh Kumar (Mock)', contact: 'ae.pwd.lko@up.gov.in', address: 'PWD Office, Lucknow', pincode: '226001' },
                { designation: 'Junior Engineer (JE) - Jal Nigam', name: 'Er. Suman Devi (Mock)', contact: 'je.jalnigam.lko@up.gov.in', address: 'Jal Nigam Office, Lucknow', pincode: '226001' }
            ],
            'kanpur': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Vivek Gupta (Mock)', contact: 'dm.knp@up.gov.in', address: 'DM Office, Collectorate, Kanpur', pincode: '208001' },
                { designation: 'Superintendent of Police (SP) - Rural', name: 'Shri Anil Verma (Mock)', contact: 'sprural.knp@uppolice.gov.in', address: 'SP Rural Office, Kanpur', pincode: '208001' },
                { designation: 'Chief Medical Officer (CMO)', name: 'Dr. Neha Sharma (Mock)', contact: 'cmo.knp@up.gov.in', address: 'CMO Office, Kanpur', pincode: '208001' },
                { designation: 'Block Development Officer (BDO) - Kalyanpur', name: 'Mr. Alok Singh (Mock)', contact: 'bdo.kalyanpur@up.gov.in', address: 'BDO Office, Kalyanpur, Kanpur', pincode: '208017' }
            ],
            'agra': [
                { designation: 'District Magistrate (DM)', name: 'Shri Manoj Kumar (Mock)', contact: 'dm.agra@up.gov.in', address: 'DM Office, Collectorate, Agra', pincode: '282001' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Smt. Priya Singh (Mock)', contact: 'ssp.agra@uppolice.gov.in', address: 'SSP Office, Agra', pincode: '282001' },
                { designation: 'Tehsildar - Sadar', name: 'Mr. Ramesh Kumar (Mock)', contact: 'tehsildar.sadar.agra@up.gov.in', address: 'Tehsil Office, Sadar, Agra', pincode: '282001' },
                { designation: 'Assistant Engineer (AE) - Jal Nigam', name: 'Er. Alok Verma (Mock)', contact: 'ae.jalnigam.agra@up.gov.in', address: 'Jal Nigam Office, Agra', pincode: '282001' }
            ],
            'varanasi': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Ramesh Chandra (Mock)', contact: 'dm.vns@up.gov.in', address: 'DM Office, Collectorate, Varanasi', pincode: '221001' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Shri Vivek Yadav (Mock)', contact: 'spcity.vns@uppolice.gov.in', address: 'SP City Office, Varanasi', pincode: '221001' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Ritu Singh (Mock)', contact: 'je.pwd.vns@up.gov.in', address: 'PWD Office, Varanasi', pincode: '221001' },
                { designation: 'Chief Medical Officer (CMO)', name: 'Dr. Suman Devi (Mock)', contact: 'cmo.vns@up.gov.in', address: 'CMO Office, Varanasi', pincode: '221001' }
            ],
            'prayagraj': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Anjali Devi (Mock)', contact: 'dm.pry@up.gov.in', address: 'DM Office, Prayagraj', pincode: '211001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Pawan Gupta (Mock)', contact: 'sp.pry@uppolice.gov.in', address: 'SP Office, Prayagraj', pincode: '211001' },
                { designation: 'Sub-Divisional Magistrate (SDM) - Sadar', name: 'Mr. Rajesh Dixit (Mock)', contact: 'sdm.sadar.pry@up.gov.in', address: 'SDM Office, Sadar, Prayagraj', pincode: '211001' }
            ],
            'meerut': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Saurabh Sharma (Mock)', contact: 'dm.mrt@up.gov.in', address: 'DM Office, Meerut', pincode: '250001' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Smt. Neha Verma (Mock)', contact: 'ssp.mrt@uppolice.gov.in', address: 'SSP Office, Meerut', pincode: '250001' },
                { designation: 'Block Development Officer (BDO) - Sardhana', name: 'Ms. Pooja Singh (Mock)', contact: 'bdo.sardhana@up.gov.in', address: 'BDO Office, Sardhana, Meerut', pincode: '250342' }
            ],
            'ghaziabad': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Vivek Jain (Mock)', contact: 'dm.gzb@up.gov.in', address: 'DM Office, Ghaziabad', pincode: '201001' },
                { designation: 'Senior Superintendent of Police (SSP)', name: 'Shri Amit Singh (Mock)', contact: 'ssp.gzb@uppolice.gov.in', address: 'SSP Office, Ghaziabad', pincode: '201001' },
                { designation: 'Municipal Commissioner', name: 'Mr. Rakesh Kumar (Mock)', contact: 'commissioner.gzb@nic.in', address: 'Nagar Nigam Office, Ghaziabad', pincode: '201001' }
            ],
            'bareilly': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Ritu Agrawal (Mock)', contact: 'dm.brly@up.gov.in', address: 'DM Office, Bareilly', pincode: '243001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Kumar Gaurav (Mock)', contact: 'sp.brly@uppolice.gov.in', address: 'SP Office, Bareilly', pincode: '243001' },
                { designation: 'Tehsildar - Bareilly', name: 'Mr. Vivek Sharma (Mock)', contact: 'tehsildar.brly@up.gov.in', address: 'Tehsil Office, Bareilly', pincode: '243001' }
            ],
            'aligarh': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Dinesh Sharma (Mock)', contact: 'dm.aligarh@up.gov.in', address: 'DM Office, Aligarh', pincode: '202001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Yadav (Mock)', contact: 'sp.aligarh@uppolice.gov.in', address: 'SP Office, Aligarh', pincode: '202001' },
                { designation: 'Assistant Engineer (AE) - Electricity', name: 'Er. Alok Singh (Mock)', contact: 'ae.elect.aligarh@up.gov.in', address: 'Electricity Board, Aligarh', pincode: '202001' }
            ],
            'gorakhpur': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Sanjay Singh (Mock)', contact: 'dm.gkp@up.gov.in', address: 'DM Office, Gorakhpur', pincode: '273001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rahul Kumar (Mock)', contact: 'sp.gkp@uppolice.gov.in', address: 'SP Office, Gorakhpur', pincode: '273001' },
                { designation: 'Junior Engineer (JE) - Rural Engineering', name: 'Er. Suman Gupta (Mock)', contact: 'je.re.gkp@up.gov.in', address: 'Rural Engineering Office, Gorakhpur', pincode: '273001' }
            ]
        },
        'maharashtra': {
            state_portal_link: 'https://www.maharashtra.gov.in/',
            police_portal_link: 'https://mahapolice.gov.in/',
            revenue_portal_link: 'https://mahabhulekh.maharashtra.gov.in/',
            health_portal_link: 'https://arogya.maharashtra.gov.in/',
            pwd_portal_link: 'https://mahapwd.com/',
            rural_dev_portal_link: 'https://rdd.maharashtra.gov.in/',
            'mumbai': [
                { designation: 'District Collector', name: 'Smt. Priya Deshmukh (Mock)', contact: 'collector.mumbai@nic.in', address: 'Collector Office, Bandra, Mumbai', pincode: '400051' },
                { designation: 'Commissioner of Police', name: 'Shri Rajesh Patil (Mock)', contact: 'cp.mumbai@mahapolice.gov.in', address: 'Police Headquarters, Crawford Market, Mumbai', pincode: '400001' },
                { designation: 'Municipal Commissioner (BMC)', name: 'Dr. Sanjay Raut (Mock)', contact: 'mc.bmc@nic.in', address: 'BMC Headquarters, Fort, Mumbai', pincode: '400001' },
                { designation: 'Assistant Engineer (AE) - BMC Water Dept', name: 'Er. Ashok Sharma (Mock)', contact: 'ae.water.mumbai@bmc.gov.in', address: 'BMC Water Dept, Mumbai', pincode: '400001' }
            ],
            'pune': [
                { designation: 'District Collector', name: 'Shri Rohan Joshi (Mock)', contact: 'collector.pune@nic.in', address: 'Collector Office, Pune', pincode: '411001' },
                { designation: 'Commissioner of Police', name: 'Smt. Kavita Sharma (Mock)', contact: 'cp.pune@mahapolice.gov.in', address: 'Police Commissionerate, Pune', pincode: '411001' },
                { designation: 'CEO, Zilla Parishad', name: 'Mr. Anand Kulkarni (Mock)', contact: 'ceo.zp.pune@mahapanchayat.gov.in', address: 'Zilla Parishad Office, Pune', pincode: '411001' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Smita Patil (Mock)', contact: 'je.pwd.pune@mahapwd.gov.in', address: 'PWD Office, Pune', pincode: '411001' }
            ],
            'nagpur': [
                { designation: 'District Collector', name: 'Mr. Vikas Agrawal (Mock)', contact: 'collector.nagpur@nic.in', address: 'Collector Office, Nagpur', pincode: '440001' },
                { designation: 'Commissioner of Police', name: 'Smt. Smita Rao (Mock)', contact: 'cp.nagpur@mahapolice.gov.in', address: 'Police Commissionerate, Nagpur', pincode: '440001' },
                { designation: 'Assistant Engineer (AE) - MSEDCL', name: 'Er. Rohit Deshmukh (Mock)', contact: 'ae.msedcl.nagpur@mahapower.gov.in', address: 'MSEDCL Office, Nagpur', pincode: '440001' }
            ],
            'nashik': [
                { designation: 'District Collector', name: 'Dr. Rajeshwari Iyer (Mock)', contact: 'collector.nashik@nic.in', address: 'Collector Office, Nashik', pincode: '422001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ashok Kumar (Mock)', contact: 'sp.nashik@mahapolice.gov.in', address: 'SP Office, Nashik', pincode: '422001' },
                { designation: 'Junior Engineer (JE) - Water Supply', name: 'Er. Pooja Sharma (Mock)', contact: 'je.water.nashik@mahaws.gov.in', address: 'Water Supply Dept, Nashik', pincode: '422001' }
            ],
            'aurangabad': [
                { designation: 'District Collector', name: 'Shri Anand Deshpande (Mock)', contact: 'collector.aurangabad@nic.in', address: 'Collector Office, Aurangabad', pincode: '431001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Kadam (Mock)', contact: 'sp.aurangabad@mahapolice.gov.in', address: 'SP Office, Aurangabad', pincode: '431001' }
            ],
            'solapur': [
                { designation: 'District Collector', name: 'Mr. Vijay Patil (Mock)', contact: 'collector.solapur@nic.in', address: 'Collector Office, Solapur', pincode: '413001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ganesh Jadhav (Mock)', contact: 'sp.solapur@mahapolice.gov.in', address: 'SP Office, Solapur', pincode: '413001' }
            ],
            'kolhapur': [
                { designation: 'District Collector', name: 'Ms. Smita More (Mock)', contact: 'collector.kolhapur@nic.in', address: 'Collector Office, Kolhapur', pincode: '416001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rohan Gaikwad (Mock)', contact: 'sp.kolhapur@mahapolice.gov.in', address: 'SP Office, Kolhapur', pincode: '416001' }
            ],
            'amravati': [
                { designation: 'District Collector', name: 'Mr. Sachin Joshi (Mock)', contact: 'collector.amravati@nic.in', address: 'Collector Office, Amravati', pincode: '444601' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Anjali Raut (Mock)', contact: 'sp.amravati@mahapolice.gov.in', address: 'SP Office, Amravati', pincode: '444601' }
            ],
            'latur': [
                { designation: 'District Collector', name: 'Dr. Vivek Kulkarni (Mock)', contact: 'collector.latur@nic.in', address: 'Collector Office, Latur', pincode: '413512' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Prakash Singh (Mock)', contact: 'sp.latur@mahapolice.gov.in', address: 'SP Office, Latur', pincode: '413512' }
            ],
            'dhule': [
                { designation: 'District Collector', name: 'Ms. Priya Sharma (Mock)', contact: 'collector.dhule@nic.in', address: 'Collector Office, Dhule', pincode: '424001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ajay Patil (Mock)', contact: 'sp.dhule@mahapolice.gov.in', address: 'SP Office, Dhule', pincode: '424001' }
            ]
        },
        'delhi': {
            state_portal_link: 'https://delhi.gov.in/',
            police_portal_link: 'https://delhipolice.gov.in/',
            health_portal_link: 'https://health.delhigovt.nic.in/',
            pwd_portal_link: 'https://pwddelhi.gov.in/',
            'central delhi': [
                { designation: 'District Magistrate (Central)', name: 'Ms. Anjali Singh (Mock)', contact: 'dm.central@nic.in', address: 'DM Office, Daryaganj, Delhi', pincode: '110002' },
                { designation: 'Deputy Commissioner of Police (Central)', name: 'Mr. Vikram Kumar (Mock)', contact: 'dcp.central@delhipolice.gov.in', address: 'DCP Office, Kamla Market, Delhi', pincode: '110006' }
            ],
            'new delhi': [
                { designation: 'District Magistrate (New Delhi)', name: 'Mr. Vivek Sharma (Mock)', contact: 'dm.nd@nic.in', address: 'DM Office, Jamnagar House, New Delhi', pincode: '110011' },
                { designation: 'Deputy Commissioner of Police (New Delhi)', name: 'Ms. Pooja Gupta (Mock)', contact: 'dcp.nd@delhipolice.gov.in', address: 'DCP Office, Parliament Street, New Delhi', pincode: '110001' }
            ],
            'north delhi': [
                { designation: 'District Magistrate (North)', name: 'Smt. Divya Sharma (Mock)', contact: 'dm.north@nic.in', address: 'DM Office, Alipur, Delhi', pincode: '110036' },
                { designation: 'Deputy Commissioner of Police (North)', name: 'Shri Rahul Verma (Mock)', contact: 'dcp.north@delhipolice.gov.in', address: 'DCP Office, Civil Lines, Delhi', pincode: '110054' },
                { designation: 'Assistant Engineer (AE) - MCD', name: 'Er. Suresh Kumar (Mock)', contact: 'ae.mcd.north@delhi.gov.in', address: 'MCD Office, North Delhi', pincode: '110007' }
            ],
            'south delhi': [
                { designation: 'District Magistrate (South)', name: 'Mr. Sanjay Gupta (Mock)', contact: 'dm.south@nic.in', address: 'DM Office, Saket, Delhi', pincode: '110017' },
                { designation: 'Deputy Commissioner of Police (South)', name: 'Smt. Kiran Devi (Mock)', contact: 'dcp.south@delhipolice.gov.in', address: 'DCP Office, Hauz Khas, Delhi', pincode: '110016' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Neha Singh (Mock)', contact: 'je.pwd.south@delhi.gov.in', address: 'PWD Office, South Delhi', pincode: '110030' }
            ],
            'east delhi': [
                { designation: 'District Magistrate (East)', name: 'Ms. Ritu Singh (Mock)', contact: 'dm.east@nic.in', address: 'DM Office, Preet Vihar, Delhi', pincode: '110092' },
                { designation: 'Deputy Commissioner of Police (East)', name: 'Shri Vineet Kumar (Mock)', contact: 'dcp.east@delhipolice.gov.in', address: 'DCP Office, Mandawali, Delhi', pincode: '110092' }
            ],
            'west delhi': [
                { designation: 'District Magistrate (West)', name: 'Mr. Alok Verma (Mock)', contact: 'dm.west@nic.in', address: 'DM Office, Rajouri Garden, Delhi', pincode: '110027' },
                { designation: 'Deputy Commissioner of Police (West)', name: 'Smt. Pooja Rani (Mock)', contact: 'dcp.west@delhipolice.gov.in', address: 'DCP Office, Janakpuri, Delhi', pincode: '110058' }
            ],
            'north west delhi': [
                { designation: 'District Magistrate (North West)', name: 'Shri Rajesh Kumar (Mock)', contact: 'dm.nw@nic.in', address: 'DM Office, Kanjhawala, Delhi', pincode: '110081' },
                { designation: 'Deputy Commissioner of Police (North West)', name: 'Mr. Suresh Yadav (Mock)', contact: 'dcp.nw@delhipolice.gov.in', address: 'DCP Office, Rohini, Delhi', pincode: '110085' }
            ],
            'south west delhi': [
                { designation: 'District Magistrate (South West)', name: 'Ms. Kiran Gupta (Mock)', contact: 'dm.sw@nic.in', address: 'DM Office, Kapashera, Delhi', pincode: '110037' },
                { designation: 'Deputy Commissioner of Police (South West)', name: 'Shri Manoj Sharma (Mock)', contact: 'dcp.sw@delhipolice.gov.in', address: 'DCP Office, Dwarka, Delhi', pincode: '110075' }
            ],
            'north east delhi': [
                { designation: 'District Magistrate (North East)', name: 'Mr. Vivek Singh (Mock)', contact: 'dm.ne@nic.in', address: 'DM Office, Seelampur, Delhi', pincode: '110053' },
                { designation: 'Deputy Commissioner of Police (North East)', name: 'Smt. Rekha Devi (Mock)', contact: 'dcp.ne@delhipolice.gov.in', address: 'DCP Office, Bhajanpura, Delhi', pincode: '110053' }
            ],
            'shahdara': [
                { designation: 'District Magistrate (Shahdara)', name: 'Shri Amit Kumar (Mock)', contact: 'dm.shahdara@nic.in', address: 'DM Office, Nand Nagri, Delhi', pincode: '110093' },
                { designation: 'Deputy Commissioner of Police (Shahdara)', name: 'Mr. Rahul Gupta (Mock)', contact: 'dcp.shahdara@delhipolice.gov.in', address: 'DCP Office, Vivek Vihar, Delhi', pincode: '110095' }
            ]
        },
        'bihar': {
            state_portal_link: 'https://state.bihar.gov.in/',
            police_portal_link: 'https://biharpolice.bih.nic.in/',
            health_portal_link: 'https://health.bih.nic.in/',
            rural_dev_portal_link: 'https://rdd.bih.nic.in/',
            'patna': [
                { designation: 'District Magistrate (DM)', name: 'Shri Alok Kumar (Mock)', contact: 'dm.patna@bih.nic.in', address: 'DM Office, Collectorate, Patna', pincode: '800001' },
                { designation: 'Superintendent of Police (SP) - City', name: 'Smt. Preeti Devi (Mock)', contact: 'spcity.patna@bihpolice.gov.in', address: 'SP City Office, Patna', pincode: '800001' },
                { designation: 'Assistant Engineer (AE) - Rural Works', name: 'Er. Manoj Yadav (Mock)', contact: 'ae.rwd.patna@bih.nic.in', address: 'Rural Works Dept, Patna', pincode: '800001' }
            ],
            'gaya': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Rakesh Singh (Mock)', contact: 'dm.gaya@bih.nic.in', address: 'DM Office, Collectorate, Gaya', pincode: '823001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Anand Kumar (Mock)', contact: 'sp.gaya@bihpolice.gov.in', address: 'SP Office, Gaya', pincode: '823001' },
                { designation: 'Junior Engineer (JE) - Electricity', name: 'Er. Suman Kumari (Mock)', contact: 'je.elect.gaya@bih.nic.in', address: 'Electricity Board, Gaya', pincode: '823001' }
            ],
            'muzaffarpur': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Kavita Dubey (Mock)', contact: 'dm.muzaffarpur@bih.nic.in', address: 'DM Office, Muzaffarpur', pincode: '842001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Verma (Mock)', contact: 'sp.muzaffarpur@bihpolice.gov.in', address: 'SP Office, Muzaffarpur', pincode: '842001' }
            ],
            'bhagalpur': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sanjeev Kumar (Mock)', contact: 'dm.bhagalpur@bih.nic.in', address: 'DM Office, Bhagalpur', pincode: '812001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Singh (Mock)', contact: 'sp.bhagalpur@bihpolice.gov.in', address: 'SP Office, Bhagalpur', pincode: '812001' }
            ],
            'darbhanga': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Alok Kumar (Mock)', contact: 'dm.darbhanga@bih.nic.in', address: 'DM Office, Darbhanga', pincode: '846004' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.darbhanga@bihpolice.gov.in', address: 'SP Office, Darbhanga', pincode: '846004' }
            ],
            'nalanda': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Ritu Kumari (Mock)', contact: 'dm.nalanda@bih.nic.in', address: 'DM Office, Nalanda', pincode: '803101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Amit Gupta (Mock)', contact: 'sp.nalanda@bihpolice.gov.in', address: 'SP Office, Nalanda', pincode: '803101' }
            ],
            'purnia': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sanjay Kumar (Mock)', contact: 'dm.purnia@bih.nic.in', address: 'DM Office, Purnia', pincode: '854301' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Kiran Devi (Mock)', contact: 'sp.purnia@bihpolice.gov.in', address: 'SP Office, Purnia', pincode: '854301' }
            ],
            'rohtas': [
                { designation: 'District Magistrate (DM)', name: 'Shri Prakash Singh (Mock)', contact: 'dm.rohtas@bih.nic.in', address: 'DM Office, Rohtas', pincode: '821115' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Sharma (Mock)', contact: 'sp.rohtas@bihpolice.gov.in', address: 'SP Office, Rohtas', pincode: '821115' }
            ],
            'saran': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Pooja Kumari (Mock)', contact: 'dm.saran@bih.nic.in', address: 'DM Office, Saran', pincode: '841221' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Kumar (Mock)', contact: 'sp.saran@bihpolice.gov.in', address: 'SP Office, Saran', pincode: '841221' }
            ],
            'east champaran': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Anand Prakash (Mock)', contact: 'dm.eastchamparan@bih.nic.in', address: 'DM Office, East Champaran', pincode: '845401' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ritu Singh (Mock)', contact: 'sp.eastchamparan@bihpolice.gov.in', address: 'SP Office, East Champaran', pincode: '845401' }
            ]
        },
        'west-bengal': {
            state_portal_link: 'https://wb.gov.in/',
            police_portal_link: 'https://www.westbengalpolice.gov.in/',
            health_portal_link: 'https://www.wbhealth.gov.in/',
            pwd_portal_link: 'https://wbpwd.gov.in/',
            rural_dev_portal_link: 'https://wbdpr.gov.in/',
            'kolkata': [
                { designation: 'District Magistrate (DM)', name: 'Smt. Indrani Bose (Mock)', contact: 'dm.kol@wb.gov.in', address: 'DM Office, Alipore, Kolkata', pincode: '700027' },
                { designation: 'Commissioner of Police', name: 'Shri Sourav Das (Mock)', contact: 'cp.kol@kolkatapolice.gov.in', address: 'Police Headquarters, Lalbazar, Kolkata', pincode: '700001' },
                { designation: 'Assistant Engineer (AE) - KMC', name: 'Er. Debashish Roy (Mock)', contact: 'ae.kmc.kol@wb.gov.in', address: 'KMC Office, Kolkata', pincode: '700001' }
            ],
            'howrah': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Anirban Ghosh (Mock)', contact: 'dm.howrah@wb.gov.in', address: 'DM Office, Howrah', pincode: '711101' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rupa Devi (Mock)', contact: 'sp.howrah@wbp.gov.in', address: 'SP Office, Howrah', pincode: '711101' }
            ],
            'darjeeling': [
                { designation: 'District Magistrate (DM)', name: 'Dr. Alok Sen (Mock)', contact: 'dm.darjeeling@wb.gov.in', address: 'DM Office, Darjeeling', pincode: '734101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Bimal Gurung (Mock)', contact: 'sp.darjeeling@wbp.gov.in', address: 'SP Office, Darjeeling', pincode: '734101' }
            ],
            'bardhaman': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Priyanka Roy (Mock)', contact: 'dm.bardhaman@wb.gov.in', address: 'DM Office, Bardhaman', pincode: '713101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Subrata Das (Mock)', contact: 'sp.bardhaman@wbp.gov.in', address: 'SP Office, Bardhaman', pincode: '713101' }
            ],
            'n24parganas': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sayan Mitra (Mock)', contact: 'dm.n24p@wb.gov.in', address: 'DM Office, North 24 Parganas', pincode: '700124' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Ghosh (Mock)', contact: 'sp.n24p@wbp.gov.in', address: 'SP Office, North 24 Parganas', pincode: '700124' }
            ],
            'south 24 parganas': [
                { designation: 'District Magistrate (DM)', name: 'Shri Ayan Chatterjee (Mock)', contact: 'dm.s24p@wb.gov.in', address: 'DM Office, South 24 Parganas', pincode: '700141' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Debabrata Sen (Mock)', contact: 'sp.s24p@wbp.gov.in', address: 'SP Office, South 24 Parganas', pincode: '700141' }
            ],
            'hooghly': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Priti Sarkar (Mock)', contact: 'dm.hooghly@wb.gov.in', address: 'DM Office, Hooghly', pincode: '712101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Biswajit Das (Mock)', contact: 'sp.hooghly@wbp.gov.in', address: 'SP Office, Hooghly', pincode: '712101' }
            ],
            'paschim medinipur': [
                { designation: 'District Magistrate (DM)', name: 'Mr. Sourav Roy (Mock)', contact: 'dm.paschim@wb.gov.in', address: 'DM Office, Paschim Medinipur', pincode: '721101' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ananya Dutta (Mock)', contact: 'sp.paschim@wbp.gov.in', address: 'SP Office, Paschim Medinipur', pincode: '721101' }
            ],
            'purba medinipur': [
                { designation: 'District Magistrate (DM)', name: 'Shri Rakesh Majumdar (Mock)', contact: 'dm.purba@wb.gov.in', address: 'DM Office, Purba Medinipur', pincode: '721601' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Subhankar Ghosh (Mock)', contact: 'sp.purba@wbp.gov.in', address: 'SP Office, Purba Medinipur', pincode: '721601' }
            ],
            'malda': [
                { designation: 'District Magistrate (DM)', name: 'Ms. Indrani Sen (Mock)', contact: 'dm.malda@wb.gov.in', address: 'DM Office, Malda', pincode: '732101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Arindam Pal (Mock)', contact: 'sp.malda@wbp.gov.in', address: 'SP Office, Malda', pincode: '732101' }
            ]
        },
        'madhya-pradesh': {
            state_portal_link: 'https://mp.gov.in/',
            police_portal_link: 'https://mppolice.gov.in/',
            health_portal_link: 'https://health.mp.gov.in/',
            pwd_portal_link: 'https://mppwd.gov.in/',
            rural_dev_portal_link: 'https://mprural.mp.gov.in/',
            'bhopal': [
                { designation: 'District Collector', name: 'Ms. Surbhi Jain (Mock)', contact: 'collector.bhopal@mp.gov.in', address: 'Collectorate, Bhopal', pincode: '462001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.bhopal@mppolice.gov.in', address: 'SP Office, Bhopal', pincode: '462001' },
                { designation: 'Junior Engineer (JE) - PWD', name: 'Er. Alok Verma (Mock)', contact: 'je.pwd.bhopal@mp.gov.in', address: 'PWD Office, Bhopal', pincode: '462001' }
            ],
            'indore': [
                { designation: 'District Collector', name: 'Shri Rajesh Kumar (Mock)', contact: 'collector.indore@mp.gov.in', address: 'Collectorate, Indore', pincode: '452001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Meena Singh (Mock)', contact: 'sp.indore@mppolice.gov.in', address: 'SP Office, Indore', pincode: '452001' },
                { designation: 'Assistant Engineer (AE) - Electricity', name: 'Er. Rakesh Gupta (Mock)', contact: 'ae.elect.indore@mp.gov.in', address: 'Electricity Board, Indore', pincode: '452001' }
            ],
            'gwalior': [
                { designation: 'District Collector', name: 'Mr. Anuj Pathak (Mock)', contact: 'collector.gwalior@mp.gov.in', address: 'Collectorate, Gwalior', pincode: '474001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Ruchi Sharma (Mock)', contact: 'sp.gwalior@mppolice.gov.in', address: 'SP Office, Gwalior', pincode: '474001' }
            ],
            'jabalpur': [
                { designation: 'District Collector', name: 'Dr. Priyanka Gupta (Mock)', contact: 'collector.jabalpur@mp.gov.in', address: 'Collectorate, Jabalpur', pincode: '482001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vikram Singh (Mock)', contact: 'sp.jabalpur@mppolice.gov.in', address: 'SP Office, Jabalpur', pincode: '482001' }
            ],
            'ujjain': [
                { designation: 'District Collector', name: 'Ms. Pooja Verma (Mock)', contact: 'collector.ujjain@mp.gov.in', address: 'Collectorate, Ujjain', pincode: '456001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Kumar (Mock)', contact: 'sp.ujjain@mppolice.gov.in', address: 'SP Office, Ujjain', pincode: '456001' }
            ],
            'sagar': [
                { designation: 'District Collector', name: 'Mr. Alok Gupta (Mock)', contact: 'collector.sagar@mp.gov.in', address: 'Collectorate, Sagar', pincode: '470001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Divya Singh (Mock)', contact: 'sp.sagar@mppolice.gov.in', address: 'SP Office, Sagar', pincode: '470001' }
            ],
            'rewa': [
                { designation: 'District Collector', name: 'Shri Manoj Patel (Mock)', contact: 'collector.rewa@mp.gov.in', address: 'Collectorate, Rewa', pincode: '486001' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Vikas Sharma (Mock)', contact: 'sp.rewa@mppolice.gov.in', address: 'SP Office, Rewa', pincode: '486001' }
            ],
            'satna': [
                { designation: 'District Collector', name: 'Ms. Ritu Agrawal (Mock)', contact: 'collector.satna@mp.gov.in', address: 'Collectorate, Satna', pincode: '485001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Kumar Gaurav (Mock)', contact: 'sp.satna@mppolice.gov.in', address: 'SP Office, Satna', pincode: '485001' }
            ],
            'chhindwara': [
                { designation: 'District Collector', name: 'Mr. Dinesh Sharma (Mock)', contact: 'collector.chhindwara@mp.gov.in', address: 'Collectorate, Chhindwara', pincode: '480001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Yadav (Mock)', contact: 'sp.chhindwara@mppolice.gov.in', address: 'SP Office, Chhindwara', pincode: '480001' }
            ],
            'burhanpur': [
                { designation: 'District Collector', name: 'Dr. Sanjay Singh (Mock)', contact: 'collector.burhanpur@mp.gov.in', address: 'Collectorate, Burhanpur', pincode: '450331' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rahul Kumar (Mock)', contact: 'sp.burhanpur@mppolice.gov.in', address: 'SP Office, Burhanpur', pincode: '450331' }
            ]
        },
        'rajasthan': {
            state_portal_link: 'https://rajasthan.gov.in/',
            police_portal_link: 'https://police.rajasthan.gov.in/',
            revenue_portal_link: 'https://land.rajasthan.gov.in/',
            health_portal_link: 'https://rajswasthya.nic.in/',
            pwd_portal_link: 'https://pwd.rajasthan.gov.in/',
            rural_dev_portal_link: 'https://rdpr.rajasthan.gov.in/',
            'jaipur': [
                { designation: 'District Collector', name: 'Shri Pawan Kumar (Mock)', contact: 'collector.jaipur@raj.nic.in', address: 'Collectorate, Jaipur', pincode: '302001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rina Sharma (Mock)', contact: 'sp.jaipur@rajpolice.gov.in', address: 'SP Office, Jaipur', pincode: '302001' },
                { designation: 'Assistant Engineer (AE) - Water Resources', name: 'Er. Suresh Jain (Mock)', contact: 'ae.water.jaipur@raj.gov.in', address: 'Water Resources Dept, Jaipur', pincode: '302001' }
            ],
            'jodhpur': [
                { designation: 'District Collector', name: 'Dr. Amit Gupta (Mock)', contact: 'collector.jodhpur@raj.nic.in', address: 'Collectorate, Jodhpur', pincode: '342001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Yadav (Mock)', contact: 'sp.jodhpur@rajpolice.gov.in', address: 'SP Office, Jodhpur', pincode: '342001' }
            ],
            'udaipur': [
                { designation: 'District Collector', name: 'Ms. Neha Rathore (Mock)', contact: 'collector.udaipur@raj.nic.in', address: 'Collectorate, Udaipur', pincode: '313001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vijay Singh (Mock)', contact: 'sp.udaipur@rajpolice.gov.in', address: 'SP Office, Udaipur', pincode: '313001' }
            ],
            'kota': [
                { designation: 'District Collector', name: 'Mr. Alok Jain (Mock)', contact: 'collector.kota@raj.nic.in', address: 'Collectorate, Kota', pincode: '324001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Preeti Sharma (Mock)', contact: 'sp.kota@rajpolice.gov.in', address: 'SP Office, Kota', pincode: '324001' }
            ],
            'ajmer': [
                { designation: 'District Collector', name: 'Shri Rajesh Kumar (Mock)', contact: 'collector.ajmer@raj.nic.in', address: 'Collectorate, Ajmer', pincode: '305001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Divya Sharma (Mock)', contact: 'sp.ajmer@rajpolice.gov.in', address: 'SP Office, Ajmer', pincode: '305001' }
            ],
            'bikaner': [
                { designation: 'District Collector', name: 'Mr. Sanjay Gupta (Mock)', contact: 'collector.bikaner@raj.nic.in', address: 'Collectorate, Bikaner', pincode: '334001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rahul Verma (Mock)', contact: 'sp.bikaner@rajpolice.gov.in', address: 'SP Office, Bikaner', pincode: '334001' }
            ],
            'bharatpur': [
                { designation: 'District Collector', name: 'Ms. Kiran Devi (Mock)', contact: 'collector.bharatpur@raj.nic.in', address: 'Collectorate, Bharatpur', pincode: '321001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Manoj Sharma (Mock)', contact: 'sp.bharatpur@rajpolice.gov.in', address: 'SP Office, Bharatpur', pincode: '321001' }
            ],
            'alwar': [
                { designation: 'District Collector', name: 'Mr. Vivek Singh (Mock)', contact: 'collector.alwar@raj.nic.in', address: 'Collectorate, Alwar', pincode: '301001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Rekha Devi (Mock)', contact: 'sp.alwar@rajpolice.gov.in', address: 'SP Office, Alwar', pincode: '301001' }
            ],
            'sikar': [
                { designation: 'District Collector', name: 'Shri Amit Kumar (Mock)', contact: 'collector.sikar@raj.nic.in', address: 'Collectorate, Sikar', pincode: '332001' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Gupta (Mock)', contact: 'sp.sikar@rajpolice.gov.in', address: 'SP Office, Sikar', pincode: '332001' }
            ],
            'pali': [
                { designation: 'District Collector', name: 'Ms. Ritu Singh (Mock)', contact: 'collector.pali@raj.nic.in', address: 'Collectorate, Pali', pincode: '306401' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vineet Kumar (Mock)', contact: 'sp.pali@rajpolice.gov.in', address: 'SP Office, Pali', pincode: '306401' }
            ]
        },
        'gujarat': {
            state_portal_link: 'https://gujarat.gov.in/',
            police_portal_link: 'https://police.gujarat.gov.in/',
            revenue_portal_link: 'https://revenuedepartment.gujarat.gov.in/',
            health_portal_link: 'https://nrhm.gujarat.gov.in/',
            pwd_portal_link: 'https://rnb.gujarat.gov.in/',
            rural_dev_portal_link: 'https://panchayat.gujarat.gov.in/',
            'ahmedabad': [
                { designation: 'District Collector', name: 'Shri Dhruv Patel (Mock)', contact: 'collector.ahmedabad@gujarat.gov.in', address: 'Collector Office, Ahmedabad', pincode: '380001' },
                { designation: 'Commissioner of Police', name: 'Smt. Neha Shah (Mock)', contact: 'cp.ahmedabad@gujaratpolice.gov.in', address: 'Police Commissionerate, Ahmedabad', pincode: '380001' },
                { designation: 'Junior Engineer (JE) - AMC', name: 'Er. Jignesh Patel (Mock)', contact: 'je.amc.ahd@gujarat.gov.in', address: 'AMC Office, Ahmedabad', pincode: '380001' }
            ],
            'surat': [
                { designation: 'District Collector', name: 'Mr. Vijay Desai (Mock)', contact: 'collector.surat@gujarat.gov.in', address: 'Collector Office, Surat', pincode: '395003' },
                { designation: 'Commissioner of Police', name: 'Shri Ramesh Gupta (Mock)', contact: 'cp.surat@gujaratpolice.gov.in', address: 'Police Commissionerate, Surat', pincode: '395003' }
            ],
            'vadodara': [
                { designation: 'District Collector', name: 'Ms. Pooja Mehta (Mock)', contact: 'collector.vadodara@gujarat.gov.in', address: 'Collector Office, Vadodara', pincode: '390001' },
                { designation: 'Commissioner of Police', name: 'Shri Anand Patel (Mock)', contact: 'cp.vadodara@gujaratpolice.gov.in', address: 'Police Commissionerate, Vadodara', pincode: '390001' }
            ],
            'rajkot': [
                { designation: 'District Collector', name: 'Mr. Sanjay Kumar (Mock)', contact: 'collector.rajkot@gujarat.gov.in', address: 'Collector Office, Rajkot', pincode: '360001' },
                { designation: 'Commissioner of Police', name: 'Smt. Kiran Sharma (Mock)', contact: 'cp.rajkot@gujaratpolice.gov.in', address: 'Police Commissionerate, Rajkot', pincode: '360001' }
            ],
            'gandhinagar': [
                { designation: 'District Collector', name: 'Shri Hitesh Shah (Mock)', contact: 'collector.gandhinagar@gujarat.gov.in', address: 'Collector Office, Gandhinagar', pincode: '382010' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Preeti Patel (Mock)', contact: 'sp.gandhinagar@gujaratpolice.gov.in', address: 'SP Office, Gandhinagar', pincode: '382010' }
            ],
            'bhavnagar': [
                { designation: 'District Collector', name: 'Mr. Jignesh Modi (Mock)', contact: 'collector.bhavnagar@gujarat.gov.in', address: 'Collector Office, Bhavnagar', pincode: '364001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Dave (Mock)', contact: 'sp.bhavnagar@gujaratpolice.gov.in', address: 'SP Office, Bhavnagar', pincode: '364001' }
            ],
            'jamnagar': [
                { designation: 'District Collector', name: 'Ms. Pooja Sharma (Mock)', contact: 'collector.jamnagar@gujarat.gov.in', address: 'Collector Office, Jamnagar', pincode: '361001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Anand Gupta (Mock)', contact: 'sp.jamnagar@gujaratpolice.gov.in', address: 'SP Office, Jamnagar', pincode: '361001' }
            ],
            'junagadh': [
                { designation: 'District Collector', name: 'Mr. Sanjay Patel (Mock)', contact: 'collector.junagadh@gujarat.gov.in', address: 'Collector Office, Junagadh', pincode: '362001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Kiran Mehta (Mock)', contact: 'sp.junagadh@gujaratpolice.gov.in', address: 'SP Office, Junagadh', pincode: '362001' }
            ],
            'anand': [
                { designation: 'District Collector', name: 'Shri Vivek Shah (Mock)', contact: 'collector.anand@gujarat.gov.in', address: 'Collector Office, Anand', pincode: '388001' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Patel (Mock)', contact: 'sp.anand@gujaratpolice.gov.in', address: 'SP Office, Anand', pincode: '388001' }
            ],
            'kutch': [
                { designation: 'District Collector', name: 'Ms. Ritu Desai (Mock)', contact: 'collector.kutch@gujarat.gov.in', address: 'Collector Office, Kutch', pincode: '370001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Ashok Sharma (Mock)', contact: 'sp.kutch@gujaratpolice.gov.in', address: 'SP Office, Kutch', pincode: '370001' }
            ]
        },
        'karnataka': {
            state_portal_link: 'https://karnataka.gov.in/',
            police_portal_link: 'https://ksp.gov.in/',
            revenue_portal_link: 'https://landrecords.karnataka.gov.in/',
            health_portal_link: 'https://karunadu.karnataka.gov.in/hfw/Pages/index.aspx',
            pwd_portal_link: 'https://kpwd.karnataka.gov.in/',
            rural_dev_portal_link: 'https://rdpr.karnataka.gov.in/',
            'bengaluru': [
                { designation: 'District Commissioner', name: 'Smt. Lakshmi Rao (Mock)', contact: 'dc.bengaluru@nic.in', address: 'DC Office, Bengaluru Urban', pincode: '560001' },
                { designation: 'Commissioner of Police', name: 'Shri Kiran Reddy (Mock)', contact: 'cp.bengaluru@ksp.gov.in', address: 'Police Commissionerate, Bengaluru', pincode: '560001' },
                { designation: 'Assistant Engineer (AE) - BWSSB', name: 'Er. Ramesh Bhat (Mock)', contact: 'ae.bwssb.blr@karnataka.gov.in', address: 'BWSSB Office, Bengaluru', pincode: '560001' }
            ],
            'mysuru': [
                { designation: 'District Commissioner', name: 'Mr. Suresh Kumar (Mock)', contact: 'dc.mysuru@nic.in', address: 'DC Office, Mysuru', pincode: '570001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Deepa Nambiar (Mock)', contact: 'sp.mysuru@ksp.gov.in', address: 'SP Office, Mysuru', pincode: '570001' }
            ],
            'mangalore': [
                { designation: 'District Commissioner', name: 'Dr. Anjali Devi (Mock)', contact: 'dc.mangalore@nic.in', address: 'DC Office, Mangalore', pincode: '575001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Prakash Shetty (Mock)', contact: 'sp.mangalore@ksp.gov.in', address: 'SP Office, Mangalore', pincode: '575001' }
            ],
            'hubli': [
                { designation: 'District Commissioner', name: 'Mr. Rajesh Kumar (Mock)', contact: 'dc.hubli@nic.in', address: 'DC Office, Hubli', pincode: '580020' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Sarita Patil (Mock)', contact: 'sp.hubli@ksp.gov.in', address: 'SP Office, Hubli', pincode: '580020' }
            ],
            'belagavi': [
                { designation: 'District Commissioner', name: 'Shri Vivek Kulkarni (Mock)', contact: 'dc.belagavi@nic.in', address: 'DC Office, Belagavi', pincode: '590001' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Anand Desai (Mock)', contact: 'sp.belagavi@ksp.gov.in', address: 'SP Office, Belagavi', pincode: '590001' }
            ],
            'gulbarga': [
                { designation: 'District Commissioner', name: 'Ms. Pooja Reddy (Mock)', contact: 'dc.gulbarga@nic.in', address: 'DC Office, Gulbarga', pincode: '585101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Kumar (Mock)', contact: 'sp.gulbarga@ksp.gov.in', address: 'SP Office, Gulbarga', pincode: '585101' }
            ],
            'davangere': [
                { designation: 'District Commissioner', name: 'Mr. Sanjay Patil (Mock)', contact: 'dc.davangere@nic.in', address: 'DC Office, Davangere', pincode: '577001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Kiran Rao (Mock)', contact: 'sp.davangere@ksp.gov.in', address: 'SP Office, Davangere', pincode: '577001' }
            ],
            'ballari': [
                { designation: 'District Commissioner', name: 'Shri Ashok Kumar (Mock)', contact: 'dc.ballari@nic.in', address: 'DC Office, Ballari', pincode: '583101' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Dinesh Sharma (Mock)', contact: 'sp.ballari@ksp.gov.in', address: 'SP Office, Ballari', pincode: '583101' }
            ],
            'tumakuru': [
                { designation: 'District Commissioner', name: 'Ms. Ritu Singh (Mock)', contact: 'dc.tumakuru@nic.in', address: 'DC Office, Tumakuru', pincode: '572101' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Yadav (Mock)', contact: 'sp.tumakuru@ksp.gov.in', address: 'SP Office, Tumakuru', pincode: '572101' }
            ],
            'bidar': [
                { designation: 'District Commissioner', name: 'Mr. Anand Gupta (Mock)', contact: 'dc.bidar@nic.in', address: 'DC Office, Bidar', pincode: '585401' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Devi (Mock)', contact: 'sp.bidar@ksp.gov.in', address: 'SP Office, Bidar', pincode: '585401' }
            ]
        },
        'tamil-nadu': {
            state_portal_link: 'https://www.tn.gov.in/',
            police_portal_link: 'https://www.tnpolice.gov.in/',
            revenue_portal_link: 'https://eservices.tn.gov.in/eservicesnew/land/chitta.html',
            health_portal_link: 'https://tnhealth.tn.gov.in/',
            pwd_portal_link: 'https://www.tn.gov.in/department/16', // PWD is dept 16
            rural_dev_portal_link: 'https://www.tnrd.gov.in/',
            'chennai': [
                { designation: 'District Collector', name: 'Dr. Kavya Murthy (Mock)', contact: 'collector.chennai@tn.nic.in', address: 'Collectorate, Chennai', pincode: '600001' },
                { designation: 'Commissioner of Police', name: 'Shri Prakash Raj (Mock)', contact: 'cp.chennai@tnpolice.gov.in', address: 'Police Commissionerate, Chennai', pincode: '600008' },
                { designation: 'Assistant Engineer (AE) - CMWSSB', name: 'Er. Karthik S. (Mock)', contact: 'ae.cmwssb.chn@tn.gov.in', address: 'CMWSSB Office, Chennai', pincode: '600002' }
            ],
            'coimbatore': [
                { designation: 'District Collector', name: 'Smt. Deepa Menon (Mock)', contact: 'collector.coimbatore@tn.nic.in', address: 'Collectorate, Coimbatore', pincode: '641018' },
                { designation: 'Commissioner of Police', name: 'Shri Ganesh Kumar (Mock)', contact: 'cp.coimbatore@tnpolice.gov.in', address: 'Police Commissionerate, Coimbatore', pincode: '641001' }
            ],
            'madurai': [
                { designation: 'District Collector', name: 'Mr. Karthik Raja (Mock)', contact: 'collector.madurai@tn.nic.in', address: 'Collectorate, Madurai', pincode: '625020' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Lakshmi Priya (Mock)', contact: 'sp.madurai@tnpolice.gov.in', address: 'SP Office, Madurai', pincode: '625007' }
            ],
            'tiruchirappalli': [
                { designation: 'District Collector', name: 'Dr. Anand Rao (Mock)', contact: 'collector.trichy@tn.nic.in', address: 'Collectorate, Tiruchirappalli', pincode: '620001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Suresh Babu (Mock)', contact: 'sp.trichy@tnpolice.gov.in', address: 'SP Office, Tiruchirappalli', pincode: '620008' }
            ],
            'salem': [
                { designation: 'District Collector', name: 'Ms. Priya Devi (Mock)', contact: 'collector.salem@tn.nic.in', address: 'Collectorate, Salem', pincode: '636001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Rajesh Kumar (Mock)', contact: 'sp.salem@tnpolice.gov.in', address: 'SP Office, Salem', pincode: '636001' }
            ],
            'vellore': [
                { designation: 'District Collector', name: 'Mr. Vivek Singh (Mock)', contact: 'collector.vellore@tn.nic.in', address: 'Collectorate, Vellore', pincode: '632001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Anjali Sharma (Mock)', contact: 'sp.vellore@tnpolice.gov.in', address: 'SP Office, Vellore', pincode: '632001' }
            ],
            'erode': [
                { designation: 'District Collector', name: 'Shri Sanjay Gupta (Mock)', contact: 'collector.erode@tn.nic.in', address: 'Collectorate, Erode', pincode: '638001' },
                { designation: 'Superintendent of Police (SP)', name: 'Mr. Rahul Yadav (Mock)', contact: 'sp.erode@tnpolice.gov.in', address: 'SP Office, Erode', pincode: '638001' }
            ],
            'tirunelveli': [
                { designation: 'District Collector', name: 'Ms. Kiran Devi (Mock)', contact: 'collector.tirunelveli@tn.nic.in', address: 'Collectorate, Tirunelveli', pincode: '627001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Manoj Kumar (Mock)', contact: 'sp.tirunelveli@tnpolice.gov.in', address: 'SP Office, Tirunelveli', pincode: '627001' }
            ],
            'thanjavur': [
                { designation: 'District Collector', name: 'Mr. Dinesh Kumar (Mock)', contact: 'collector.thanjavur@tn.nic.in', address: 'Collectorate, Thanjavur', pincode: '613001' },
                { designation: 'Superintendent of Police (SP)', name: 'Smt. Pooja Devi (Mock)', contact: 'sp.thanjavur@tnpolice.gov.in', address: 'SP Office, Thanjavur', pincode: '613001' }
            ],
            'kanyakumari': [
                { designation: 'District Collector', name: 'Dr. Anand Kumar (Mock)', contact: 'collector.kanyakumari@tn.nic.in', address: 'Collectorate, Kanyakumari', pincode: '629001' },
                { designation: 'Superintendent of Police (SP)', name: 'Shri Vivek Sharma (Mock)', contact: 'sp.kanyakumari@tnpolice.gov.in', address: 'SP Office, Kanyakumari', pincode: '629001' }
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
        let healthPortalLink = '';
        let pwdPortalLink = '';
        let ruralDevPortalLink = '';

        if (!selectedState || !districtName) {
            officerList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">Please select a State and enter a District/City to find officer details.</li>`;
            return;
        }

        // Get state-specific portal links
        if (officerData[selectedState]) {
            statePortalLink = officerData[selectedState].state_portal_link || '';
            policePortalLink = officerData[selectedState].police_portal_link || '';
            revenuePortalLink = officerData[selectedState].revenue_portal_link || '';
            healthPortalLink = officerData[selectedState].health_portal_link || '';
            pwdPortalLink = officerData[selectedState].pwd_portal_link || '';
            ruralDevPortalLink = officerData[selectedState].rural_dev_portal_link || '';
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
                ${healthPortalLink ? `<li><a href="${healthPortalLink}" target="_blank" class="text-blue-700 hover:underline">State Health Department</a></li>` : ''}
                ${pwdPortalLink ? `<li><a href="${pwdPortalLink}" target="_blank" class="text-blue-700 hover:underline">State Public Works Department (PWD)</a></li>` : ''}
                ${ruralDevPortalLink ? `<li><a href="${ruralDevPortalLink}" target="_blank" class="text-blue-700 hover:underline">State Rural Development Department</a></li>` : ''}
                <li>For specific departmental (e.g., Electricity, Water Supply) or local body (e.g., Municipal Corporation, Zilla Parishad) officer details, please visit their respective official websites or contact their main offices.</li>
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
