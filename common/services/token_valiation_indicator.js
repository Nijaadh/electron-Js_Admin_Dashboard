// // Add this function to check token status
// function checkTokenStatus() {
//     const statusDot = document.querySelector('.bg-success');
//     const token = JSON.parse(localStorage.getItem('token'));
//     console.log(token);
    
//     if (!token || isTokenExpired(token)) {
//         statusDot.classList.remove('bg-success');
//         statusDot.classList.add('bg-danger');
//     } else {
//         statusDot.classList.remove('bg-danger');
//         statusDot.classList.add('bg-success');
//     }
// }

// // Helper function to check token expiration
// function isTokenExpired(token) {
//     try {
//         const tokenData = JSON.parse(atob(token.split('.')[1]));
//         return tokenData.exp * 1000 < Date.now();
//     } catch {
//         return true;
//     }
// }

// // Add interval to check token status every minute
// setInterval(checkTokenStatus, 60000);

// // Check immediately on page load
// document.addEventListener('DOMContentLoaded', checkTokenStatus);
