/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const stripe = require("stripe")(
  "sk_test_51LhDZ3JpOn8aP1UiMoqzKuK14v29sBfsNGsxoguWXOQVfcLz3hWbDWKyi2X3enqNRYpXXRP3ZxwJ2qUmh4doa5qd00dM9R57dH"
);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const PORT = process.env.PORT || 3030;
// Express app config
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.post("/create-intent", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const amount = req.body.amount;
  const currency = req.body.currency;

  const intent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: { enabled: true },
  });
  res.json({ client_secret: intent.client_secret });
});

// A simple api to get all tasks
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});

app.get("/hello", (request, response) => {
  response.status(200).send([
    {
      id: "123",
      name: "Task 1",
      isComplete: false,
    },
    {
      id: "456",
      name: "Task 2",
      isComplete: true,
    },
  ]);
});
