document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    fetch('https://portofolio-backend-lhcp.onrender.com/user/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User signed in successfully") {
            // Store the token in local storage
            localStorage.setItem('token', data.token);

            // Redirect to the dashboard
            window.location.href = './dashboard.html';
        }  else if (data.message === "Incorrect password") {
            // Show an error message to the user
            document.querySelector('#error-message').textContent = "Incorrect password. Please try again.";
        }else {
            // Handle any other server responses here
            console.log(data);
            document.querySelector('#error-message').textContent = "something went wrong . Please try again.";
        }
    })
    .catch(error => console.error('Error:', error));
});
