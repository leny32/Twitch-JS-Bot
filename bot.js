const client = require('./client.js')
const commandResolver = require('./commandResolver.js')
client.connect()

// Commands
client.on('chat', (channel, user, message, self) => {
  if (self) return // bot message

  // if message has symbol whats mean command - !
  if ((message.indexOf('!')) !== -1) {
    commandResolver.resolve(channel, user, message)
  }
});

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  for (let i = 0; i < numbOfSubs; i++) {
    client.say(channel, "Clap Clap");
  }
});

client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  client.say(channel, "Clap Clap");
});

client.on("subscribers", (channel, enabled) => {
  client.say(channel, "Clap Clap");
});
