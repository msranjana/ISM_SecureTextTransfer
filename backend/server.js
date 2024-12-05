const express = require('express');
const cors = require('cors'); // to enable CORS
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Ensure correct path to your message model
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests

// POST route to save a message
app.post('/api/messages', async (req, res) => {
    try {
      const { message } = req.body; // Get message from request body
  
      // Create a new message instance
      const newMessage = new Message({ message });
  
      // Save the message to the database
      await newMessage.save();
  
      // Send a success response
      res.status(200).json({ message: "Message received successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  
  // GET route to retrieve all messages
  app.get('/api/messages', async (req, res) => {
    try {
      const messages = await Message.find(); // Fetch all messages from DB
      res.status(200).json(messages); // Send messages in response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  

// MongoDB connection (adjust according to your setup)
mongoose.connect('mongodb://127.0.0.1:27017/secureTextDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
/*app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/