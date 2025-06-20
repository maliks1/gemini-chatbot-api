// public/script.js

// Get references to your HTML elements using the correct IDs
const chatForm = document.getElementById('chat-form'); // Changed from 'chatForm'
const userInput = document.getElementById('user-input'); // Changed from 'userInput'
const chatBox = document.getElementById('chat-box'); // Changed from 'chatResponse'

// Add an event listener for form submission
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const message = userInput.value.trim(); // Get the user's message and trim whitespace

  if (!message) {
    alert('Please enter a message.');
    return;
  }

  // Clear the input field
  userInput.value = '';
  // Display user message in the chat box area
  chatBox.innerHTML += `<div class="message user"><b>You:</b> ${message}</div>`;

  try {
    // Send the message to your backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }), // Send the message as JSON
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.reply || 'Something went wrong on the server.');
    }

    const data = await response.json(); // Parse the JSON response from the backend
    const reply = data.reply; // Get the AI's reply

    // Display the AI's reply
    chatBox.innerHTML += `<div class="message bot"><b>Gemini:</b> ${reply}</div>`;

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    console.error('Error sending message to backend:', error);
    chatBox.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`; // Changed from chatResponse
  }
});