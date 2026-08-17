# bot.py
import os
import sys
import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

BOT_TOKEN = os.getenv("BOT_TOKEN", "8712671324:AAE_uIcGzEU-TYgXgl1c_o4t4I_KwijeM50")
MINI_APP_URL = os.getenv("MINI_APP_URL", "https://behind-weighted-dude-roughly.trycloudflare.com")

dp = Dispatcher()

def create_bot(token: str = None) -> Bot:
    return Bot(token=token or BOT_TOKEN)

@dp.message(CommandStart())
async def start_handler(message: types.Message):
    # Read dynamic mini app URL on every command to support runtime updates
    current_mini_app_url = os.getenv("MINI_APP_URL", MINI_APP_URL)
    
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="🏋️ Открыть фитнес-трекер", 
                web_app=WebAppInfo(url=current_mini_app_url)
            )
        ]
    ])
    first_name = message.from_user.first_name if message.from_user else "Атлет"
    await message.answer(
        f"Привет, {first_name}!\n\n"
        "🔥 Добро пожаловать в персональный тренировочный зал с 3-дневными сплитами, видео техники и системой рангов!\n\n"
        "Нажми на кнопку ниже, чтобы открыть приложение:",
        reply_markup=kb
    )

async def run_bot():
    logging.info("Starting Telegram Bot Polling...")
    logging.info(f"Connected Mini App URL: {os.getenv('MINI_APP_URL', MINI_APP_URL)}")
    bot = create_bot()
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
    try:
        asyncio.run(run_bot())
    except (KeyboardInterrupt, SystemExit):
        logging.info("Bot stopped.")