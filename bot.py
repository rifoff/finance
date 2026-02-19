"""
FinanceOS — Telegram Bot
Запускает Mini App по команде /start

Установка:
    pip install python-telegram-bot

Запуск:
    python bot.py
"""

import asyncio
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, MenuButtonWebApp
from telegram.ext import Application, CommandHandler, ContextTypes

# ⚠️ Замени на свои данные
BOT_TOKEN = "ВАШ_ТОКЕН_ОТ_BOTFATHER"
WEBAPP_URL = "https://ВАШ_ДОМЕН.vercel.app"  # URL задеплоенного приложения


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[
        InlineKeyboardButton(
            text="💰 Открыть FinanceOS",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )
    ]]
    await update.message.reply_text(
        "👋 Добро пожаловать в *FinanceOS*!\n\n"
        "Ваш персональный финансовый менеджер.\n"
        "Управляйте бюджетом, долгами и накоплениями прямо в Telegram.\n\n"
        "Нажмите кнопку ниже, чтобы открыть приложение 👇",
        parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )


async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "ℹ️ *FinanceOS* — финансовый менеджер\n\n"
        "/start — открыть приложение\n"
        "/help — помощь",
        parse_mode="Markdown"
    )


def main():
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_cmd))
    print(f"✅ Бот запущен. WEBAPP_URL: {WEBAPP_URL}")
    app.run_polling()


if __name__ == "__main__":
    main()
