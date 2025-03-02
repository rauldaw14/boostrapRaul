document.addEventListener("DOMContentLoaded", function () {
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");
    const body = document.body;

    
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleDarkModeButton.textContent = "Modo Día";
    }

    toggleDarkModeButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            toggleDarkModeButton.textContent = "Modo Día";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleDarkModeButton.textContent = "Modo Noche";
        }
    });
});
