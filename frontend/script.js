document.getElementById("message-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Get the input value
  const userMessage = document.getElementById('messageInput').value;
  
  // Ensure message is not empty
  if (!userMessage) return alert("Please enter a message.");

  try {
    // Send message to the backend
    const response = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (response.ok) {
      alert("Message sent securely!");
      document.getElementById("messageInput").value = ""; // Clear input field
      loadMessages(); // Load messages after successful submission
    } else {
      alert("Failed to send message.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred.");
  }
});

// Function to load messages from the backend and display them with a timestamp
async function loadMessages() {
  try {
    const response = await fetch("http://localhost:5000/api/messages");
    if (response.ok) {
      const messages = await response.json();
      const messageList = document.querySelector("#message-list ul");
      messageList.innerHTML = messages
        .map((msg) => {
          const timestamp = new Date(msg.timestamp).toLocaleString(); // Assuming the backend returns a timestamp
          return `<li><span>${msg.message}</span><span class="timestamp">${timestamp}</span></li>`;
        })
        .join("");
    }
  } catch (error) {
    console.error(error);
  }
}

// Initial load of messages when the page is opened
loadMessages();
