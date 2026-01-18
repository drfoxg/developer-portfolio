"use strict";

const ajaxSend = async (formData) => {
  // создаем функцию отправки формы
  const fetchResp = await fetch("telegram.php", {
    // указываем обработчик формы — telegram.php
    method: "POST", // метод, которым мы отправляем форму
    body: formData, // что будет внутри формы — содержимое input
  });
  if (!fetchResp.ok) {
    // если ошибка, то...
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`,
    ); // выводим статус ошибки и текст
  }
  return await fetchResp.text(); // если все хорошо, возвращаем ответ сервера
};

const forms = document.querySelectorAll("form"); // находим все теги form
forms.forEach((form) => {
  // для каждой формы...
  form.addEventListener("submit", function (e) {
    // отслеживаем событие отправки
    e.preventDefault(); // отменить стандартную отправку формы
    const formData = new FormData(this); // собираем все данные из формы
    console.log(formData);

    ajaxSend(formData) // передаем данные из формы в обработчик
      .then((response) => {
        // если все успешно, то..
        this.innerHTML =
          "Спасибо,<br> заявку получили"; /* окно благодарности */
        form.reset(); /*  очищаем поля формы */
      })
      .catch((err) => console.error(err)); /* если ошибка, выводим в консоль */
  });
});

// При скролле (автоматически по секциям)
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Навигация: смена активного пункта меню с задержкой перед переходом
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    // Меняем активный класс
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    // Переход к якорю с задержкой 0.5 сек
    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  });
});
