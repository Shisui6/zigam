// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = '#FFFFFF';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        // Transform hamburger to X
        const bars = document.querySelectorAll('.menu-toggle .bar');
        bars.forEach(bar => bar.classList.toggle('animate'));
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');

            // Reset hamburger icon
            const bars = document.querySelectorAll('.menu-toggle .bar');
            bars.forEach(bar => bar.classList.remove('animate'));
        });
    });

    // Smooth scrolling for anchor links
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Service and pricing cards hover animation enhancement
    const cards = document.querySelectorAll('.service-card, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // Update navigation active state on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');

                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Add animation styles for hamburger menu
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        .menu-toggle .bar.animate:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .menu-toggle .bar.animate:nth-child(2) {
            opacity: 0;
        }

        .menu-toggle .bar.animate:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    </style>
    `);
});