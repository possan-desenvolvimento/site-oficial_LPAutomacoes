// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check saved theme or system preference
const getSavedTheme = () => localStorage.getItem('theme');
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const setTheme = (theme) => {
    const themeLink = document.getElementById('theme-style');
    themeLink.href = `css/${theme}-theme.css`;
    
    localStorage.setItem('theme', theme);
    
    // Update icon
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Update body class for any additional styling
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || getSystemTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
};

// Initialize theme
const initTheme = () => {
    const savedTheme = getSavedTheme();
    const theme = savedTheme || getSystemTheme();
    setTheme(theme);
};

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Event listener
themeToggle.addEventListener('click', toggleTheme);

// Initialize on load
initTheme();