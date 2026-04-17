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
        const response = await fetch(`./assets/data/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${lang}.json`);
        
        const data = await response.json();
        state.data = data;
        state.lang = lang;
        
        applyTranslations();
        renderDynamicContent();
        updateActiveLangBtn();
    } catch (error) {
        console.error('Localization Error:', error);
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

    // Handle images
    const profileImgs = document.querySelectorAll('[data-i18n-img="profile"]');
    if (state.data.profile_image) {
        profileImgs.forEach(img => img.src = state.data.profile_image);
    }
}

/**
 * Render dynamic lists (Chips, Experience, Projects)
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

    // Render Experience (Optional visibility check depending on section)
    const experienceList = document.getElementById('experience-list');
    if (experienceList && state.data.resume.experience) {
        experienceList.innerHTML = state.data.resume.experience.map(item => `
             <div class="timeline-entry">
                <div class="entry-meta">${item.date}</div>
                <h3 class="entry-name">${item.company}</h3>
                <p class="text-xs font-bold text-secondary uppercase tracking-widest mb-2">${item.role}</p>
                <p class="text-sm text-on-surface-variant leading-relaxed">${item.description}</p>
            </div>
        `).join('');
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
    const navLinks = document.querySelectorAll('.nav-link');
    const container = document.querySelector('.snap-container');

    if (!container) return;

    // Scroll listener for active link
    container.addEventListener('scroll', () => {
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
    });
}

/**
 * Initialize
 */
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('en');
    setupNavigation();

    // Language switchers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            loadLanguage(btn.dataset.lang);
        });
    });
});
