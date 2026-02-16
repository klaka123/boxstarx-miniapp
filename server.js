const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe("YOUR_STRIPE_SECRET_KEY"); // вставь свой ключ Stripe
const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-payment", async (req, res) => {
  const { stars } = req.body;
  const amount = stars * 1; // 1 ⭐ = 1 цент (или любая ваша цена)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: `${stars}⭐ в Boxstarx` },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: "http://localhost:5500/success.html?stars=" + stars,
      cancel_url: "http://localhost:5500/"
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
