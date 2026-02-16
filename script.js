payBtn.addEventListener("click", async () => {
  const amount = parseInt(starsInput.value);
  if (!amount || amount <= 0) return alert("Введите количество ⭐");

  try {
    const res = await fetch("http://localhost:3000/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars: amount })
    });

    const data = await res.json();
    if (data.url) window.open(data.url, "_blank"); // открываем Stripe Checkout
  } catch (e) {
    alert("Ошибка сервера оплаты");
  }
});
