const EventEmitter = require('events');

class CustomEventEmitter extends EventEmitter {}

const emitter = new CustomEventEmitter();

emitter.on('userLoggedIn', (user) => {
  console.log(`${new Date().toISOString()}: ${user} logged in`);
});

emitter.on('userLoggedOut', (user) => {
  console.log(`${new Date().toISOString()}: ${user} logged out`);
});

function simulateUserLogin() {
  let userId = 1;
  setInterval(() => {
    const user = `USER_${userId++}`;
    emitter.emit('userLoggedIn', user);

    
    // setTimeout(() => emitter.emit('userLoggedOut', user), 1000);
  }, Math.random() * 1900 + 100);
}

simulateUserLogin();