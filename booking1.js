document.getElementById('flight-search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // List of airlines
    const airlines = [
        "Air India",
        "IndiGo",
        "SpiceJet",
        "GoAir (now Go First)",
        "Vistara",
        "AirAsia India",
        "Alliance Air",
        "TruJet"
    ];

    // Simulate flight options
    const flights = [];
    for (let i = 0; i < 5; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const time = `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() < 0.5 ? 'AM' : 'PM'}`;
        const price = `$${(Math.random() * (500 - 100) + 100).toFixed(2)}`;
        flights.push({ airline, time, price });
    }

    const flightsList = document.getElementById('flights-list');
    flightsList.innerHTML = '';

    flights.forEach(flight => {
        const li = document.createElement('li');
        li.innerHTML = `${flight.airline} - ${flight.time} - ${flight.price} <button class="select-flight">Select</button>`;
        flightsList.appendChild(li);
    });

    document.getElementById('flight-options').classList.remove('hidden');
});

let selectedFlightDetails = '';

document.getElementById('flights-list').addEventListener('click', function (event) {
    if (event.target.classList.contains('select-flight')) {
        const li = event.target.closest('li');
        selectedFlightDetails = li.textContent.replace("Select", "").trim();
        document.getElementById('passenger-info').classList.remove('hidden');
    }
});

document.getElementById('passenger-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('passenger-name').value;
    const email = document.getElementById('contact-info').value;
    const specialRequests = document.getElementById('special-requests').value;

    if (!selectedFlightDetails) {
        alert("Please select a flight first!");
        return;
    }

    const flightDetails = selectedFlightDetails;

    const bookingData = {
        name: name,
        email: email,
        specialRequests: specialRequests,
        flightDetails: flightDetails
    };

    try {
        const response = await fetch('http://localhost:8080/TravelBooking/save_flight_booking.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (result.success) {
            showConfirmationPopup(bookingData);
        } else {
            alert("❌ Error: " + result.message);
        }
    } catch (error) {
        console.error("Error submitting booking:", error);
        alert("❌ Failed to submit booking. Please try again later.");
    }
});

function showConfirmationPopup(bookingData) {
    const confirmationMessage = `
        ✅ Booking Confirmed!
        ------------------------
        Name: ${bookingData.name}
        Email: ${bookingData.email}
        Flight: ${bookingData.flightDetails}
        Special Requests: ${bookingData.specialRequests}
    `;
    alert(confirmationMessage);
}
