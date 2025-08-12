document.addEventListener('DOMContentLoaded', function() {
    console.log("main.js: Script loaded and DOM content fully loaded.");

    // This file is now simplified for an English-only website.
    // No language switching logic is present here.

    // You can add any general website-wide JavaScript functionality here.
    // For example, if you had a "scroll to top" button or a simple animation.

    // Example of checking if an element exists (useful for debugging)
    // const someElement = document.getElementById('some-id');
    // if (!someElement) {
    //     console.warn("main.js: Warning - 'some-id' element not found.");
    // }

    // Ensure the HTML lang attribute is always 'en' for consistency
    document.documentElement.lang = 'en';

    console.log("main.js: Initialization complete for English-only website.");
});
