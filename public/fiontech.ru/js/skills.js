/**
 * Skills Details — раскрывающийся блок описания
 */

// Данные о навыках
const skillsData = {
  html: {
    title: "HTML",
    text: "Семантическая вёрстка, доступность (a11y), SEO-оптимизация. Работаю с HTML5, формами, мета-тегами и структурированными данными (Schema.org).",
  },
  css: {
    title: "CSS",
    text: "Flexbox, Grid, адаптивная вёрстка, CSS-переменные, анимации. Использую методологию BEM и препроцессоры при необходимости.",
  },
  typescript: {
    title: "TypeScript",
    text: "Строгая типизация для надёжного кода. Интерфейсы, дженерики, декораторы. Использую в связке с Vue 3 и Node.js.",
  },
  php: {
    title: "PHP",
    text: "Основной язык backend-разработки. ООП, паттерны проектирования, PSR-стандарты. Опыт с PHP 8.x и современными возможностями языка.",
  },
  sql: {
    title: "SQL",
    text: "Проектирование БД, сложные запросы, оптимизация, индексы. Работаю с PostgreSQL и MySQL, понимаю EXPLAIN и профилирование запросов.",
  },
  wordpress: {
    title: "WordPress",
    text: "Разработка тем и плагинов, кастомные типы записей, REST API. Оптимизация производительности и безопасности.",
  },
  npm: {
    title: "npm",
    text: "Управление зависимостями, создание скриптов сборки, публикация пакетов. Работаю с package.json, lock-файлами и workspaces.",
  },
  vue: {
    title: "Vue.js",
    text: "Vue 3, Composition API, Pinia, Vue Router. Создание SPA и компонентных библиотек. Опыт с Nuxt для SSR.",
  },
  laravel: {
    title: "Laravel",
    text: "Полный цикл разработки: Eloquent ORM, миграции, очереди, события, API Resources. Тестирование с PHPUnit и Pest.",
  },
  postgresql: {
    title: "PostgreSQL",
    text: "Продвинутые возможности: JSON/JSONB, полнотекстовый поиск, оконные функции, партиционирование. Репликация и бэкапы.",
  },
  javascript: {
    title: "JavaScript",
    text: "ES6+, асинхронное программирование, работа с DOM и API браузера. Понимание event loop и оптимизации производительности.",
  },
  redis: {
    title: "Redis",
    text: "Кеширование, сессии, очереди, pub/sub. Настройка персистентности и кластеризации. Использую с Laravel и как самостоятельный инструмент.",
  },
  docker: {
    title: "Docker",
    text: "Контейнеризация приложений, docker-compose для локальной разработки. Оптимизация образов, multi-stage builds.",
  },
  cicd: {
    title: "CI/CD",
    text: "Автоматизация тестирования и деплоя. GitHub Actions, GitLab CI. Настройка пайплайнов для PHP и JS проектов.",
  },
  kubernetes: {
    title: "Kubernetes",
    text: "Оркестрация контейнеров, деплойменты, сервисы, ingress. Helm-чарты для управления конфигурацией.",
  },
  rabbitmq: {
    title: "RabbitMQ",
    text: "Асинхронная обработка задач, очереди сообщений. Настройка exchanges, routing, dead letter queues.",
  },
};

// DOM-элементы
const skillLinks = document.querySelectorAll(".skills-tags .tags-link");
const detailsBlock = document.getElementById("skillDetails");
const titleEl = document.getElementById("skillTitle");
const textEl = document.getElementById("skillText");
const closeBtn = document.getElementById("skillCloseBtn");

let currentSkill = null;

/**
 * Открыть/обновить блок описания
 */
function openSkillDetails(skillKey) {
  const data = skillsData[skillKey];
  if (!data) return;

  // Обновляем контент
  titleEl.textContent = data.title;
  textEl.textContent = data.text;

  // Открываем блок
  detailsBlock.classList.add("open");

  // Обновляем активный тег
  skillLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.skill === skillKey);
  });

  currentSkill = skillKey;
}

/**
 * Закрыть блок описания
 */
function closeSkillDetails() {
  detailsBlock.classList.remove("open");

  // Снимаем активный класс со всех тегов
  skillLinks.forEach((link) => link.classList.remove("active"));

  currentSkill = null;
}

// Обработчики кликов по тегам
skillLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const skillKey = link.dataset.skill;

    // Если кликнули на уже открытый — закрываем
    if (currentSkill === skillKey) {
      closeSkillDetails();
      return;
    }

    openSkillDetails(skillKey);
  });
});

// Кнопка закрытия
closeBtn.addEventListener("click", closeSkillDetails);

// Закрытие по Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentSkill) {
    closeSkillDetails();
  }
});
