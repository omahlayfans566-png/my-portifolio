console.log('Portfolio loaded');

// Handle nav bar active state
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-bar a');

    // Get the saved active link from localStorage
    const activeLink = localStorage.getItem('activeNavLink');

    // Apply active class to the saved link on page load
    if (activeLink) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === activeLink) {
                link.classList.add('active');
            }
        });
    }

    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Save the active link to localStorage
            localStorage.setItem('activeNavLink', this.getAttribute('href'));
        });
    });
});