document.addEventListener('DOMContentLoaded', function() {
    console.log("legal-first-step-tool.js: DOM content loaded. Initializing legal first step tool script.");

    // Get references to the HTML elements
    const getGuidanceBtn = document.getElementById('get-guidance-btn');
    const issueTypeSelect = document.getElementById('issue-type-select');
    const guidanceResultsSection = document.getElementById('guidance-results-section');
    const guidanceList = document.getElementById('guidance-list');

    // Check if essential elements are found
    if (!getGuidanceBtn) console.error("legal-first-step-tool.js Error: 'get-guidance-btn' element not found.");
    if (!issueTypeSelect) console.error("legal-first-step-tool.js Error: 'issue-type-select' element not found.");
    if (!guidanceResultsSection) console.error("legal-first-step-tool.js Error: 'guidance-results-section' not found. This is crucial for displaying results.");
    if (!guidanceList) console.error("legal-first-step-tool.js Error: 'guidance-list' not found.");

    // Data for legal guidance based on issue type (English Only)
    const legalGuidanceData = {
        'land-dispute': [
            "**1. Collect Documents:** Gather all relevant land documents (sale deed, mutation records, property tax receipts, survey maps).",
            "**2. Consult a Lawyer:** Seek advice from a lawyer specializing in property law. They can assess your case and suggest the best course of action.",
            "**3. Check Revenue Records:** Verify the land records (Bhulekh, Khasra, Khatauni) with the local revenue department to ensure accuracy and identify any discrepancies.",
            "**4. Mediation/Negotiation:** If possible, try to resolve the dispute through mediation or negotiation with the other party before resorting to court.",
            "**5. File a Complaint:** If negotiation fails, your lawyer may advise filing a formal complaint with the appropriate civil court or revenue authority."
        ],
        'cheque-bounce': [
            "**1. Contact the Drawer:** Inform the person who issued the cheque about the bounce and demand payment within 30 days of receiving the 'cheque return memo' from the bank.",
            "**2. Send Legal Notice:** If payment is not made, send a legal notice to the drawer within 30 days of the demand period expiring. The notice should demand payment within 15 days.",
            "**3. File a Complaint:** If the drawer fails to pay within 15 days of receiving the legal notice, you can file a complaint under Section 138 of the Negotiable Instruments Act, 1881, in a Magistrate's court within one month from the date the 15-day notice period expires.",
            "**4. Keep Records:** Maintain all original documents: the bounced cheque, bank memo, legal notice, and postal receipts."
        ],
        'office-complaint': [
            "**1. Identify the Grievance:** Clearly define the nature of your complaint (e.g., harassment, discrimination, unpaid wages, unfair termination).",
            "**2. Review Company Policy:** Check your company's internal grievance redressal policy or HR policies. Follow the prescribed procedure.",
            "**3. Gather Evidence:** Collect all supporting documents, emails, messages, or witness statements related to your complaint.",
            "**4. Submit Formal Complaint:** Write a formal complaint letter or email to your HR department or immediate supervisor, as per company policy. Keep a copy for your records.",
            "**5. External Remedies:** If internal mechanisms fail, consider external options like labor courts, industrial tribunals, or relevant government authorities, depending on the nature of the complaint."
        ],
        'consumer-complaint': [
            "**1. Keep Records:** Retain all purchase proofs, bills, warranty cards, product manuals, and communication with the seller/service provider.",
            "**2. Contact the Seller/Service Provider:** First, try to resolve the issue directly with the seller or service provider through their customer service or grievance redressal mechanism.",
            "**3. Send a Legal Notice:** If direct resolution fails, send a formal legal notice to the seller/service provider stating your grievance and demanding a specific remedy.",
            "**4. File with Consumer Forum:** If the legal notice doesn't yield results, file a complaint with the appropriate Consumer Disputes Redressal Forum (District, State, or National, based on the value of goods/services and compensation sought) under the Consumer Protection Act.",
            "**5. Online Complaint:** You can also file a complaint online through the National Consumer Helpline portal (consumerhelpline.gov.in)."
        ],
        'family-dispute': [
            "**1. Identify the Core Issue:** Clearly define the nature of the family dispute (e.g., divorce, child custody, property division, domestic violence).",
            "**2. Seek Mediation/Counseling:** For many family disputes, especially those involving relationships, mediation or family counseling can be a less adversarial first step.",
            "**3. Consult a Family Lawyer:** Speak with a lawyer specializing in family law. They can explain your legal rights and options.",
            "**4. Collect Relevant Documents:** Gather marriage certificates, birth certificates, property documents, financial records, and any evidence related to the dispute.",
            "**5. Legal Action:** Depending on the nature of the dispute and advice from your lawyer, formal legal proceedings may be initiated in the appropriate family court or civil court."
        ],
        'cyber-crime': [
            "**1. Preserve Evidence:** Do not delete any evidence (screenshots, messages, emails, transaction IDs). Disconnect from the internet if necessary to prevent further damage.",
            "**2. Report to Cyber Cell:** Immediately report the cybercrime to the Cyber Crime Cell of your local police or through the national cybercrime reporting portal (cybercrime.gov.in).",
            "**3. Inform Bank/Service Provider:** If it involves financial fraud, inform your bank or digital wallet service provider immediately to block transactions or accounts.",
            "**4. Change Passwords:** Change passwords of all affected accounts and any other linked accounts.",
            "**5. Consult a Cyber Law Expert:** For complex cases, consider consulting a lawyer specializing in cyber law."
        ],
        'traffic-violation': [
            "**1. Understand the Violation:** Clearly identify the specific traffic rule you are accused of violating and the corresponding fine.",
            "**2. Check E-Challan:** Verify the details of the e-challan online on your state's traffic police website or the Parivahan Sewa portal.",
            "**3. Pay the Fine:** If you accept the violation, pay the fine online or at designated payment centers within the stipulated time to avoid further penalties.",
            "**4. Contest the Challan (If applicable):** If you believe the challan was issued incorrectly, you can contest it by appearing before the traffic court or designated authority on the date mentioned on the challan, or as per online instructions. Gather evidence (photos, videos) to support your claim.",
            "**5. Legal Advice:** For serious violations or complex situations, consider consulting a lawyer."
        ]
    };

    // Function to display guidance based on selected issue type
    function displayGuidance() {
        console.log(`legal-first-step-tool.js: displayGuidance called. Issue Type: ${issueTypeSelect.value}`);
        
        const selectedIssueType = issueTypeSelect.value;
        
        guidanceList.innerHTML = ''; // Clear previous guidance
        guidanceResultsSection.classList.remove('hidden'); // Ensure results section is visible

        let guidanceToDisplay = [];

        if (!selectedIssueType) {
            guidanceList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">Please select a legal issue type to get guidance.</li>`;
        } else if (legalGuidanceData[selectedIssueType]) {
            guidanceToDisplay = legalGuidanceData[selectedIssueType];
        } else {
            guidanceList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">No specific guidance available for this issue yet. Please select another or consult a legal expert.</li>`;
        }

        guidanceToDisplay.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item; // Use innerHTML to render bold text
            li.classList.add('bg-green-50', 'p-4', 'rounded-lg', 'mb-2', 'text-base', 'leading-relaxed', 'text-green-800');
            guidanceList.appendChild(li);
        });

        // Add a general note about consulting experts
        const expertNote = document.createElement('li');
        expertNote.innerHTML = `**Important Note:** This guidance provides general first steps. For personalized advice, it is **mandatory to consult a legal professional** relevant to your specific jurisdiction and situation. Laws are complex and vary.`;
        expertNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mb-2', 'text-sm', 'leading-relaxed', 'text-blue-800', 'mt-4');
        guidanceList.appendChild(expertNote);
        console.log("legal-first-step-tool.js: Guidance displayed.");
    }
    
    // Event listener for the "Get Guidance" button
    if (getGuidanceBtn) {
        getGuidanceBtn.addEventListener('click', function() {
            console.log("legal-first-step-tool.js: 'Get Guidance' button clicked. Attempting to display guidance.");
            displayGuidance();
        });
    } else {
        console.error("legal-first-step-tool.js Initialization Error: 'get-guidance-btn' element not found.");
    }
});
