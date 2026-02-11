// ===== LOADING SCREEN =====
const loadingScreen = document.getElementById('loadingScreen');

// Check if this is the first visit in this session
const isFirstVisit = !sessionStorage.getItem('hasVisited');

// Only show loading screen on first visit
if (loadingScreen) {
    if (isFirstVisit) {
        // First visit - show loading screen
        document.body.classList.add('loading');
        
        // Mark as visited in session storage
        sessionStorage.setItem('hasVisited', 'true');
        
        // Hide loading screen after animation completes
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hide');
                document.body.classList.remove('loading');
                
                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 600);
            }, 3000);
        });
    } else {
        // Not first visit - hide loading screen immediately
        loadingScreen.style.display = 'none';
    }
}

// ===== MOBILE MENU =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');

console.log('Menu Elements:', { navMenu, navToggle, navClose, navOverlay });

// Store scroll position
let scrollPosition = 0;

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Toggle clicked - Opening menu');
        
        // Store current scroll position
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        navMenu.classList.add('show-menu');
        if (navOverlay) {
            navOverlay.classList.add('show-overlay');
        }
        // Prevent body scroll when menu is open
        document.body.classList.add('menu-open');
        document.body.style.top = `-${scrollPosition}px`;
        
        console.log('Menu classes:', navMenu.className);
    });
}

// Hide menu function
const hideMenu = () => {
    console.log('Hiding menu');
    
    navMenu.classList.remove('show-menu');
    if (navOverlay) {
        navOverlay.classList.remove('show-overlay');
    }
    // Restore body scroll
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
    
    // Close all dropdowns when menu closes
    const dropdowns = document.querySelectorAll('.nav__dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
};

// Hide menu when clicking close button
if (navClose) {
    navClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked');
        hideMenu();
    });
}

// Hide menu when clicking overlay
if (navOverlay) {
    navOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Overlay clicked');
        hideMenu();
    });
}

// Prevent menu from closing when clicking inside it
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Handle dropdown toggle on mobile
        const parentDropdown = link.closest('.nav__dropdown');
        if (parentDropdown && window.innerWidth <= 920) {
            // Check if it's the dropdown trigger (has arrow)
            if (link.querySelector('.arrow-down')) {
                e.preventDefault();
                parentDropdown.classList.toggle('active');
                return;
            }
        }
        
        // Close menu when clicking regular links
        if (window.innerWidth <= 920 && !link.querySelector('.arrow-down')) {
            hideMenu();
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 920) {
        const dropdowns = document.querySelectorAll('.nav__dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// Hide menu when resizing window to larger size
window.addEventListener('resize', () => {
    if (window.innerWidth > 920) {
        hideMenu();
    }
});

// ===== HEADER SCROLL =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#services') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to your server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
        
        // In production, you would do something like:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again or call us directly.');
        });
        */
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function reveal() {
    const reveals = document.querySelectorAll('.service__card, .benefit__item, .feature__card, .process__step, .info__card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Call once on page load

// ===== LAZY LOADING IMAGES =====
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== NEWSLETTER FORM (FOR FOOTER) =====
const newsletterForm = document.querySelector('.footer__newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would send the email to your newsletter service
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// ===== HERO SLIDER =====
const heroSlider = () => {
    const slides = document.querySelectorAll('.hero__slide');
    let currentSlide = 0;
    const imageDuration = 6000; // 6 seconds for each image
    const zoomDuration = 25000; // Very slow zoom animation (25 seconds)
    let sliderTimer;
    let isTransitioning = false;
    
    if (slides.length === 0) return;
    
    const showSlide = (index) => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Don't remove active from current slide yet (crossfade)
        const previousSlide = slides[(index - 1 + slides.length) % slides.length];
        
        // Add active class to new slide
        slides[index].classList.add('active');
        const currentImg = slides[index].querySelector('.hero__media');
        if (currentImg) {
            currentImg.style.animation = 'none';
            void currentImg.offsetWidth;
            currentImg.style.animation = `heroZoomDynamic ${zoomDuration}ms ease-out forwards`;
        }
        
        // Wait for fade to complete, then remove previous slide
        setTimeout(() => {
            slides.forEach((slide, i) => {
                if (i !== index) {
                    slide.classList.remove('active');
                    const img = slide.querySelector('.hero__media');
                    if (img) {
                        img.style.animation = 'none';
                    }
                }
            });
            isTransitioning = false;
        }, 3000);
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };
    
    // Initialize first slide animation
    const firstImg = slides[0].querySelector('.hero__media');
    if (firstImg) {
        firstImg.style.animation = `heroZoomDynamic ${zoomDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`;
    }
    
    // Start automatic slideshow
    sliderTimer = setInterval(nextSlide, imageDuration);
};

// ===== BACK TO TOP BUTTON (OPTIONAL) =====
const createBackToTop = () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
};

// Uncomment to enable back to top button
// createBackToTop();

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    heroSlider();
});

console.log('Tigersaut website loaded successfully!');
