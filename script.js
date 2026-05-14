// JavaScript for interactivity and accessibility

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function closeNav() {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            closeNav();
        });
    });

    // Highlight active nav item on scroll
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        sections.forEach(section => {
            const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
            if (!link) return;
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Handle contact form submission with feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // The form will be submitted to formsubmit.co
            // You can add custom handling here if needed
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add fade-in animation on load with stagger
    const elements = document.querySelectorAll('.hero-content, .info-card, .skill-card, .contact-links, .contact-form-container, .contact-options');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Ensure links are accessible
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.setAttribute('tabindex', '0');
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
