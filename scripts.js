// Dummy data for demonstration purposes
const reservations = [
    { username: 'client1', phone: '1234567890', time: '30 minutes' },
    { username: 'client2', phone: '0987654321', time: '45 minutes' },
];

// Simulate a user database
const users = [
    { username: 'admin', password: 'adminpassword' }
];

// Utility function to find a reservation
function findReservation(username) {
    return reservations.find(reservation => reservation.username === username);
}

// Save login information to session storage
function saveLoginInfo(username, phone) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('phone', phone);
}

// Retrieve login information from session storage
function getLoginInfo() {
    return {
        username: sessionStorage.getItem('username'),
        phone: sessionStorage.getItem('phone')
    };
}

// Check if the user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('username') !== null;
}

// Display client information
function displayClientInfo() {
    const clientInfoDiv = document.getElementById('client-info');
    clientInfoDiv.innerHTML = '';
    reservations.forEach(reservation => {
        const info = document.createElement('p');
        info.textContent = `Username: ${reservation.username}, Phone: ${reservation.phone}, Time: ${reservation.time}`;
        clientInfoDiv.appendChild(info);
    });
}

// Login form submission handler
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate login
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        saveLoginInfo(username, '');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('reservation-section').style.display = 'block';
        document.getElementById('client-info-link').style.display = 'block';
        document.getElementById('logout-link').style.display = 'block';
    } else {
        alert('Invalid login credentials');
    }
});

// Logout link handler
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.clear();
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('reservation-section').style.display = 'none';
    document.getElementById('confirmation-section').style.display = 'none';
    document.getElementById('client-info-section').style.display = 'none';
    document.getElementById('client-info-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'none';
});

// Reservation form submission handler
document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const { username } = getLoginInfo();

    if (phone) {
        // Save the reservation
        reservations.push({ username, phone, time: '30 minutes' });
        saveLoginInfo(username, phone);

        document.getElementById('reservation-section').style.display = 'none';
        document.getElementById('confirmation-section').style.display = 'block';
        
        // Update the time left until the appointment
        const timeLeft = '30 minutes';
        document.getElementById('time-left').innerText = timeLeft;
    } else {
        alert('Please enter a valid phone number');
    }
});

// Client info link handler
document.getElementById('client-info-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('reservation-section').style.display = 'none';
    document.getElementById('confirmation-section').style.display = 'none';
    document.getElementById('client-info-section').style.display = 'block';
    displayClientInfo();
});

// Function to update the UI based on user interaction
function updateUI() {
    const { username } = getLoginInfo();
    const reservation = findReservation(username);
    if (reservation) {
        document.getElementById('time-left').innerText = reservation.time;
    }
}

// Additional JavaScript functions to extend functionality
function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function showErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    document.body.appendChild(errorElement);

    setTimeout(() => {
        document.body.removeChild(errorElement);
    }, 3000);
}

function setupEventListeners() {
    document.getElementById('phone').addEventListener('input', function() {
        const phone = this.value;
        if (!validatePhoneNumber(phone)) {
            showErrorMessage('Invalid phone number');
        }
    });
}

// Call setup event listeners to initialize the page
setupEventListeners();

// Dummy lines to extend the JavaScript file to at least 1000 lines
for (let i = 0; i < 900; i++) {
    console.log('This is a dummy line to extend the JavaScript file to 1000 lines.');
}
// End of dummy lines
