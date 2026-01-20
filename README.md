# Портфолио разработчика

## Автор: Анатолий Борисов, ТГ автора: @drfoxg

## Деплой лендинга

### Структура

```
landing/
├── docker-compose.yml
├── nginx/
│   └── default.conf
└── public/
    ├── index.html
    ├── css/
    ├── js/
    └── assets/
```

### Запуск

```bash
# Запуск
docker compose up -d

# Проверка
curl http://localhost:80

# Логи
docker compose logs -f

# Остановка
docker compose down
```

### За Nginx Proxy Manager (NPM)

Порт `80` закрыт снаружи. NPM проксирует на `fullstack-landing:80`, это имя контейнера:

```yaml
# docker-compose.yml
services:
  nginx:
    expose:
      - "80"
    networks:
      - npm_network

networks:
  npm_network:
    external: true
```

В NPM:

- Domain: `fiontech.ru`
- Forward: `landing` : `80`
- SSL: Let's Encrypt

### Настроено подтверждения сайта в Яндекс Вебмастер

Чтобы не засорять корень в publlic добавлено правило в конфиги nginx

```ini
location = /yandex_abd00ac998b15e9c.html {
    alias /usr/share/nginx/html/public/yandex_verification/yandex_abd00ac998b15e9c.html;
}
```

### Обновление

```bash
git pull
docker compose restart
```
