var express = require('express');
const db = require("../mongo/index");
var router = express.Router();
var User = require('../public/models/User');
const { ObjectId } = require("mongodb");
const { validateUserUpdate } = require("../middleware/update.js");

const collection = db.collection("users");

/* GET users listing. */

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  await collection
    .insertOne(req.body)
    .then((doc) => res.status(201).send(doc))
    .catch((error) => res.status(500).send({ message: error }));
  // try {
  //   const { dni, names, adress, date, rol, tel, mail, password, user } = req.body;
  //   const newUser = new User({ dni, names, adress, date, rol, tel, mail, password, user });
  //   await newUser.save();
  //   res.status(201).json({ message: 'Usuario registrado con éxito' });
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
});

// get items
router.get("/", async (req, res, next) => {
  await collection
    .find()
    .toArray((err, result) => {
      if (err) throw err;
    })
    .then((doc) => res.status(200).send(doc))
    .catch((error) => res.status(500).send({ message: error }));
});

// get item
router.get("/:id", async (req, res, next) => {
  await collection
    .findOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
      if (err) throw err;
    })
    .then((doc) => res.status(200).send(doc))
    .catch((error) => res.status(500).send({ message: error }));
});

// update item
router.patch("/:id", validateUserUpdate, async (req, res, next) => {
  await collection
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    .then((doc) => res.status(200).send(doc))
    .catch((error) => res.status(500).send({ message: error }));
});

// delete item
router.delete("/:id", async (req, res, next) => {
  await collection
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((doc) => res.status(200).send(doc))
    .catch((error) => res.status(500).send({ message: error }));
});

module.exports = router;
