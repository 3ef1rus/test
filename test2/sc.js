// ========== МОБИЛЬНОЕ МЕНЮ ==========
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// ========== ЗАГРУЗКА КАРТОЧЕК УСЛУГ ==========
const servicesData = [
  { title: 'Дизайн интерьера', desc: '3D-визуализация, планировка, подбор отделки.', img: 'https://sdelaem.by/images/disain-interira.jpg', link: '/design/' },
  { title: 'Капитальный ремонт', desc: 'Полный цикл: от демонтажа до чистовой отделки.', img: 'https://sdelaem.by/images/remontnye-raboty.jpg', link: '/remont/' },
  { title: 'Реставрация ванн', desc: 'Акрил, эмаль, вкладыш — как новая за 1 день.', img: 'https://sdelaem.by/images/vanny.jpg', link: '/vanny/' },
  { title: 'Мебель на заказ', desc: 'Кухни, шкафы-купе, мягкая мебель.', img: 'https://sdelaem.by/images/kuxni.jpg', link: '/kuxni/' },
  { title: 'Натяжные потолки', desc: 'Матовые, глянцевые, парящие.', img: 'https://sdelaem.by/images/potolok.jpg', link: '/potolki/' },
  { title: 'Сантехнические работы', desc: 'Установка, замена, ремонт.', img: 'https://sdelaem.by/images/okna.jpg', link: '/remont-stiralnyx-mashin/' },
];

function renderServices() {
  const grid = document.querySelector('.services__grid');
  if (!grid) return;
  grid.innerHTML = '';
  servicesData.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-card__img" style="background-image: url('${service.img}');"></div>
      <div class="service-card__content">
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
        <a href="${service.link}" class="btn btn--small">Подробнее →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ========== МОДАЛЬНОЕ ОКНО ==========
const modal = document.getElementById('callbackModal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = modal?.querySelector('.modal__close');

function openModal() {
  modal?.classList.add('open');
}
function closeModal() {
  modal?.classList.remove('open');
}
openBtns.forEach(btn => btn.addEventListener('click', openModal));
if (closeBtn) closeBtn.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// ========== ОБРАБОТКА ФОРМ (демо) ==========
function handleFormSubmit(form, successMessage = 'Спасибо! Мы свяжемся с вами.') {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(successMessage);
    form.reset();
    closeModal();
  });
}
const mainForm = document.getElementById('callbackForm');
if (mainForm) handleFormSubmit(mainForm, 'Заявка отправлена. Менеджер перезвонит в ближайшее время.');
const modalForm = document.getElementById('modalForm');
if (modalForm) handleFormSubmit(modalForm);

// ========== ПЛАВНЫЙ СКРОЛЛ ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === "#" || href === "") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Инициализация
renderServices();