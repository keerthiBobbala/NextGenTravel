// Step 1: Hotel Selection
document.getElementById('hotel-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedHotel = document.getElementById('hotel').value;
    document.getElementById('availability-check').style.display = 'block';
    document.getElementById('room-info').innerText = `Selected Hotel: ${selectedHotel}`;
});

// Step 2: Availability Check
document.getElementById('availability-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const checkInDate = document.getElementById('check-in').value;
    const checkOutDate = document.getElementById('check-out').value;

    // Dummy check (can be replaced with real backend call)
    const roomInfo = "Room available at the selected hotel.";
    document.getElementById('availability-result').innerText = roomInfo;
    document.getElementById('availability-check').style.display = 'none';
    document.getElementById('booking-details').style.display = 'block';
});

// Step 3: Final Booking Submission
document.getElementById('user-info-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const hotel = document.getElementById('hotel').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;

    const bookingDetails = { name, email, phone, hotel, checkIn, checkOut };

    // Save to localStorage
    localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));

    // Send to backend
    fetch('http://localhost:8080/TravelBooking/save_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('booking-details').style.display = 'none';
        document.getElementById('hotel-selection').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';

        if (data.success) {
            document.getElementById('confirmation-details').innerText =
                `✅ Thank you, ${name}! Your booking is confirmed. A confirmation email has been sent to ${email}.`;
        } else {
            document.getElementById('confirmation-details').innerText =
                `❌ Booking failed: ${data.message}`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById('booking-details').style.display = 'none';
        document.getElementById('hotel-selection').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
        document.getElementById('confirmation-details').innerText =
            "❌ An error occurred while saving the booking.";
    });
});

// Cancel Booking
function cancelBooking() {
    localStorage.removeItem('lastBooking');
    alert('Your booking has been canceled.');
    document.getElementById('confirmation-details').innerText = '';
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('hotel-selection').style.display = 'block';
}

// Load Last Booking (Reservation History)
function loadReservationHistory() {
    const lastBooking = JSON.parse(localStorage.getItem('lastBooking'));
    const reservationList = document.getElementById('reservation-list');

    if (lastBooking && reservationList) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Hotel:</strong> ${lastBooking.hotel}<br>
                        <strong>Check-in:</strong> ${lastBooking.checkIn}<br>
                        <strong>Check-out:</strong> ${lastBooking.checkOut}<br>
                        <strong>Name:</strong> ${lastBooking.name}<br>
                        <strong>Email:</strong> ${lastBooking.email}<br>
                        <strong>Phone:</strong> ${lastBooking.phone}`;
        reservationList.appendChild(li);
    }
}

// Back Button
function goBack() {
    window.location.href = 'hotel1.html';
}

// Run on page load
window.onload = loadReservationHistory;
