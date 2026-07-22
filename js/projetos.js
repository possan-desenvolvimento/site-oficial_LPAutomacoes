// ========================================
// 1. DADOS DOS PROJETOS
// ========================================
const projetosData = {
    'Sistema de Estoque': {
        categoria: 'Sistemas',
        img: 'https://images.pexels.com/photos/4482901/pexels-photo-4482901.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Sistema completo de controle de estoque com leitor de código de barras integrado. Gerencie entradas, saídas, relatórios e muito mais diretamente pelo seu celular.',
        features: [
            '📱 Leitor de código de barras pelo celular',
            '📊 Controle de entradas e saídas',
            '📈 Relatórios automáticos em PDF',
            '🔔 Alertas de estoque baixo',
            '💬 Integração com WhatsApp para notificações',
            '📱 Dashboard responsivo'
        ],
        diferencial: '🔥 Leitor de código de barras diretamente pelo celular - sem necessidade de equipamento externo! Economize milhares em equipamentos.',
        link: '#'
    },
    'Avaliação Psicossocial': {
        categoria: 'Sistemas',
        img: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Sistema de avaliação psicossocial com formulários digitais, laudos automáticos e relatórios completos. Ideal para empresas de RH, psicólogos e profissionais da saúde.',
        features: [
            '📋 Formulários personalizados',
            '📄 Laudos automáticos em PDF',
            '📊 Dashboards com indicadores',
            '📅 Histórico de avaliações',
            '📈 Relatórios gerenciais',
            '🔒 Dados seguros e criptografados'
        ],
        diferencial: '📋 Geração automática de laudos e relatórios com base nas respostas dos formulários! Reduza o tempo de análise em até 80%.',
        link: '#'
    },
    'ERP Personalizado': {
        categoria: 'Sistemas',
        img: 'https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Sistema ERP completo e personalizado para sua empresa. Gestão financeira, vendas, estoque, RH e muito mais em uma única plataforma integrada.',
        features: [
            '💰 Gestão financeira completa',
            '🛒 Controle de vendas e clientes',
            '📦 Módulo de estoque integrado',
            '🤖 Automação de processos',
            '🔗 Integração com WhatsApp e redes sociais',
            '📊 Relatórios gerenciais em tempo real'
        ],
        diferencial: '⚡ Sistema totalmente integrado com automações! Tudo em um só lugar, com dados em tempo real.',
        link: '#'
    },
    'Automação WhatsApp': {
        categoria: 'whatsapp',
        img: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Automação completa para WhatsApp com chatbots inteligentes, disparos em massa, atendimento 24/7 e gestão de múltiplos números.',
        features: [
            '🤖 Chatbots com IA integrada',
            '📤 Disparos em massa personalizados',
            '📅 Agendamento de mensagens',
            '📊 Relatórios de atendimento',
            '🔄 Respostas automáticas',
            '📱 Gestão de múltiplos números'
        ],
        diferencial: '🤖 Atendimento 24/7 com IA - Reduza o tempo de resposta em até 70% e nunca mais perca um cliente!',
        link: '#'
    },
    'Automação Instagram': {
        categoria: 'instagram',
        img: 'https://images.pexels.com/photos/6567367/pexels-photo-6567367.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Automação inteligente para Instagram com respostas automáticas a comentários, mensagens diretas personalizadas e gestão de interações.',
        features: [
            '💬 Respostas automáticas a comentários',
            '📩 DMs personalizados automatizados',
            '📊 Análise de engajamento',
            '🔄 Gestão de interações',
            '📅 Agendamento de posts',
            '📈 Relatórios de performance'
        ],
        diferencial: '📱 IA conversacional para interações mais humanas e personalizadas. Aumente seu engajamento em até 300%!',
        link: '#'
    },
    'Site Corporativo': {
        categoria: 'sites',
        img: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Site moderno, responsivo e otimizado para conversão. Design profissional que transmite credibilidade e autoridade para sua marca.',
        features: [
            '🎨 Design moderno e personalizado',
            '📱 Totalmente responsivo',
            '🚀 Otimizado para SEO',
            '⚡ Carregamento ultrarrápido',
            '🔗 Integração com redes sociais',
            '📊 Analytics integrado'
        ],
        diferencial: '🚀 Sites otimizados para conversão e SEO - Apareça no Google e converta mais visitantes em clientes!',
        link: '#'
    },
    'E-commerce Completo': {
        categoria: 'sites',
        img: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
        descricao: 'Loja virtual completa com carrinho de compras, integração com pagamentos e automações. Venda 24/7 com total segurança.',
        features: [
            '🛒 Carrinho de compras completo',
            '💳 Integração com gateways de pagamento',
            '📦 Controle de estoque integrado',
            '💬 Notificações WhatsApp automáticas',
            '📊 Relatórios de vendas',
            '🔒 Segurança e SSL integrados'
        ],
        diferencial: '🛒 Integração total com WhatsApp para notificações de vendas e suporte ao cliente!',
        link: '#'
    }
};

// ========================================
// 2. MENU MOBILE COM CONTROLES CLONADOS
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

function addControlsToMobileMenu() {
    if (window.innerWidth > 768) return;
    
    const navControls = document.querySelector('.nav-controls');
    const mobileNavMenu = document.querySelector('.nav-menu');
    
    if (navControls && mobileNavMenu && !mobileNavMenu.querySelector('.mobile-nav-controls')) {
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
        
        const clonedThemeBtn = clonedControls.querySelector('#theme-toggle');
        if (clonedThemeBtn) {
            clonedThemeBtn.addEventListener('click', () => {
                const current = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                setTheme(current === 'light' ? 'dark' : 'light');
            });
        }
        
        const clonedLangBtns = clonedControls.querySelectorAll('.lang-btn');
        clonedLangBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                updateLanguage(btn.getAttribute('data-lang'));
            });
        });
    }
}

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

// ========================================
// 3. TEMA
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

function setTheme(theme) {
    const themeLink = document.getElementById('theme-style');
    if (themeLink) {
        themeLink.href = `../css/${theme}-theme.css`;
    }
    document.documentElement.setAttribute('data-theme', theme);
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

// ========================================
// 4. IDIOMAS
// ========================================
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

// ========================================
// 5. FILTRO DE PROJETOS
// ========================================
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

// ========================================
// 6. SISTEMA DE MODAL
// ========================================
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalCategoria = document.getElementById('modalCategoria');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const modalFeatures = document.getElementById('modalFeatures');
const modalDiferencial = document.getElementById('modalDiferencial');
const modalLink = document.getElementById('modalLink');

// Abrir modal
function openModal(projetoId) {
    const projeto = projetosData[projetoId];
    if (!projeto) return;
    
    modalImg.src = projeto.img;
    modalImg.alt = projetoId;
    modalCategoria.textContent = projeto.categoria;
    modalTitulo.textContent = projetoId;
    modalDescricao.textContent = projeto.descricao;
    
    // Limpar e preencher features
    modalFeatures.innerHTML = '';
    projeto.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = feature;
        modalFeatures.appendChild(li);
    });
    
    modalDiferencial.querySelector('p').textContent = projeto.diferencial;
    modalLink.href = projeto.link;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Evento de clique nos cards
document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('click', () => {
        const titulo = card.querySelector('h3').textContent;
        openModal(titulo);
    });
});

// Eventos de fechamento
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// 7. ANIMAÇÃO DE ENTRADA
// ========================================
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

// ========================================
// 8. HEADER SCROLL
// ========================================
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

// ========================================
// 9. INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
});