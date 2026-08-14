const TELEGRAM_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzZyXoyj1c_k8chcI2c7frnVga0k5gKIacCvs7nb7Ry-rJKjOdcpYpL0ADQS_vpTUwdQA/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#bookingForm');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    const data = {
      name: form.querySelector('[name="name"]')?.value || '',
      phone: form.querySelector('[name="phone"]')?.value || '',
      route: form.querySelector('[name="route"]')?.value || '',
      date: form.querySelector('[name="date"]')?.value || '',
      seats: form.querySelector('[name="seats"]')?.value || '',
      comment: form.querySelector('[name="comment"]')?.value || ''
    };

    if (!data.name  !data.phone  !data.route || !data.date) {
      alert('Пожалуйста, заполните имя, телефон, маршрут и дату.');
      return;
    }

    button.disabled = true;
    button.textContent = 'Отправляем...';

    try {
      await fetch(TELEGRAM_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });

      alert('✅ Заявка отправлена! Мы свяжемся с вами.');

      form.reset();

    } catch (error) {
      console.error(error);
      alert('❌ Не удалось отправить заявку. Позвоните нам по телефону.');

    } finally {
      button.disabled = false;
      button.textContent = 'Забронировать';
    }
  });
});
