"use strict";

/**
 * URL API (Laravel backend)
 */
const API_URL = "https://blog.sulfurfun.ru";

/**
 * Отправка формы через Laravel API
 */
const sendFeedback = async (formData) => {
  const response = await fetch(`${API_URL}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const data = await response.json();

  if (!response.ok) {
    // Обработка ошибок валидации (422)
    if (response.status === 422 && data.errors) {
      const errorMessages = Object.values(data.errors).flat().join("\n");
      throw new Error(errorMessages);
    }
    throw new Error(data.message || "Ошибка отправки");
  }

  return data;
};

// Обработка форм
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Отправка...</span>";

    try {
      const formData = new FormData(this);
      await sendFeedback(formData);

      // Успех
      this.innerHTML =
        '<p class="success-message">Спасибо!<br>Заявку получили, скоро свяжемся.</p>';
    } catch (error) {
      // Ошибка
      console.error("Ошибка:", error);
      alert(error.message || "Произошла ошибка. Попробуйте позже.");

      // Восстанавливаем кнопку
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
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

    // Переход к якорю с задержкой 0.3 сек
    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  });
});
