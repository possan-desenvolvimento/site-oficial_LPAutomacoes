// ========== MENU MOBILE ==========
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Função para clonar os controles (tema e idioma) para dentro do menu mobile
function addControlsToMobileMenu() {
    // Só adiciona se estiver no mobile (largura <= 768px)
    if (window.innerWidth > 768) return;
    
    const navControls = document.querySelector('.nav-controls');
    const mobileNavMenu = document.querySelector('.nav-menu');
    
    // Verifica se existe e se já não foi adicionado
    if (navControls && mobileNavMenu && !mobileNavMenu.querySelector('.mobile-nav-controls')) {
        // Clona os controles
        const clonedControls = navControls.cloneNode(true);
        clonedControls.classList.add('mobile-nav-controls');
        clonedControls.style.display = 'flex';
        clonedControls.style.flexDirection = 'column';
        clonedControls.style.alignItems = 'center';
        clonedControls.style.gap = '1rem';
        clonedControls.style.marginTop = '2rem';
        clonedControls.style.paddingTop = '1.5rem';
        clonedControls.style.borderTop = '1px solid rgba(128, 128, 128, 0.2)';
        clonedControls.style.width = '100%';
        
        mobileNavMenu.appendChild(clonedControls);
        
        // Reatribuir evento do tema no clone
        const clonedThemeBtn = clonedControls.querySelector('#theme-toggle');
        if (clonedThemeBtn) {
            clonedThemeBtn.addEventListener('click', () => {
                const current = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                setTheme(current === 'light' ? 'dark' : 'light');
            });
        }
        
        // Reatribuir eventos dos idiomas no clone
        const clonedLangBtns = clonedControls.querySelectorAll('.lang-btn');
        clonedLangBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                updateLanguage(btn.getAttribute('data-lang'));
            });
        });
    }
}

// Função para remover controles do menu mobile
function removeMobileControls() {
    const mobileControls = document.querySelector('.mobile-nav-controls');
    if (mobileControls) {
        mobileControls.remove();
    }
}

function closeMenu() {
    if (navMenu) {
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        removeMobileControls();
    }
}

function openMenu() {
    if (navMenu) {
        navMenu.classList.add('active');
        body.classList.add('menu-open');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
        addControlsToMobileMenu();
    }
}

function toggleMenu() {
    if (navMenu && navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Se voltou para desktop, fecha o menu e remove os controles clonados
        if (navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
        removeMobileControls();
    }
});

// ========== TEMA ==========
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

function setTheme(theme) {
    const themeLink = document.getElementById('theme-style');
    if (themeLink) {
        themeLink.href = `css/${theme}-theme.css`;
    }
    localStorage.setItem('theme', theme);
    
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Atualizar também o ícone do tema clonado se existir
    const clonedThemeIcon = document.querySelector('.mobile-nav-controls #theme-toggle i');
    if (clonedThemeIcon) {
        if (theme === 'dark') {
            clonedThemeIcon.classList.remove('fa-sun');
            clonedThemeIcon.classList.add('fa-moon');
        } else {
            clonedThemeIcon.classList.remove('fa-moon');
            clonedThemeIcon.classList.add('fa-sun');
        }
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;
    setTheme(theme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(current === 'light' ? 'dark' : 'light');
    });
}

// ========== IDIOMAS ==========
const languages = {
    'pt-BR': 'locales/pt-BR.json',
    'en-US': 'locales/en-US.json',
    'es-ES': 'locales/es-ES.json'
};

let currentLang = localStorage.getItem('language') || 'pt-BR';

async function loadTranslations(lang) {
    try {
        const response = await fetch(languages[lang]);
        if (!response.ok) throw new Error('Translation not found');
        return await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

async function updateLanguage(lang) {
    const translations = await loadTranslations(lang);
    if (!translations) return;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj?.[k], translations);
        if (value && typeof value === 'string') {
            element.innerHTML = value;
        }
    });
    
    localStorage.setItem('language', lang);
    currentLang = lang;
    
    // Atualizar botões originais
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Atualizar botões clonados (se existirem)
    const clonedBtns = document.querySelectorAll('.mobile-nav-controls .lang-btn');
    if (clonedBtns.length) {
        clonedBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }
}

function initLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.getAttribute('data-lang'));
        });
    });
    updateLanguage(currentLang);
}

// ========== EFEITO MÁQUINA DE ESCREVER ==========
const phrases = {
    'pt-BR': ['Sites Profissionais', 'Sistemas de Estoque', 'Automação WhatsApp', 'Automação Instagram', 'Google Meu Negócio'],
    'en-US': ['Professional Websites', 'Inventory Systems', 'WhatsApp Automation', 'Instagram Automation', 'Google My Business'],
    'es-ES': ['Sitios Profesionales', 'Sistemas de Inventario', 'Automatización WhatsApp', 'Automatización Instagram', 'Google Mi Negocio']
};

let currentLangType = localStorage.getItem('language') || 'pt-BR';
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function typeEffect() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const currentPhrases = phrases[currentLangType] || phrases['pt-BR'];
    const currentPhrase = currentPhrases[currentPhraseIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeEffect, 2000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % currentPhrases.length;
        typingTimeout = setTimeout(typeEffect, 500);
    } else {
        typingTimeout = setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// ========== TRADUÇÃO DOS SLIDES ==========
const slideTranslations = {
    'pt-BR': [
        { h1: 'LP <span class="gradient-text">Automações</span>', p: 'Automação WhatsApp | Sistemas Web | Sites Profissionais | Gestão Digital', btn: 'Fale Conosco' },
        { h1: 'Automação <span class="gradient-text">WhatsApp</span>', p: 'Atendimento 24/7 com inteligência artificial', btn: 'Fale Conosco' },
        { h1: 'Sistemas <span class="gradient-text">Personalizados</span>', p: 'Controle de estoque, vendas e gestão empresarial', btn: 'Solicitar Orçamento' },
        { h1: 'Google <span class="gradient-text">Meu Negócio</span>', p: 'Destaque sua empresa nas buscas locais', btn: 'Quero Mais Visibilidade' },
        { h1: 'Resultados <span class="gradient-text">Reais</span>', p: 'Transformamos seu negócio com tecnologia', btn: 'Quero Resultados' }
    ],
    'en-US': [
        { h1: 'LP <span class="gradient-text">Automations</span>', p: 'WhatsApp Automation | Web Systems | Professional Websites | Digital Management', btn: 'Contact Us' },
        { h1: '<span class="gradient-text">WhatsApp</span> Automation', p: '24/7 service with artificial intelligence', btn: 'Contact Us' },
        { h1: '<span class="gradient-text">Custom</span> Systems', p: 'Inventory control, sales and business management', btn: 'Request Quote' },
        { h1: 'Google <span class="gradient-text">My Business</span>', p: 'Highlight your company in local searches', btn: 'Get More Visibility' },
        { h1: '<span class="gradient-text">Real</span> Results', p: 'We transform your business with technology', btn: 'Get Results' }
    ],
    'es-ES': [
        { h1: 'LP <span class="gradient-text">Automações</span>', p: 'Automatización WhatsApp | Sistemas Web | Sitios Profesionales | Gestión Digital', btn: 'Contáctanos' },
        { h1: 'Automatización <span class="gradient-text">WhatsApp</span>', p: 'Atención 24/7 con inteligencia artificial', btn: 'Contáctanos' },
        { h1: 'Sistemas <span class="gradient-text">Personalizados</span>', p: 'Control de inventario, ventas y gestión empresarial', btn: 'Solicitar Presupuesto' },
        { h1: 'Google <span class="gradient-text">Mi Negocio</span>', p: 'Destaca tu empresa en búsquedas locales', btn: 'Quiero Más Visibilidad' },
        { h1: 'Resultados <span class="gradient-text">Reales</span>', p: 'Transformamos tu negocio con tecnología', btn: 'Quiero Resultados' }
    ]
};

function updateSlideContent(slideNumber, lang) {
    const slides = document.querySelectorAll('.hero-slide');
    const currentLangData = slideTranslations[lang] || slideTranslations['pt-BR'];
    const slideData = currentLangData[slideNumber - 1];
    
    if (slides[slideNumber - 1] && slideData) {
        const heroContent = slides[slideNumber - 1].querySelector('.hero-content');
        if (heroContent) {
            const h1 = heroContent.querySelector('h1');
            const p = heroContent.querySelector('p');
            const btn = heroContent.querySelector('.btn');
            
            if (h1) h1.innerHTML = slideData.h1;
            if (p) p.innerHTML = slideData.p;
            if (btn) btn.innerHTML = slideData.btn;
        }
    }
}

function updateAllSlidesLanguage(lang) {
    for (let i = 1; i <= 5; i++) {
        updateSlideContent(i, lang);
    }
}

// ========== SISTEMA DE SLIDES ==========
let currentSlide = 1;
const totalSlides = 5;
let slideInterval = null;

function showSlide(slideNumber) {
    const slides = document.querySelectorAll('.hero-slide');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index + 1 === slideNumber);
    });
    
    currentSlide = slideNumber;
}

function nextSlide() {
    const next = currentSlide === totalSlides ? 1 : currentSlide + 1;
    showSlide(next);
}

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function initSlides() {
    showSlide(1);
    startAutoSlide();
}

// ========== HEADER SCROLL ==========
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

// ========== ATUALIZAR IDIOMA DO TYPING ==========
window.updateTypingLanguage = (lang) => {
    currentLangType = lang;
    currentPhraseIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
    if (typingTimeout) clearTimeout(typingTimeout);
    typeEffect();
};

// ========== SOBRESCREVER FUNÇÃO DE IDIOMA ==========
const originalUpdateLanguage = window.updateLanguage;
window.updateLanguage = async (lang) => {
    if (originalUpdateLanguage) {
        await originalUpdateLanguage(lang);
    }
    updateAllSlidesLanguage(lang);
    window.updateTypingLanguage(lang);
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initSlides();
    typeEffect();
    
    const currentLangSaved = localStorage.getItem('language') || 'pt-BR';
    updateAllSlidesLanguage(currentLangSaved);
});