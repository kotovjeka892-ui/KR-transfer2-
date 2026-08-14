const TELEGRAM_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzZyXoyj1c_k8chcI2c7frnVga0k5gKIacCvs7nb7Ry-rJKjOdcpYpL0ADQS_vpTUwdQA/exec';

document.addEventListener('DOMContentLoaded', function () {

  // ===== МАРШРУТЫ =====
  const routeCards = document.querySelector('#routeCards');
  const routeSelect = document.querySelector('#route');

  if (typeof routes !== 'undefined') {

    // Карточки маршрутов
    if (routeCards) {
      routeCards.innerHTML = routes.map(function (route) {
        return `
          <article class="route-card">
            <div class="route-title">
              ${route.from} → ${route.to}
            </div>
            <div class="route-price">
              ${route.price} грн
            </div>
            <button
              class="btn primary route-book"
              type="button"
              data-route="${route.from} → ${route.to}">
              ЗАБРОНИРОВАТЬ
            </button>
          </article>
        `;
      }).join('');
    }

    // Список маршрутов в форме
    if (routeSelect) {
      routes.forEach(function (route) {
        const option = document.createElement('option');

        option.value = route.from + ' → ' + route.to;
        option.textContent =
          route.from + ' → ' + route.to + ' — ' + route.price + ' грн';

        routeSelect.appendChild(option);
      });
    }
  }

  // ===== КНОПКИ «ЗАБРОНИРОВАТЬ» НА КАРТОЧКАХ =====
  document.querySelectorAll('.route-book').forEach(function (button) {

    button.addEventListener('click', function () {

      if (routeSelect) {
        routeSelect.value = button.dataset.route;
      }

      const booking = document.querySelector('#booking');

      if (booking) {
        booking.scrollIntoView({
          behavior: 'smooth'
        });
      }

    });

  });

  // ===== ФОРМА БРОНИРОВАНИЯ =====
  const form = document.querySelector('#bookingForm');

  if (!form) return;

  form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    const data = {
      name: document.querySelector('#name')?.value || '',
      phone: document.querySelector('#phoneInput')?.value || '',
      route: document.querySelector('#route')?.value || '',
      date: document.querySelector('#date')?.value || '',
      seats: document.querySelector('#seats')?.value || '',
      comment: document.querySelector('#comment')?.value || ''
    };

    // Проверка обязательных полей
    if (!data.name  !data.phone  !data.route || !data.date) {

      alert(
        'Пожалуйста, заполните имя, телефон, маршрут и дату.'
      );

      return;
    }

    button.disabled = true;
    button.textContent = 'ОТПРАВЛЯЕМ...';

    try {

      await fetch(TELEGRAM_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });

      alert(
        '✅ Заявка отправлена! Мы свяжемся с вами.'
      );

      form.reset();

    } catch (error) {

      console.error(error);

      alert(
        '❌ Не удалось отправить заявку. Позвоните нам по телефону.'
      );

    } finally {

      button.disabled = false;
      button.textContent = 'ЗАБРОНИРОВАТЬ МЕСТО';

    }

  });

});
