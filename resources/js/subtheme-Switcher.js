document.addEventListener("DOMContentLoaded", function () {
    const subthemeSelect = document.getElementById("subtheme-select");

    // Load saved subtheme from localStorage or default to dark
    const savedTheme = localStorage.getItem("continuum-subtheme") || "dark";
    applySubtheme(savedTheme);
    subthemeSelect.value = savedTheme;

    subthemeSelect.addEventListener("change", function () {
        const selectedTheme = subthemeSelect.value;
        applySubtheme(selectedTheme);
        localStorage.setItem("continuum-subtheme", selectedTheme);

        // Optional: Save to user preferences via AJAX (if MediaWiki login required)
        if (mw.config.get('wgUserName')) {
            new mw.Api().postWithToken('csrf', {
                action: 'options',
                format: 'json',
                optionname: 'continuum-subtheme',
                optionvalue: selectedTheme
            }).done(function () {
                console.log("Subtheme preference saved!");
            });
        }
    });

    function applySubtheme(theme) {
        document.documentElement.setAttribute("data-subtheme", theme);
    }
});
