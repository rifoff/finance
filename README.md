# FinanceOS — Telegram Mini App

Персональный финансовый менеджер внутри Telegram.

## Быстрый старт

```bash
npm install
npm run dev
```

Откроется на http://localhost:5173

## Сборка для продакшена

```bash
npm run build
```

Готовые файлы появятся в папке `dist/`

---

## Деплой на Vercel (рекомендуется)

```bash
npm install -g vercel
vercel
```

Следуй инструкциям — Vercel сам всё настроит.
Получишь ссылку вида: https://finance-os-xxx.vercel.app

---

## Деплой на GitHub Pages

1. В `vite.config.js` раскомментируй строку `base` и укажи имя репозитория:
   ```js
   base: '/finance-os/',
   ```

2. Установи gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Добавь в `package.json` в секцию `scripts`:
   ```json
   "deploy": "gh-pages -d dist"
   ```

4. Собери и задеплой:
   ```bash
   npm run build
   npm run deploy
   ```

---

## Подключение к Telegram Bot

1. Создай бота через @BotFather → `/newbot`
2. Получи токен
3. Запусти бота (bot.py в корне проекта)
4. В @BotFather привяжи URL: `/newapp` или `/myapps`

---

## Структура проекта

```
finance-os/
├── index.html          # Точка входа
├── vite.config.js      # Конфиг Vite
├── package.json
├── .gitignore
└── src/
    ├── main.jsx        # React root + Telegram SDK init
    └── App.jsx         # Всё приложение
```
