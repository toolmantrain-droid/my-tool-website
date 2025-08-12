document.addEventListener('DOMContentLoaded', function() {
    console.log("application-generator-tool.js: DOM content loaded. Initializing Application Letter Generator script.");

    // Get references to HTML elements
    const purposeSelect = document.getElementById('purpose-select'); // New: Purpose Select
    const senderNameInput = document.getElementById('sender-name-input');
    const senderAddressInput = document.getElementById('sender-address-input');
    const recipientDesignationInput = document.getElementById('recipient-designation-input');
    const recipientDepartmentInput = document.getElementById('recipient-department-input');
    const recipientAddressInput = document.getElementById('recipient-address-input');
    const subjectInput = document.getElementById('subject-input');
    const bodyContentInput = document.getElementById('body-content-input');
    const generateLetterBtn = document.getElementById('generate-letter-btn');
    const letterOutputSection = document.getElementById('letter-output-section');
    const generatedLetterDisplay = document.getElementById('generated-letter-display');
    const copyLetterBtn = document.getElementById('copy-letter-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn'); // New: Download PDF Button

    // Check if essential elements are found
    if (!purposeSelect) console.error("application-generator-tool.js Error: 'purpose-select' not found.");
    if (!senderNameInput) console.error("application-generator-tool.js Error: 'sender-name-input' not found.");
    if (!senderAddressInput) console.error("application-generator-tool.js Error: 'sender-address-input' not found.");
    if (!recipientDesignationInput) console.error("application-generator-tool.js Error: 'recipient-designation-input' not found.");
    if (!recipientDepartmentInput) console.error("application-generator-tool.js Error: 'recipient-department-input' not found.");
    if (!recipientAddressInput) console.error("application-generator-tool.js Error: 'recipient-address-input' not found.");
    if (!subjectInput) console.error("application-generator-tool.js Error: 'subject-input' not found.");
    if (!bodyContentInput) console.error("application-generator-tool.js Error: 'body-content-input' not found.");
    if (!generateLetterBtn) console.error("application-generator-tool.js Error: 'generate-letter-btn' not found.");
    if (!letterOutputSection) console.error("application-generator-tool.js Error: 'letter-output-section' not found.");
    if (!generatedLetterDisplay) console.error("application-generator-tool.js Error: 'generated-letter-display' not found.");
    if (!copyLetterBtn) console.error("application-generator-tool.js Error: 'copy-letter-btn' not found.");
    if (!downloadPdfBtn) console.error("application-generator-tool.js Error: 'download-pdf-btn' not found."); // New check

    // In-page message box for alerts
    const messageBox = document.createElement('div');
    messageBox.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'mb-4', 'hidden');
    messageBox.innerHTML = '<strong class="font-bold">Error!</strong> <span class="block sm:inline" id="message-box-text"></span>';
    // Insert message box before the first form group
    if (purposeSelect && purposeSelect.parentNode) {
        purposeSelect.parentNode.parentNode.insertBefore(messageBox, purposeSelect.parentNode);
    }

    // Function to show in-page message
    function showMessage(text, type = 'error') {
        const messageBoxText = document.getElementById('message-box-text');
        messageBoxText.textContent = text;
        messageBox.classList.remove('hidden');
        if (type === 'error') {
            messageBox.classList.remove('bg-green-100', 'border-green-400', 'text-green-700');
            messageBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        } else { // For success or info
            messageBox.classList.remove('bg-red-100', 'border-red-400', 'text-red-700');
            messageBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }
        // Hide message after some time
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 5000);
    }

    // Pre-defined letter templates
    const letterTemplates = {
        'leave': {
            subject: 'Application for Leave - [Your Name]',
            body: `Dear [Recipient's Designation],

I am writing to request a leave of absence from [Start Date] to [End Date] due to [Reason for Leave, e.g., personal reasons, family event, sickness].

I have completed all my urgent tasks and arranged for [Colleague's Name, if applicable] to cover my responsibilities during my absence. I will ensure all pending work is addressed before my leave begins.

I kindly request you to grant me leave for the aforementioned period. I will resume my duties on [Date of Resumption].

Thank you for your consideration.

Sincerely,
[Your Full Name]
`
        },
        'complaint': {
            subject: 'Complaint Regarding [Specific Issue]',
            body: `Dear [Recipient's Designation],

I am writing to formally complain about [Specific Issue, e.g., poor service, faulty product, public nuisance] that occurred on [Date of Incident] at [Location of Incident].

The details of the incident are as follows: [Provide a brief, factual description of the issue, including any relevant dates, times, and names. Be specific and concise.].

I have attached [Mention any attachments, e.g., copies of bills, photos, previous correspondence] for your reference.

I kindly request you to investigate this matter promptly and take necessary action to resolve it. I look forward to your quick response and a satisfactory resolution.

Thank you for your time and attention to this matter.

Sincerely,
[Your Full Name]
`
        },
        'bank-request': {
            subject: 'Request for Bank Statement - Account No. [Your Account Number]',
            body: `Dear [Recipient's Designation],

I am writing to request a bank statement for my Savings/Current Account bearing Account Number: [Your Account Number].

I require the statement for the period from [Start Date] to [End Date] for [Reason for Request, e.g., tax purposes, visa application, personal record].

Kindly provide me with the requested bank statement at your earliest convenience. Please let me know if any charges apply or if any further documentation is required from my end.

Thank you for your assistance.

Sincerely,
[Your Full Name]
`
        },
        'job-application': {
            subject: 'Application for the Post of [Job Title] - [Your Name]',
            body: `Dear [Recipient's Designation],

I am writing to express my keen interest in the position of [Job Title] advertised on [Platform where you saw the advertisement, e.g., LinkedIn, Company Website]. With my [Number] years of experience in [Your Field] and a strong background in [Mention 1-2 key skills/areas], I am confident that I possess the necessary skills and qualifications to excel in this role.

My resume, attached for your review, provides further details on my professional background and achievements. I am particularly drawn to [Company Name]'s commitment to [Mention a company value/mission that resonates with you].

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can benefit your team.

Sincerely,
[Your Full Name]
`
        },
        'general': {
            subject: 'Application for [Your Specific Purpose]',
            body: `Dear [Recipient's Designation],

I am writing this letter to [State your purpose clearly and concisely].

[Provide detailed explanation of your request, issue, or reason. Be factual and polite. Include any relevant dates, times, or reference numbers if applicable.]

I have attached [Mention any attachments, if any] for your kind reference.

I kindly request your favorable consideration and prompt action regarding this matter.

Thank you for your time and attention.

Sincerely,
[Your Full Name]
`
        }
    };

    // Function to populate fields based on selected purpose
    purposeSelect.addEventListener('change', function() {
        const selectedPurpose = purposeSelect.value;
        if (selectedPurpose && letterTemplates[selectedPurpose]) {
            const template = letterTemplates[selectedPurpose];
            subjectInput.value = template.subject;
            bodyContentInput.value = template.body;
        } else {
            // Clear fields if no purpose selected or general
            subjectInput.value = '';
            bodyContentInput.value = '';
        }
        letterOutputSection.classList.add('hidden'); // Hide output when purpose changes
    });


    // Function to generate the letter
    function generateLetter() {
        const selectedPurpose = purposeSelect.value;
        const senderName = senderNameInput.value.trim();
        const senderAddress = senderAddressInput.value.trim();
        const recipientDesignation = recipientDesignationInput.value.trim();
        const recipientDepartment = recipientDepartmentInput.value.trim();
        const recipientAddress = recipientAddressInput.value.trim();
        const subject = subjectInput.value.trim();
        let bodyContent = bodyContentInput.value.trim();
        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        if (!selectedPurpose || !senderName || !senderAddress || !recipientDesignation || !recipientDepartment || !recipientAddress || !subject || !bodyContent) {
            showMessage("Please fill in all required fields to generate the letter.", 'error');
            return;
        }

        // Replace placeholders in body content if a specific template was used
        if (selectedPurpose && letterTemplates[selectedPurpose]) {
            // Basic placeholder replacement for common template fields
            bodyContent = bodyContent
                .replace('[Your Name]', senderName)
                .replace('[Start Date]', '[Start Date]') // These need to be filled manually by user
                .replace('[End Date]', '[End Date]')     // or by adding more specific inputs
                .replace('[Reason for Leave, e.g., personal reasons, family event, sickness]', '[Your specific reason]')
                .replace('[Colleague\'s Name, if applicable]', '[Colleague\'s Name]')
                .replace('[Date of Resumption]', '[Date of Resumption]')
                .replace('[Specific Issue, e.g., poor service, faulty product, public nuisance]', '[Your specific issue]')
                .replace('[Date of Incident]', '[Date of Incident]')
                .replace('[Location of Incident]', '[Location of Incident]')
                .replace('[Provide a brief, factual description of the issue, including any relevant dates, times, and names. Be specific and concise.]', '[Your detailed description]')
                .replace('[Mention any attachments, e.g., copies of bills, photos, previous correspondence]', '[Your attachments]')
                .replace('[Your Account Number]', '[Your Account Number]')
                .replace('[Reason for Request, e.g., tax purposes, visa application, personal record]', '[Your reason for request]')
                .replace('[Job Title]', subject.replace('Application for the Post of ', '')) // Extract job title from subject
                .replace('[Platform where you saw the advertisement, e.g., LinkedIn, Company Website]', '[Platform]')
                .replace('[Number]', '[Your years of experience]')
                .replace('[Your Field]', '[Your Field]')
                .replace('[Mention 1-2 key skills/areas]', '[Your key skills/areas]')
                .replace('[Company Name]', recipientDepartment)
                .replace('[Mention a company value/mission that resonates with you]', '[Company value/mission]')
                .replace('[State your purpose clearly and concisely]', '[Your specific purpose]')
                .replace('[Provide detailed explanation of your request, issue, or reason. Be factual and polite. Include any relevant dates, times, or reference numbers if applicable.]', '[Detailed explanation]')
                .replace('[Mention any attachments, if any]', '[Your attachments]');
        }


        const letterContent = `
[Your Full Name]
[Your Address]
${senderName}
${senderAddress}

${currentDate}

To,
${recipientDesignation}
${recipientDepartment}
${recipientAddress}

Subject: ${subject}

Respected Sir/Madam,

${bodyContent}

Thanking You,
Yours Faithfully,
${senderName}
        `.trim();

        generatedLetterDisplay.textContent = letterContent;
        letterOutputSection.classList.remove('hidden');
        showMessage("Letter generated successfully!", 'success');
        console.log("Application letter generated.");

        // Add SEO note after generation
        addSEONote();
    }

    // Function to copy generated letter to clipboard
    function copyLetterToClipboard() {
        // Use document.execCommand('copy') as navigator.clipboard.writeText() may not work in some environments (like iframes)
        const textarea = document.createElement('textarea');
        textarea.value = generatedLetterDisplay.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showMessage('Letter copied to clipboard!', 'success');
            console.log("Letter copied to clipboard.");
        } catch (err) {
            console.error('Failed to copy letter: ', err);
            showMessage('Failed to copy letter. Please copy manually.', 'error');
        }
        document.body.removeChild(textarea);
    }

    // Function to download generated letter as PDF
    function downloadPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const letterContent = generatedLetterDisplay.textContent;
        const lines = doc.splitTextToSize(letterContent, 180); // Split text to fit page width
        
        let y = 10; // Starting Y position
        const lineHeight = 7; // Line height
        const pageHeight = doc.internal.pageSize.height;

        lines.forEach(line => {
            if (y + lineHeight > pageHeight - 10) { // Check if new page is needed
                doc.addPage();
                y = 10; // Reset Y for new page
            }
            doc.text(line, 10, y);
            y += lineHeight;
        });
        
        doc.save('application_letter.pdf');
        showMessage('Letter downloaded as PDF!', 'success');
        console.log("Letter downloaded as PDF.");
    }


    // Function to add SEO-focused note
    function addSEONote() {
        const existingSeoNote = letterOutputSection.querySelector('.seo-note');
        if (existingSeoNote) {
            existingSeoNote.remove(); // Remove old note if exists
        }

        const seoNote = document.createElement('div');
        seoNote.classList.add('bg-blue-50', 'p-4', 'rounded-lg', 'mt-4', 'text-sm', 'leading-relaxed', 'text-blue-800', 'seo-note'); // Added 'seo-note' class
        seoNote.innerHTML = `
            **Important Note for SEO & Real-World Impact:**
            <br>
            This tool generates a basic application letter template. To truly "create a stir" on Google and provide the most valuable resource for letter generation, this tool would need:
            <ul>
                <li>**Extensive, categorized templates:** A vast database of pre-written letter templates for *every conceivable department and purpose* (e.g., leave applications, job applications, complaint letters, official requests, legal notices, bank-related letters, school-related letters, etc.).</li>
                <li>**AI-powered content generation:** Integration with advanced AI models to generate context-aware, grammatically correct, and formal letter content based on user prompts.</li>
                <li>**Language flexibility:** Ability to generate letters in multiple Indian languages (Hindi, Marathi, Bengali, etc.) with accurate formal tones.</li>
                <li>**Legal/Official compliance:** Templates verified by legal experts to ensure they meet official and legal requirements for specific departments.</li>
                <li>**Dynamic fields and smart suggestions:** Auto-filling common details, suggesting appropriate salutations/closings based on recipient, and providing context-sensitive phrasing.</li>
                <li>**Strong authoritative backlinks:** From educational, legal, and government-related websites.</li>
                <li>**Superior User Experience (UX):** An intuitive interface, real-time preview, and easy download options (PDF/DOCX).</li>
                <li>**Structured Data (Schema.org):** Implementing schema markup for "HowTo" or "CreativeWork" to help Google understand the tool's purpose and content structure.</li>
                <li>**Proper use of Canonical Tags** on pages with similar content (e.g., if you have state-specific test versions) to avoid duplicate content issues.</li>
                <li>**Continuous content updates:** To reflect changes in official formats, language nuances, and user needs.</li>
            </ul>
            Currently, this tool serves as a functional demonstration of a basic letter generator.
        `;
        letterOutputSection.appendChild(seoNote);
    }

    // Event Listeners
    if (generateLetterBtn) {
        generateLetterBtn.addEventListener('click', generateLetter);
    } else {
        console.error("application-generator-tool.js Initialization Error: 'generate-letter-btn' element not found.");
    }

    if (copyLetterBtn) {
        copyLetterBtn.addEventListener('click', copyLetterToClipboard);
    } else {
        console.error("application-generator-tool.js Initialization Error: 'copy-letter-btn' element not found.");
    }

    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadPdf);
    } else {
        console.error("application-generator-tool.js Initialization Error: 'download-pdf-btn' element not found.");
    }
});
