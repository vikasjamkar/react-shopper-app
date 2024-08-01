//Shopper Web Application Payment APIs

const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const razorpay = require("razorpay");
const crypto = require("crypto");

const connectionString = "mongodb://127.0.0.1:27017";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_UCWB0DOpqxYuiR",
      key_secret: "BYOwIlqrvk80VNodmK7KlGWa",
    });

    const options = {
      amount: Number(req.body.amount * 100),
      currency: req.body.currency,
      receipt: req.body.receipt,
    };
    console.log(options);

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/order/validate", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const ordersData = {
    status: "Success",
    orderId: req.body.razorpay_order_id,
    paymentId: req.body.razorpay_payment_id,
    signature: req.body.razorpay_signature,
    date: req.body.date,
    price: req.body.price,
    username: req.body.contactInfo,
    address: req.body.address,
    products: req.body.carts,
    userId: req.body.userId,
  };

  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("orders")
      .insertOne(ordersData)
      .then(() => console.log("Record inserted"));
  });

  const sha = crypto.createHmac("sha256", "BYOwIlqrvk80VNodmK7KlGWa");
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit" });
  }
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.get("/orderDetails/:userId", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("orders")
      .find({
        $and: [
          {
            userId: req.params.userId,
          },
        ],
      })
      .toArray()
      .then((document) => res.send(document));
  });
});

app.listen(2030);
console.log("Server started: http://127.0.0.1:2030");
