document.getElementById('user-dashboard').addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:5000/get-bookings'); // Endpoint to get bookings
        const bookingData = await response.json();

        const confirmationList = document.getElementById('confirmation-list');

        bookingData.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.innerHTML = `
                <h3>${booking.flightDetails}</h3>
                <p>Name: ${booking.name}</p>
                <p>Email: ${booking.email}</p>
                <p>Special Requests: ${booking.specialRequests}</p>
            `;
            confirmationList.appendChild(bookingItem);
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
});