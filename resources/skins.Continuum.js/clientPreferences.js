const selectedTheme = mw.user.options.get('continuum-theme');

switch (selectedTheme) {
    case 'light':
        document.body.classList.add('theme-light');
        break;
    case 'medium':
        document.body.classList.add('theme-medium');
        break;
    case 'dark':
        document.body.classList.add('theme-dark');
        break;
    default:
        document.body.classList.add('theme-dark'); // Fallback
}
