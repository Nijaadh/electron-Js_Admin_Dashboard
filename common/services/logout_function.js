      
// function handleLogout() {
//     Swal.fire({
//         title: 'Ready to Leave?',
//         text: "You will be logged out of your session",
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#EB1616',
//         cancelButtonColor: '#6C7293',
//         confirmButtonText: 'Yes, logout',
//         background: '#191C24',
//         color: '#fff'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // Perform logout actions here
//             window.location.href = '../login_component/login.html';
//         }
//     });
// }




// function handleLogout() {
//     const popup = document.createElement('div');
//     popup.innerHTML = `
//         <div class="logout-popup">
//             <h2>Are you sure you want to logout?</h2>
//             <p>You will be logged out in <span class="countdown">10</span> seconds</p>
//             <div class="popup-buttons">
//                 <button class="cancel-btn">Cancel</button>
//                 <button class="confirm-btn">Logout</button>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(popup);

//     let countdown = 10;
//     const countdownSpan = popup.querySelector('.countdown');
//     const timer = setInterval(() => {
//         countdown--;
//         countdownSpan.textContent = countdown;
//         if (countdown === 0) {
//             clearInterval(timer);
//             window.location.href = '../login_component/login.html';
//         }
//     }, 1000);

//     popup.querySelector('.cancel-btn').onclick = () => {
//         clearInterval(timer);
//         document.body.removeChild(popup);
//     };

//     popup.querySelector('.confirm-btn').onclick = () => {
//         clearInterval(timer);
//         window.location.href = '../login_component/login.html';
//     };
// }






// function handleLogout() {
//     const popup = document.createElement('div');
//     popup.innerHTML = `
//         <div class="logout-popup">
//             <div class="popup-content">
//                 <h2>Are you sure you want to logout?</h2>
//                 <p>You will be logged out in <span class="countdown">10</span> seconds</p>
//                 <div class="popup-buttons">
//                     <button class="cancel-btn">Cancel</button>
//                     <button class="confirm-btn">Logout</button>
//                 </div>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(popup);

//     // GSAP Animations
//     gsap.from(".logout-popup", {
//         duration: 0.5,
//         scale: 0,
//         opacity: 0,
//         ease: "back.out(1.7)"
//     });

//     gsap.from(".popup-content", {
//         duration: 0.4,
//         y: 40,
//         opacity: 0,
//         delay: 0.2,
//         ease: "power2.out"
//     });

//     gsap.from(".popup-buttons button", {
//         duration: 0.3,
//         x: -20,
//         opacity: 0,
//         stagger: 0.1,
//         delay: 0.4
//     });

//     let countdown = 10;
//     const countdownSpan = popup.querySelector('.countdown');
//     const timer = setInterval(() => {
//         countdown--;
//         countdownSpan.textContent = countdown;
//         if (countdown === 0) {
//             closePopupWithAnimation();
//             setTimeout(() => {
//                 window.location.href = '../login_component/login.html';
//             }, 500);
//         }
//     }, 1000);

//     function closePopupWithAnimation() {
//         gsap.to(".logout-popup", {
//             duration: 0.4,
//             scale: 0.8,
//             opacity: 0,
//             onComplete: () => document.body.removeChild(popup)
//         });
//     }

//     popup.querySelector('.cancel-btn').onclick = () => {
//         clearInterval(timer);
//         closePopupWithAnimation();
//     };

//     popup.querySelector('.confirm-btn').onclick = () => {
//         clearInterval(timer);
//         closePopupWithAnimation();
//         setTimeout(() => {
//             window.location.href = '../login_component/login.html';
//         }, 500);
//     };
// }

// function handleLogout() {
//     const popup = document.createElement('div');
//     popup.innerHTML = `
//         <div class="logout-popup">
//             <div class="popup-content">
//                 <h2>Are you sure you want to logout?</h2>
//                 <div class="popup-buttons">
//                     <button class="cancel-btn">Cancel</button>
//                     <button class="confirm-btn">Logout</button>
//                 </div>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(popup);

//     // GSAP Animations
//     gsap.from(".logout-popup", {
//         duration: 0.5,
//         scale: 0,
//         opacity: 0,
//         ease: "back.out(1.7)"
//     });

//     gsap.from(".popup-content", {
//         duration: 0.4,
//         y: 40,
//         opacity: 0,
//         delay: 0.2,
//         ease: "power2.out"
//     });

//     gsap.from(".popup-buttons button", {
//         duration: 0.3,
//         x: -20,
//         opacity: 0,
//         stagger: 0.1,
//         delay: 0.4
//     });

//     function closePopupWithAnimation() {
//         gsap.to(".logout-popup", {
//             duration: 0.4,
//             scale: 0.8,
//             opacity: 0,
//             onComplete: () => document.body.removeChild(popup)
//         });
//     }

//     popup.querySelector('.cancel-btn').onclick = closePopupWithAnimation;

//     popup.querySelector('.confirm-btn').onclick = () => {
//         closePopupWithAnimation();
//         setTimeout(() => {
//             window.location.href = '../login_component/login.html';
//         }, 500);
//     };
// }



function handleLogout() {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div class="logout-popup">
            <div class="popup-content">
                <div class="header-row">
                    <i class="fas fa-sign-out-alt logout-icon"></i>
                    <h2>Ready to take a break?</h2>
                </div>
                <p class="info-text">You'll have to log in again if you leave now. Would you like to proceed?</p>
                <div class="popup-buttons">
                    <button class="cancel-btn">Keep Me Logged In</button>
                    <button class="confirm-btn">Log Out Anyway</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // Icon animation
    gsap.from(".logout-icon", {
        duration: 0.6,
        rotate: 360,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)"
    });

    // Existing animations
    gsap.from(".logout-popup", {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)"
    });

    gsap.from(".popup-content", {
        duration: 0.4,
        y: 40,
        opacity: 0,
        delay: 0.2,
        ease: "power2.out"
    });

    gsap.from(".popup-buttons button", {
        duration: 0.3,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.4
    });

    function closePopupWithAnimation() {
        gsap.to(".logout-popup", {
            duration: 0.4,
            scale: 0.8,
            opacity: 0,
            onComplete: () => document.body.removeChild(popup)
        });
    }

    popup.querySelector('.cancel-btn').onclick = closePopupWithAnimation;

    popup.querySelector('.confirm-btn').onclick = () => {
        closePopupWithAnimation();
        setTimeout(() => {
            window.location.href = '../login_component/login.html';
        }, 500);
    };
}
