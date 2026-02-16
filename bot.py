async def send_gift_menu(bot, user_id, amount):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text=f"🎁 Подарить {amount} ⭐",
                pay=True
            )
        ]
    ])

    await bot.send_message(
        user_id,
        f"✨ Чтобы пополнить баланс, подари {amount} ⭐ боту",
        reply_markup=keyboard
    )
