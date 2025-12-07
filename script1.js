// ============================================
// CONFIGURATION - Mettez votre numéro WhatsApp ici
// ============================================
const WHATSAPP_NUMBER = '221778629935';


// ============================================
// 1. MENU MOBILE (Hamburger)
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Quand on clique sur le hamburger, ouvrir/fermer le menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ============================================
// 2. NAVBAR - Change de style au scroll
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ============================================
// 3. ANIMATIONS AU SCROLL
// ============================================
// Observer pour détecter quand un élément devient visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Animer les éléments fade-in
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => observer.observe(element));

// Animer les cartes produits
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});


// ============================================
// 4. SCROLL FLUIDE (Smooth Scroll)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// 5. COMMANDER UN PRODUIT SUR WHATSAPP
// ============================================
const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Récupérer les infos du produit
        const productName = this.getAttribute('data-product');
        const productPrice = this.getAttribute('data-price');
        
        // Trouver l'image du produit (l'image la plus proche du bouton)
        const productCard = this.closest('.product-card');
        const productImage = productCard.querySelector('.product-image img');
        const imageUrl = productImage.src;
        
        // Créer le message WhatsApp avec l'image
        const message = `Bonjour! 👋
        
Je suis intéressé(e) par ce produit :

📦 *${productName}*
💰 Prix: ${productPrice} FCFA

Voici l'image du produit :
${imageUrl}

Pouvez-vous me donner plus d'informations ?`;
        
        // Encoder le message pour WhatsApp
        const encodedMessage = encodeURIComponent(message);
        
        // Créer le lien WhatsApp
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappUrl, '_blank');
    });
});


// ============================================
// 6. FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher l'envoi normal du formulaire
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Créer le message WhatsApp
        const whatsappMessage = `*📧 Nouveau message de contact*

*Nom:* ${name}
*Email:* ${email}
*Message:* ${message}`;
        
        // Encoder et ouvrir WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Afficher une notification
        afficherNotification('Message envoyé! ✅');
    });
}


// ============================================
// 7. FONCTION POUR AFFICHER UNE NOTIFICATION
// ============================================
function afficherNotification(texte) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.textContent = texte;
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
        font-weight: 500;
        animation: slideIn 0.5s ease;
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Ajouter les animations CSS
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


// ============================================
// 8. ANIMATION DU TEXTE DANS LE HERO (Optionnel)
// ============================================
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const texteComplet = heroText.textContent;
    heroText.textContent = ''; // Vider le texte
    
    let i = 0;
    function ecrireLettre() {
        if (i < texteComplet.length) {
            heroText.textContent += texteComplet.charAt(i);
            i++;
            setTimeout(ecrireLettre, 100); // Écrire une lettre toutes les 100ms
        }
    }
    
    setTimeout(ecrireLettre, 500); // Commencer après 500ms
}


// ============================================
// 9. EFFET PARALLAX SUR LE HERO (Optionnel)
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});


// ============================================
// 10. EFFET 3D SUR LES IMAGES DE PRODUITS
// ============================================
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
    // Quand la souris bouge sur l'image
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left; // Position X de la souris
        const y = e.clientY - rect.top;  // Position Y de la souris
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculer la rotation
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Appliquer la transformation 3D
        const img = image.querySelector('img');
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    // Quand la souris sort de l'image
    image.addEventListener('mouseleave', () => {
        const img = image.querySelector('img');
        img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});


// ============================================
// MESSAGE DE CONFIRMATION DANS LA CONSOLE
// ============================================
console.log('✅ Script chargé avec succès!');
console.log('📱 Numéro WhatsApp:', WHATSAPP_NUMBER);





// sans image photo
// ============================================
// CONFIGURATION - Mettez votre numéro WhatsApp ici
// ============================================
const WHATSAPP_NUMBER = '221778629935';


// ============================================
// 1. MENU MOBILE (Hamburger)
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Quand on clique sur le hamburger, ouvrir/fermer le menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ============================================
// 2. NAVBAR - Change de style au scroll
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ============================================
// 3. ANIMATIONS AU SCROLL
// ============================================
// Observer pour détecter quand un élément devient visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Animer les éléments fade-in
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => observer.observe(element));

// Animer les cartes produits
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});


// ============================================
// 4. SCROLL FLUIDE (Smooth Scroll)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// 5. COMMANDER UN PRODUIT SUR WHATSAPP
// ============================================
const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Récupérer les infos du produit
        const productName = this.getAttribute('data-product');
        const productPrice = this.getAttribute('data-price');
        
        // Trouver l'image du produit (l'image la plus proche du bouton)
        const productCard = this.closest('.product-card');
        const productImage = productCard.querySelector('.product-image img');
        const imageName = productImage.getAttribute('alt') || productName;
        
        // Créer le message WhatsApp SANS le lien de l'image
        const message = `Bonjour! 👋
        
Je suis intéressé(e) par ce produit :

📦 *${productName}*
💰 Prix: ${productPrice} FCFA

📸 Image : ${imageName}

Pouvez-vous me donner plus d'informations ?`;
        
        // Encoder le message pour WhatsApp
        const encodedMessage = encodeURIComponent(message);
        
        // Créer le lien WhatsApp
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappUrl, '_blank');
    });
});


// ============================================
// 6. FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher l'envoi normal du formulaire
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Créer le message WhatsApp
        const whatsappMessage = `*📧 Nouveau message de contact*

*Nom:* ${name}
*Email:* ${email}
*Message:* ${message}`;
        
        // Encoder et ouvrir WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Afficher une notification
        afficherNotification('Message envoyé! ✅');
    });
}


// ============================================
// 7. FONCTION POUR AFFICHER UNE NOTIFICATION
// ============================================
function afficherNotification(texte) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.textContent = texte;
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
        font-weight: 500;
        animation: slideIn 0.5s ease;
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Ajouter les animations CSS
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}


// ============================================
// 8. ANIMATION DU TEXTE DANS LE HERO (Optionnel)
// ============================================
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const texteComplet = heroText.textContent;
    heroText.textContent = ''; // Vider le texte
    
    let i = 0;
    function ecrireLettre() {
        if (i < texteComplet.length) {
            heroText.textContent += texteComplet.charAt(i);
            i++;
            setTimeout(ecrireLettre, 100); // Écrire une lettre toutes les 100ms
        }
    }
    
    setTimeout(ecrireLettre, 500); // Commencer après 500ms
}


// ============================================
// 9. EFFET PARALLAX SUR LE HERO (Optionnel)
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});


// ============================================
// 10. EFFET 3D SUR LES IMAGES DE PRODUITS
// ============================================
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
    // Quand la souris bouge sur l'image
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left; // Position X de la souris
        const y = e.clientY - rect.top;  // Position Y de la souris
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculer la rotation
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Appliquer la transformation 3D
        const img = image.querySelector('img');
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    // Quand la souris sort de l'image
    image.addEventListener('mouseleave', () => {
        const img = image.querySelector('img');
        img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});


// ============================================
// MESSAGE DE CONFIRMATION DANS LA CONSOLE
// ============================================
console.log('✅ Script chargé avec succès!');
console.log('📱 Numéro WhatsApp:', WHATSAPP_NUMBER);