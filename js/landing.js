'use strict';

const translations = {
    'en-US': {
        home:'Home', solutions:'Solutions', about:'About', projects:'Projects', contact:'Contact', eyebrow:'TECHNOLOGY THAT CONNECTS BUSINESSES',
        hero:'Less manual work. More possibilities. We build systems, websites and automations that work alongside your business.', start:'Let’s bring your idea to life', see:'Explore our projects', custom:'TAILORED. FROM DAY ONE TO YOUR NEXT STEP.',
        web:'Web systems', automation:'Smart automation', presence:'Digital presence', integrations:'Integrations', solutionsTitle:'The right technology.\nFor your next step.', solutionsIntro:'From your first online presence to complex workflows: solutions designed around your business, not the other way around.',
        systems:'Custom systems', systemsDesc:'Inventory, sales, ERP, CRM and psychosocial assessments. Your operations organized in a tailored solution.', sites:'Websites & e-commerce', sitesDesc:'Responsive websites and online stores that present your brand clearly and connect customers to your business.', social:'WhatsApp & Instagram', socialDesc:'Customer service workflows, automated replies and integrations to reduce repetitive tasks and connect conversations.', google:'Google presence', googleDesc:'Business profiles, updated information and review management to help customers find you.', notSure:'Not sure which solution you need?', talk:'Let’s talk',
        founder:'Leading LP Automações', aboutTitle:'Real technology.\nReal people behind it.', aboutText:'LP Automações & Soluções was founded to make technology accessible to small, medium and large businesses. We believe in understanding your daily operations before writing the first line of code.', aboutMore:'Beyond delivering a website or system, we connect processes, simplify routines and build solutions that grow alongside your business.', tailored:'Tailored solutions', support:'Specialized support', focus:'Results-focused', trust:'Security and trust',
        projectsTitle:'Real clients.\nProjects you can explore.', projectsIntro:'Discover our clients’ websites and an inventory system. Visit each project and imagine what we can build for your business.', clientProjects:'Clients & projects', visit:'Visit website', visitSystem:'Access system', projectCta:'I want something like this', all:'All', clients:'CLIENTS & PROJECTS', contactTitle:'Your next project\nstarts with a conversation.', contactIntro:'Tell us what your business needs. Together, we’ll understand the challenge and find the best path forward.', whatsapp:'Talk on WhatsApp', address:'Find us', review:'Review our work on Google', rights:'All rights reserved.', similar:'I want a solution like this', details:'View details'
    },
    'es-ES': {
        home:'Inicio', solutions:'Soluciones', about:'Nosotros', projects:'Proyectos', contact:'Contacto', eyebrow:'TECNOLOGÍA QUE CONECTA NEGOCIOS',
        hero:'Menos tareas manuales. Más posibilidades. Desarrollamos sistemas, sitios y automatizaciones que trabajan junto a tu empresa.', start:'Hagamos realidad tu idea', see:'Conoce nuestros proyectos', custom:'A MEDIDA. DESDE EL INICIO HASTA EL SIGUIENTE PASO.',
        web:'Sistemas web', automation:'Automatización inteligente', presence:'Presencia digital', integrations:'Integraciones', solutionsTitle:'La tecnología adecuada.\nPara tu próximo paso.', solutionsIntro:'Desde tu primera presencia online hasta procesos complejos: soluciones pensadas para tu negocio, no al contrario.', systems:'Sistemas personalizados', systemsDesc:'Inventario, ventas, ERP, CRM y evaluaciones psicosociales. Tu operación organizada en una solución a medida.', sites:'Sitios & e-commerce', sitesDesc:'Sitios adaptables y tiendas online que presentan tu marca con claridad y acercan clientes a tu negocio.', social:'WhatsApp & Instagram', socialDesc:'Flujos de atención, respuestas automáticas e integraciones para reducir tareas repetitivas y conectar conversaciones.', google:'Presencia en Google', googleDesc:'Perfil de empresa, información actualizada y gestión de reseñas para ayudar a tus clientes a encontrarte.', notSure:'¿No sabes qué solución necesitas?', talk:'Hablemos',
        founder:'Al frente de LP Automações', aboutTitle:'Tecnología real.\nCon personas detrás.', aboutText:'LP Automações & Soluções nació para hacer accesible la tecnología a pequeñas, medianas y grandes empresas. Creemos en comprender tu día a día antes de escribir la primera línea de código.', aboutMore:'Más que entregar un sitio o sistema, conectamos procesos, simplificamos rutinas y construimos soluciones que acompañan el crecimiento de tu negocio.', tailored:'Soluciones a medida', support:'Soporte especializado', focus:'Enfoque en resultados', trust:'Seguridad y confianza',
        projectsTitle:'Clientes reales.\nProyectos que puedes conocer.', projectsIntro:'Conoce los sitios de nuestros clientes y un sistema de inventario. Visita cada proyecto e imagina lo que podemos crear para tu empresa.', clientProjects:'Clientes & proyectos', visit:'Visitar sitio', visitSystem:'Acceder al sistema', projectCta:'Quiero algo parecido', all:'Todos', clients:'CLIENTES & PROYECTOS', contactTitle:'Tu próximo proyecto\nempieza con una conversación.', contactIntro:'Cuéntanos lo que necesita tu empresa. Entenderemos el desafío y encontraremos el mejor camino juntos.', whatsapp:'Hablar por WhatsApp', address:'Dónde estamos', review:'Evalúa nuestro trabajo en Google', rights:'Todos los derechos reservados.', similar:'Quiero una solución así', details:'Ver detalles'
    }
};
const originalCopy = Object.fromEntries([...document.querySelectorAll('[data-copy]')].map(element => [element.dataset.copy, element.innerText]));
Object.assign(translations['en-US'], { clientSites:'Client websites', projectInvite:'Your business could be next.', projectInviteDesc:'Let’s talk about a solution tailored to your business.' });
Object.assign(translations['es-ES'], { clientSites:'Sitios de clientes', projectInvite:'Tu negocio puede ser el próximo.', projectInviteDesc:'¿Hablamos de una solución a medida para tu empresa?' });
const portfolio = [
    { category:'sites', url:'https://www.cyndfit.com.br/', image:'clientes/cynd-fit.webp', title:['Cynd-Fit','Cynd-Fit','Cynd-Fit'], description:['Produtos, apresentação da consultora e contato em uma presença digital dedicada à saúde e ao bem-estar.','Products, consultant introduction and contact in a digital presence focused on health and wellness.','Productos, presentación de la consultora y contacto en una presencia digital de salud y bienestar.'], features:[['Apresentação da Cynd-Fit','Produtos em destaque','Canais de contato'],['Cynd-Fit introduction','Featured products','Contact channels'],['Presentación de Cynd-Fit','Productos destacados','Canales de contacto']] },
    { category:'sites', url:'http://gruposoul.com.br/', image:null, title:['Grupo Soul','Grupo Soul','Grupo Soul'], description:['Conheça a presença digital do Grupo Soul e acesse o projeto pelo endereço oficial.','Explore Grupo Soul’s digital presence through its official website.','Conoce la presencia digital de Grupo Soul en su sitio oficial.'], features:[['Projeto do Grupo Soul','Endereço oficial disponível abaixo'],['Grupo Soul project','Official website linked below'],['Proyecto de Grupo Soul','Sitio oficial disponible abajo']] },
    { category:'sites', url:'https://ciaplauso.org/', image:'clientes/cia-aplauso.webp', title:['Cia Aplauso Contemporâneo','Cia Aplauso Contemporâneo','Cia Aplauso Contemporâneo'], description:['Arte, cultura e educação em um site que reúne a história da companhia, projetos e atividades.','Art, culture and education on a website bringing together the company’s history, projects and activities.','Arte, cultura y educación en un sitio que reúne la historia, los proyectos y las actividades de la compañía.'], features:[['História e equipe da companhia','Projetos e atividades culturais','Galeria e contato'],['Company history and team','Cultural projects and activities','Gallery and contact'],['Historia y equipo','Proyectos y actividades culturales','Galería y contacto']] },
    { category:'sistemas', url:'http://31.97.163.3:9090/', image:'sistema-controle-estoque.png', title:['Controle de Estoque','Inventory Management','Control de Inventario'], description:['Uma aplicação web de controle de estoque. Acesso ao sistema separado dos sites institucionais.','A web-based inventory application, with system access separate from the institutional websites.','Una aplicación web de inventario, con acceso separado de los sitios institucionales.'], features:[['Aplicação de controle de estoque','Acesso pelo endereço do sistema'],['Inventory management application','Access via the system address'],['Aplicación de inventario','Acceso por la dirección del sistema']] },
    { category:'sites', url:'https://www.provenssma.com.br/', image:'clientes/proven.webp', title:['PROVEN','PROVEN','PROVEN'], description:['Segurança do trabalho, serviços e treinamentos apresentados com canais diretos para orçamento.','Occupational safety, services and training with direct channels for quote requests.','Seguridad laboral, servicios y formación con canales directos para presupuestos.'], features:[['Apresentação da consultoria','Serviços e treinamentos NR','Contato e orçamento'],['Consultancy introduction','Services and safety training','Contact and quotes'],['Presentación de la consultoría','Servicios y formación','Contacto y presupuestos']] }
];
let language = localStorage.getItem('language') || 'pt-BR';
if (!['pt-BR','en-US','es-ES'].includes(language)) language = 'pt-BR';
let filter = 'all';
let selectedProject = null;
const dialog = document.getElementById('project-dialog');
const languageIndex = () => ['pt-BR','en-US','es-ES'].indexOf(language);
const copy = key => translations[language]?.[key] || originalCopy[key];
function projectLink(href, label, className, iconClass) {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = className;
    const text = document.createElement('span');
    text.textContent = label;
    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');
    link.append(text, icon);
    return link;
}
function projectInquiry(project) {
    const messages = [
        `Olá! Vi o projeto ${project.title[0]} no portfólio da LP Automações e gostaria de conversar sobre uma solução parecida para minha empresa.`,
        `Hello! I saw ${project.title[1]} in LP Automações’ portfolio and would like to discuss a similar solution for my business.`,
        `¡Hola! Vi ${project.title[2]} en el portafolio de LP Automações y quisiera conversar sobre una solución parecida para mi empresa.`
    ];
    return `https://wa.me/5511964801185?text=${encodeURIComponent(messages[languageIndex()])}`;
}
function renderProjects() {
    const grid = document.getElementById('project-grid');
    grid.replaceChildren();
    const index = languageIndex();
    portfolio.forEach((project, projectIndex) => {
        if (filter !== 'all' && project.category !== filter) return;
        const article = document.createElement('article');
        article.className = 'project';
        const preview = projectLink(project.url, '', 'project-preview', 'fa-solid fa-arrow-up-right-from-square');
        preview.setAttribute('aria-label', `${copy(project.category === 'sistemas' ? 'visitSystem' : 'visit')}: ${project.title[index]}`);
        const browserBar = document.createElement('div');
        browserBar.className = 'project-browser-bar';
        const dots = document.createElement('span');
        dots.className = 'browser-dots';
        dots.setAttribute('aria-hidden', 'true');
        dots.textContent = '● ● ●';
        const address = document.createElement('span');
        address.textContent = new URL(project.url).host;
        browserBar.append(dots, address);
        const image = document.createElement(project.image ? 'img' : 'div');
        if (project.image) {
            image.src = `assets/${project.image}`;
            image.alt = project.title[index];
            image.loading = 'lazy';
            image.width = 1200;
            image.height = 800;
        } else {
            image.className = 'project-placeholder';
            image.textContent = project.title[index];
        }
        preview.replaceChildren(browserBar, image);
        const content = document.createElement('div');
        content.className = 'project-body';
        const category = document.createElement('span');
        category.className = 'project-category';
        category.textContent = copy(project.category === 'sistemas' ? 'web' : 'clientSites');
        const title = document.createElement('h3');
        title.textContent = project.title[index];
        const description = document.createElement('p');
        description.textContent = project.description[index];
        const links = document.createElement('div');
        links.className = 'project-actions';
        const visit = projectLink(project.url, copy(project.category === 'sistemas' ? 'visitSystem' : 'visit'), 'project-visit', 'fa-solid fa-arrow-up-right-from-square');
        visit.setAttribute('aria-label', `${visit.textContent}: ${project.title[index]}`);
        const inquiry = projectLink(projectInquiry(project), copy('projectCta'), 'project-inquiry', 'fa-brands fa-whatsapp');
        inquiry.setAttribute('aria-label', `${copy('projectCta')}: ${project.title[index]}`);
        links.append(visit, inquiry);
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = copy('details') || 'Ver detalhes';
        button.setAttribute('aria-label', `${button.textContent}: ${project.title[index]}`);
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-plus';
        icon.setAttribute('aria-hidden', 'true');
        button.append(icon);
        button.addEventListener('click', () => openProject(projectIndex));
        content.append(category, title, description, links, button);
        article.append(preview, content);
        grid.append(article);
    });
    document.getElementById('project-count').textContent = `${grid.children.length} ${copy('projects')}`;
}
function openProject(index) {
    selectedProject = index;
    const project = portfolio[index];
    const locale = languageIndex();
    const image = document.getElementById('dialog-image');
    image.hidden = !project.image;
    if (project.image) {
        image.src = `assets/${project.image}`;
        image.alt = project.title[locale];
    } else image.removeAttribute('src');
    document.getElementById('dialog-title').textContent = project.title[locale];
    document.getElementById('dialog-category').textContent = copy('projects');
    document.getElementById('dialog-description').textContent = project.description[locale];
    const visit = document.getElementById('dialog-visit');
    visit.href = project.url;
    visit.textContent = copy(project.category === 'sistemas' ? 'visitSystem' : 'visit');
    const inquiry = document.getElementById('dialog-contact');
    inquiry.href = projectInquiry(project);
    inquiry.textContent = copy('projectCta');
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
originalCopy.visit = 'Visitar site';
originalCopy.visitSystem = 'Acessar sistema';
originalCopy.projectCta = 'Quero algo parecido';
setLanguage(language);