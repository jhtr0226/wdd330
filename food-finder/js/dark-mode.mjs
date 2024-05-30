export function dark() {
    document.addEventListener('DOMContentLoaded', () => {
        const modeButton = document.querySelector("#mode");
        const body = document.querySelector("body");
        const main = document.querySelector("main");
        const darkModeToggle = document.querySelector("#dark-mode-toggle");

        if (!modeButton || !darkModeToggle) {
            console.error('Dark mode toggle or button not found');
            return;
        }

        modeButton.addEventListener("change", () => {
            const isDarkMode = darkModeToggle.checked;
            body.classList.toggle('dark-mode', isDarkMode);
            main.classList.toggle('dark-mode', isDarkMode);
            localStorage.setItem("darkMode", isDarkMode);
        });

        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            body.classList.add("dark-mode");
            main.classList.add("dark-mode");
            darkModeToggle.checked = true;
        }
    });
}