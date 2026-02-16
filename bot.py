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
    @dp.message()
async def webapp_handler(message: types.Message):
    if message.web_app_data:
        data = json.loads(message.web_app_data.data)

        if data["action"] == "gift_stars":
            amount = int(data["amount"])

            await send_gift_menu(
                bot,
                message.from_user.id,
                amount
            )
