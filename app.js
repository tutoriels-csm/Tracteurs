// ==================== Application Tutoriels CLAAS ====================

let currentCategory = null;

// Récupère les catégories uniques depuis data.js
function getCategories() {
    const categories = tutorials.map(t => t.category);
    return [...new Set(categories)];
}

// Affiche les catégories
function renderCategories(categories) {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    // Évite les doublons de rendu
    categoryGrid.innerHTML = '';

    categories.forEach(category => {
        const count = tutorials.filter(t => t.category === category).length;

        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-card-content">
                <h3>${category}</h3>
                <p>${count} tutoriel${count > 1 ? 's' : ''}</p>
            </div>
        `;
        card.addEventListener('click', () => filterByCategory(category));
        categoryGrid.appendChild(card);
    });
}

// Affiche les tutoriels
function renderTutorials(list) {
    const tutorielsSection = document.getElementById('tutoriels');
    const tutorielsGrid = document.getElementById('tutorielsGrid');

    if (!tutorielsSection || !tutorielsGrid) return;

    // Évite les doublons de rendu
    tutorielsGrid.innerHTML = '';

    if (!list.length) {
        tutorielsGrid.innerHTML = `<p>Aucun tutoriel trouvé dans cette catégorie.</p>`;
        tutorielsSection.style.display = 'block';
        return;
    }

    list.forEach(tutorial => {
        const card = document.createElement('div');
        card.className = 'tutorial-card';
        card.innerHTML = `
            <img src="${tutorial.thumbnail}" alt="${tutorial.title}" class="tutorial-thumbnail">
            <div class="tutorial-card-content">
                <h3>${tutorial.title}</h3>
                <p>${tutorial.description}</p>
                <p><strong>Durée :</strong> ${tutorial.duration}</p>
                <button class="btn btn-primary" data-video="${tutorial.youtubeId}">Voir la vidéo</button>
            </div>
        `;

        const btn = card.querySelector('button');
        btn.addEventListener('click', () => openVideoModal(tutorial));

        tutorielsGrid.appendChild(card);
    });

    tutorielsSection.style.display = 'block';
    tutorielsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Filtre par catégorie
function filterByCategory(category) {
    currentCategory = category;
    const filtered = tutorials.filter(t => t.category === category);
    renderTutorials(filtered);
}

// Ouvre la modale vidéo
function openVideoModal(tutorial) {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('modalContent');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div style="position:relative;background:#000;">
            <button id="closeModalBtn" aria-label="Fermer"
                style="position:absolute;top:8px;right:10px;z-index:10;background:#fff;border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:18px;line-height:32px;">
                ×
            </button>
            <iframe
                width="100%"
                height="520"
                src="https://www.youtube.com/embed/${tutorial.youtubeId}?autoplay=1"
                title="${tutorial.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>
    `;

    modal.style.display = 'block';

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
}

// Ferme la modale vidéo
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('modalContent');
    if (!modal || !modalContent) return;

    modal.style.display = 'none';
    // Stoppe la vidéo en retirant l'iframe
    modalContent.innerHTML = '';
}

// Init unique (évite double chargement)
let appInitialized = false;

function initApp() {
    if (appInitialized) return;
    appInitialized = true;

    if (!Array.isArray(tutorials)) {
        console.error("Le fichier data.js est manquant ou invalide.");
        return;
    }

    const categories = getCategories();
    renderCategories(categories);

    // Fermer la modale au clic en dehors du contenu
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideoModal();
        });
    }

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeVideoModal();
    });
}

// Un seul listener de démarrage
document.addEventListener('DOMContentLoaded', initApp);
