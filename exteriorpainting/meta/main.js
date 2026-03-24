// ===== LANDING PAGE JAVASCRIPT - EXTERIOR PAINTING /META/ =====

// ===== HEADER SCROLL EFFECT =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (header && window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else if (header) {
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq__item').forEach(item => {
    const question = item.querySelector('.faq__question');
    if (!question) return;
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq__item').forEach(o => {
            o.classList.remove('active');
            const q = o.querySelector('.faq__question');
            if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== PHONE NUMBER FORMATTING =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
    });
}

// ===== FORM HANDLING – META VERSION =====
const metaForm = document.getElementById('exterior-painting-form-meta');

if (metaForm) {
    console.log('[META] ✅ Form found');

    metaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Correct field names: first_name, phone, email, address1
        const formData = new FormData(metaForm);
        const data = Object.fromEntries(formData.entries());

        console.log('[META] Form data:', data);

        // Validate using correct field names
        if (!data.first_name || !data.phone || !data.email || !data.address1) {
            alert('Please fill in all required fields.');
            return;
        }

        // Disable button to prevent double submit
        const submitBtn = metaForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
        }

        // Fire Meta Pixel Lead event
        if (typeof fbq === 'function') {
            fbq('track', 'Lead');
        }

        // Webhook payload
        const webhookData = {
            NOME: data.first_name,
            TELEFONE: data.phone,
            EMAIL: data.email,
            ENDERECO: data.address1,
            FONTE: 'Exterior Painting LP – Meta Ads',
            PLATAFORMA: 'meta ads',
            'DETALHES DO PROJETO': data.project_details || 'Not provided'
        };

        console.log('[META] Sending to webhook:', webhookData);

        fetch('https://mediagrowth-n8n.63kuy3.easypanel.host/webhook/71fb9d1c-b668-4cfe-9757-a4aca3353990', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookData)
        })
        .then(res => {
            console.log('[META] ✅ Webhook response:', res.status);
            return res.json().catch(() => ({}));
        })
        .then(() => {
            console.log('[META] ➡️ Redirecting to thank-you.html');
            window.location.href = 'thank-you.html';
        })
        .catch(err => {
            console.error('[META] ❌ Webhook error:', err);
            window.location.href = 'thank-you.html';
        });
    });
} else {
    console.error('[META] ❌ Form NOT found!');
}

// ===== PHONE CLICK – Lead + Webhook =====
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function () {
        console.log('[META] Phone clicked');

        // Meta Pixel Lead
        if (typeof fbq === 'function') {
            fbq('track', 'Lead');
        }

        // Google Ads conversion
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'send_to': 'AW-17997693441/tnCACJjQ4IMcEIGE_IVD',
                'value': 1.0,
                'currency': 'USD'
            });
        }

        // Webhook
        fetch('https://mediagrowth-n8n.63kuy3.easypanel.host/webhook/ec939d78-6ec5-4a54-903d-d2db027319f2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                NOME: 'Phone Call Click',
                TELEFONE: '+1 (857) 243-3017',
                FONTE: 'Exterior Painting LP – Meta Ads',
                PLATAFORMA: 'meta ads',
                'PERGUNTA QUALIFICATIVA': 'Lead via phone call click'
            })
        })
        .then(() => console.log('[META] ✅ Phone click sent to webhook'))
        .catch(err => console.error('[META] ❌ Webhook error on phone click:', err));
    });
});

// ===== CTA CLICK TRACKING =====
document.querySelectorAll('.btn-primary, .floating-call').forEach(btn => {
    btn.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        console.log('[META] CTA Clicked:', buttonText);
        if (typeof gtag === 'function') {
            gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
        }
    });
});

// ===== ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit__card, .testimonial__card, .step__card, .faq__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
