// ✅ Wait for the page to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Find the theme dropdown in the HTML
    const themeToggle = document.getElementById('theme-toggle');

    // Check localStorage for saved theme or use 'dark' as default
    const currentTheme = localStorage.getItem('continuum-theme') || 'dark';

    // Apply the saved theme to the page
    document.documentElement.setAttribute('data-theme', currentTheme);

    // If dropdown exists, set it to the saved theme
    if (themeToggle) {
        themeToggle.value = currentTheme;
    }

    // ✅ Listen for user changes
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;

            // Apply the new theme
            document.documentElement.setAttribute('data-theme', selectedTheme);

            // Save the new theme in localStorage
            localStorage.setItem('continuum-theme', selectedTheme);
        });
    }
});
