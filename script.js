document.addEventListener("DOMContentLoaded", () => {
    const formTitle = document.getElementById("form-title");
    const nameField = document.getElementById("name-field");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const profileField = document.getElementById("profile-field");
    const profileInput = document.getElementById("profile-pic");
    const submitBtn = document.getElementById("submit-btn");
    const toggleForm = document.getElementById("toggle-form");
    const authForm = document.getElementById("auth-form");

    let isLogin = true;

    // Toggle between Login and Register
    toggleForm.addEventListener("click", (e) => {
        e.preventDefault();
        isLogin = !isLogin;

        if (isLogin) {
            formTitle.textContent = "Login";
            nameField.classList.add("hidden");
            profileField.classList.add("hidden");
            submitBtn.textContent = "Login";
            toggleForm.innerHTML = `Don't have an account? <a href="#">Register</a>`;
        } else {
            formTitle.textContent = "Register";
            nameField.classList.remove("hidden");
            profileField.classList.remove("hidden");
            submitBtn.textContent = "Register";
            toggleForm.innerHTML = `Already have an account? <a href="#">Login</a>`;
        }
    });

    // Handle form submission
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        if (!email || !password) {
            alert("Please fill in all fields!");
            return;
        }

        if (!isLogin) {
            // Registration Process
            if (!name) {
                alert("Please enter your name!");
                return;
            }

            let reader = new FileReader();
            if (profileInput.files.length > 0) {
                reader.readAsDataURL(profileInput.files[0]);
                reader.onload = function () {
                    saveUser(name, email, password, reader.result);
                };
            } else {
                saveUser(name, email, password, "");
            }
        } else {
            // Login Process
            authenticateUser(email, password);
        }
    });

    // Save user data to Local Storage
    function saveUser(name, email, password, profilePic) {
        if (localStorage.getItem(email)) {
            alert("User already exists with this email! Try logging in.");
            return;
        }

        const user = { name, email, password, profilePic };
        localStorage.setItem(email, JSON.stringify(user));
        alert("Registration successful! You can now log in.");
        toggleForm.click(); // Switch to login form automatically
    }

    // Authenticate user from Local Storage
    function authenticateUser(email, password) {
        const userData = localStorage.getItem(email);
        if (!userData) {
            alert("User not found! Please register first.");
            return;
        }

        const user = JSON.parse(userData);
        if (user.password !== password) {
            alert("Incorrect password!");
            return;
        }

        alert(`Welcome, ${user.name}!`);
        localStorage.setItem("loggedInUser", email); // Save login session
        window.location.href = "dashboard.html"; // Redirect to dashboard
    }
});
