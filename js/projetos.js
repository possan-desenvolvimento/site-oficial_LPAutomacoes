// ========== MENU MOBILE COM CONTROLES CLONADOS ==========
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
        themeLink.href = `../css/${theme}-theme.css`;
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
    'pt-BR': '../locales/pt-BR.json',
    'en-US': '../locales/en-US.json',
    'es-ES': '../locales/es-ES.json'
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
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
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

// ========== FILTRO DE PROJETOS ==========
const filtrosBtns = document.querySelectorAll('.filtro-btn');
const projetosCards = document.querySelectorAll('.projeto-card');

filtrosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filtrosBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projetosCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========== ANIMAÇÃO DE ENTRADA ==========
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

document.querySelectorAll('.projeto-card, .cliente-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

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

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
});