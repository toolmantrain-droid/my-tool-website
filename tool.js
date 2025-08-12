document.addEventListener('DOMContentLoaded', function() {
    console.log("tool.js: DOM content loaded. Initializing tool script.");

    // Getting references to the HTML elements
    const verifyBtn = document.getElementById('verify-btn');
    const stateSelect = document.getElementById('state-select');
    const landTypeSelect = document.getElementById('land-type');
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');

    // Check if essential elements are found
    if (!verifyBtn) console.error("tool.js Error: 'verify-btn' element not found.");
    if (!stateSelect) console.error("tool.js Error: 'state-select' element not found.");
    if (!landTypeSelect) console.error("tool.js Error: 'land-type' element not found.");
    if (!resultsSection) console.error("tool.js Error: 'results-section' not found. This is likely the cause of the 'Cannot read properties of null' error.");
    if (!resultsList) console.error("tool.js Error: 'results-list' not found.");

    // Detailed data for verification results in English only
    const resultsData = {
        general: {
            en: {
                residential: [
                    "**1. Ownership Title Verification:**",
                    "   - **Sale Deed / Title Deed:** Ensure the seller has clear and transferable ownership of the property. Examine the chain of all previous sale deeds.",
                    "   - **Mutation Records:** Verify that the ownership of the land is correctly updated in the government revenue records in the seller's name.",
                    "   - **Encumbrance Certificate:** Check this certificate to ensure there are no loans, mortgages, legal disputes, or other encumbrances on the property. It can be obtained from the Sub-Registrar's office.",
                    "   - **Property Tax Receipts:** Confirm that all previous property taxes have been paid.",
                    "   - **Land Survey Documents:** Review the latest survey report and maps to verify the exact boundaries and area of the land.",
                    "**2. Legal Permissions & Zoning:**",
                    "   - **No Objection Certificate (NOC):** If required, obtain NOCs from various government departments (e.g., Pollution Control Board, Fire Department, Urban Development Authority).",
                    "   - **Master Plan & Zoning:** Ensure the land is approved for residential use and conforms to the local master plan or development scheme.",
                    "   - **Building Bylaws:** Check that the proposed construction does not violate local building bylaws.",
                    "   - **RERA (Real Estate Regulatory Authority) Registration:** If it's part of a real estate project, verify RERA registration and project details.",
                    "**3. Physical Verification:**",
                    "   - **Site Visit:** Physically visit the land to inspect its condition, boundaries, and surrounding development.",
                    "   - **Access Road:** Ensure there is legal and adequate access to the land.",
                    "   - **Utilities:** Check the availability and connection of basic utilities like electricity, water, and sewage.",
                    "**4. Disputes & Litigation:**",
                    "   - **Court Cases:** Check if any lawsuits or disputes related to the land are pending in any court.",
                    "   - **Government Acquisition:** Ensure the government has not issued any plan or notification for acquiring the land for public purposes.",
                    "   - **Tenancy/Leasehold:** If there is any tenant or leaseholder, understand their rights and agreements.",
                    "**5. Seller Verification:**",
                    "   - **Identity Proof:** Verify the seller's identity (Aadhaar, PAN) and address.",
                    "   - **Power of Attorney (PoA):** If the seller is not personally present and is selling through a PoA holder, thoroughly check the validity and scope of the PoA.",
                    "**6. Payment & Registration:**",
                    "   - **Stamp Duty & Registration Fees:** Estimate the required stamp duty and registration fees based on the property value and state regulations.",
                    "   - **Payment Methods:** Ensure all payments are made through legal and transparent methods and keep records.",
                    "**7. Post-Purchase Formalities:**",
                    "   - **Mutation:** Ensure to get the mutation done in your name in the revenue records after purchase.",
                    "      - **Property Tax Update:** Update the property tax records with the local authority in your name."
                ],
                agricultural: [
                    "**1. Land Records Verification:**",
                    "   - **7/12 Extract / Khasra-Khatauni:** This is the most crucial document for agricultural land, detailing owner, land type, area, crops, and transactions for the past 30-50 years.",
                    "   - **Mutation Records:** Ensure the seller's name is updated in the government agricultural records.",
                    "   - **Fard:** This is an official proof of land ownership.",
                    "**2. Land Use & Conversion:**",
                    "   - **Agricultural Purpose:** Ensure the land is still classified for agricultural purposes. If you intend to convert it for non-agricultural (NA) purposes, understand the process and costs as per state rules.",
                    "   - **Land Reform Laws:** Check if the land falls under any land reform laws (e.g., land ceiling acts) that might restrict ownership or sale.",
                    "**3. Disputes & Dues:**",
                    "   - **Outstanding Loans:** Check for any agricultural loans, cooperative loans, or other government dues on the land.",
                    "   - **Chakbandi (Consolidation):** If land consolidation is ongoing or has occurred in the area, verify the exact status and size of the land.",
                    "   - **Right of Way:** Ensure there is a legal access road to the farm and no easement issues.",
                    "**4. Environmental & Other Aspects:**",
                    "   - **Soil Quality & Water Availability:** If purchasing for agriculture, assess soil quality and availability of water sources.",
                    "   - **Government Schemes:** Check if the land falls under any government project (e.g., canal, highway, industrial zone) for acquisition."
                ],
                commercial: [
                    "**1. Zoning & Master Plan:**",
                    "   - **Land Use Certificate:** Obtain this certificate from the local planning authority confirming the land is approved for commercial use.",
                    "   - **Master Plan:** Ensure the land is designated as a commercial zone in the city's master plan.",
                    "   - **FAR (Floor Area Ratio) / FSI (Floor Space Index):** Check the permissible FAR/FSI for the proposed construction.",
                    "**2. Permissions & Licenses:**",
                    "   - **NOCs (No Objection Certificates):** Obtain all necessary NOCs from relevant departments (e.g., Fire, Environment, Traffic, Municipality).",
                    "   - **Building Plan Approval:** Understand the process and requirements for building plan approval from the local development authority.",
                    "   - **Environmental Clearances:** If required for the proposed commercial activity, check for environmental clearances.",
                    "**3. Financial & Legal Due Diligence:**",
                    "   - **Property Tax Dues:** Check that no property tax or other commercial charges are outstanding.",
                    "   - **Rental or Lease Agreement:** If the land is currently rented or leased, carefully review existing agreements and their terms.",
                    "   - **Company / Firm Owned Land:** If the seller is a company or firm, check its incorporation documents, authorized signatories, and board resolutions."
                ]
            }
        },
        'uttar-pradesh': {
            en: {
                residential: [
                    "**Uttar Pradesh Specific Information:**",
                    "   - **Bhulekh Portal:** In Uttar Pradesh, check **Bhulekh portal** (upbhulekh.gov.in) to verify Khasra, Khatauni, and Gata Sankhya (plot number) details online.",
                    "   - **Lal Dora Area:** Ensure the land is outside the 'Lal Dora' (village inhabited) area if purchasing in urban or rural populated areas. Rules for land within Lal Dora may differ.",
                    "   - **Development Authorities:** In cities, verify approved master plans, zoning, and layouts from local development authorities (e.g., LDA, GDA, Noida Authority).",
                    "   - **Warisan Portal:** For inheritance and succession matters, check the 'Warisan' portal (vaaris.up.nic.in) to ensure the seller's ownership is undisputed.",
                    "   - **UP Urban Planning and Development Act, 1973:** Understand the provisions of this act and the regulations made by local development authorities.",
                    "   - **Land Use Change:** If agricultural land is being bought for residential use, complete the process of converting the land to non-agricultural (NA) under the Uttar Pradesh Zamindari Abolition and Land Reforms Act."
                ],
                agricultural: [
                    "**Uttar Pradesh Specific Information:**",
                    "   - **Khatauni and Khasra on Bhulekh Portal:** For agricultural land in Uttar Pradesh, online verification of Khatauni (Record of Rights) and Khasra (Field Book) on the Bhulekh portal is crucial. It shows land ownership, area, and agricultural details for the last 5 years.",
                    "   - **Chakbandi Status (Land Consolidation):** If Chakbandi (land consolidation) has occurred or is in progress, verify the new Gata Sankhya (plot number) and correct boundaries. Old records may differ due to Chakbandi.",
                    "   - **Impact of Government Schemes:** Check if the land falls under the acquisition area of any government project like a canal, expressway, or other development projects for which the Uttar Pradesh government has issued a notification.",
                    "   - **UP Revenue Code, 2006:** Understand the provisions of this code, especially related to the transfer, inheritance, and conversion of agricultural land for non-agricultural use.",
                    "   - **Land of Minorities / SC/ST:** Ensure that the seller is not from minority or Scheduled Caste/Tribe categories if you are not, as there may be specific restrictions on the sale of such land."
                ],
                commercial: [
                    "**Uttar Pradesh Specific Information:**",
                    "   - **Regulations of Development Authorities:** For commercial land in Uttar Pradesh, confirm zoning, master plan, and land use regulations with local development authorities like Lucknow Development Authority (LDA), Ghaziabad Development Authority (GDA), or Noida/Greater Noida Authority.",
                    "   - **Land Conversion:** Ensure that the land conversion (Agricultural to Commercial) for commercial use is approved by the Revenue Department.",
                    "   - **Fire Safety and Environmental NOC:** Obtain necessary No Objection Certificates from the Uttar Pradesh Fire Service and the State Pollution Control Board for the proposed commercial establishment.",
                    "   - **Licenses from Industry Department:** If a specific industry is being set up, check for necessary licenses and permits from the Uttar Pradesh government's Industry Department.",
                    "   - **Commercial Building Bylaws:** Study the commercial building bylaws of the local municipal corporation or development authority."
                ]
            }
        }
    };
    
    // Function to display results based on selected land type and current language
    function displayResults() { // Removed lang parameter as it's always 'en' now
        console.log(`displayResults called. Land Type: ${landTypeSelect.value}, State: ${stateSelect.value}`);
        
        const selectedLandType = landTypeSelect.value;
        const selectedState = stateSelect.value;
        const lang = 'en'; // Hardcoded to English

        resultsList.innerHTML = ''; // Clear previous results
        resultsSection.classList.remove('hidden'); // Ensure results section is visible

        let resultsToDisplay = [];

        // Check if a state is selected
        if (!selectedState) {
            console.log("No state selected. Showing general guidelines and warning.");
            resultsList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">Please select a state before starting verification. General guidelines are listed below.</li>`;
            
            // Always show general guidelines even if no state is selected
            if (resultsData.general.en && resultsData.general.en[selectedLandType]) {
                resultsToDisplay = resultsToDisplay.concat(resultsData.general.en[selectedLandType]);
            } else {
                console.warn(`General data missing for land type: ${selectedLandType} in English.`);
            }
        } else {
            console.log(`State selected: ${selectedState}. Fetching specific and general guidelines.`);
            // Display general guidelines first
            if (resultsData.general.en && resultsData.general.en[selectedLandType]) {
                resultsToDisplay = resultsToDisplay.concat(resultsData.general.en[selectedLandType]);
            } else {
                console.warn(`General data missing for land type: ${selectedLandType} in English.`);
            }

            // Add state-specific guidelines if a state is selected and data exists for it
            if (resultsData[selectedState] && resultsData[selectedState].en && resultsData[selectedState].en[selectedLandType]) {
                resultsToDisplay = resultsToDisplay.concat(resultsData[selectedState].en[selectedLandType]);
            } else {
                console.warn(`State-specific data missing for state: ${selectedState}, land type: ${selectedLandType} in English.`);
            }
        }

        if (resultsToDisplay.length === 0 && selectedState !== "") {
            // This case should ideally not happen if data is comprehensive, but as a fallback
            resultsList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">No information available. Please check your selection.</li>`;
        }

        resultsToDisplay.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item; // Use innerHTML to render bold text from data
            li.classList.add('bg-green-50', 'p-4', 'rounded-lg', 'mb-2', 'text-base', 'leading-relaxed', 'text-green-800'); // Tailwind classes for styling list items
            resultsList.appendChild(li);
        });

        // Add a small note about consulting experts
        const stateNote = document.createElement('li');
        stateNote.innerHTML = `**Extremely Important Note:** This information is for general guidance only and cannot cover all legal aspects. For any significant land transaction, it is **mandatory to consult a local legal expert or lawyer**. Laws vary by state, change frequently, and may apply differently to your specific situation. This tool serves only as an initial guideline.`;
        stateNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mb-2', 'text-sm', 'leading-relaxed', 'text-blue-800', 'mt-4');
        resultsList.appendChild(stateNote);
        console.log("Results displayed.");
    }
    
    // Event listener for the "Start Verification" button
    if (verifyBtn) { // Ensure verifyBtn is not null before adding listener
        verifyBtn.addEventListener('click', function() {
            console.log("Verify button clicked. Attempting to display results.");
            displayResults(); // Call displayResults without language parameter
        });
    } else {
        console.error("Initialization Error: 'verify-btn' element not found.");
    }

    // Removed language switcher button event listener
    
    // Initial setup - ensure the page is in English
    document.documentElement.lang = 'en';
    // If you want results to show on page load, uncomment the line below:
    // displayResults(); 
});
