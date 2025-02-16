const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PsL3gIFeVije7VQYlpILIpcItp6JMaC9fYnJi75326mSCRDdJyH9un4JtlPirnbZlzwlwKbNNbB8LlQWtsyFm1800KkWaydum"
);

app.use(express.json());
app.use(cors());

//checkout api

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  // console.log(products);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qunty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({id:session.id})
});
  
app.listen(8000, () => {
  console.log("server start");
});
