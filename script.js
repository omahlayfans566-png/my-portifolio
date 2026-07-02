/* ===================================================
   PREMIUM PORTFOLIO - SCRIPT.JS
   All interactivity, animations, and effects
   =================================================== */

'use strict';

/* ===========================
   LOADING SCREEN
   =========================== */
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 900);
});

/* ===========================
   PARTICLES.JS CONFIG
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 900 } },
                color: { value: ['#a855f7', '#3b82f6', '#06b6d4'] },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false } },
                size: { value: 2, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
                line_linked: { enable: true, distance: 160, color: '#a855f7', opacity: 0.08, width: 1 },
                move: { enable: true, speed: 0.8, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.25 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }
});

/* ===========================
   AOS INITIALIZATION
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }
});

/* ===========================
   SCROLL PROGRESS BAR
   =========================== */
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ===========================
   NAVBAR SCROLL BEHAVIOR
   =========================== */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ===========================
   ACTIVE NAV LINK (IntersectionObserver)
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.35, rootMargin: '-72px 0px 0px 0px' });

    sections.forEach(section => observer.observe(section));
});

/* ===========================
   HAMBURGER / MOBILE MENU
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) closeMenu();
            else openMenu();
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
});

/* ===========================
   LIGHT / DARK MODE TOGGLE
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            if (icon) {
                if (isLight) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
                else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
            }
        });
    }
});

/* ===========================
   ANIMATED COUNTERS
   =========================== */
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

/* ===========================
   ANIMATED SKILL BARS
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.skill-progress');
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const width = entry.target.dataset.width;
                setTimeout(() => { entry.target.style.width = width + '%'; }, 200);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => barObserver.observe(bar));
});

/* ===========================
   SKILLS FILTER
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            skillCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // reflow
                    card.style.animation = 'fadeInScale 0.3s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

/* ===========================
   CONTACT FORM - WhatsApp Integration
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    function showToast(message, success = true) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMessage');
        const icon = toast.querySelector('i');

        toastMsg.textContent = message;
        icon.className = success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        icon.style.color = success ? '#22c55e' : '#ef4444';

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                showToast('Please fill in all fields!', false);
                return;
            }

            // Build a clean WhatsApp message
            const whatsappText =
                `*New Portfolio Message* 🚀\n\n` +
                `*Name:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Subject:* ${subject}\n\n` +
                `*Message:*\n${message}`;

            // Encode and open WhatsApp
            const encoded = encodeURIComponent(whatsappText);
            const whatsappURL = `https://wa.me/2349058741644?text=${encoded}`;
            window.open(whatsappURL, '_blank');

            // Reset form and notify
            form.reset();
            showToast('Opening WhatsApp... message ready to send!', true);
        });
    }
});

/* ===========================
   BACK TO TOP
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    }, { passive: true });

    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/* ===========================
   DOWNLOAD CV (placeholder)
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const cvBtns = document.querySelectorAll('#downloadCV, #downloadCV2');
    cvBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace 'cv.pdf' with your actual CV file path
            const link = document.createElement('a');
            link.href = 'cv.pdf';
            link.download = 'PREcioUS_CV.pdf';
            link.click();
        });
    });
});

/* ===========================
   SMOOTH SCROLL for ALL anchor links
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

/* ===========================
   SKILL CARD ANIMATION
   (CSS keyframe via JS injection)
   =========================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

/* ===========================
   INIT on DOM Ready
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initial navbar state
    handleNavbarScroll();
    updateScrollProgress();

    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        });
    }

    console.log('%c🚀 Portfolio Loaded — Built by PREcioUS',
        'color: #a855f7; font-size: 14px; font-weight: bold; padding: 8px;');
});
