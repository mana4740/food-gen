class ThemeToggler {
    constructor(buttonSelector) {
        this.button = document.querySelector(buttonSelector);
        this.currentTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.toggleTheme());
        this.updateButtonText();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateButtonText();
    }

    updateButtonText() {
        this.button.textContent = this.currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new ThemeToggler('.toggle-btn');
});
