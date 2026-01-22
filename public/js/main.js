"use strict";

/**
 * URL API (Laravel backend)
 */
const API_URL = "https://blog.sulfurfun.ru";

/**
 * Отправка формы через Laravel API
 */
const sendFeedback = async (formData) => {
  const response = await fetch(`${API_URL}/api/v1/feedback`, {
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

// Секции и ссылки
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-link");

// Активная ссылка
function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    link.classList.remove("pending"); // снимаем pending
  });
}

// IntersectionObserver — ЕДИНСТВЕННЫЙ источник истины
const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -70% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    // HAPTIC
    hapticLight();

    // pending-анимация
    navLinks.forEach((l) => l.classList.remove("pending"));
    link.classList.add("pending");

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  });
});

// Инициализация при загрузке
window.addEventListener("load", () => {
  const firstVisible = Array.from(sections).find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
  });

  if (firstVisible) {
    setActiveLink(firstVisible.id);
  }
});

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function hapticLight() {
  if (isiOS() && navigator.vibrate) {
    navigator.vibrate(10);
  }
}
