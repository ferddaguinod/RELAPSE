document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const authForm = document.getElementById("auth-form");
    const submitBtn = document.getElementById("submit-btn");
    const toggleText = document.getElementById("toggle-text");
    const confirmPasswordGroup = document.getElementById("confirm-password-group");
    const popupModal = document.getElementById("popup-modal");
    const popupMessage = document.getElementById("popup-message");
    const closeBtn = document.querySelector(".close-btn");

    let isLogin = true;

    // Toggle between login and signup
    toggleText.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            isLogin = !isLogin;

            if (isLogin) {
                formTitle.textContent = "Login";
                submitBtn.textContent = "Login";
                toggleText.innerHTML = `Don't have an account? <a href="#">Sign Up</a>`;
                confirmPasswordGroup.classList.add("hidden");
            } else {
                formTitle.textContent = "Sign Up";
                submitBtn.textContent = "Sign Up";
                toggleText.innerHTML = `Already have an account? <a href="#">Login</a>`;
                confirmPasswordGroup.classList.remove("hidden");
            }
        }
    });

    // Handle form submission
    authForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password")?.value;

        if (!isLogin) {
            if (password !== confirmPassword) {
                showPopup("❌ Passwords do not match!");
                return;
            }
            showPopup(`✅ Account created successfully! Welcome, ${username}`);
        } else {
            showPopup(`✅ Welcome back, ${username}!`);
        }
    });

    // Function to show popup
    function showPopup(message) {
        popupMessage.innerHTML = message;
        popupModal.classList.add("show");
    }

    // Close popup on button click
    closeBtn.addEventListener("click", function () {
        popupModal.classList.remove("show");
    });

    // Close popup on clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === popupModal) {
            popupModal.classList.remove("show");
        }
    });
});
