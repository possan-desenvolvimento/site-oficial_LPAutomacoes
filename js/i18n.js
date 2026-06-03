const translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error('Translation not found');
        translations[lang] = await response.json();
        return translations[lang];
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'pt-BR';
}

async function updateLanguage(lang) {
    const translation = await loadTranslations(lang);
    if (!translation) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj?.[k], translation);
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.innerHTML = value;
            }
        }
    });    

    document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : lang === 'en-US' ? 'en-US' : 'es-ES';
        
    localStorage.setItem('language', lang);
        
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function initLanguage() {
    const currentLang = getCurrentLanguage();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });  

    updateLanguage(currentLang);
}

document.addEventListener('DOMContentLoaded', initLanguage);