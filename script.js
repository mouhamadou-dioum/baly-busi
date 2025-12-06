// Configuration - Remplacez ce numéro par votre numéro WhatsApp
const WHATSAPP_NUMBER = '221778629935'; // Format: code pays + numéro sans espaces

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Changement de style de la navbar au scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animation au scroll - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => observer.observe(element));

// Observer les cartes de produits
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Gestion des liens de navigation (active state)
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Smooth scroll pour tous les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fonctionnalité WhatsApp pour les produits
const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productName = this.getAttribute('data-product');
        const productPrice = this.getAttribute('data-price');
        
        // Créer le message WhatsApp
        const message = `Bonjour! Je suis intéressé(e) par le produit: *${productName}* au prix de ${productPrice} FCFA. Pouvez-vous me donner plus d'informations?`;
        
        // Encoder le message pour l'URL
        const encodedMessage = encodeURIComponent(message);
        
        // Créer l'URL WhatsApp
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Animation du bouton avant redirection
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Ouvrir WhatsApp
        window.open(whatsappUrl, '_blank');
    });
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Créer le message WhatsApp avec les informations du formulaire
    const whatsappMessage = `*Nouveau message de contact*%0A%0A*Nom:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    
    // Ouvrir WhatsApp avec le message
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Réinitialiser le formulaire
    contactForm.reset();
    
    // Afficher un message de confirmation
    showNotification('Message envoyé! Nous vous contacterons bientôt.');
});

// Fonction pour afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Retirer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 500);
    }, 3000);
}

// Animation du texte dans le hero
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    heroText.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Démarrer l'animation après un court délai
    setTimeout(typeWriter, 500);
}

// Effet parallax léger sur le hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animation des compteurs (si vous voulez ajouter des statistiques)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Effet de hover sur les images de produits avec cursor
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        const img = image.querySelector('img');
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    image.addEventListener('mouseleave', () => {
        const img = image.querySelector('img');
        img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Lazy loading des images
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
    
    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// Ajouter un effet de particules au hero (optionnel)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        hero.appendChild(particle);
        
        // Animation de la particule
        let opacity = 0.5;
        let size = 5;
        
        const animate = setInterval(() => {
            opacity -= 0.01;
            size += 0.5;
            
            particle.style.opacity = opacity;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            if (opacity <= 0) {
                clearInterval(animate);
                particle.remove();
            }
        }, 50);
    }
}

// Créer des particules périodiquement
setInterval(createParticle, 300);

// Console log pour confirmer que le script est chargé
console.log('Script chargé avec succès! N\'oubliez pas de modifier le numéro WhatsApp dans script.js');
console.log('Numéro WhatsApp actuel:', WHATSAPP_NUMBER);