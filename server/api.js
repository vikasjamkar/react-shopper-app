// Shopper Web Application APIs

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = MongoClient;
const express = require("express");
const cors = require("cors");

const connectionString = "mongodb://127.0.0.1:27017";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/customers", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("customers")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/products/categories", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("categories")
      .find({})
      .toArray()
      .then((documents) => res.send(documents), res.end());
  });
});
app.get("/products", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("products")
      .find({})
      .toArray()
      .then((result) => {
        res.send(result);
      })
      .finally(() => {
        clientObject.close();
      });
  });
});
app.get("/products/category/:category", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("products")
      .find({ category: req.params.category })
      .toArray()
      .then((result) => {
        res.send(result);
      })
      .finally(() => {
        clientObject.close();
      });
  });
});
app.get("/products/:productId", (req, res) => {
  const id = parseInt(req.params.productId);
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("products")
      .find({ id: id })
      .toArray()
      .then((result) => {
        res.send(result);
        console.log(result);
      })
      .finally(() => {
        clientObject.close();
      });
  });
});
app.post("/login", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("customers")
      .find({
        $and: [
          {
            email: req.body.email,
            password: req.body.password,
          },
        ],
      })
      .toArray()
      .then((result) => {
        res.send(result);
      });
  });
});
app.post("/register", (req, res) => {
  const customer = {
    // Username: req.body.userName,
    first: req.body.first,
    last: req.body.last,
    // age: parseInt(req.body.age),
    // mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
  };
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("customers")
      .insertOne(customer)
      .then((document) => res.send(document));
  });
});
app.post("/contact", (req, res) => {
  const contactData = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.msg,
  };
  mongoClient.connect(connectionString).then((clientObject) => {
    const database = clientObject.db("Shopper");
    database
      .collection("contact")
      .insertOne(contactData)
      .then((document) => res.send(document));
  });
});
app.post("/update", async (req, res) => {
  try {
    const clientObject = await mongoClient.connect(connectionString);
    const database = clientObject.db("Shopper");

    const customerId = req.body.customerId;

    const result = await database.collection("customers").updateOne(
      { _id: new ObjectId(customerId) },
      {
        $set: {
          first: req.body.first,
          last: req.body.last,
          age: parseInt(req.body.age),
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password,
          address: req.body.address,
        },
      }
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(2050);
console.log("Server started: http://127.0.0.1:2050");
