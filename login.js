function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored user data from localStorage
    const storedUser  = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username and password match any stored user
    const user = storedUser .find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        
        // Store session in localStorage
        localStorage.setItem("loggedInUser ", username);

        // Redirect to landing page
        window.location.href = 'landing.html';
        return false;
    } else {
        alert("Invalid username or password. Please try again or create an account.");
        return false;
    }
}

function validateRegister() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Retrieve existing users from localStorage
    const storedUser  = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    const existingUser  = storedUser .find(user => user.username === newUsername);
    if (existingUser ) {
        alert("Username already exists. Please choose a different username.");
        return false;
    }

    // Add new user to the stored users array
    storedUser .push({ username: newUsername, password: newPassword });
    localStorage.setItem("users", JSON.stringify(storedUser ));

    alert("Registration successful for " + newUsername);

    // Redirect to login form after registration
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    return false; // Prevent form submission
}

// Show registration form when the link is clicked
document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

// Show login form when the back link is clicked
document.getElementById('back-to-login').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});