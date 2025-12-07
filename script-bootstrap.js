// ============================================
// CONFIGURATION
// ============================================
const WHATSAPP_NUMBER = '221778629935';


// ============================================
// NAVBAR - Changement au scroll
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ============================================
// NAVIGATION ACTIVE
// ============================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});


// ============================================
// BOUTONS WHATSAPP - Commander un produit
// ============================================
const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Empêcher le carousel de changer
        
        // Récupérer les infos du produit
        const productName = this.getAttribute('data-product');
        const productPrice = this.getAttribute('data-price');
        
        // Trouver l'image du produit
        const card = this.closest('.card');
        let productImage = card.querySelector('.card-img-top');
        
        // Si c'est dans un carousel, prendre l'image active
        const activeSlide = card.querySelector('.carousel-item.active');
        if (activeSlide) {
            productImage = activeSlide.querySelector('.card-img-top');
        }
        
        const imageName = productImage ? productImage.getAttribute('alt') : productName;
        
        // Créer le message WhatsApp
        const message = `Bonjour! 👋

Je suis intéressé(e) par ce produit :

📦 *${productName}*
💰 Prix: ${productPrice} FCFA

📸 Image : ${imageName}

Pouvez-vous me donner plus d'informations ?`;
        
        // Encoder et ouvrir WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    });
});


// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Créer le message WhatsApp
        const whatsappMessage = `*📧 Nouveau message de contact*

*Nom:* ${name}
*Email:* ${email}
*Message:* ${message}`;
        
        // Ouvrir WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Afficher notification Bootstrap
        showToast('Message envoyé! ✅');
    });
}


// ============================================
// NOTIFICATION (Toast Bootstrap)
// ============================================
function showToast(message) {
    // Créer un toast Bootstrap
    const toastHTML = `
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 11000">
            <div class="toast show" role="alert">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Notification</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `;
    
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}


// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// EMPÊCHER LE CAROUSEL DE CHANGER AU HOVER
// ============================================
document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('mouseenter', function() {
        // Arrêter l'auto-play si activé
        const bsCarousel = bootstrap.Carousel.getInstance(this);
        if (bsCarousel) {
            bsCarousel.pause();
        }
    });
});


// ============================================
// ANIMATION DES CARDS AU SCROLL (Optionnel)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

// Observer toutes les cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});


// ============================================
// MESSAGE DE CONFIRMATION
// ============================================
console.log('✅ Script Bootstrap chargé avec succès!');
console.log('📱 Numéro WhatsApp:', WHATSAPP_NUMBER);
console.log('🎠 Carousels Bootstrap activés');