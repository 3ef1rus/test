// Мобильное меню
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => navList.classList.toggle('open'));
}

// Данные для основных услуг (используются ваши локальные картинки)
const servicesData = [
  { title: 'Перетяжка мебели', desc: 'Восстановим диваны, кресла, стулья. Более 300 тканей, выезд мастера.', price: 'от 150 BYN', img: 'img/remont-mebel.jpg', link: '/mebel/' },
  { title: 'Кухни на заказ', desc: 'Индивидуальные размеры, любые фасады, встроенная техника. Замер 0 ₽.', price: 'от 800 BYN/м.пог.', img: 'img/kuhn.jpeg', link: '/kuxni/' },
  { title: 'Реставрация ванн', desc: 'Жидкий акрил, эмаль, вкладыш — как новая за 1 день. Гарантия 3 года.', price: 'от 180 BYN', img: 'img/vann.jpg', link: '/vanny/' },
  { title: 'Ремонт квартир', desc: 'Под ключ: дизайн-проект, черновая и чистовая отделка. Свои материалы.', price: 'от 350 BYN/м²', img: 'img/rem2.jpeg', link: '/remont/' },
  { title: 'Теплицы', desc: 'Усиленный каркас, поликарбонат 4 мм, установка за 1 день. Доставка.', price: 'от 350 BYN', img: 'img/teplica.jpg', link: '/teplicy/' },
  { title: 'Деревянные дома', desc: 'Из бруса и оцилиндрованного бревна под ключ. Проекты от 100 м².', price: 'от 400 BYN/м²', img: 'img/der-dom.jpeg', link: '/doma/' },
  { title: 'Натяжные потолки', desc: 'Матовые, глянцевые, парящие, с фотопечатью. Монтаж за 1 день.', price: 'от 25 BYN/м²', img: 'img/potolok.jpg', link: '/potolki/' },
];

// Данные для категории "Для дачи и сада"
const dachaData = [
  { title: 'Ворота', desc: 'Распашные, откатные, автоматические. Любые размеры и цвета.', price: 'от 600 BYN', img: 'img/vorota.png', link: '/vorota/' },
  { title: 'Заборы', desc: 'Металлические, деревянные, евроштакетник. Установка под ключ.', price: 'от 120 BYN/м.пог.', img: 'img/zabor.jpeg', link: '/zabory/' },
  { title: 'Лестницы', desc: 'Деревянные, металлические, винтовые. Дизайн любой сложности.', price: 'от 350 BYN', img: 'img/lestnica.jpeg', link: '/lestnicy/' },
  { title: 'Кладка печей', desc: 'Кирпичные печи, камины, барбекю. Проект и монтаж.', price: 'от 800 BYN', img: 'img/pechi.jpg', link: '/pechi/' },
  { title: 'Беседки', desc: 'Деревянные, металлические, с мангалом. Под ключ.', price: 'от 700 BYN', img: 'img/besedka.png', link: '/besedki/' }
];

// Данные для категории "Ремонт и отделка"
const remontData = [
  { title: 'Натяжные потолки', desc: 'Матовые, глянцевые, парящие, с фотопечатью. Монтаж за 1 день.', price: 'от 25 BYN/м²', img: 'img/potolok.jpg', link: '/potolki/' },
  { title: 'Окна и балконы', desc: 'ПВХ, деревянные, алюминиевые. Остекление балконов и лоджий.', price: 'от 250 BYN', img: 'img/okna&balk.jpg', link: 'okna.html' },
  { title: 'Ремонтные работы', desc: 'Косметический, капитальный, евроремонт. Любые помещения.', price: 'от 350 BYN/м²', img: 'img/remont.jpeg', link: '/remont/' }
];

// Функция рендера карточек с возможностью выбора: ссылка или модалка
function renderCards(containerId, data, useModalDefault = false, exceptTitle = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glass-card';
    let actionHtml = '';
    // Для карточек, которые должны вести на страницу (например, Окна и балконы)
    if (exceptTitle && item.title === exceptTitle) {
      actionHtml = `<a href="${item.link}" class="glass-link">Подробнее <i class="fas fa-arrow-right"></i></a>`;
    } else if (useModalDefault) {
      actionHtml = `<button class="glass-link" data-open-modal>Подробнее <i class="fas fa-arrow-right"></i></button>`;
    } else {
      // Если не модалка и не исключение, используем ссылку
      actionHtml = `<a href="${item.link}" class="glass-link">Подробнее <i class="fas fa-arrow-right"></i></a>`;
    }
    card.innerHTML = `
      <div class="glass-card__img"><img src="${item.img}" alt="${item.title}" loading="lazy"></div>
      <div class="glass-card__content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="glass-card__price">${item.price}</div>
        ${actionHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

// Рендерим:
// Для servicesData и dachaData - все кнопки ведут на модалку (useModalDefault = true)
renderCards('servicesGrid', servicesData, true);
renderCards('dachaGrid', dachaData, true);
// Для remontData: по умолчанию ссылки, но для карточки "Окна и балконы" оставляем ссылку, для остальных - модалку
// Для этого проще перебрать отдельно, но можно и через exceptTitle
// Сделаем отдельную обработку для remontData, так как нужно смешанное поведение
function renderRemontCards() {
  const container = document.getElementById('remontGrid');
  if (!container) return;
  container.innerHTML = '';
  remontData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glass-card';
    let actionHtml = '';
    if (item.title === 'Окна и балконы') {
      actionHtml = `<a href="${item.link}" class="glass-link">Подробнее <i class="fas fa-arrow-right"></i></a>`;
    } else {
      actionHtml = `<button class="glass-link" data-open-modal>Подробнее <i class="fas fa-arrow-right"></i></button>`;
    }
    card.innerHTML = `
      <div class="glass-card__img"><img src="${item.img}" alt="${item.title}" loading="lazy"></div>
      <div class="glass-card__content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="glass-card__price">${item.price}</div>
        ${actionHtml}
      </div>
    `;
    container.appendChild(card);
  });
}
renderRemontCards();

// Модальное окно
const modal = document.getElementById('callbackModal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = modal?.querySelector('.modal__close');
function openModal() { modal?.classList.add('open'); }
function closeModal() { modal?.classList.remove('open'); }
openBtns.forEach(btn => btn.addEventListener('click', openModal));
if (closeBtn) closeBtn.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Формы (добавляем поле комментария)
function handleFormSubmit(form, msg = 'Спасибо! Мы свяжемся с вами.') {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]')?.value || '';
    const phone = form.querySelector('input[name="phone"]')?.value || '';
    const comment = form.querySelector('textarea[name="comment"], textarea[name="message"]')?.value || '';
    alert(`${msg}\nИмя: ${name}\nТелефон: ${phone}\nКомментарий: ${comment || 'нет'}`);
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