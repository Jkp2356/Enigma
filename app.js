// ENIGMA E-Cell Website JavaScript - Final Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links - FIXED HOME LINK
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                let scrollTarget = 0; // Default to top for home
                
                if (targetId === '#home') {
                    // Scroll to the very top for home
                    scrollTarget = 0;
                } else {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const navbarHeight = 64;
                        scrollTarget = targetSection.offsetTop - navbarHeight;
                    }
                }
                
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
                
                // Update active link immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Active navigation link highlighting - FIXED
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = 'home'; // Default to home
        const scrollPosition = window.pageYOffset + 100;
        
        // If we're at the very top or in the hero area, highlight home
        if (window.pageYOffset < 200) {
            currentSection = 'home';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', setActiveNavLink);

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarOpacity() {
        if (!navbar) return;
        
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = `rgba(19, 52, 59, 0.98)`;
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = `rgba(19, 52, 59, 0.95)`;
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    window.addEventListener('scroll', updateNavbarOpacity);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .event-card, .testimonial-card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Hero CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to about section when CTA is clicked
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const navbarHeight = 64;
                const offsetTop = aboutSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Simplified parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (scrolled <= window.innerHeight && heroContent && heroVisual) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
        }
    }

    window.addEventListener('scroll', updateParallax);

    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .event-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Tech grid animation enhancement
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.5}s`;
        
        // Simple pulse effect
        setInterval(() => {
            if (Math.random() > 0.8) {
                item.style.boxShadow = '0 0 15px rgba(50, 184, 198, 0.4)';
                setTimeout(() => {
                    item.style.boxShadow = 'none';
                }, 800);
            }
        }, 4000 + index * 1000);
    });

    // Simple reveal animation for testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        testimonialObserver.observe(card);
    });

    // Initialize on page load
    setActiveNavLink();
    updateNavbarOpacity();

    // Add click handlers for social links to prevent issues
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, these would link to actual social media pages
            console.log('Social link clicked:', this.textContent);
        });
    });

    console.log('ENIGMA E-Cell website loaded successfully!');
});