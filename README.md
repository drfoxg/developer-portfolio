# Портфолио разработчика

## Автор: Анатолий Борисов, ТГ автора: @drfoxg

## Деплой лендинга

### Структура

```
landing/
├── docker-compose.yml
├── nginx.conf
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── footer.js
└── img/
    └── ...
```

### Запуск

```bash
# Запуск
docker compose up -d

# Проверка
curl http://localhost:8080

# Логи
docker compose logs -f

# Остановка
docker compose down
```

### За Nginx Proxy Manager (NPM)

Порт `8080` закрыт снаружи. NPM проксирует на `landing:80`:

```yaml
# docker-compose.yml
services:
  nginx:
    # убрать ports: - "8080:80"
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

### Обновление

```bash
git pull
docker compose restart
```
