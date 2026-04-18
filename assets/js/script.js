/**
 * Nam Tran Portfolio - High Fidelity Alignment Logic
 * Handles Localization and Dynamic Chip Rendering
 */

const state = {
    lang: 'en',
    data: null
};

/**
 * Fetch and apply localization data
 */
async function loadLanguage(lang) {
    try {
        // Safety check for file:// protocol which blocks fetch
        if (window.location.protocol === 'file:') {
            console.error('CORS Error: You are opening the file directly. Please use http://localhost:8000/ to see all content.');
            return;
        }

        const response = await fetch(`./assets/data/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        state.data = data;
        state.lang = lang;

        applyTranslations();
        renderDynamicContent();
        updateActiveLangBtn();
    } catch (error) {
        console.error(`Localization Error (${lang}):`, error);
        // Fallback for visual stability
        if (state.lang === 'en' && !state.data) {
            console.warn('Initialization failed. Check if en.json exists in assets/data/');
        }
    }
}

/**
 * Map JSON data to DOM elements using data-path attributes
 */
function applyTranslations() {
    if (!state.data) return;

    // Simple text translation
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const path = el.getAttribute('data-i18n');
        const text = getValueByPath(state.data, path);
        if (text) el.textContent = text;
    });
}

/**
 * Render dynamic lists (Chips, Experience, Projects, Capabilities)
 */
function renderDynamicContent() {
    if (!state.data) return;

    // Render Tech Chips (Stitch Hero Card)
    const chipGroup = document.getElementById('tech-chips');
    if (chipGroup && state.data.home.tech_chips) {
        chipGroup.innerHTML = state.data.home.tech_chips.map(chip => `
            <span class="st-chip">${chip}</span>
        `).join('');
    }

    // Render About Left Info (Biography, Contact, etc.)
    const aboutLeftList = document.getElementById('about-left-list');
    if (aboutLeftList && state.data.about.left_info) {
        aboutLeftList.innerHTML = state.data.about.left_info.map(item => {
            const fontClass = item.font === 'headline' ? 'stat-value' : (item.font === 'title' ? 'about-headline' : 'about-info-text');
            return `
                <div>
                    <span class="about-label">${item.title}</span>
                    <div class="flex items-start gap-2">
                        <div class="flex flex-col gap-1">
                            ${item.info.map(line => `<p class="${fontClass}">${line}</p>`).join('')}
                        </div>
                        ${item.hasFromUpwork ? `<span class="stat-sub ml-3">${state.data.about.labels.from_upwork}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render About Right Info (Stats)
    const aboutRightList = document.getElementById('about-right-list');
    if (aboutRightList && state.data.about.right_info) {
        aboutRightList.innerHTML = state.data.about.right_info.map(item => {
            const fontClass = item.font === 'headline' ? 'stat-value' : (item.font === 'title' ? 'about-headline' : 'about-info-text');
            return `
                <div class="stat-item">
                    <span class="about-label">${item.title}</span>
                    <div class="stat-sub-wrapper">
                        <div class="flex flex-col items-end">
                            ${item.info.map(val => `<p class="${fontClass}">${val}</p>`).join('')}
                        </div>
                        ${item.hasFromUpwork ? `<span class="stat-sub">${state.data.about.labels.from_upwork}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render Experience
    const experienceList = document.getElementById('experience-list');
    if (experienceList && state.data.experience) {
        experienceList.innerHTML = state.data.experience.map(item => `
             <div class="timeline-entry">
                <div class="timeline-dot">
                    <div class="dot-outer">
                        <div class="dot-inner"></div>
                    </div>
                </div>
                <div class="entry-meta-wrap">
                    <div class="flex md:pl-[16.66%]">
                        <div class="flex flex-col items-start">
                            <h3 class="entry-company">${item.company}</h3>
                            <p class="entry-date">${item.date}</p>
                        </div>
                    </div>
                </div>
                <div class="entry-content-wrap">
                    <h4 class="entry-role">${item.role}</h4>
                    <p class="entry-desc">${item.description}</p>
                    ${item.link_info ? `<a href="${item.link_info}" target="_blank" class="entry-link">View Info</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Render Projects
    const projectsList = document.getElementById('projects-list');
    if (projectsList && state.data.projects) {
        projectsList.innerHTML = state.data.projects.map((item, index) => {
            const isEven = index % 2 === 1;
            return `
                <div class="project-card ${isEven ? 'is-even' : 'is-odd'}">
                    <div class="project-image-wrap">
                        <img src="${item.image}" alt="${item.name}" class="project-image">
                    </div>
                    <div class="project-info-wrap">
                        <h2 class="project-name">${item.name}</h2>
                        <p class="project-desc">${item.description}</p>
                        <a href="${item.store_link}" target="_blank" class="project-view-btn">View</a>
                    </div>
                </div>
            `;
        }).join('');
    }
}

/**
 * Get value from object by string path (e.g., 'home.headline')
 */
function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function updateActiveLangBtn() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
}

/**
 * Handle Navigation & Active States
 */
function setupNavigation() {
    const sections = document.querySelectorAll('.snap-section');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
    const container = document.querySelector('.snap-container');

    if (!container) return;

    function syncActiveState() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (container.scrollTop >= sectionTop - 100) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === currentSection);
        });
    }

    // Scroll listener for active link
    container.addEventListener('scroll', syncActiveState);

    // Initial sync
    syncActiveState();
}

/**
 * Handle Mobile Drawer Toggle
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
        });
    }

    if (drawerClose && mobileDrawer) {
        drawerClose.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
        });
    }

    // Close drawer when a link is clicked
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
        });
    });
}

/**
 * Initialize
 */
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('en');
    setupNavigation();
    setupMobileMenu();

    // Language switchers (Desktop & Mobile Drawer)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            loadLanguage(btn.dataset.lang);

            // Close drawer if it was a lang switch from inside drawer
            const mobileDrawer = document.getElementById('mobileDrawer');
            if (mobileDrawer) mobileDrawer.classList.remove('active');
        });
    });
});
