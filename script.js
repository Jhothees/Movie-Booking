// Handle Movie Selection & Booking Logic (For index.html and payment.html)

// Handle login and session management
const loggedInUser = sessionStorage.getItem('loggedInUser');
if (loggedInUser) {
    // User is logged in, show greeting message
    document.getElementById('login-status').innerHTML = `Hello, ${loggedInUser}! <a href="logout.html">Logout</a>`;
} else {
    // If user is not logged in, redirect to login page
    window.location.href = 'login.html';
}

// Handling Movie Booking
const movieButtons = document.querySelectorAll('.movie button');
movieButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const movieName = event.target.previousElementSibling.innerText; // Get movie name
        const userId = sessionStorage.getItem('userId'); // Get logged-in user ID from session storage

        if (userId) {
            // Redirect user to payment page with the selected movie's name
            window.location.href = `payment.html?movie=${encodeURIComponent(movieName)}&userId=${userId}`;
        } else {
            alert('Please log in to book a movie.');
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }
    });
});

// Payment Page (payment.html)
const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const movieName = document.getElementById('movie-name').value;
        const amount = document.getElementById('amount').value;

        if (!amount || !movieName) {
            alert('Please provide all required information.');
            return;
        }

        // Perform AJAX call to process the payment (just simulating here)
        fetch('payment.php', {
            method: 'POST',
            body: JSON.stringify({ movieName, amount }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Payment Successful!');
                window.location.href = 'index.html'; // Redirect to homepage after successful payment
            } else {
                alert('Payment failed, please try again.');
            }
        })
        .catch(err => {
            alert('Error processing payment: ' + err);
        });
    });
}
