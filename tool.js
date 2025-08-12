document.addEventListener('DOMContentLoaded', function() {
    const verifyBtn = document.getElementById('verify-btn');
    const stateSelect = document.getElementById('state-select');
    const landTypeSelect = document.getElementById('land-type');
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');

    const resultsData = {
        general: {
            hi: {
                residential: [
                    "**1. मालिकाना हक़ (Ownership Title) की जांच:**",
                    "   - **बिक्रीनामा (Sale Deed) / शीर्षक विलेख (Title Deed):** सुनिश्चित करें कि विक्रेता के पास संपत्ति का स्पष्ट और हस्तांतरणीय स्वामित्व है। सभी पिछले बिक्रीनामों की एक श्रृंखला (chain) की जांच करें।",
                    "   - **म्यूटेशन (नामांतरण) रिकॉर्ड:** जांचें कि सरकारी राजस्व रिकॉर्ड में जमीन का मालिकाना हक विक्रेता के नाम पर है।",
                    "   - **भार प्रमाणपत्र (Encumbrance Certificate):** यह सुनिश्चित करने के लिए जांच करें कि संपत्ति पर कोई ऋण, गिरवी, कानूनी विवाद या अन्य भार नहीं है। यह सब-रजिस्ट्रार कार्यालय से प्राप्त किया जा सकता है।",
                    "   - **संपत्ति कर रसीदें:** पुष्टि करें कि पिछले सभी संपत्ति करों का भुगतान किया गया है।",
                    "   - **भूमि सर्वेक्षण दस्तावेज:** जमीन की सही सीमाओं और क्षेत्रफल को सत्यापित करने के लिए नवीनतम सर्वेक्षण रिपोर्ट और नक्शे देखें।",
                    "**2. कानूनी अनुमतियाँ और जोनिंग (Legal Permissions & Zoning):**",
                    "   - **अनापत्ति प्रमाण पत्र (NOC):** यदि आवश्यक हो, तो विभिन्न सरकारी विभागों (जैसे प्रदूषण नियंत्रण बोर्ड, अग्निशमन विभाग, शहरी विकास प्राधिकरण) से NOC प्राप्त करें।",
                    "   - **मास्टर प्लान और जोनिंग:** सुनिश्चित करें कि जमीन आवासीय उपयोग के लिए अनुमोदित है और स्थानीय मास्टर प्लान या विकास योजना के अनुरूप है।",
                    "   - **भवन उपनियम (Building Bylaws):** जांचें कि प्रस्तावित निर्माण स्थानीय भवन उपनियमों का उल्लंघन नहीं करता है।",
                    "   - **रियल एस्टेट नियामक प्राधिकरण (RERA) पंजीकरण:** यदि यह एक रियल एस्टेट प्रोजेक्ट का हिस्सा है, तो RERA पंजीकरण और परियोजना विवरण सत्यापित करें।",
                    "**3. भौतिक सत्यापन (Physical Verification):**",
                    "   - **साइट विजिट:** वास्तविक जमीन पर जाकर उसकी स्थिति, सीमाओं और आसपास के विकास का निरीक्षण करें।",
                    "   - **पहुंच मार्ग:** सुनिश्चित करें कि जमीन तक कानूनी और पर्याप्त पहुंच मार्ग है।",
                    "   - **उपयोगिताएं:** बिजली, पानी, सीवरेज जैसी बुनियादी उपयोगिताओं की उपलब्धता और कनेक्शन की जांच करें।",
                    "**4. विवाद और मुकदमेबाजी (Disputes & Litigation):**",
                    "   - **न्यायालय में मामले:** जांचें कि जमीन से संबंधित कोई मुकदमा या विवाद किसी अदालत में लंबित तो नहीं है।",
                    "   - **सरकारी अधिग्रहण (Acquisition):** सुनिश्चित करें कि सरकार ने सार्वजनिक उद्देश्यों के लिए जमीन का अधिग्रहण करने की कोई योजना या सूचना जारी नहीं की है।",
                    "   - **किरायेदारी/पट्टेदारी (Tenancy/Leasehold):** यदि कोई किरायेदार या पट्टेदार है, तो उनके अधिकारों और समझौतों को समझें।",
                    "**5. विक्रेता का सत्यापन (Seller Verification):**",
                    "   - **पहचान प्रमाण:** विक्रेता की पहचान (आधार, पैन) और पते का सत्यापन करें।",
                    "   - **मुख्तारनामा (Power of Attorney - PoA):** यदि विक्रेता स्वयं मौजूद नहीं है और किसी PoA धारक के माध्यम से बिक्री कर रहा है, तो PoA की वैधता और दायरे की अच्छी तरह से जांच करें।",
                    "**6. भुगतान और पंजीकरण (Payment & Registration):**",
                    "   - **स्टांप शुल्क और पंजीकरण शुल्क:** संपत्ति के मूल्य और राज्य के नियमों के अनुसार आवश्यक स्टांप शुल्क और पंजीकरण शुल्क का अनुमान लगाएं।",
                    "   - **भुगतान के तरीके:** सभी भुगतान कानूनी और पारदर्शी तरीकों से करें और उनके रिकॉर्ड रखें।",
                    "**7. खरीद के बाद की औपचारिकताएं (Post-Purchase Formalities):**",
                    "   - **म्यूटेशन (नामांतरण):** खरीद के बाद राजस्व रिकॉर्ड में अपने नाम पर म्यूटेशन करवाना सुनिश्चित करें।",
                    "   - **संपत्ति कर अपडेट:** स्थानीय प्राधिकरण में संपत्ति कर रिकॉर्ड को अपने नाम पर अपडेट करें।"
                ],
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
                        "   - **Property Tax Update:** Update the property tax records with the local authority in your name."
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
                hi: {
                    residential: [
                        "**उत्तर प्रदेश विशिष्ट जानकारी (Uttar Pradesh Specific Information):**",
                        "   - **भूलेख पोर्टल (Bhulekh Portal):** उत्तर प्रदेश सरकार के भूलेख पोर्टल (upbhulekh.gov.in) पर जाकर **खसरा, खतौनी, गाटा संख्या (भूखंड संख्या)** और भूमि के मालिक का नाम ऑनलाइन सत्यापित करें।",
                        "   - **लाल डोरा क्षेत्र (Lal Dora Area):** सुनिश्चित करें कि जमीन 'लाल डोरा' (ग्राम आबादी) क्षेत्र के बाहर है, यदि आप शहरी या ग्रामीण आबादी वाले क्षेत्र में खरीद रहे हैं। लाल डोरा के भीतर की भूमि के नियम अलग हो सकते हैं।",
                        "   - **विकास प्राधिकरण (Development Authorities):** शहरों में, स्थानीय विकास प्राधिकरण (जैसे लखनऊ विकास प्राधिकरण - LDA, गाजियाबाद विकास प्राधिकरण - GDA, नोएडा प्राधिकरण) से अनुमोदित मास्टर प्लान, जोनिंग और लेआउट की जांच करें।",
                        "   - **वारिसान पोर्टल (Warisan Portal):** विरासत और उत्तराधिकार से संबंधित मामलों के लिए 'वारिसान' पोर्टल (vaaris.up.nic.in) पर जांच करें ताकि यह सुनिश्चित हो सके कि विक्रेता का स्वामित्व निर्विवाद है।",
                        "   - **उत्तर प्रदेश शहरी नियोजन और विकास अधिनियम, 1973:** इस अधिनियम के प्रावधानों और स्थानीय विकास प्राधिकरणों द्वारा बनाए गए नियमों को समझें।",
                        "   - **भू-उपयोग परिवर्तन (Land Use Change):** यदि आवासीय उपयोग के लिए कृषि भूमि खरीदी जा रही है, तो उत्तर प्रदेश ज़मींदारी विनाश और भूमि व्यवस्था अधिनियम के तहत भूमि को गैर-कृषि (NA) में परिवर्तित करने की प्रक्रिया को पूरा करें।"
                    ],
                    agricultural: [
                        "**उत्तर प्रदेश विशिष्ट जानकारी (Uttar Pradesh Specific Information):**",
                        "   - **भूलेख पोर्टल (Bhulekh Portal) पर खतौनी और खसरा:** उत्तर प्रदेश में कृषि भूमि के लिए, भूलेख पोर्टल पर खतौनी (Record of Rights) और खसरा (Field Book) की ऑनलाइन जांच सबसे महत्वपूर्ण है। यह भूमि के मालिकाना हक, क्षेत्रफल, और पिछले 5 वर्षों के कृषि विवरण को दर्शाता है।",
                        "   - **चकबंदी स्थिति (Chakbandi Status):** यदि क्षेत्र में चकबंदी (भूमि का समेकन) हो चुकी है या चल रही है, तो भूमि की नई गाटा संख्या और सही सीमाएं सत्यापित करें। चकबंदी के कारण पुराने रिकॉर्ड भिन्न हो सकते हैं।",
                        "   - **सरकारी योजनाओं का प्रभाव:** जांचें कि भूमि किसी नहर परियोजना, एक्सप्रेसवे, या अन्य सरकारी विकास परियोजना के अधिग्रहण क्षेत्र में तो नहीं आती, जिसके लिए उत्तर प्रदेश सरकार ने अधिसूचना जारी की हो।",
                        "   - **उत्तर प्रदेश राजस्व संहिता, 2006:** इस संहिता के प्रावधानों को समझें, खासकर कृषि भूमि के हस्तांतरण, विरासत, और गैर-कृषि उपयोग में परिवर्तन से संबंधित।",
                        "   - **अल्पसंख्यक / SC/ST की भूमि:** सुनिश्चित करें कि विक्रेता अल्पसंख्यकों या अनुसूचित जाति/जनजाति वर्ग से नहीं है यदि आप इन श्रेणियों से संबंधित नहीं हैं, क्योंकि ऐसी भूमि की खरीद-फरोख्त पर विशिष्ट प्रतिबंध हो सकते हैं।"
                    ],
                    commercial: [
                        "**उत्तर प्रदेश विशिष्ट जानकारी (Uttar Pradesh Pradesh Specific Information):**",
                        "   - **विकास प्राधिकरणों के नियम:** उत्तर प्रदेश में व्यावसायिक भूमि के लिए, लखनऊ विकास प्राधिकरण (LDA), गाजियाबाद विकास प्राधिकरण (GDA), नोएडा/ग्रेटर नोएडा अथॉरिटी जैसे स्थानीय विकास प्राधिकरणों से जोनिंग, मास्टर प्लान, और भूमि उपयोग के नियमों की पुष्टि करें।",
                        "   - **भू-परिवर्तन (Land Conversion):** सुनिश्चित करें कि भूमि का व्यावसायिक उपयोग के लिए उपयुक्त भू-परिवर्तन (Agricultural to Commercial) राजस्व विभाग से अनुमोदित है।",
                        "   - **फायर सेफ्टी और पर्यावरण अनापत्ति (Fire Safety & Environmental NOC):** प्रस्तावित व्यावसायिक इकाई के लिए उत्तर प्रदेश फायर सर्विस और राज्य प्रदूषण नियंत्रण बोर्ड से आवश्यक अनापत्ति प्रमाण पत्र प्राप्त करें।",
                        "   - **उद्योग विभाग के लाइसेंस:** यदि कोई विशेष उद्योग स्थापित किया जा रहा है, तो उत्तर प्रदेश सरकार के उद्योग विभाग से आवश्यक लाइसेंस और अनुमतियों की जांच करें।",
                        "   - **व्यावसायिक भवन उपनियम:** स्थानीय नगर निगम या विकास प्राधिकरण के व्यावसायिक भवन उपनियमों का अध्ययन करें।"
                    ]
                },
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
    }
    
      (lang) 
        .log(`displayResults called. Current lang: ${lang}, Land Type: ${landTypeSelect.value}, State: ${stateSelect.value}`)
        
           = landTypeSelect.value
           = stateSelect.value
        
       .innerHTML = '' // Clear previous results
        .classList.remove('hidden') // Ensure results section is visible

        resultsToDisplay = []

        // Check if a state is selected
        if (!selectedState) {
            console.log("No state selected. Showing general guidelines and warning.");
            resultsList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">${lang === 'hi' ? 'कृपया जांच शुरू करने से पहले एक राज्य चुनें। सामान्य दिशानिर्देश नीचे दिए गए हैं।' : 'Please select a state before starting verification. General guidelines are listed below.'}</li>`;
            
            // Always show general guidelines even if no state is selected
            if (resultsData.general[lang] && resultsData.general[lang][selectedLandType]) {
                resultsToDisplay = resultsToDisplay.concat(resultsData.general[lang][selectedLandType]);
            } else {
                console.warn(`General data missing for land type: ${selectedLandType} in lang: ${lang}`);
            }
        } else {
            console.log(`State selected: ${selectedState}. Fetching specific and general guidelines.`);
            // Display general guidelines first
            if (resultsData.general[lang] && resultsData.general[lang][selectedLandType]) {
                resultsToDisplay = resultsToDisplay.concat(resultsData.general[lang][selectedLandType]);
            } else {
                console.warn(`General data missing for land type: ${selectedLandType} in lang: ${lang}`);
            }

            // Add state-specific guidelines if a state is selected and data exists for it
            if (resultsData[selectedState] && resultsData[selectedState][lang] && resultsData[selectedState][lang][selectedLandType]) {
                resultsToDisplay = resultsToDisplay.concat(resultsData[selectedState][lang][selectedLandType]);
            } else {
                console.warn(`State-specific data missing for state: ${selectedState}, land type: ${selectedLandType} in lang: ${lang}`);
            }
        }

        if (resultsToDisplay.length === 0 && selectedState !== "") {
            // This case should ideally not happen if data is comprehensive, but as a fallback
            resultsList.innerHTML = `<li class="bg-red-50 p-4 rounded-lg mb-2 text-base leading-relaxed text-red-800">${lang === 'hi' ? 'कोई जानकारी उपलब्ध नहीं। कृपया अपना चयन जांचें।' : 'No information available. Please check your selection.'}</li>`;
        }

        resultsToDisplay.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item; // Use innerHTML to render bold text from data
            li.classList.add('bg-green-50', 'p-4', 'rounded-lg', 'mb-2', 'text-base', 'leading-relaxed', 'text-green-800'); // Tailwind classes for styling list items
            resultsList.appendChild(li);
        });

        // Add a small note about consulting experts
        const stateNote = document.createElement('li');
        stateNote.innerHTML = lang === 'hi' ? 
            `**अत्यंत महत्वपूर्ण नोट:** यह जानकारी केवल सामान्य मार्गदर्शन के लिए है और इसमें सभी कानूनी पहलुओं को शामिल करना संभव नहीं है। जमीन के बड़े लेनदेन में हमेशा **स्थानीय कानूनी विशेषज्ञ या वकील** से अनिवार्य रूप से सलाह लें, क्योंकि राज्य-वार भिन्न होते हैं, अक्सर बदलते रहते हैं, और आपकी विशिष्ट स्थिति पर लागू हो सकते हैं। यह टूल केवल एक प्रारंभिक दिशानिर्देश के रूप में कार्य करता है।` : 
            `**Extremely Important Note:** This information is for general guidance only and cannot cover all legal aspects. For any significant land transaction, it is **mandatory to consult a local legal expert or lawyer**. Laws vary by state, change frequently, and may apply differently to your specific situation. This tool serves only as an initial guideline.`;
        stateNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mb-2', 'text-sm', 'leading-relaxed', 'text-blue-800', 'mt-4');
        resultsList.appendChild(stateNote);
        console.log("Results displayed.");
    }
    
    verifyBtn.addEventListener('click', function() {
        console.log("Verify button clicked.");
        const currentLang = document.documentElement.lang;
        displayResults(currentLang);
    });
});
