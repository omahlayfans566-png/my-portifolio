console.log('Portfolio loaded');

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Toggle sidebar
    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close sidebar when a link is clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.header')) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Handle nav bar active state
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