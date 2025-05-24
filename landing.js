document.addEventListener("DOMContentLoaded", function () {
    // Display logged-in username
    const user = localStorage.getItem("loggedInUser");
    
    document.getElementById("username").textContent = user;

    // Load Recommendations from localStorage
    const recommendations = JSON.parse(localStorage.getItem("recommendations")) || ["Paris", "New York", "Tokyo"];
    const recommendationList = document.getElementById("recommendation-list");
    recommendations.forEach(destination => {
        let li = document.createElement("li");
        li.textContent = destination;
        recommendationList.appendChild(li);
    });

    // Logout functionality
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });

    // Chatbot Elements
    const chatbotSection = document.getElementById("chatbot");
    const chatbotLink = document.querySelector("nav ul li a[href='#chatbot']");
    const sendButton = document.getElementById("send-btn");
    const voiceButton = document.getElementById("voice-btn");
    const userInput = document.getElementById("user-input");
    const messages = document.getElementById("messages");

    // Ensure elements exist before adding event listeners
    if (chatbotLink && chatbotSection) {
        chatbotLink.addEventListener("click", function (event) {
            event.preventDefault();
            chatbotSection.style.display =
                chatbotSection.style.display === "none" ? "block" : "none";
        });
    }

    // Chatbot Interaction
    if (sendButton && userInput) {
        sendButton.addEventListener("click", function () {
            const userMessage = userInput.value.trim();
            if (userMessage) {
                appendMessage("You: " + userMessage);
                botResponse(userMessage);
                userInput.value = "";
            }
        });
    }

    // Voice Assistant
    if (voiceButton) {
        voiceButton.addEventListener("click", function () {
            if (!("webkitSpeechRecognition" in window)) {
                alert("Your browser does not support voice recognition. Please use Chrome or Edge.");
                return;
            }

            const recognition = new webkitSpeechRecognition();
            recognition.lang = "en-US";
            recognition.start();

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                appendMessage("You: " + transcript);
                botResponse(transcript);
            };

            recognition.onerror = function (event) {
                console.error("Voice recognition error:", event.error);
            };
        });
    }

    // Append messages to the chatbox
    function appendMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = text;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
    }

    // Bot response logic
    function botResponse(userMessage) {
        let response = "I'm still learning! Try asking about travel destinations.";
        const destinationInfo = getDestinationInfo(userMessage);

        if (destinationInfo !== "Sorry, information about this destination is not available.") {
            response = `Here's some information about ${userMessage}:\n`;
            response += `Overview: ${destinationInfo.overview}\n`;
            response += `Attractions: ${destinationInfo.attractions.join(", ")}\n`;
            response += `Activities: ${destinationInfo.activities.join(", ")}\n`;
            response += `Travel Tips: ${destinationInfo.travel_tips.join(", ")}\n`;
        } else if (userMessage.toLowerCase().includes("hello")) {
            response = "Hello! How can I assist you with your travel plans?";
        }

        setTimeout(() => appendMessage("Bot: " + response), 1000);
    }

    // Function to get destination details (Ensure `destinations` is defined elsewhere)
    function getDestinationInfo(destination) {
        if (typeof destinations !== "undefined" && destinations[destination]) {
            return destinations[destination];
        }
        return "Sorry, information about this destination is not available.";
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const voiceSearchButton = document.getElementById('voice-search-button');
    const destinations = document.querySelectorAll('.destination');

    // Function to filter destinations
    const filterDestinations = () => {
        const searchTerm = searchInput.value.toLowerCase();
        destinations.forEach(destination => {
            const title = destination.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                destination.style.display = 'block'; // Show matching destination
            } else {
                destination.style.display = 'none'; // Hide non-matching destination
            }
        });
    };

    // Event listener for search button
    searchButton.addEventListener('click', filterDestinations);

    // Event listener for Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterDestinations();
        }
    });

    // Voice Search Functionality
    if (voiceSearchButton) {
        voiceSearchButton.addEventListener('click', function () {
            if (!("webkitSpeechRecognition" in window)) {
                alert("Your browser does not support voice recognition. Please use Chrome or Edge.");
                return;
            }

            const recognition = new webkitSpeechRecognition();
            recognition.lang = "en-US";
            recognition.start();

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript.replace(/[.?!]$/, '').trim();;
                searchInput.value = transcript; // Set the recognized text to the search input
                filterDestinations(); // Call the filter function to show results
            };

            recognition.onerror = function (event) {
                console.error("Voice recognition error:", event.error);
            };
        });
    }
});

// landing.js
document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count");
    const miniCart = document.createElement("div");
    miniCart.id = "mini-cart";
    miniCart.innerHTML = "<h3>Mini Cart</h3>";
    document.body.appendChild(miniCart);

    let cartItems = [];

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            const destinationElement = button.closest(".destination");
            const destinationName = destinationElement.querySelector("h3").innerText;
            const destinationImage = destinationElement.querySelector("img").src;

            // Check if the item is already in the cart
            const itemIndex = cartItems.findIndex(item => item.name === destinationName);

            if (itemIndex === -1) {
                // Item is not in the cart, add it
                cartItems.push({ name: destinationName, image: destinationImage });
                button.innerText = "Remove"; // Change button text
                button.style.backgroundColor = "#808080"; // Change button color to red
                button.classList.add("remove-from-cart"); // Add a class for removal
                provideFeedback(destinationName, true); // Provide feedback for adding
            } else {
                // Item is in the cart, remove it
                cartItems.splice(itemIndex, 1); // Remove item from cart
                button.innerText = "Add to Cart"; // Change button text back
                button.style.backgroundColor = "#ff5722"; // Reset button color to original
                button.classList.remove("remove-from-cart"); // Remove the class
                provideFeedback(destinationName, false); // Provide feedback for removal
            }

            updateCartCount();
            updateMiniCart();
        });
    });

    function updateCartCount() {
        cartCount.innerText = cartItems.length; // Update cart count
    }

    function updateMiniCart() {
        miniCart.innerHTML = "<h3>Mini Cart</h3>"; // Reset mini cart
        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `<img src="${item.image}" alt="${item.name}"><p>${item.name}</p>`;
            miniCart.appendChild(itemDiv);
        });
        miniCart.style.display = "block"; // Show mini cart
    }

    function provideFeedback(destinationName, added) {
        const action = added ? "added to" : "removed from";
        alert(`${destinationName} has been ${action} your cart!`); // Simple feedback
    }

    // Optional: Hide mini cart when clicking outside
    document.addEventListener("click", function (event) {
        if (!miniCart.contains(event.target) && !cartCount.contains(event.target)) {
            miniCart.style.display = "none"; // Hide mini cart
        }
    });
});

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}



