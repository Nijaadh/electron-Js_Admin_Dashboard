document.addEventListener('DOMContentLoaded', () => {
    // Get username from session storage
    const username = sessionStorage.getItem('currentUser');

    // Update all username elements using their IDs
    const sidebarUsername = document.getElementById('sidebarUsername');
    const navbarUsername = document.getElementById('navbarUsername');

    if (sidebarUsername) {
        sidebarUsername.textContent = username || 'Guest User';
    }

    if (navbarUsername) {
        navbarUsername.textContent = username || 'Guest User';
    }
});
