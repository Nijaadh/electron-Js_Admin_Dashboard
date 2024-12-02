document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const baseUrl = "https://c1.abisystems.net/bonita";

    $('#loginStatus').show();
    $('.spinner-border').hide();

    if (!loginForm) {
        console.error('Login form not found');
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('floatingInput')?.value?.trim() || '';
        const password = document.getElementById('floatingPassword')?.value?.trim() || '';

        // Show spinner at the start of login attempt
        $('.spinner-border').show();
        $('#loginStatus').show();
        

        // Validation
        if (!username || !password) {
            $('#lockIcon').addClass('shake');
            $('#errorMessage').text(!username && !password ?
                "Please provide both your username and password to proceed." :
                !username ? "Please provide your username." : "Please provide your password."
            ).fadeIn();
            $('.spinner-border').hide(); // Hide spinner on validation error
            setTimeout(() => {
                $('#lockIcon').removeClass('shake');
            }, 500);
            return;
        }

        const loginUrl = `${baseUrl}/loginservice?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&redirect=false`;

        try {
            const result = await window.electronAPI.login(loginUrl);

            if (result.success) {
                localStorage.setItem('token', JSON.stringify(result.cookies));
                sessionStorage.setItem('currentUser', username);
                $('.spinner-border, #lockIcon').removeClass('text-danger').addClass('text-success');
                $('#lockIcon').removeClass('fa-lock').addClass('fa-unlock');
                setTimeout(() => {
                    window.location.href = '../dashboard/dashboard.html';
                }, 1500);
            } else {
                $('#lockIcon').addClass('shake');
                $('#errorMessage').text('The username and password you entered do not match. Please try again.');
                $('.spinner-border').hide(); // Hide spinner on login failure
                setTimeout(() => {
                    $('#lockIcon').removeClass('shake');
                }, 500);
            }
        } catch (error) {
            console.error('Login error:', error);
            $('#lockIcon').addClass('shake');
            $('#errorMessage').text('We encountered an issue connecting to the server. Please check your internet connection and try again.').fadeIn();
            $('.spinner-border').hide(); // Hide spinner on error
            setTimeout(() => {
                $('#lockIcon').removeClass('shake');
            }, 500);
        }
    });
});
