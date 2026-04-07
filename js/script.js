// Мобильное меню
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => navList.classList.toggle('open'));
}

// Данные для стеклянных карточек
const servicesData = [
  { title: 'Перетяжка мебели', desc: 'Восстановим диваны, кресла, стулья. Более 300 тканей, выезд мастера.', price: 'от 150 BYN', img: 'https://images.pexels.com/photos/2766254/pexels-photo-2766254.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Кухни на заказ', desc: 'Индивидуальные размеры, любые фасады, встроенная техника. Замер 0 ₽.', price: 'от 800 BYN/м.пог.', img: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Реставрация ванн', desc: 'Жидкий акрил, эмаль, вкладыш — как новая за 1 день. Гарантия 3 года.', price: 'от 180 BYN', img: 'https://images.pexels.com/photos/7301870/pexels-photo-7301870.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Ремонт квартир', desc: 'Под ключ: дизайн-проект, черновая и чистовая отделка. Свои материалы.', price: 'от 350 BYN/м²', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Теплицы', desc: 'Усиленный каркас, поликарбонат 4 мм, установка за 1 день. Доставка.', price: 'от 350 BYN', img: 'https://images.pexels.com/photos/6276072/pexels-photo-6276072.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Деревянные дома', desc: 'Из бруса и оцилиндрованного бревна под ключ. Проекты от 100 м².', price: 'от 400 BYN/м²', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Натяжные потолки', desc: 'Матовые, глянцевые, парящие, с фотопечатью. Монтаж за 1 день.', price: 'от 25 BYN/м²', img: 'https://images.pexels.com/photos/6567596/pexels-photo-6567596.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' },
  { title: 'Жалюзи & Рольшторы', desc: 'Горизонтальные, вертикальные, рулонные. Замер бесплатно.', price: 'от 40 BYN', img: 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&w=600', link: '#' }
];

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  servicesData.forEach(service => {
    const card = document.createElement('div');
    card.className = 'glass-card';
    card.innerHTML = `
      <div class="glass-card__img"><img src="${service.img}" alt="${service.title}" loading="lazy"></div>
      <div class="glass-card__content">
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
        <div class="glass-card__price">${service.price}</div>
        <a href="${service.link}" class="glass-link">Заказать <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Модальное окно
const modal = document.getElementById('callbackModal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = modal?.querySelector('.modal__close');
function openModal() { modal?.classList.add('open'); }
function closeModal() { modal?.classList.remove('open'); }
openBtns.forEach(btn => btn.addEventListener('click', openModal));
if (closeBtn) closeBtn.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Формы
function handleFormSubmit(form, msg = 'Спасибо! Мы свяжемся с вами.') {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(msg);
    form.reset();
    closeModal();
  });
}
const mainForm = document.getElementById('callbackForm');
const modalForm = document.getElementById('modalForm');
if (mainForm) handleFormSubmit(mainForm, 'Заявка отправлена. Менеджер перезвонит.');
if (modalForm) handleFormSubmit(modalForm);

// Плавный скролл
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

// Запуск рендера карточек
renderServices();