'use strict';

const translations = {
    'en-US': {
        home:'Home', solutions:'Solutions', about:'About', projects:'Projects', contact:'Contact', eyebrow:'TECHNOLOGY THAT CONNECTS BUSINESSES',
        hero:'Less manual work. More possibilities. We build systems, websites and automations that work alongside your business.', start:'Let’s bring your idea to life', see:'Explore our projects', custom:'TAILORED. FROM DAY ONE TO YOUR NEXT STEP.',
        web:'Web systems', automation:'Smart automation', presence:'Digital presence', integrations:'Integrations', solutionsTitle:'The right technology.\nFor your next step.', solutionsIntro:'From your first online presence to complex workflows: solutions designed around your business, not the other way around.',
        systems:'Custom systems', systemsDesc:'Inventory, sales, ERP, CRM and psychosocial assessments. Your operations organized in a tailored solution.', sites:'Websites & e-commerce', sitesDesc:'Responsive websites and online stores that present your brand clearly and connect customers to your business.', social:'WhatsApp & Instagram', socialDesc:'Customer service workflows, automated replies and integrations to reduce repetitive tasks and connect conversations.', google:'Google presence', googleDesc:'Business profiles, updated information and review management to help customers find you.', notSure:'Not sure which solution you need?', talk:'Let’s talk',
        founder:'Leading LP Automações', aboutTitle:'Real technology.\nReal people behind it.', aboutText:'LP Automações & Soluções was founded to make technology accessible to small, medium and large businesses. We believe in understanding your daily operations before writing the first line of code.', aboutMore:'Beyond delivering a website or system, we connect processes, simplify routines and build solutions that grow alongside your business.', tailored:'Tailored solutions', support:'Specialized support', focus:'Results-focused', trust:'Security and trust',
        projectsTitle:'Ideas turned into\nreal-world solutions.', projectsIntro:'Explore systems, digital experiences and automations designed for different needs.', all:'All', clients:'SOME COMPANIES THAT TRUST OUR WORK', contactTitle:'Your next project\nstarts with a conversation.', contactIntro:'Tell us what your business needs. Together, we’ll understand the challenge and find the best path forward.', whatsapp:'Talk on WhatsApp', address:'Find us', review:'Review our work on Google', rights:'All rights reserved.', similar:'I want a solution like this', details:'View details'
    },
    'es-ES': {
        home:'Inicio', solutions:'Soluciones', about:'Nosotros', projects:'Proyectos', contact:'Contacto', eyebrow:'TECNOLOGÍA QUE CONECTA NEGOCIOS',
        hero:'Menos tareas manuales. Más posibilidades. Desarrollamos sistemas, sitios y automatizaciones que trabajan junto a tu empresa.', start:'Hagamos realidad tu idea', see:'Conoce nuestros proyectos', custom:'A MEDIDA. DESDE EL INICIO HASTA EL SIGUIENTE PASO.',
        web:'Sistemas web', automation:'Automatización inteligente', presence:'Presencia digital', integrations:'Integraciones', solutionsTitle:'La tecnología adecuada.\nPara tu próximo paso.', solutionsIntro:'Desde tu primera presencia online hasta procesos complejos: soluciones pensadas para tu negocio, no al contrario.', systems:'Sistemas personalizados', systemsDesc:'Inventario, ventas, ERP, CRM y evaluaciones psicosociales. Tu operación organizada en una solución a medida.', sites:'Sitios & e-commerce', sitesDesc:'Sitios adaptables y tiendas online que presentan tu marca con claridad y acercan clientes a tu negocio.', social:'WhatsApp & Instagram', socialDesc:'Flujos de atención, respuestas automáticas e integraciones para reducir tareas repetitivas y conectar conversaciones.', google:'Presencia en Google', googleDesc:'Perfil de empresa, información actualizada y gestión de reseñas para ayudar a tus clientes a encontrarte.', notSure:'¿No sabes qué solución necesitas?', talk:'Hablemos',
        founder:'Al frente de LP Automações', aboutTitle:'Tecnología real.\nCon personas detrás.', aboutText:'LP Automações & Soluções nació para hacer accesible la tecnología a pequeñas, medianas y grandes empresas. Creemos en comprender tu día a día antes de escribir la primera línea de código.', aboutMore:'Más que entregar un sitio o sistema, conectamos procesos, simplificamos rutinas y construimos soluciones que acompañan el crecimiento de tu negocio.', tailored:'Soluciones a medida', support:'Soporte especializado', focus:'Enfoque en resultados', trust:'Seguridad y confianza',
        projectsTitle:'Ideas que se convierten\nen soluciones reales.', projectsIntro:'Explora sistemas, experiencias digitales y automatizaciones para distintas necesidades.', all:'Todos', clients:'ALGUNAS EMPRESAS QUE CONFÍAN EN NUESTRO TRABAJO', contactTitle:'Tu próximo proyecto\nempieza con una conversación.', contactIntro:'Cuéntanos lo que necesita tu empresa. Entenderemos el desafío y encontraremos el mejor camino juntos.', whatsapp:'Hablar por WhatsApp', address:'Dónde estamos', review:'Evalúa nuestro trabajo en Google', rights:'Todos los derechos reservados.', similar:'Quiero una solución así', details:'Ver detalles'
    }
};
const originalCopy = Object.fromEntries([...document.querySelectorAll('[data-copy]')].map(element => [element.dataset.copy, element.innerText]));
const portfolio = [
    { category:'sistemas', image:'sistema-controle-estoque.png', title:['Sistema de Estoque','Inventory System','Sistema de Inventario'], description:['Gestão de entradas, saídas e relatórios, com leitura de código de barras pelo celular.','Inventory movements and reports, with mobile barcode scanning.','Entradas, salidas e informes con lectura de códigos de barras por celular.'], features:[['Leitura pelo celular','Controle de entradas e saídas','Relatórios de estoque'],['Mobile scanning','Stock movement tracking','Inventory reports'],['Lectura por celular','Control de movimientos','Informes de inventario']] },
    { category:'sistemas', image:'psicossocial.png', title:['Avaliação Psicossocial','Psychosocial Assessment','Evaluación Psicosocial'], description:['Formulários digitais para avaliações, histórico e geração de laudos e relatórios.','Digital assessment forms, history and report generation.','Formularios digitales, historial y generación de informes.'], features:[['Formulários digitais','Histórico de avaliações','Laudos e relatórios'],['Digital forms','Assessment history','Reports'],['Formularios digitales','Historial de evaluaciones','Informes']] },
    { category:'sistemas', image:'sites.jpg', title:['ERP Personalizado','Custom ERP','ERP Personalizado'], description:['Uma solução integrada para organizar vendas, estoque e gestão empresarial.','An integrated solution for sales, inventory and business management.','Una solución integrada para ventas, inventario y gestión empresarial.'], features:[['Gestão financeira','Controle de vendas','Estoque integrado'],['Financial management','Sales tracking','Integrated inventory'],['Gestión financiera','Control de ventas','Inventario integrado']] },
    { category:'automacao', image:'n8n.webp', title:['Automação WhatsApp','WhatsApp Automation','Automatización WhatsApp'], description:['Fluxos conectados para atendimento, respostas automáticas e notificações.','Connected workflows for customer service, automated replies and notifications.','Flujos conectados para atención, respuestas automáticas y notificaciones.'], features:[['Fluxos de atendimento','Integrações entre ferramentas','Respostas automáticas'],['Customer service workflows','Tool integrations','Automated replies'],['Flujos de atención','Integraciones','Respuestas automáticas']] },
    { category:'automacao', image:'instagram.png', title:['Automação Instagram','Instagram Automation','Automatización Instagram'], description:['Gestão de interações, comentários e mensagens diretas personalizados.','Interaction management, comments and personalized direct messages.','Gestión de interacciones, comentarios y mensajes directos personalizados.'], features:[['Gestão de interações','Respostas a comentários','Mensagens personalizadas'],['Interaction management','Comment replies','Personalized messages'],['Gestión de interacciones','Respuestas a comentarios','Mensajes personalizados']] },
    { category:'sites', image:'sites.jpg', title:['Site Corporativo','Corporate Website','Sitio Corporativo'], description:['Uma presença digital responsiva para apresentar sua empresa e conectar clientes.','A responsive digital presence to present your company and connect customers.','Una presencia digital adaptable para presentar tu empresa y conectar clientes.'], features:[['Design responsivo','Estrutura para SEO','Integração com redes sociais'],['Responsive design','SEO structure','Social integrations'],['Diseño adaptable','Estructura SEO','Integración social']] },
    { category:'sites', image:'e-commerce.jpeg', title:['E-commerce Completo','Online Store','Tienda Online'], description:['Loja virtual com carrinho, pagamentos e integrações para sua operação de vendas.','An online store with a cart, payments and integrations for your sales operations.','Tienda online con carrito, pagos e integraciones para tus ventas.'], features:[['Carrinho de compras','Integração de pagamentos','Controle de estoque'],['Shopping cart','Payment integration','Inventory management'],['Carrito de compras','Integración de pagos','Gestión de inventario']] }
];
let language = localStorage.getItem('language') || 'pt-BR';
if (!['pt-BR','en-US','es-ES'].includes(language)) language = 'pt-BR';
let filter = 'all';
let selectedProject = null;
const dialog = document.getElementById('project-dialog');
const languageIndex = () => ['pt-BR','en-US','es-ES'].indexOf(language);
const copy = key => translations[language]?.[key] || originalCopy[key];
function renderProjects() {
    const grid = document.getElementById('project-grid');
    grid.replaceChildren();
    const index = languageIndex();
    portfolio.forEach((project, projectIndex) => {
        if (filter !== 'all' && project.category !== filter) return;
        const article = document.createElement('article');
        article.className = 'project';
        const image = document.createElement('img');
        image.src = `assets/${project.image}`;
        image.alt = project.title[index];
        image.loading = 'lazy';
        const content = document.createElement('div');
        content.className = 'project-body';
        const category = document.createElement('span');
        category.className = 'project-category';
        category.textContent = copy(project.category === 'sistemas' ? 'web' : project.category === 'sites' ? 'sites' : 'automation');
        const title = document.createElement('h3');
        title.textContent = project.title[index];
        const description = document.createElement('p');
        description.textContent = project.description[index];
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = copy('details') || 'Ver detalhes';
        button.setAttribute('aria-label', `${button.textContent}: ${project.title[index]}`);
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-arrow-up-right-from-square';
        icon.setAttribute('aria-hidden', 'true');
        button.append(icon);
        button.addEventListener('click', () => openProject(projectIndex));
        content.append(category, title, description, button);
        article.append(image, content);
        grid.append(article);
    });
    document.getElementById('project-count').textContent = `${grid.children.length} ${copy('projects')}`;
}
function openProject(index) {
    selectedProject = index;
    const project = portfolio[index];
    const locale = languageIndex();
    document.getElementById('dialog-image').src = `assets/${project.image}`;
    document.getElementById('dialog-image').alt = project.title[locale];
    document.getElementById('dialog-title').textContent = project.title[locale];
    document.getElementById('dialog-category').textContent = copy('projects');
    document.getElementById('dialog-description').textContent = project.description[locale];
    document.getElementById('dialog-features').replaceChildren(...project.features[locale].map(text => {
        const item = document.createElement('li');
        item.textContent = text;
        return item;
    }));
    if (!dialog.open) dialog.showModal();
}
function setLanguage(value) {
    language = value;
    localStorage.setItem('language', value);
    document.documentElement.lang = value;
    document.getElementById('language').value = value;
    document.querySelectorAll('[data-copy]').forEach(element => {
        element.textContent = copy(element.dataset.copy);
        element.style.whiteSpace = 'pre-line';
    });
    renderProjects();
    if (dialog.open) openProject(selectedProject);
}
document.getElementById('language').addEventListener('change', event => setLanguage(event.target.value));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
    });
    renderProjects();
}));
const menu = document.getElementById('main-nav');
const menuButton = document.getElementById('menu-toggle');
function closeMenu() {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('i').className = 'fa-solid fa-bars';
}
menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeMenu();
        if (dialog.open) dialog.close();
    }
});
document.addEventListener('click', event => { if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (!visible) return;
    menu.querySelectorAll('a').forEach(link => {
        const current = link.hash === `#${visible.target.id}`;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    document.getElementById('theme-toggle').querySelector('i').className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}
document.getElementById('theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
document.getElementById('dialog-contact').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
originalCopy.details = 'Ver detalhes';
setLanguage(language);