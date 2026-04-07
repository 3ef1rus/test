// Мобильное меню (гамбургер)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Функционал для мобильных: клик по пункту с подменю раскрывает его
function initMobileSubmenus() {
  const menuItems = document.querySelectorAll('.menu-item-has-children');
  
  menuItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;
    
    // Убираем переход по ссылке для пунктов с подменю на мобильных
    link.addEventListener('click', (e) => {
      // Проверяем, открыто ли мобильное меню (ширина экрана <= 768px)
      if (window.innerWidth <= 768) {
        e.preventDefault();
        // Закрываем все остальные открытые подменю (опционально)
        // menuItems.forEach(other => {
        //   if (other !== item) other.classList.remove('open');
        // });
        item.classList.toggle('open');
      }
    });
  });
}

// При загрузке и изменении размера окна переинициализируем, если нужно
initMobileSubmenus();
window.addEventListener('resize', initMobileSubmenus);

// Модальное окно
const modal = document.getElementById('callbackModal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = modal?.querySelector('.modal-close');

function openModal() {
  modal?.classList.add('open');
}

function closeModal() {
  modal?.classList.remove('open');
}

openBtns.forEach(btn => btn.addEventListener('click', openModal));
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// Закрытие по клику на оверлей
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Обработка формы (демо)
const form = document.getElementById('callbackForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    closeModal();
    form.reset();
  });
}

// Плавная прокрутка для якорных ссылок
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