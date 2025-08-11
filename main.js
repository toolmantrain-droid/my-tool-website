document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('lang-btn');
    const allElements = document.querySelectorAll('[data-hi], [data-en]');

    let isEnglish = false;

    const updateLanguage = () => {
        const newLang = isEnglish ? 'en' : 'hi';
        document.documentElement.lang = newLang; 

        allElements.forEach(el => {
            if (el.dataset[newLang]) {
                if (el.tagName === 'TITLE') {
                    document.title = el.dataset[newLang];
                } else if (el.tagName === 'OPTION') {
                    if (el.value === "") { 
                        el.textContent = isEnglish ? "-- Select a State --" : "-- एक राज्य चुनें --";
                    } else {
                        el.textContent = el.dataset[newLang];
                    }
                } else {
                    el.textContent = el.dataset[newLang];
                }
            }
        });
        
        langBtn.textContent = isEnglish ? 'हिंदी' : 'English';
        
        const verifyBtn = document.getElementById('verify-btn');
        if (verifyBtn) {
            verifyBtn.textContent = isEnglish ? 'Start Verification' : 'जांच शुरू करें';
        }
    };

    langBtn.addEventListener('click', () => {
        isEnglish = !isEnglish;
        updateLanguage();
    });
    
    updateLanguage(); 
});
