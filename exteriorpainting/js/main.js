// ===== LANDING PAGE JAVASCRIPT - EXTERIOR PAINTING =====

// ===== HEADER SCROLL EFFECT =====
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
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== FORM HANDLING =====
const exteriorPaintingForm = document.getElementById('exterior-painting-form');

if (exteriorPaintingForm) {
    exteriorPaintingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            message: document.getElementById('message').value,
            sms_consent: document.getElementById('sms_consent').checked,
            source: 'Exterior Painting Landing Page',
            service: 'Exterior Painting'
        };
        
        // Validate required fields
        if (!formData.name || !formData.phone || !formData.email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = exteriorPaintingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Here you would typically send the data to your server
        // For now, we'll simulate a successful submission
        console.log('Form submitted:', formData);
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset form
            exteriorPaintingForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            alert('Thank you for your interest! We\'ll contact you within 24 hours to schedule your free estimate.');
            
            // Optional: Track conversion for Google Ads
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'value': 1.0,
                    'currency': 'USD'
                });
            }
            
        }, 1500);
    });
}

// ===== PHONE NUMBER FORMATTING =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.benefit__card, .testimonial__card, .step__card, .faq__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add CSS class for animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== SCROLL TO TOP ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Check if there's a hash in the URL
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

// ===== TRACK CLICK EVENTS FOR ANALYTICS =====
document.querySelectorAll('.btn-primary, .floating-call').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('CTA Clicked:', buttonText);
        
        // Google Analytics Event (if available)
        if (typeof gtag === 'function') {
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': buttonText
            });
        }
    });
});

// ===== PHONE CLICK TRACKING =====
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
        console.log('Phone number clicked');
        
        if (typeof gtag === 'function') {
            gtag('event', 'click', {
                'event_category': 'Contact',
                'event_label': 'Phone Call'
            });
        }
    });
});
