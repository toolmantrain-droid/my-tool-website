// DOMContentLoaded इवेंट के लिए इंतजार करें ताकि सुनिश्चित हो सके कि HTML पूरी तरह से लोड हो गया है।
document.addEventListener('DOMContentLoaded', function() {
    console.log("dl-mock-test-tool.js: DOM सामग्री लोड हो गई। ड्राइविंग लाइसेंस मॉक टेस्ट स्क्रिप्ट शुरू हो रही है।");

    // HTML तत्वों के संदर्भ प्राप्त करें
    const stateSelect = document.getElementById('state-select');
    const quizContainer = document.getElementById('quiz-container');
    const questionDisplay = document.getElementById('question-display');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const quizResultsSection = document.getElementById('quiz-results-section');
    const scoreDisplay = document.getElementById('score-display');
    const passFailStatus = document.getElementById('pass-fail-status');
    const retakeTestBtn = document.getElementById('retake-test-btn');
    const answersReviewList = document.getElementById('answers-review-list');
    
    // इन-पेज संदेश बॉक्स के लिए HTML से संदर्भ प्राप्त करें
    const messageBox = document.getElementById('message-box');
    if (!messageBox) {
        console.error("dl-mock-test-tool.js Error: 'message-box' तत्व नहीं मिला। स्क्रिप्ट को जारी रखने में समस्या हो सकती है।");
        // यदि संदेश बॉक्स नहीं मिलता है, तो इसे गतिशील रूप से बनाने का एक फॉलबैक (लेकिन आदर्श नहीं)
        // const tempMessageBox = document.createElement('div');
        // tempMessageBox.id = 'message-box';
        // tempMessageBox.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'mb-4', 'hidden');
        // document.querySelector('.tool-content').insertBefore(tempMessageBox, document.querySelector('.form-group'));
        // messageBox = tempMessageBox;
    }
    // मैसेज बॉक्स के अंदर टेक्स्ट स्पैन को अपडेट करें
    if (messageBox) { // सुनिश्चित करें कि messageBox मौजूद है
        messageBox.innerHTML = '<strong class="font-bold">चेतावनी!</strong> <span class="block sm:inline" id="message-box-text"></span>';
    }


    // आवश्यक तत्वों की जांच करें (console.error से पहले null की जांच करें)
    if (!stateSelect) console.error("dl-mock-test-tool.js Error: 'state-select' तत्व नहीं मिला।");
    if (!quizContainer) console.error("dl-mock-test-tool.js Error: 'quiz-container' तत्व नहीं मिला।");
    if (!questionDisplay) console.error("dl-mock-test-tool.js Error: 'question-display' तत्व नहीं मिला।");
    if (!questionText) console.error("dl-mock-test-tool.js Error: 'question-text' तत्व नहीं मिला।");
    if (!optionsContainer) console.error("dl-mock-test-tool.js Error: 'options-container' तत्व नहीं मिला।");
    if (!nextQuestionBtn) console.error("dl-mock-test-tool.js Error: 'next-question-btn' तत्व नहीं मिला।");
    if (!submitQuizBtn) console.error("dl-mock-test-tool.js Error: 'submit-quiz-btn' तत्व नहीं मिला।");
    if (!quizResultsSection) console.error("dl-mock-test-tool.js Error: 'quiz-results-section' नहीं मिला। यह परिणाम प्रदर्शित करने के लिए महत्वपूर्ण है।");
    if (!scoreDisplay) console.error("dl-mock-test-tool.js Error: 'score-display' नहीं मिला।");
    if (!passFailStatus) console.error("dl-mock-test-tool.js Error: 'pass-fail-status' नहीं मिला।");
    if (!retakeTestBtn) console.error("dl-mock-test-tool.js Error: 'retake-test-btn' नहीं मिला।");
    if (!answersReviewList) console.error("dl-mock-test-tool.js Error: 'answers-review-list' नहीं मिला।");

    // मॉक टेस्ट प्रश्न और उत्तर
    const questions = [
        {
            question: "यह सड़क चिह्न क्या इंगित करता है?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/India_road_sign_A1.svg/100px-India_road_sign_A1.svg.png", // Pedestrian Crossing
            altText: "लाल बॉर्डर और काले पैदल यात्री प्रतीक वाला त्रिकोणीय सड़क चिह्न, पैदल यात्री क्रॉसिंग आगे इंगित करता है।",
            options: ["पैदल यात्री क्रॉसिंग आगे", "पैदल यात्रियों को अनुमति नहीं", "स्कूल आगे", "अस्पताल आगे"],
            answer: "पैदल यात्री क्रॉसिंग आगे",
            explanation: "यह चिह्न एक चेतावनी चिह्न है जो इंगित करता है कि आगे एक निर्दिष्ट पैदल यात्री क्रॉसिंग ज़ोन है। ड्राइवरों को धीमा होना चाहिए और रुकने के लिए तैयार रहना चाहिए।"
        },
        {
            question: "भारत के अधिकांश राज्यों में ड्राइविंग के लिए कानूनी शराब पीने की उम्र क्या है?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/India_road_sign_R1.svg/100px-India_road_sign_R1.svg.png", // No Entry (mandatory sign का उदाहरण)
            altText: "लाल बॉर्डर और सफेद क्षैतिज पट्टी वाला गोलाकार सड़क चिह्न, प्रवेश नहीं इंगित करता है।",
            options: ["18 वर्ष", "21 वर्ष", "25 वर्ष", "कोई आयु सीमा नहीं"],
            answer: "21 वर्ष",
            explanation: "यह मोटर वाहन अधिनियम के तहत भारत के अधिकांश राज्यों में ड्राइविंग (और शराब का सेवन) के लिए कानूनी शराब पीने की उम्र 21 वर्ष है।"
        },
        {
            question: "सड़क पर एक ठोस सफेद रेखा क्या इंगित करती है?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/India_road_marking_solid_white_line.svg/100px-India_road_marking_solid_white_line.svg.png", // Solid White Line
            altText: "एक ठोस सफेद रेखा दिखा रहा सड़क चिह्न।",
            options: ["आप लेन बदल सकते हैं", "आपको लेन नहीं बदलनी चाहिए", "ओवरटेकिंग की अनुमति है", "पार्किंग की अनुमति है"],
            answer: "आपको लेन नहीं बदलनी चाहिए",
            explanation: "एक ठोस सफेद रेखा इंगित करती है कि लेन बदलना, ओवरटेक करना या रेखा को पार करना मना है। आपको अपनी वर्तमान लेन में रहना चाहिए।"
        },
        {
            question: "यदि आपका वाहन राजमार्ग पर खराब हो जाता है तो आपको क्या करना चाहिए?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/India_road_sign_W1.svg/100px-India_road_sign_W1.svg.png", // Warning Triangle (उदाहरण)
            altText: "लाल बॉर्डर और काले विस्मयादिबोधक चिह्न वाला त्रिकोणीय सड़क चिह्न, सामान्य चेतावनी इंगित करता है।",
            options: ["वाहन छोड़कर मदद मांगना", "किनारे पर पार्क करना, हैजार्ड लाइट जलाना और चेतावनी त्रिभुज लगाना", "सड़क के बीच में इसे ठीक करने की कोशिश करना", "एक दोस्त को बुलाना जो आपको टो कर सके"],
            answer: "किनारे पर पार्क करना, हैजार्ड लाइट जलाना और चेतावनी त्रिभुज लगाना",
            explanation: "राजमार्ग पर खराब होने की स्थिति में, अपने वाहन को अत्यधिक बाईं ओर ले जाएं, हैजार्ड लाइट जलाएं, और अन्य ड्राइवरों को सतर्क करने और दुर्घटनाओं को रोकने के लिए अपने वाहन से 50-100 मीटर पीछे एक चेतावनी त्रिभुज लगाएं।"
        },
        {
            question: "भारत में राष्ट्रीय राजमार्ग पर हल्के मोटर वाहन (LMV) के लिए अधिकतम गति सीमा क्या है (जब तक कि अन्यथा निर्दिष्ट न हो)?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/India_road_sign_R2.svg/100px-India_road_sign_R2.svg.png", // Speed Limit (उदाहरण)
            altText: "लाल बॉर्डर और संख्या 50 वाला गोलाकार सड़क चिह्न, गति सीमा इंगित करता है।",
            options: ["60 किमी/घंटा", "80 किमी/घंटा", "100 किमी/घंटा", "120 किमी/घंटा"],
            answer: "100 किमी/घंटा",
            explanation: "हालांकि विशिष्ट सीमाएं राज्य और सड़क के अनुसार भिन्न हो सकती हैं, राष्ट्रीय राजमार्गों पर LMVs के लिए सामान्य अधिकतम गति सीमा 100 किमी/घंटा है। हमेशा स्थानीय साइनेज की जांच करें।"
        },
        {
            question: "इस गोलाकार सड़क चिह्न का क्या अर्थ है?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/India_road_sign_R4.svg/100px-India_road_sign_R4.svg.png", // No Left Turn
            altText: "लाल बॉर्डर और लाल विकर्ण रेखा के साथ बाएं ओर इशारा करने वाले काले तीर वाला गोलाकार सड़क चिह्न, बाएं मुड़ने की अनुमति नहीं इंगित करता है।",
            options: ["बाएं मुड़ें", "बाएं मुड़ना मना है", "एक तरफा बाईं ओर", "बाईं लेन आगे"],
            answer: "बाएं मुड़ना मना है",
            explanation: "यह अनिवार्य चिह्न इंगित करता है कि उस चौराहे या सड़क खंड पर बाएं मुड़ना मना है।"
        },
        {
            question: "एक गोलचक्कर के पास पहुंचते समय आपको क्या करना चाहिए?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/India_road_sign_M1.svg/100px-India_road_sign_M1.svg.png", // Roundabout (mandatory sign का उदाहरण)
            altText: "सफेद तीरों के साथ एक गोलचक्कर प्रतीक वाला नीला गोलाकार सड़क चिह्न, अनिवार्य गोलचक्कर इंगित करता है।",
            options: ["दाईं ओर से आने वाले यातायात को रास्ता दें", "बाईं ओर से आने वाले यातायात को रास्ता दें", "रुकें और सभी यातायात के गुजरने का इंतजार करें", "बिना रुके प्रवेश करें"],
            answer: "दाईं ओर से आने वाले यातायात को रास्ता दें",
            explanation: "भारत में, गोलचक्कर में यातायात दक्षिणावर्त चलता है। आपको अपने दाईं ओर से आ रहे गोलचक्कर में पहले से मौजूद यातायात को रास्ता देना चाहिए। यह गोलचक्करों से सुरक्षित नेविगेशन के लिए एक मौलिक नियम है।"
        },
        {
            question: "भारत में वैध ड्राइविंग लाइसेंस के बिना गाड़ी चलाने पर क्या दंड है?",
            options: ["छोटा जुर्माना", "कारावास या भारी जुर्माना", "केवल चेतावनी", "कोई दंड नहीं"],
            answer: "कारावास या भारी जुर्माना",
            explanation: "वैध लाइसेंस के बिना गाड़ी चलाना मोटर वाहन अधिनियम के तहत एक गंभीर अपराध है, जिसमें महत्वपूर्ण जुर्माना (पहले अपराध के लिए ₹5,000 तक) और/या कारावास लगता है। यह अवैध और असुरक्षित है।"
        },
        {
            question: "यह नीला गोलाकार सड़क चिह्न क्या दर्शाता है?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/India_road_sign_M2.svg/100px-India_road_sign_M2.svg.png", // Go Straight Only
            altText: "सीधे आगे की ओर इशारा करने वाले सफेद तीर वाला नीला गोलाकार सड़क चिह्न, केवल सीधे जाने का संकेत देता है।",
            options: ["केवल सीधे जाएं", "एक तरफा सड़क", "प्रवेश नहीं", "आगे रुकें"],
            answer: "केवल सीधे जाएं",
            explanation: "यह अनिवार्य चिह्न इंगित करता है कि वाहन केवल सीधे आगे बढ़ सकते हैं और उन्हें बाएं या दाएं मुड़ने की अनुमति नहीं है।"
        },
        {
            question: "गियर वाले दोपहिया वाहन (गियर वाली मोटरसाइकिल) के लिए लर्नर्स लाइसेंस प्राप्त करने की न्यूनतम आयु क्या है?",
            options: ["16 वर्ष", "18 वर्ष", "20 वर्ष", "21 वर्ष"],
            answer: "18 वर्ष",
            explanation: "गियर वाले दोपहिया वाहन के लिए लर्नर्स लाइसेंस की न्यूनतम आयु 18 वर्ष है। मोटर वाहन अधिनियम के अनुसार, बिना गियर वाले दोपहिया वाहन (जैसे स्कूटर) के लिए, माता-पिता की सहमति से यह 16 वर्ष है।"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = []; // उपयोगकर्ता द्वारा चयनित उत्तरों को संग्रहीत करने के लिए

    // राज्य के अनुसार आरटीओ/ट्रैफिक पुलिस पोर्टल लिंक (उदाहरणात्मक)
    const rtoLinks = {
        'uttar-pradesh': {
            rto_portal: 'https://parivahan.gov.in/parivahan//en/content/uttar-pradesh',
            traffic_police_portal: 'https://traffic.uppolice.gov.in/'
        },
        'maharashtra': {
            rto_portal: 'https://transport.maharashtra.gov.in/',
            traffic_police_portal: 'https://mumbaipolice.gov.in/Traffic'
        },
        'delhi': {
            rto_portal: 'https://transport.delhi.gov.in/',
            traffic_police_portal: 'https://delhitrafficpolice.nic.in/'
        },
        'bihar': {
            rto_portal: 'https://transport.bih.nic.in/',
            traffic_police_portal: 'https://biharpolice.bih.nic.in/traffic-police/'
        },
        'west-bengal': {
            rto_portal: 'https://transport.wb.gov.in/',
            traffic_police_portal: 'https://www.kolkatatrafficpolice.gov.in/'
        },
        'madhya-pradesh': {
            rto_portal: 'https://transport.mp.gov.in/',
            traffic_police_portal: 'https://mppolice.gov.in/traffic-police'
        },
        'rajasthan': {
            rto_portal: 'https://transport.rajasthan.gov.in/',
            traffic_police_portal: 'https://police.rajasthan.gov.in/traffic'
        },
        'gujarat': {
            rto_portal: 'https://rtogujarat.gov.in/',
            traffic_police_portal: 'https://traffic.gujaratpolice.gov.in/'
        },
        'karnataka': {
            rto_portal: 'https://transport.karnataka.gov.in/',
            traffic_police_portal: 'https://www.bangaloretrafficpolice.gov.in/'
        },
        'tamil-nadu': {
            rto_portal: 'https://tnsta.gov.in/',
            traffic_police_portal: 'https://www.chennaitrafficpolice.gov.in/'
        }
    };

    // इन-पेज संदेश दिखाने का कार्य
    function showMessage(text, type = 'error') {
        const messageBoxText = document.getElementById('message-box-text');
        if (messageBox && messageBoxText) { // सुनिश्चित करें कि दोनों तत्व मौजूद हैं
            messageBoxText.textContent = text;
            messageBox.classList.remove('hidden');
            if (type === 'error') {
                messageBox.classList.remove('bg-green-100', 'border-green-400', 'text-green-700');
                messageBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else { // सफलता या जानकारी के लिए
                messageBox.classList.remove('bg-red-100', 'border-red-400', 'text-red-700');
                messageBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
            // कुछ समय बाद संदेश छिपाएं
            setTimeout(() => {
                messageBox.classList.add('hidden');
            }, 5000);
        }
    }

    // प्रश्न लोड करने का कार्य
    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            
            // questionDisplay में पिछली सामग्री साफ़ करें
            if (questionDisplay) {
                questionDisplay.innerHTML = ''; 
            } else {
                console.error("questionDisplay तत्व नहीं मिला। प्रश्न लोड नहीं किया जा सकता है।");
                return;
            }

            // प्रश्न टेक्स्ट जोड़ें
            const questionP = document.createElement('p');
            questionP.classList.add('text-lg', 'font-semibold');
            questionP.textContent = `प्र०${currentQuestionIndex + 1}: ${q.question}`;
            questionDisplay.appendChild(questionP);

            // यदि उपलब्ध हो तो छवि जोड़ें
            if (q.image) {
                const questionImg = document.createElement('img');
                questionImg.src = q.image;
                questionImg.alt = q.altText || `सड़क चिह्न: ${q.question}`; // एक्सेसिबिलिटी और एसईओ के लिए Alt टेक्स्ट
                questionImg.classList.add('mt-4', 'mb-4', 'max-w-xs', 'h-auto', 'rounded-lg', 'shadow-md'); // छवि स्टाइलिंग के लिए Tailwind क्लासेस
                // टूटी हुई छवियों के लिए फॉलबैक
                questionImg.onerror = function() {
                    this.onerror=null; // यदि फॉलबैक भी विफल हो जाता है तो अनंत लूप को रोकता है
                    this.src='https://placehold.co/100x100/CCCCCC/000000?text=छवि+नहीं+मिली'; // जेनेरिक फॉलबैक
                    this.alt='छवि नहीं मिली';
                };
                questionDisplay.appendChild(questionImg);
            }

            if (optionsContainer) {
                optionsContainer.innerHTML = ''; // पिछले विकल्पों को साफ़ करें
            } else {
                console.error("optionsContainer तत्व नहीं मिला। विकल्प लोड नहीं किए जा सकते हैं।");
                return;
            }

            q.options.forEach((option, index) => {
                const radioDiv = document.createElement('div');
                radioDiv.classList.add('flex', 'items-center', 'mb-2'); // अलाइनमेंट के लिए Tailwind क्लासेस
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'answer';
                radioInput.value = option;
                radioInput.id = `option${index}`;
                radioInput.classList.add('mr-2', 'form-radio', 'h-4', 'w-4', 'text-purple-600'); // रेडियो स्टाइलिंग के लिए Tailwind
                radioInput.setAttribute('aria-label', `विकल्प ${index + 1}: ${option}`); // एक्सेसिबिलिटी

                const radioLabel = document.createElement('label');
                radioLabel.htmlFor = `option${index}`;
                radioLabel.textContent = option;
                radioLabel.classList.add('text-gray-700');

                radioDiv.appendChild(radioInput);
                radioDiv.appendChild(radioLabel);
                optionsContainer.appendChild(radioDiv);
            });

            if (nextQuestionBtn) {
                nextQuestionBtn.classList.remove('hidden');
                nextQuestionBtn.setAttribute('aria-label', 'अगला प्रश्न'); // एक्सेसिबिलिटी
            }
            if (submitQuizBtn) {
                submitQuizBtn.classList.add('hidden');
                submitQuizBtn.setAttribute('aria-label', 'टेस्ट जमा करें'); // एक्सेसिबिलिटी
            }
            if (quizResultsSection) {
                quizResultsSection.classList.add('hidden'); // टेस्ट के दौरान परिणाम अनुभाग छिपाएं
            }
            
            // अंतिम प्रश्न पर सबमिट बटन दिखाएं
            if (currentQuestionIndex === questions.length - 1) {
                if (nextQuestionBtn) nextQuestionBtn.classList.add('hidden');
                if (submitQuizBtn) submitQuizBtn.classList.remove('hidden');
            }
        } else {
            console.warn("टेस्ट की लंबाई से परे प्रश्न लोड करने का प्रयास किया गया।");
        }
    }

    // चयनित उत्तर प्राप्त करने का कार्य
    function getSelectedAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        return selectedOption ? selectedOption.value : null;
    }

    // उत्तर की जांच करने और स्कोर अपडेट करने का कार्य
    function checkAnswer() {
        const selectedAnswer = getSelectedAnswer();
        const correctAnswer = questions[currentQuestionIndex].answer;
        userAnswers[currentQuestionIndex] = selectedAnswer; // उपयोगकर्ता का उत्तर संग्रहीत करें

        if (selectedAnswer === correctAnswer) {
            score++;
        }
    }

    // अंतिम परिणाम प्रदर्शित करने का कार्य
    function displayResults() {
        if (quizContainer) quizContainer.classList.add('hidden'); // क्विज़ कंटेनर छिपाएं
        if (quizResultsSection) quizResultsSection.classList.remove('hidden'); // परिणाम अनुभाग दिखाएं

        if (scoreDisplay) scoreDisplay.textContent = `${score} / ${questions.length}`;
        const percentage = (score / questions.length) * 100;

        if (passFailStatus) {
            if (percentage >= 60) { // 60% उत्तीर्ण स्कोर मानते हुए
                passFailStatus.textContent = "उत्तीर्ण";
                passFailStatus.classList.remove('text-red-600');
                passFailStatus.classList.add('text-green-600');
            } else {
                passFailStatus.textContent = "अनुत्तीर्ण";
                passFailStatus.classList.remove('text-green-600');
                passFailStatus.classList.add('text-red-600');
            }
        }

        // उत्तर समीक्षा प्रदर्शित करें
        if (answersReviewList) answersReviewList.innerHTML = '';
        questions.forEach((q, index) => {
            const li = document.createElement('li');
            li.classList.add('p-3', 'rounded-lg', 'mb-2');
            const userAnswer = userAnswers[index];
            const isCorrect = (userAnswer === q.answer);

            li.innerHTML = `
                <p class="font-semibold">${index + 1}. ${q.question}</p>
                ${q.image ? `<img src="${q.image}" alt="${q.altText || 'सड़क चिह्न'}" class="my-2 max-w-[80px] h-auto rounded-md">` : ''}
                <p>आपका उत्तर: <span class="${isCorrect ? 'text-green-700' : 'text-red-700'}">${userAnswer || 'उत्तर नहीं दिया गया'}</span></p>
                <p>सही उत्तर: <span class="text-green-700">${q.answer}</span></p>
                <p class="text-sm text-gray-600">स्पष्टीकरण: ${q.explanation}</p>
            `;
            li.classList.add(isCorrect ? 'bg-green-50' : 'bg-red-50');
            if (answersReviewList) answersReviewList.appendChild(li);
        });

        // एसईओ-केंद्रित और आरटीओ लिंक नोट जोड़ें
        addSEONoteAndRTOLinks();
    }

    // एसईओ नोट और आरटीओ लिंक जोड़ने का कार्य
    function addSEONoteAndRTOLinks() {
        const selectedState = stateSelect.value;
        let rtoPortal = '';
        let trafficPolicePortal = '';

        if (selectedState && rtoLinks[selectedState]) {
            rtoPortal = rtoLinks[selectedState].rto_portal;
            trafficPolicePortal = rtoLinks[selectedState].traffic_police_portal;
        }

        const seoNote = document.createElement('li');
        seoNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mt-4', 'text-sm', 'leading-relaxed', 'text-blue-800');
        seoNote.innerHTML = `
            **एसईओ और वास्तविक दुनिया की तैयारी के लिए महत्वपूर्ण नोट:**
            <br>
            यह मॉक टेस्ट अभ्यास के लिए है। आधिकारिक नियमों, संकेतों और वास्तविक ड्राइविंग लाइसेंस आवेदन प्रक्रिया के लिए, हमेशा आधिकारिक सरकारी पोर्टलों का संदर्भ लें।
            <br><br>
            **${selectedState ? stateSelect.options[stateSelect.selectedIndex].textContent : 'आपके राज्य'} के लिए आधिकारिक पोर्टल:**
            <ul>
                ${rtoPortal ? `<li><a href="${rtoPortal}" target="_blank" class="text-blue-700 hover:underline">राज्य आरटीओ/परिवहन विभाग पोर्टल</a></li>` : ''}
                ${trafficPolicePortal ? `<li><a href="${trafficPolicePortal}" target="_blank" class="text-blue-700 hover:underline">राज्य ट्रैफिक पुलिस विभाग</a></li>` : ''}
                <li>विशिष्ट क्षेत्रीय आरटीओ विवरण या स्थानीय यातायात नियमों के लिए, कृपया अपने जिले की आधिकारिक आरटीओ वेबसाइट या यातायात पुलिस वेबसाइट खोजें।</li>
            </ul>
            <br>
            Google पर "हलचल मचाने" और सबसे मूल्यवान संसाधन प्रदान करने के लिए, इस तरह के टूल को आवश्यकता होगी:
            <ul>
                <li>**व्यापक, नियमित रूप से अद्यतन प्रश्न बैंक** जिसमें हर राज्य के सभी संभावित आरटीओ प्रश्न शामिल हों।</li>
                <li>आधिकारिक आरटीओ डेटाबेस (यदि एपीआई उपलब्ध हैं) के साथ **वास्तविक समय एकीकरण**।</li>
                <li>मोटर वाहन अधिनियम के प्रासंगिक अनुभागों सहित प्रत्येक उत्तर के लिए **व्यापक स्पष्टीकरण**।</li>
                <li>उपयोगकर्ता के प्रदर्शन के आधार पर **व्यक्तिगत शिक्षण पथ**।</li>
                <li>शैक्षिक या सरकारी-संबंधित साइटों से **मजबूत आधिकारिक बैकलिंक प्रोफ़ाइल**।</li>
                <li>आपके कंटेंट को बेहतर ढंग से समझने में Google की मदद करने के लिए परीक्षण प्रश्नों और उत्तरों के लिए **संरचित डेटा (Schema.org) का कार्यान्वयन**।</li>
                <li>समान सामग्री वाले पृष्ठों पर **कैननिकल टैग का उचित उपयोग** (उदाहरण के लिए, यदि आपके पास राज्य-विशिष्ट परीक्षण संस्करण हैं) डुप्लिकेट सामग्री समस्याओं से बचने के लिए।</li>
                <li>आरटीओ नियमों और प्रश्नों में परिवर्तनों को दर्शाने के लिए **निरंतर सामग्री अपडेट**।</li>
            </ul>
            यह टूल एक मॉक टेस्ट के कार्यात्मक प्रदर्शन के रूप में कार्य करता है।
        `;
        if (answersReviewList) answersReviewList.appendChild(seoNote);
    }

    // इवेंट लिसनर्स
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            if (getSelectedAnswer() === null) {
                showMessage("कृपया आगे बढ़ने से पहले एक उत्तर चुनें।");
                return;
            }
            checkAnswer();
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                displayResults();
            }
        });
    }

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            if (getSelectedAnswer() === null && currentQuestionIndex === questions.length - 1) {
                showMessage("कृपया सबमिट करने से पहले एक उत्तर चुनें।");
                return;
            }
            checkAnswer(); // अंतिम उत्तर की जांच करें
            displayResults();
        });
    }

    if (retakeTestBtn) {
        retakeTestBtn.addEventListener('click', function() {
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            if (quizResultsSection) quizResultsSection.classList.add('hidden');
            if (quizContainer) quizContainer.classList.remove('hidden');
            loadQuestion();
            if (messageBox) messageBox.classList.add('hidden'); // रीटेक पर संदेश बॉक्स छिपाएं
        });
    }

    // प्रारंभिक लोड - सभी तत्वों के मौजूद होने की जांच के बाद
    if (questionDisplay && optionsContainer && nextQuestionBtn && submitQuizBtn && quizResultsSection && scoreDisplay && passFailStatus && retakeTestBtn && answersReviewList) {
        loadQuestion();
    } else {
        console.error("सभी आवश्यक HTML तत्व JavaScript द्वारा नहीं मिले। टूल को प्रारंभिक नहीं किया जा सकता है।");
        showMessage("त्रुटि: आवश्यक पेज तत्व लोड नहीं हो सके। कृपया पेज को रीफ्रेश करें।", "error");
    }
});
