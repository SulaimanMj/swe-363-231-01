const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const responses = {
  "how are you?": "I'm a bot, I'm always good!",
  "hello": "Hello there!",
  "what is your name?": "I am Chatbot, your friendly bot!",
  "quit": null
};

function askQuestion() {
  rl.question('You: ', (input) => {
    const sanitizedInput = input.trim().toLowerCase();
    if (sanitizedInput === 'exit' || sanitizedInput === 'quit') {
      console.log('Chatbot: Goodbye!');
      rl.close();
    } else {
      const response = responses[sanitizedInput] || "Sorry, I don't understand that.";
      console.log('Chatbot:', response);
      askQuestion(); 
    }
  });
}

console.log('Chatbot: Hello! Ask me something.');
askQuestion();