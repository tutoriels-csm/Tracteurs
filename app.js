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

window.changeSlide = function(n) {
  clearTimeout(timer);
  slideIndex += n;
  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
};

window.currentSlide = function(n) {
  clearTimeout(timer);
  slideIndex = n;
  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
};

function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  if (!Array.isArray(window.tutorials)) {
    grid.innerHTML = "<p>Erreur: le fichier data.js ne contient pas une variable globale <strong>tutorials</strong>.</p>";
    return;
  }

  const categories = [...new Set(window.tutorials.map(t => t.category))];
  grid.innerHTML = '';

  categories.forEach(cat => {
    const count = window.tutorials.filter(t => t.category === cat).length;
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
}

function showTutorials(category) {
  const section = document.getElementById('tutoriels');
  const grid = document.getElementById('tutorielsGrid');
  if (!section || !grid || !Array.isArray(window.tutorials)) return;

  const list = window.tutorials.filter(t => t.category === category);
  grid.innerHTML = '';

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
  const modal = document.getElementById('videoModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;
  modal.style.display = 'none';
  content.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(slideIndex);
  timer = setTimeout(autoSlides, 5000);
  renderCategories();

  const modal = document.getElementById('videoModal');
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
