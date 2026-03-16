// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add animation
    themeToggle.style.transform = 'scale(0.8) rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-wrapper')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Call on page load

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .education-card, .about-text, .hero-text, .hero-image'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ==================== SKILL BARS ANIMATION ====================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    if (!name || !email || !message) {
        showNotification('Please fill all fields before sending.', 'error');
        return;
    }

    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to send message.');
        }

        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Could not send your message right now. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? 
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
            'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease',
        fontSize: '1rem',
        fontWeight: '500',
        maxWidth: '300px'
    });
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
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

// ==================== CURSOR EFFECT (Optional Enhancement) ====================
// Create custom cursor trail effect
let cursorDots = [];
const maxDots = 15;

function createCursorDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    
    Object.assign(dot.style, {
        position: 'fixed',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        pointerEvents: 'none',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: '9999',
        opacity: '0.6',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease'
    });
    
    document.body.appendChild(dot);
    cursorDots.push(dot);
    
    if (cursorDots.length > maxDots) {
        const oldDot = cursorDots.shift();
        oldDot.remove();
    }
    
    // Fade out and remove
    setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => {
            if (dot.parentNode) {
                dot.remove();
            }
        }, 300);
    }, 500);
}

// Only enable cursor effect on larger screens
if (window.innerWidth > 768) {
    let throttleTimer = false;
    document.addEventListener('mousemove', (e) => {
        if (!throttleTimer) {
            createCursorDot(e.clientX, e.clientY);
            throttleTimer = true;
            setTimeout(() => {
                throttleTimer = false;
            }, 50);
        }
    });
}

// ==================== TYPING EFFECT FOR HERO SUBTITLE ====================
const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle.textContent;
let charIndex = 0;

function typeWriter() {
    if (charIndex < subtitleText.length) {
        heroSubtitle.textContent = subtitleText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    heroSubtitle.textContent = '';
    setTimeout(typeWriter, 500);
});

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== PROJECT CARD TILT EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

Object.assign(scrollTopBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
    zIndex: '1000',
    transition: 'all 0.3s ease'
});

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = '';
    scrollTopBtn.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
});

// ==================== PRELOADER (Optional) ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

// ==================== LOG WELCOME MESSAGE ====================
console.log('%c Welcome to Gagan Rai\'s Portfolio! ', 
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Looking for something? Feel free to reach out! ', 
    'color: #667eea; font-size: 14px;');
