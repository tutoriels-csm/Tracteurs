let started = false;
let slideIndex = 1;
let timer = null;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[slideIndex - 1].classList.add('active');
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

function autoSlides() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  slideIndex = slideIndex >= slides.length ? 1 : slideIndex + 1;
  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
}

window.changeSlide = function (n) {
  clearTimeout(timer);
  slideIndex += n;
  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
};

window.currentSlide = function (n) {
  clearTimeout(timer);
  slideIndex = n;
  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
};

function initCategories() {
  const grid = document.getElementById('categoryGrid');
  if (!grid || !Array.isArray(tutorials)) return;
  grid.innerHTML = '';
  const categories = [...new Set(tutorials.map(t => t.category))];
  categories.forEach(cat => {
    const count = tutorials.filter(t => t.category === cat).length;
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <div class="category-card-content">
        <h3>${cat}</h3>
        <p>${count} tutoriel${count > 1 ? 's' : ''}</p>
      </div>
    `;
    card.onclick = () => showTutorials(cat);
    grid.appendChild(card);
  });

  // Ajout des modules autonomes dans la même grille, sans modifier la mise en page.
  if (Array.isArray(window.externalCategories || externalCategories)) {
    (window.externalCategories || externalCategories).forEach(item => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Ouvrir ${item.title} – ${item.description}`);
      card.innerHTML = `
        <div class="category-card-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p>${item.count} tutoriels</p>
        </div>
      `;
      const openModule = () => showEmbeddedModule(item);
      card.onclick = openModule;
      card.onkeydown = event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModule();
        }
      };
      grid.appendChild(card);
    });
  }
}

function showEmbeddedModule(item) {
  const section = document.getElementById('cemosModule');
  const frame = document.getElementById('cemosModuleFrame');
  const tutorialsSection = document.getElementById('tutoriels');
  if (!section || !frame) return;

  if (!frame.src || frame.src === window.location.href) {
    frame.src = item.url || frame.dataset.src;
  }

  if (tutorialsSection) tutorialsSection.style.display = 'none';
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeEmbeddedModule() {
  const section = document.getElementById('cemosModule');
  const categories = document.getElementById('categories');
  if (section) section.style.display = 'none';
  if (categories) categories.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showTutorials(category) {
  const section = document.getElementById('tutoriels');
  const grid = document.getElementById('tutorielsGrid');
  if (!section || !grid) return;
  grid.innerHTML = '';
  const list = tutorials.filter(t => t.category === category);
  list.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    card.innerHTML = `
      <img src="${t.thumbnail}" alt="${t.title}" class="tutorial-thumbnail">
      <div class="tutorial-card-content">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <p><strong>Durée :</strong> ${t.duration}</p>
        <button class="btn btn-primary">Voir la vidéo</button>
      </div>
    `;
    card.querySelector('button').onclick = () => openModal(t);
    grid.appendChild(card);
  });
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openModal(t) {
  const closeCemosModule = document.getElementById('closeCemosModule');
  if (closeCemosModule) closeCemosModule.addEventListener('click', closeEmbeddedModule);

  const modal = document.getElementById('videoModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;
  content.innerHTML = `
    <div style="position:relative;background:#000;">
      <button id="closeModalBtn" style="position:absolute;top:8px;right:10px;z-index:10;background:#fff;border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;">×</button>
      <iframe width="100%" height="520"
        src="https://www.youtube.com/embed/${t.youtubeId}?autoplay=1"
        title="${t.title}" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
  `;
  modal.style.display = 'block';
  document.getElementById('closeModalBtn').onclick = closeModal;
}

function closeModal() {
  const closeCemosModule = document.getElementById('closeCemosModule');
  if (closeCemosModule) closeCemosModule.addEventListener('click', closeEmbeddedModule);

  const modal = document.getElementById('videoModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;
  modal.style.display = 'none';
  content.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
  if (started) return;
  started = true;

  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
  initCategories();

  const closeCemosModule = document.getElementById('closeCemosModule');
  if (closeCemosModule) closeCemosModule.addEventListener('click', closeEmbeddedModule);

  const modal = document.getElementById('videoModal');
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
