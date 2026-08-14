const TELEGRAM_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzZyXoyj1c_k8chcI2c7frnVga0k5gKIacCvs7nb7Ry-rJKjOdcpYpL0ADQS_vpTUwdQA/exec';

document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // МАРШРУТЫ
  // =========================

  const routeCards = document.getElementById('routeCards');
  const routeSelect = document.getElementById('route');

  if (typeof routes !== 'undefined') {

    // Выводим карточки маршрутов
    if (routeCards) {
      routeCards.innerHTML = routes.map(function (route) {

        return `
          <article class="route-card">
            <h3>${route.from} → ${route.to}</h3>

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

    // Заполняем список маршрутов в форме
    if (routeSelect) {

      routes.forEach(function (route) {

        const option = document.createElement('option');

        option.value =
          route.from + ' → ' + route.to;

        option.textContent =
          route.from +
          ' → ' +
          route.to +
          ' — ' +
          route.price +
          ' грн';

        routeSelect.appendChild(option);

      });

    }

  }


  // =========================
  // КНОПКИ НА МАРШРУТАХ
  // =========================

  document.querySelectorAll('.route-book').forEach(function (button) {

    button.addEventListener('click', function () {

      const selectedRoute = button.dataset.route;

      if (routeSelect) {
        routeSelect.value = selectedRoute;
      }

      const booking =
        document.getElementById('booking');

      if (booking) {

        booking.scrollIntoView({
          behavior: 'smooth'
        });

      }

    });

  });


  // =========================
  // ФОРМА БРОНИРОВАНИЯ
  // =========================

  const form =
    document.getElementById('bookingForm');

  if (!form) return;


  form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const button =
      form.querySelector('button[type="submit"]');


    const data = {

      name:
        document.getElementById('name')?.value || '',

      phone:
        document.getElementById('phoneInput')?.value || '',

      route:
        document.getElementById('route')?.value || '',

      date:
        document.getElementById('date')?.value || '',

      seats:
        document.getElementById('seats')?.value || '',

      comment:
        document.getElementById('comment')?.value || ''

    };


    // Проверяем обязательные поля

    if (
      !data.name ||
      !data.phone ||
      !data.route ||
      !data.date
    ) {

      alert(
        'Пожалуйста, заполните имя, телефон, маршрут и дату.'
      );

      return;

    }


    button.disabled = true;

    button.textContent =
      'ОТПРАВЛЯЕМ...';


    try {

      await fetch(
        TELEGRAM_WEB_APP_URL,
        {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(data)
        }
      );


      alert(
        '✅ Заявка отправлена! Мы свяжемся с вами.'
      );


      form.reset();


    } catch (error) {

      console.error(error);

      alert(
        '❌ Не удалось отправить заявку. Позвоните нам по телефону.'
      );

    }


    button.disabled = false;

    button.textContent =
      'ЗАБРОНИРОВАТЬ МЕСТО';

  });

});
