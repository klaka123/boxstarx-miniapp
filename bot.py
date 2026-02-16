@dp.message()
async def webapp_handler(message: types.Message):
    if not message.web_app_data:
        return

    data = json.loads(message.web_app_data.data)

    if data["action"] == "topup":
        amount = int(data["amount"])

        kb = InlineKeyboardMarkup(inline_keyboard=[
            [
                InlineKeyboardButton(
                    text=f"🎁 Подарить {amount} ⭐ боту",
                    pay=True
                )
            ]
        ])

        await message.answer(
            f"Пополнение {amount} ⭐ в @BoxstarxBot",
            reply_markup=kb
        )
