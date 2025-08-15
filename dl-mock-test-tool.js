// Wait for the DOM content to be fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', function() {
    console.log("dl-mock-test-tool.js: DOM content loaded. Initializing Driving License Mock Test script.");

    // Get references to HTML elements by their IDs.
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
    
    // Get reference to the in-page message box.
    const messageBox = document.getElementById('message-box');
    // Check if the messageBox element exists. If not, log an error.
    if (!messageBox) {
        console.error("dl-mock-test-tool.js Error: 'message-box' element not found. Script may have issues continuing.");
    }
    // Update the inner HTML of the message box to include a text span.
    if (messageBox) { // Ensure messageBox exists before trying to modify its innerHTML
        messageBox.innerHTML = '<strong class="font-bold">Warning!</strong> <span class="block sm:inline" id="message-box-text"></span>';
    }

    // Perform null checks for essential HTML elements and log errors if not found.
    if (!stateSelect) console.error("dl-mock-test-tool.js Error: 'state-select' element not found.");
    if (!quizContainer) console.error("dl-mock-test-tool.js Error: 'quiz-container' element not found.");
    if (!questionDisplay) console.error("dl-mock-test-tool.js Error: 'question-display' element not found.");
    if (!questionText) console.error("dl-mock-test-tool.js Error: 'question-text' element not found.");
    if (!optionsContainer) console.error("dl-mock-test-tool.js Error: 'options-container' element not found.");
    if (!nextQuestionBtn) console.error("dl-mock-test-tool.js Error: 'next-question-btn' element not found.");
    if (!submitQuizBtn) console.error("dl-mock-test-tool.js Error: 'submit-quiz-btn' element not found.");
    if (!quizResultsSection) console.error("dl-mock-test-tool.js Error: 'quiz-results-section' not found. This is crucial for displaying results.");
    if (!scoreDisplay) console.error("dl-mock-test-tool.js Error: 'score-display' not found.");
    if (!passFailStatus) console.error("dl-mock-test-tool.js Error: 'pass-fail-status' not found.");
    if (!retakeTestBtn) console.error("dl-mock-test-tool.js Error: 'retake-test-btn' not found.");
    if (!answersReviewList) console.error("dl-mock-test-tool.js Error: 'answers-review-list' not found.");

    // Array of mock test questions with details in English.
    const questions = [
        {
            question: "What does this road sign indicate?",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/India_road_sign_A1.svg", // Direct SVG link
            altText: "Triangular road sign with red border and black pedestrian symbol, indicating pedestrian crossing ahead.",
            options: ["Pedestrian crossing ahead", "No pedestrians allowed", "School ahead", "Hospital ahead"],
            answer: "Pedestrian crossing ahead",
            explanation: "This sign is a warning sign indicating that there is a designated pedestrian crossing zone ahead. Drivers should slow down and be prepared to stop."
        },
        {
            question: "What is the legal drinking age for driving in most Indian states?",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/India_road_sign_R1.svg", // Direct SVG link
            altText: "Circular road sign with red border and white horizontal bar, indicating no entry.",
            options: ["18 years", "21 years", "25 years", "No age limit"],
            answer: "21 years",
            explanation: "In most Indian states, the legal drinking age for driving (and consuming alcohol) is 21 years. Driving under the influence of alcohol is a serious offense punishable by law under the Motor Vehicles Act."
        },
        {
            question: "What does a solid white line on the road indicate?",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/India_road_marking_solid_white_line.svg", // Direct SVG link
            altText: "Road marking showing a solid white line.",
            options: ["You can change lanes", "You must not change lanes", "Overtaking is allowed", "Parking is allowed"],
            answer: "You must not change lanes",
            explanation: "A solid white line indicates that changing lanes, overtaking, or crossing the line is prohibited. You must stay in your current lane."
        },
        {
            question: "What should you do if your vehicle breaks down on a highway?",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/07/India_road_sign_W1.svg", // Direct SVG link
            altText: "Triangular road sign with red border and black exclamation mark, indicating general warning.",
            options: ["Leave the vehicle and seek help", "Park on the side, turn on hazard lights, and place a warning triangle", "Try to fix it in the middle of the road", "Call a friend to tow you"],
            answer: "Park on the side, turn on hazard lights, and place a warning triangle",
            explanation: "In case of a breakdown on a highway, move your vehicle to the extreme left, turn on hazard lights, and place a warning triangle 50-100 meters behind your vehicle to alert other drivers and prevent accidents."
        },
        {
            question: "What is the maximum speed limit for a light motor vehicle (LMV) on a national highway in India (unless otherwise specified)?",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/India_road_sign_R2.svg", // Direct SVG link
            altText: "Circular road sign with red border and number 50, indicating speed limit.",
            options: ["60 km/h", "80 km/h", "100 km/h", "120 km/h"],
            answer: "100 km/h",
            explanation: "While specific limits can vary by state and road, the general maximum speed limit for LMVs on National Highways is 100 km/h. Always check local signage for specific speed limits."
        },
        {
            question: "What does this circular road sign mean?",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/India_road_sign_R4.svg", // Direct SVG link
            altText: "Circular road sign with red border and black arrow pointing left with a red diagonal line through it, indicating no left turn.",
            options: ["Turn left", "No left turn", "One way left", "Left lane ahead"],
            answer: "No left turn",
            explanation: "This mandatory sign indicates that taking a left turn is prohibited at that intersection or road section."
        },
        {
            question: "When approaching a roundabout, what should you do?",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/India_road_sign_M1.svg", // Direct SVG link
            altText: "Blue circular road sign with white arrows forming a roundabout symbol, indicating mandatory roundabout.",
            options: ["Give way to traffic from the right", "Give way to traffic from the left", "Stop and wait for all traffic to pass", "Enter without stopping"],
            answer: "Give way to traffic from the right",
            explanation: "In India, traffic in a roundabout moves clockwise. You must give way to traffic already in the roundabout coming from your right. This is a fundamental rule for safe navigation through roundabouts."
        },
        {
            question: "What is the penalty for driving without a valid driving license in India?",
            options: ["Small fine", "Imprisonment or heavy fine", "Warning only", "No penalty"],
            answer: "Imprisonment or heavy fine",
            explanation: "Driving without a valid license is a serious offense under the Motor Vehicles Act, attracting significant fines (up to ₹5,000 for first offense) and/or imprisonment. It is illegal and unsafe."
        },
        {
            question: "What does this blue circular road sign mean?",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/India_road_sign_M2.svg", // Direct SVG link
            altText: "Blue circular road sign with a white arrow pointing straight ahead, indicating go straight only.",
            options: ["Go straight only", "One way street", "No entry", "Stop ahead"],
            answer: "Go straight only",
            explanation: "This mandatory sign indicates that vehicles must proceed straight ahead only and are not permitted to turn left or right."
        },
        {
            question: "What is the minimum age to obtain a learner's license for a geared two-wheeler (motorcycle with gear)?",
            options: ["16 years", "18 years", "20 years", "21 years"],
            answer: "18 years",
            explanation: "The minimum age for a learner's license for a geared two-wheeler is 18 years. For a non-geared two-wheeler (like a scooter) without gear, it's 16 years with parental consent, as per the Motor Vehicles Act."
        }
    ];

    let currentQuestionIndex = 0; // Tracks the current question being displayed
    let score = 0; // Stores the user's correct answers count
    let userAnswers = []; // To store user's selected answers for review

    // RTO/Traffic Police Portal Links by State (Illustrative data)
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
            traffic_police_portal: 'https://biharpolice.bih.nic.in/'
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

    /**
     * Displays an in-page message to the user.
     * @param {string} text - The message to display.
     * @param {string} type - The type of message ('error' for red, 'success' for green).
     */
    function showMessage(text, type = 'error') {
        const messageBoxText = document.getElementById('message-box-text');
        if (messageBox && messageBoxText) { 
            messageBoxText.textContent = text;
            messageBox.classList.remove('hidden'); // Make the message box visible
            // Adjust background and text color based on message type
            if (type === 'error') {
                messageBox.classList.remove('bg-green-100', 'border-green-400', 'text-green-700');
                messageBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else { // For success or info messages
                messageBox.classList.remove('bg-red-100', 'border-red-400', 'text-red-700');
                messageBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
            // Hide the message after 5 seconds
            setTimeout(() => {
                messageBox.classList.add('hidden');
            }, 5000);
        }
    }

    /**
     * Loads and displays the current question and its options.
     */
    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            
            // Clear previous content in the question display area.
            if (questionDisplay) {
                questionDisplay.innerHTML = ''; 
            } else {
                console.error("questionDisplay element not found. Cannot load question.");
                return; // Exit if essential element is missing
            }

            // Add question text.
            const questionP = document.createElement('p');
            questionP.classList.add('text-lg', 'font-semibold');
            questionP.textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
            questionDisplay.appendChild(questionP);

            // Add question image if available.
            if (q.image) {
                const questionImg = document.createElement('img');
                questionImg.src = q.image;
                questionImg.alt = q.altText || `Road sign for: ${q.question}`; 
                questionImg.classList.add('mt-4', 'mb-4', 'max-w-xs', 'h-auto', 'rounded-lg', 'shadow-md'); 
                // Fallback for broken images.
                questionImg.onerror = function() {
                    this.onerror=null; // Prevents infinite loop
                    this.src='https://placehold.co/100x100/CCCCCC/000000?text=Image+Not+Found'; // Generic fallback image
                    this.alt='Image not found';
                };
                questionDisplay.appendChild(questionImg);
            }

            // Clear previous options before loading new ones.
            if (optionsContainer) {
                optionsContainer.innerHTML = ''; 
            } else {
                console.error("optionsContainer element not found. Cannot load options.");
                return; // Exit if essential element is missing
            }

            // Create and append radio buttons for each option.
            q.options.forEach((option, index) => {
                const radioDiv = document.createElement('div');
                radioDiv.classList.add('flex', 'items-center', 'mb-2'); // Tailwind classes for alignment and spacing
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'answer'; // All options for one question share the same 'name'
                radioInput.value = option;
                radioInput.id = `option${index}`; // Unique ID for each radio button
                radioInput.classList.add('mr-2', 'form-radio', 'h-4', 'w-4', 'text-purple-600'); // Tailwind classes for styling
                radioInput.setAttribute('aria-label', `Option ${index + 1}: ${option}`); // Accessibility attribute

                const radioLabel = document.createElement('label');
                radioLabel.htmlFor = `option${index}`; // Link label to radio button by ID
                radioLabel.textContent = option;
                radioLabel.classList.add('text-gray-700');

                radioDiv.appendChild(radioInput);
                radioDiv.appendChild(radioLabel);
                optionsContainer.appendChild(radioDiv);
            });

            // Manage visibility of 'Next Question' and 'Submit Test' buttons.
            if (nextQuestionBtn) {
                nextQuestionBtn.classList.remove('hidden');
                nextQuestionBtn.setAttribute('aria-label', 'Next Question');
            }
            if (submitQuizBtn) {
                submitQuizBtn.classList.add('hidden');
                submitQuizBtn.setAttribute('aria-label', 'Submit Test');
            }
            if (quizResultsSection) {
                quizResultsSection.classList.add('hidden'); // Ensure results section is hidden during the test
            }
            
            // If it's the last question, show the submit button instead of next.
            if (currentQuestionIndex === questions.length - 1) {
                if (nextQuestionBtn) nextQuestionBtn.classList.add('hidden');
                if (submitQuizBtn) submitQuizBtn.classList.remove('hidden');
            }
        } else {
            console.warn("Attempted to load question beyond test length, or no questions defined.");
        }
    }

    /**
     * Gets the value of the currently selected radio button.
     * @returns {string|null} The value of the selected option, or null if none is selected.
     */
    function getSelectedAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        return selectedOption ? selectedOption.value : null;
    }

    /**
     * Checks the user's selected answer against the correct answer and updates the score.
     */
    function checkAnswer() {
        const selectedAnswer = getSelectedAnswer();
        const correctAnswer = questions[currentQuestionIndex].answer;
        userAnswers[currentQuestionIndex] = selectedAnswer; // Store the user's selected answer

        if (selectedAnswer === correctAnswer) {
            score++; // Increment score if correct
        }
    }

    /**
     * Displays the final test results, score, pass/fail status, and a review of answers.
     */
    function displayResults() {
        if (quizContainer) quizContainer.classList.add('hidden'); // Hide the quiz interface
        if (quizResultsSection) quizResultsSection.classList.remove('hidden'); // Show the results section

        if (scoreDisplay) scoreDisplay.textContent = `${score} / ${questions.length}`; // Display score
        const percentage = (score / questions.length) * 100;

        // Determine and display pass/fail status based on a 60% passing score.
        if (passFailStatus) {
            if (percentage >= 60) {
                passFailStatus.textContent = "PASSED";
                passFailStatus.classList.remove('text-red-600');
                passFailStatus.classList.add('text-green-600');
            } else {
                passFailStatus.textContent = "FAILED";
                passFailStatus.classList.remove('text-green-600');
                passFailStatus.classList.add('text-red-600');
            }
        }

        // Display a detailed review of all questions and answers.
        if (answersReviewList) answersReviewList.innerHTML = ''; // Clear previous review list
        questions.forEach((q, index) => {
            const li = document.createElement('li');
            li.classList.add('p-3', 'rounded-lg', 'mb-2');
            const userAnswer = userAnswers[index];
            const isCorrect = (userAnswer === q.answer);

            li.innerHTML = `
                <p class="font-semibold">${index + 1}. ${q.question}</p>
                ${q.image ? `<img src="${q.image}" alt="${q.altText || 'Road sign'}" class="my-2 max-w-[80px] h-auto rounded-md">` : ''}
                <p>Your Answer: <span class="${isCorrect ? 'text-green-700' : 'text-red-700'}">${userAnswer || 'Not Answered'}</span></p>
                <p>Correct Answer: <span class="text-green-700">${q.answer}</span></p>
                <p class="text-sm text-gray-600">Explanation: ${q.explanation}</p>
            `;
            // Apply background color based on correctness
            li.classList.add(isCorrect ? 'bg-green-50' : 'bg-red-50');
            if (answersReviewList) answersReviewList.appendChild(li);
        });

        // Add the SEO-focused note and RTO portal links.
        addSEONoteAndRTOLinks();
    }

    /**
     * Adds a note about SEO and provides official RTO/Traffic Police portal links.
     */
    function addSEONoteAndRTOLinks() {
        const selectedState = stateSelect.value;
        let rtoPortal = '';
        let trafficPolicePortal = '';

        // Get relevant portal links based on the selected state.
        if (selectedState && rtoLinks[selectedState]) {
            rtoPortal = rtoLinks[selectedState].rto_portal;
            trafficPolicePortal = rtoLinks[selectedState].traffic_police_portal;
        }

        const seoNote = document.createElement('li');
        seoNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mt-4', 'text-sm', 'leading-relaxed', 'text-blue-800');
        seoNote.innerHTML = `
            **Important Note for SEO & Real-World Preparation:**
            <br>
            This mock test is for practice. For official rules, signs, and the actual driving license application process, always refer to the official government portals.
            <br><br>
            **Official Portals for ${selectedState ? stateSelect.options[stateSelect.selectedIndex].textContent : 'Your State'}:**
            <ul>
                ${rtoPortal ? `<li><a href="${rtoPortal}" target="_blank" class="text-blue-700 hover:underline">State RTO/Transport Department Portal</a></li>` : ''}
                ${trafficPolicePortal ? `<li><a href="${trafficPolicePortal}" target="_blank" class="text-blue-700 hover:underline">State Traffic Police Department</a></li>` : ''}
                <li>For specific regional RTO details or local traffic rules, please search for your district's official RTO website or traffic police website.</li>
            </ul>
            <br>
            To truly "create a stir" on Google and provide the most valuable resource, a tool like this would need:
            <ul>
                <li>**Extensive, regularly updated question bank** covering all possible RTO questions for every state.</li>
                <li>**Real-time integration** with official RTO databases (if APIs are available).</li>
                <li>**Comprehensive explanations** for every answer, including relevant sections of the Motor Vehicles Act.</li>
                <li>**Personalized learning paths** based on user performance.</li>
                <li>**Strong authoritative backlinks** from educational or government-related sites.</li>
                <li>**Implementation of Structured Data (Schema.org)** for test questions and answers to help Google understand your content better.</li>
                <li>**Proper use of Canonical Tags** on pages with similar content (e.g., if you have state-specific test versions) to avoid duplicate content issues.</li>
                <li>**Continuous content updates** to reflect changes in RTO rules and questions.</li>
            </ul>
            This tool serves as a functional demonstration of a mock test.
        `;
        if (answersReviewList) answersReviewList.appendChild(seoNote);
    }

    // Event Listeners for user interactions.
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            // Check if an answer is selected before moving to the next question.
            if (getSelectedAnswer() === null) {
                showMessage("Please select an answer before proceeding.");
                return;
            }
            checkAnswer(); // Check the current question's answer
            currentQuestionIndex++; // Move to the next question
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // Load the next question
            } else {
                displayResults(); // If no more questions, display results
            }
        });
    }

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            // Check if an answer is selected for the last question before submitting.
            if (getSelectedAnswer() === null && currentQuestionIndex === questions.length - 1) {
                showMessage("Please select an answer before submitting.");
                return;
            }
            checkAnswer(); // Check the last question's answer
            displayResults(); // Display final results
        });
    }

    if (retakeTestBtn) {
        retakeTestBtn.addEventListener('click', function() {
            // Reset quiz state for a new attempt.
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];
            // Hide results and show quiz container.
            if (quizResultsSection) quizResultsSection.classList.add('hidden');
            if (quizContainer) quizContainer.classList.remove('hidden');
            loadQuestion(); // Load the first question again
            if (messageBox) messageBox.classList.add('hidden'); // Hide any previous messages
        });
    }

    // Initial load of the first question, after ensuring all necessary HTML elements are present.
    // This helps prevent errors if elements aren't fully loaded yet.
    if (questionDisplay && optionsContainer && nextQuestionBtn && submitQuizBtn && quizResultsSection && scoreDisplay && passFailStatus && retakeTestBtn && answersReviewList) {
        loadQuestion();
    } else {
        console.error("All required HTML elements were not found by JavaScript. Tool cannot be initialized.");
        showMessage("Error: Required page elements could not be loaded. Please refresh the page.", "error");
    }
});
