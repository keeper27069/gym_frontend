# main.py
import os
import asyncio
import logging
import signal
import uvicorn
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

from app import api
from bot import dp, create_bot

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)
logger = logging.getLogger("gym_main")

async def run_fastapi_server():
    """Runs Uvicorn FastAPI server concurrently."""
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    config = uvicorn.Config(
        app=api,
        host=host,
        port=port,
        log_level="info",
        access_log=True
    )
    server = uvicorn.Server(config)
    logger.info(f"⚡ FastAPI Server running at http://{host}:{port}")
    await server.serve()

async def run_telegram_bot():
    """Runs Aiogram bot polling concurrently."""
    bot = create_bot()
    mini_app_url = os.getenv("MINI_APP_URL", "Not set")
    logger.info(f"🤖 Aiogram Bot Polling started. Mini App URL: {mini_app_url}")
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()
        logger.info("Bot session closed.")

async def main():
    logger.info("🚀 Starting 24/7 Gym Telegram Mini App Backend Services...")
    
    # Run FastAPI & Bot concurrently
    try:
        await asyncio.gather(
            run_fastapi_server(),
            run_telegram_bot()
        )
    except (asyncio.CancelledError, KeyboardInterrupt):
        logger.info("Shutting down services gracefully...")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("All services stopped.")
