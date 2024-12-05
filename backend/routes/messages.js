const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Message = require("../models/Message");

// Secret Key for Encryption
const SECRET_KEY = "your_secret_key";

// Encrypt a message
function encryptMessage(message) {
  const cipher = crypto.createCipher("aes-256-cbc", SECRET_KEY);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decrypt a message
function decryptMessage(encryptedMessage) {
  const decipher = crypto.createDecipher("aes-256-cbc", SECRET_KEY);
  let decrypted = decipher.update(encryptedMessage, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// POST: Save a message
router.post("/", async (req, res) => {
  const { message } = req.body;
  const encryptedMessage = encryptMessage(message);
  const newMessage = new Message({ encryptedMessage });
  await newMessage.save();
  res.status(201).send("Message encrypted and stored!");
});

// GET: Retrieve all messages
router.get("/", async (req, res) => {
  const messages = await Message.find();
  const decryptedMessages = messages.map((msg) =>
    decryptMessage(msg.encryptedMessage)
  );
  res.json(decryptedMessages);
});

module.exports = router;
