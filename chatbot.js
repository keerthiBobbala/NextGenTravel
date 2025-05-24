//const { NlpManager } = require('node-nlp');
//const manager = new NlpManager({ languages: ['en'] });

// Add training phrases for intents
//manager.addDocument('en', 'Tell me about %destination%', 'destination.overview');
//manager.addDocument('en', 'What are the attractions in %destination%', 'destination.attractions');
//manager.addDocument('en', 'What activities can I do in %destination%', 'destination.activities');
//manager.addDocument('en', 'What are the travel tips for %destination%', 'destination.travel_tips');
//manager.addDocument('en', 'How do I get to %destination%', 'destination.transportation');

// Train the model
//manager.train().then(() => {
    //console.log('NLP model trained');
//});





document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("send-btn");
    const voiceButton = document.getElementById("voice-btn");
    const userInput = document.getElementById("user-input");
    const messages = document.getElementById("messages");

    const destinations = {
        "Agra, Uttar Pradesh": {
            overview: "Agra is home to the Taj Mahal, a symbol of eternal love and one of the Seven Wonders of the World.",
            attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
            activities: ["Heritage walk", "Food tour", "Shopping at Sadar Bazaar"],
            travel_tips: ["Best time: October to March", "Avoid peak summer months due to extreme heat"],
            transportation: ["Nearest airport: Agra Airport", "Well-connected by rail and road"]
        },
        "Darjeeling, West Bengal": {
            overview: "Darjeeling, the 'Queen of the Hills,' is famous for its scenic beauty, tea plantations, and the Darjeeling Himalayan Railway (Toy Train).",
            attractions: ["Tiger Hill", "Batasia Loop", "Darjeeling Zoo"],
            activities: ["Tea plantation tours", "Toy Train ride", "Trekking"],
            travel_tips: ["Best time: March to May, September to November", "Carry warm clothes"],
            transportation: ["Nearest airport: Bagdogra Airport", "Well-connected by Toy Train and road"]
        },
        "Goa": {
            overview: "Goa is India's party capital, known for its beautiful beaches, vibrant nightlife, and Portuguese heritage.",
            attractions: ["Baga Beach", "Dudhsagar Waterfalls", "Fort Aguada"],
            activities: ["Surfing", "Nightlife", "Beach Yoga"],
            travel_tips: ["Best time: November to February", "Carry sunscreen and beachwear"],
            transportation: ["Nearest airport: Goa International Airport", "Well-connected by train and road"]
        },
        "Jaisalmer, Rajasthan": {
            overview: "Jaisalmer, the 'Golden City,' is famous for its yellow sandstone architecture, vast desert landscapes, and rich cultural heritage.",
            attractions: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli"],
            activities: ["Desert safari", "Camel rides", "Cultural performances"],
            travel_tips: ["Best time: October to March", "Stay hydrated during desert tours"],
            transportation: ["Nearest airport: Jodhpur Airport", "Well-connected by rail and road"]
        },
        "Kerala": {
            overview: "Known as 'God’s Own Country,' Kerala offers serene backwaters, lush greenery, and a rich cultural experience.",
            attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Kovalam Beach"],
            activities: ["Houseboat stay", "Ayurvedic spa", "Wildlife safari"],
            travel_tips: ["Best time: September to March", "Monsoons are great for Ayurvedic treatments"],
            transportation: ["Nearest airport: Cochin International Airport", "Well-connected by rail and road"]
        },
        "Leh, Ladakh": {
            overview: "A high-altitude desert, Ladakh is known for its stunning landscapes, Buddhist monasteries, and adventure tourism.",
            attractions: ["Pangong Lake", "Magnetic Hill", "Leh Palace"],
            activities: ["Trekking", "Biking", "River rafting"],
            travel_tips: ["Best time: May to September", "Acclimatize properly to avoid altitude sickness"],
            transportation: ["Nearest airport: Leh Airport", "Well-connected by road via Manali and Srinagar"]
        },
        "Meghalaya": {
            overview: "The 'Abode of Clouds,' Meghalaya is famous for its living root bridges, waterfalls, and rolling hills.",
            attractions: ["Nohkalikai Falls", "Double Decker Root Bridge", "Shillong Peak"],
            activities: ["Caving", "Trekking", "Boating in Dawki River"],
            travel_tips: ["Best time: October to April", "Carry rain gear as it’s one of the wettest places on Earth"],
            transportation: ["Nearest airport: Shillong Airport", "Well-connected by road"]
        },
        "Odisha": {
            overview: "Odisha is known for its ancient temples, scenic beaches, and tribal culture.",
            attractions: ["Konark Sun Temple", "Puri Beach", "Chilika Lake"],
            activities: ["Temple hopping", "Wildlife photography", "Beach relaxation"],
            travel_tips: ["Best time: October to March", "Try the famous Odisha cuisine"],
            transportation: ["Nearest airport: Bhubaneswar Airport", "Well-connected by rail and road"]
        },
        "Rann of Kutch, Gujarat": {
            overview: "The White Desert of India, Kutch is famous for its salt flats, cultural festivals, and handicrafts.",
            attractions: ["Great Rann of Kutch", "Kala Dungar", "Bhuj"],
            activities: ["Desert safari", "Shopping for handicrafts", "Attending Rann Utsav"],
            travel_tips: ["Best time: November to February (during Rann Utsav)", "Book accommodations in advance"],
            transportation: ["Nearest airport: Bhuj Airport", "Well-connected by road"]
        },
        "Udaipur, Rajasthan": {
            overview: "The 'City of Lakes,' Udaipur is known for its stunning palaces, serene lakes, and vibrant culture.",
            attractions: ["City Palace", "Lake Pichola", "Fateh Sagar Lake"],
            activities: ["Boat rides", "Cultural performances", "Exploring historic palaces"],
            travel_tips: ["Best time: October to March", "Book lake-view hotels for a great experience"],
            transportation: ["Nearest airport: Maharana Pratap Airport", "Well-connected by train and road"]
        },
        "Andhra Pradesh - Visakhapatnam (Vizag)": {
    overview: "Visakhapatnam, also known as Vizag, is a coastal city famous for its beaches, scenic hills, and cultural heritage.",
    attractions: ["R.K. Beach", "Borra Caves", "Kailasagiri Hill Park"],
    activities: ["Beach walks", "Submarine Museum visit", "Trekking in Araku Valley"],
    travel_tips: ["Best time: October to March", "Try local seafood dishes"],
    transportation: ["Nearest airport: Visakhapatnam International Airport", "Well-connected by rail and road"]
},

"Arunachal Pradesh - Tawang": {
    overview: "Tawang is known for its stunning landscapes, Buddhist monasteries, and rich cultural heritage.",
    attractions: ["Tawang Monastery", "Sela Pass", "Nuranang Waterfall"],
    activities: ["Monastery visits", "Trekking", "Exploring local culture"],
    travel_tips: ["Best time: March to June, September to November", "Acclimatize to high altitude"],
    transportation: ["Nearest airport: Tezpur Airport (Assam)", "Road access via Guwahati and Tezpur"]
},

"Assam - Kaziranga National Park": {
    overview: "A UNESCO World Heritage Site, Kaziranga is home to the largest population of one-horned rhinoceroses.",
    attractions: ["Elephant Safari", "Jeep Safari", "Brahmaputra River"],
    activities: ["Wildlife safaris", "Birdwatching", "Photography"],
    travel_tips: ["Best time: November to April", "Book safaris in advance"],
    transportation: ["Nearest airport: Jorhat Airport", "Well-connected by road"]
},

"Bihar - Bodh Gaya": {
    overview: "Bodh Gaya is a sacred Buddhist pilgrimage site where Lord Buddha attained enlightenment.",
    attractions: ["Mahabodhi Temple", "Bodhi Tree", "Great Buddha Statue"],
    activities: ["Spiritual meditation", "Exploring monasteries", "Visiting historical sites"],
    travel_tips: ["Best time: October to March", "Follow temple etiquettes"],
    transportation: ["Nearest airport: Gaya Airport", "Well-connected by rail and road"]
},

"Haryana - Kurukshetra": {
    overview: "Kurukshetra, the land of the Mahabharata, is a historic and religious city in India.",
    attractions: ["Brahma Sarovar", "Jyotisar", "Sheikh Chilli’s Tomb"],
    activities: ["Religious pilgrimages", "Exploring ancient temples", "Visiting historical sites"],
    travel_tips: ["Best time: October to March", "Wear comfortable clothing for temple visits"],
    transportation: ["Nearest airport: Chandigarh Airport", "Well-connected by rail and road"]
},

"Himachal Pradesh - Shimla": {
    overview: "Shimla, the 'Queen of Hills,' is a popular hill station known for its colonial charm and scenic beauty.",
    attractions: ["Mall Road", "Kufri", "Jakhoo Temple"],
    activities: ["Toy Train ride", "Skiing in Kufri", "Nature walks"],
    travel_tips: ["Best time: March to June, December to February (for snow)"],
    transportation: ["Nearest airport: Jubbarhatti Airport", "Well-connected by road and rail"]
},

"Jharkhand - Deoghar": {
    overview: "Deoghar is a significant religious town, home to the famous Baidyanath Jyotirlinga temple.",
    attractions: ["Baidyanath Temple", "Trikuta Hills", "Naulakha Temple"],
    activities: ["Pilgrimage", "Trekking", "Exploring religious sites"],
    travel_tips: ["Best time: October to March", "Avoid peak pilgrimage season for a less crowded experience"],
    transportation: ["Nearest airport: Deoghar Airport", "Well-connected by rail and road"]
},

"Karnataka - Hampi": {
    overview: "Hampi is a UNESCO World Heritage Site known for its stunning ruins of the Vijayanagara Empire.",
    attractions: ["Virupaksha Temple", "Vittala Temple", "Matanga Hill"],
    activities: ["Historical exploration", "Climbing Matanga Hill for sunrise", "Coracle boat ride"],
    travel_tips: ["Best time: October to March", "Wear comfortable shoes for exploration"],
    transportation: ["Nearest airport: Hubli Airport", "Well-connected by road and rail"]
},

"Madhya Pradesh - Khajuraho": {
    overview: "Khajuraho is famous for its stunning group of Hindu and Jain temples with intricate erotic carvings.",
    attractions: ["Kandariya Mahadev Temple", "Lakshmana Temple", "Raneh Falls"],
    activities: ["Exploring temples", "Watching the Light and Sound Show", "Photography"],
    travel_tips: ["Best time: October to March", "Respect cultural sentiments while visiting temples"],
    transportation: ["Nearest airport: Khajuraho Airport", "Well-connected by rail and road"]
},

"Maharashtra - Mumbai": {
    overview: "Mumbai, the 'City of Dreams,' is India's financial capital, known for Bollywood and colonial landmarks.",
    attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
    activities: ["Street food tour", "Bollywood studio tour", "Sunset at Juhu Beach"],
    travel_tips: ["Best time: October to March", "Use public transport to avoid traffic"],
    transportation: ["Nearest airport: Chhatrapati Shivaji Maharaj International Airport", "Extensive local train and road network"]
},

"Manipur - Imphal": {
    overview: "Imphal, the capital of Manipur, is known for its natural beauty, rich culture, and historical sites.",
    attractions: ["Loktak Lake", "Kangla Fort", "Ima Keithel (Women's Market)"],
    activities: ["Boating in Loktak Lake", "Exploring local markets", "Visiting historical sites"],
    travel_tips: ["Best time: October to April", "Try local Manipuri cuisine"],
    transportation: ["Nearest airport: Imphal Airport", "Well-connected by road"]
},

"Mizoram - Aizawl": {
    overview: "Aizawl, the capital of Mizoram, is a peaceful hill city with breathtaking landscapes and Mizo culture.",
    attractions: ["Durtlang Hills", "Reiek", "Solomon's Temple"],
    activities: ["Trekking", "Exploring Mizo culture", "Visiting handicraft markets"],
    travel_tips: ["Best time: October to March", "Carry warm clothing"],
    transportation: ["Nearest airport: Lengpui Airport", "Well-connected by road"]
},

"Nagaland - Kohima": {
    overview: "Kohima is known for its rich tribal heritage, scenic beauty, and the annual Hornbill Festival.",
    attractions: ["Kisama Heritage Village", "Kohima War Cemetery", "Dzukou Valley"],
    activities: ["Trekking", "Cultural exploration", "Attending Hornbill Festival"],
    travel_tips: ["Best time: October to March", "Respect local tribal customs"],
    transportation: ["Nearest airport: Dimapur Airport", "Well-connected by road"]
},

"Punjab - Amritsar": {
    overview: "Amritsar is the spiritual and cultural center of the Sikh religion, home to the Golden Temple.",
    attractions: ["Golden Temple", "Wagah Border", "Jallianwala Bagh"],
    activities: ["Religious visits", "Watching Wagah Border ceremony", "Trying Amritsari cuisine"],
    travel_tips: ["Best time: October to March", "Cover your head while visiting the Golden Temple"],
    transportation: ["Nearest airport: Sri Guru Ram Dass Jee International Airport", "Well-connected by rail and road"]
},
"Tamil Nadu - Chennai": {
    overview: "Chennai, the capital of Tamil Nadu, is a vibrant coastal city known for its rich cultural heritage, temples, and bustling beaches.",
    attractions: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"],
    activities: ["Beach walks", "Exploring Tamil cuisine", "Visiting ancient temples"],
    travel_tips: ["Best time: November to February", "Wear light cotton clothes due to humidity"],
    transportation: ["Nearest airport: Chennai International Airport", "Well-connected by rail, metro, and road"]
},

"Telangana - Hyderabad": {
    overview: "Hyderabad, the 'City of Pearls,' is famous for its historic landmarks, IT hubs, and delicious biryani.",
    attractions: ["Charminar", "Golconda Fort", "Hussain Sagar Lake"],
    activities: ["Exploring heritage sites", "Tasting Hyderabadi Biryani", "Visiting Ramoji Film City"],
    travel_tips: ["Best time: October to March", "Try local street food like Irani chai and Osmania biscuits"],
    transportation: ["Nearest airport: Rajiv Gandhi International Airport", "Well-connected by metro, rail, and road"]
},

"Tripura - Agartala": {
    overview: "Agartala, the capital of Tripura, is a serene city known for its royal palaces, temples, and scenic landscapes.",
    attractions: ["Ujjayanta Palace", "Neermahal", "Jagannath Temple"],
    activities: ["Exploring royal history", "Boat rides at Neermahal", "Visiting handicraft markets"],
    travel_tips: ["Best time: October to March", "Try local Tripuri cuisine like Mui Borok"],
    transportation: ["Nearest airport: Maharaja Bir Bikram Airport", "Well-connected by road and rail"]
},

"Uttar Pradesh - Varanasi": {
    overview: "Varanasi, one of the oldest cities in the world, is a spiritual hub on the banks of the Ganges River.",
    attractions: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath"],
    activities: ["Ganga Aarti at Dashashwamedh Ghat", "Boat rides on the Ganges", "Exploring ancient temples"],
    travel_tips: ["Best time: October to March", "Respect local customs at religious sites"],
    transportation: ["Nearest airport: Lal Bahadur Shastri International Airport", "Well-connected by rail and road"]
},

"Uttarakhand - Nainital": {
    overview: "Nainital is a picturesque hill station known for its beautiful lakes, lush green hills, and pleasant climate.",
    attractions: ["Naini Lake", "Naina Devi Temple", "Snow View Point"],
    activities: ["Boating on Naini Lake", "Cable car rides", "Shopping at Mall Road"],
    travel_tips: ["Best time: March to June, October to February (for snow)", "Carry warm clothes in winter"],
    transportation: ["Nearest airport: Pantnagar Airport", "Well-connected by road from Delhi and Kathgodam railway station"]
},

"West Bengal - Kolkata": {
    overview: "Kolkata, the 'City of Joy,' is a cultural and intellectual hub known for its colonial architecture, art, and festivals.",
    attractions: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Kali Temple"],
    activities: ["Exploring old book markets", "Trying Bengali sweets like Rosogolla", "Boat ride on the Hooghly River"],
    travel_tips: ["Best time: October to March", "Experience Durga Puja for a vibrant cultural immersion"],
    transportation: ["Nearest airport: Netaji Subhash Chandra Bose International Airport", "Extensive metro, tram, rail, and road network"]
}


        
    };
    const synonyms = {
        "attractions": ["sights", "places to visit", "things to see"],
        "activities": ["things to do", "what to do", "activities available"],
        "travel tips": ["advice", "tips", "suggestions"],
        "transportation": ["getting there", "how to reach", "travel options"]
    };
    const patterns = {
        greeting: /^(hi|hello|hey|greetings)/i,
        booking: /^(book a flight to|i want to fly to|flight to)/i,
        attractions: /(?:attractions|places to visit|sights)/i,
        activities: /(?:activities|things to do)/i,
        travelTips: /(?:travel tips|advice|suggestions)/i,
        transportation: /(?:transportation|getting there|how to reach)/i
    };




    sendButton.addEventListener("click", processUserInput);
    voiceButton.addEventListener("click", startVoiceRecognition);

    function processUserInput() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        appendMessage("You: " + userMessage);
        userInput.value = "";

        setTimeout(() => botResponse(userMessage.toLowerCase()), 100);
    }

    function startVoiceRecognition() {
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
            processUserInput();
        };

        recognition.onerror = function (event) {
            console.error("Voice recognition error:", event.error);
        };
    }

    function appendMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = text;
        messageDiv.style.marginBottom = "10px";
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function botResponse(userMessage) {
        console.log("User  Message:", userMessage); // Log the user message
        let response = "I'm still learning! Try asking about travel destinations.";
    
        // Normalize user input
        userMessage = userMessage.toLowerCase();
    
        // Check for greeting
        if (patterns.greeting.test(userMessage)) {
            response = "Hello! I’m Maya. How can I assist you with your travel plans today?";
        }
    
        // Check for booking intent
        if (patterns.booking.test(userMessage)) {
            const destinationMatch = userMessage.match(/(?:book a flight to|i want to fly to|flight to)\s+(.*)/);
            if (destinationMatch && destinationMatch[1]) {
                const destination = destinationMatch[1].trim();
                window.location.href = "booking1.html?destination=" + encodeURIComponent(destination);
                return;
            } else {
                response = "Could you please specify which destination you would like to book a flight to?";
            }
        }
    
        // Handle specific destination queries
        const cityToDestination = {
            "agra": "Agra - Uttar Pradesh",
            "darjeeling": "Darjeeling - West Bengal",
            "goa": "Goa - Panaji",
            "jaisalmer": "Jaisalmer - Rajasthan",
            "kerala": "Kerala",
            "leh": "Leh, Ladakh",
            "meghalaya": "Meghalaya",
            "odisha": "Odisha - Bhuvaneshwar",
            "rann of kutch": "Rann of Kutch - Gujarat",
            "udaipur": "Udaipur - Rajasthan",
            "visakhapatnam": "Andhra Pradesh - Visakhapatnam (Vizag)",
            "tawang": "Arunachal Pradesh - Tawang",
            "kaziranga": "Assam - Kaziranga National Park",
            "bodh gaya": "Bihar - Bodh Gaya",
            "kurukshetra": "Haryana - Kurukshetra",
            "shimla": "Himachal Pradesh - Shimla",
            "deoghar": "Jharkhand - Deoghar",
            "hampi": "Karnataka - Hampi",
            "khajuraho": "Madhya Pradesh - Khajuraho",
            "mumbai": "Maharashtra - Mumbai",
            "imphal": "Manipur - Imphal",
            "aizawl": "Mizoram - Aizawl",
            "kohima": "Nagaland - Kohima",
            "amritsar": "Punjab - Amritsar",
            "chennai": "Tamil Nadu - Chennai",
            "hyderabad": "Telangana - Hyderabad",
            "agartala": "Tripura - Agartala",
            "varanasi": "Uttar Pradesh - Varanasi",
            "nainital": "Uttarakhand - Nainital",
            "kolkata": "West Bengal - Kolkata"
        };

const stateToDestination = {};
const cityToStateMapping = {};

// Process cityToDestination to ensure both city and state are mapped
Object.entries(cityToDestination).forEach(([cityKey, destinationValue]) => {
    const parts = destinationValue.split(" - ");

    // Map both city and state separately to allow detection
    parts.forEach(part => {
        stateToDestination[part.toLowerCase()] = destinationValue;
    });

    // Ensure individual city keys are mapped properly
    cityToStateMapping[cityKey] = destinationValue;
});

// ✅ Extract destination
let foundDestination = null;
let destinationInfo = null;

// Check for city, state, or other keywords
const foundCity = Object.keys(cityToStateMapping).find(key => userMessage.includes(key));
const foundState = Object.keys(stateToDestination).find(key => userMessage.includes(key));

// Assign the destination correctly
if (foundCity) {
    foundDestination = cityToStateMapping[foundCity];
} else if (foundState) {
    foundDestination = stateToDestination[foundState];
}

// Retrieve destination information correctly
if (foundDestination) {
    destinationInfo = destinations[foundDestination] || 
                      destinations[foundDestination.split(" - ")[1]] || 
                      destinations[foundDestination.split(" - ")[0]];
}

    
        // ✅ Handle queries about travel details (attractions, activities, etc.)
        if (destinationInfo) {
            if (patterns.attractions.test(userMessage) || synonyms.attractions.some(syn => userMessage.includes(syn))) {
                response = `Attractions in ${foundDestination}: ${destinationInfo.attractions.join(", ")}.`;
            } else if (patterns.activities.test(userMessage) || synonyms.activities.some(syn => userMessage.includes(syn))) {
                response = `Activities in ${foundDestination}: ${destinationInfo.activities.join(", ")}.`;
            } else if (patterns.travelTips.test(userMessage) || synonyms["travel tips"].some(syn => userMessage.includes(syn))) {
                response = `Travel tips for ${foundDestination}: ${destinationInfo.travel_tips.join(", ")}.`;
            } else if (patterns.transportation.test(userMessage) || synonyms.transportation.some(syn => userMessage.includes(syn))) {
                response = `Transportation options for ${foundDestination}: ${destinationInfo.transportation.join(", ")}.`;
            } else {
                response = `Overview of ${foundDestination}: ${destinationInfo.overview}`;
            }
        } else if (foundDestination) {
            response = `I have limited information about ${foundDestination}. Would you like general travel tips?`;
        }
    
    


         // Check for booking intent
    const bookingPatterns = ["book a flight to", "i want to fly to", "i want to book a flight", "flight to"];
    const isBookingIntent = bookingPatterns.some(pattern => userMessage.includes(pattern));

    if (isBookingIntent) {
        // Extract destination from the user's input
        const destinationMatch = userMessage.match(/(?:book a flight to|i want to fly to|flight to)\s+(.*)/);
        
        if (destinationMatch && destinationMatch[1]) {
            const destination = destinationMatch[1].trim();
            window.location.href = "booking1.html?destination=" + encodeURIComponent(destination);
            return; // Exit the function early to prevent sending a chatbot response.
        } else {
            response = "Could you please specify which destination you would like to book a flight to?";
        }
    }

    
        
     // Append the response to the chat
     setTimeout(() => {
        appendMessage("Maya: " + response);
        speakResponse(response);
    }, 100);
}
    

    function speakResponse(text) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = "en-US";
    
        // Get the available voices
        const voices = window.speechSynthesis.getVoices();
    
        // Find a female voice
        const femaleVoice = voices.find(voice => 
            voice.name.includes("Female") || 
            voice.name.includes("Google UK English Female") || 
            voice.name.includes("Samantha") || 
            voice.name.includes("Microsoft Zira") // Add more female voices if needed
        );
    
        // If a female voice is found, set it
        if (femaleVoice) {
            speech.voice = femaleVoice;
        }
    
        // Speak the text
        window.speechSynthesis.speak(speech);
    }
    
    // Ensure voices are loaded before speaking
    window.speechSynthesis.onvoiceschanged = () => {
        // This will trigger when the voices are loaded
        speakResponse(""); // This can be removed if not needed
    };
});