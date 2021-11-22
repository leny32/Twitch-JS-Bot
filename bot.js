const client = require('./client.js')
const commandResolver = require('./commandResolver.js')
client.connect()

// Commands
client.on('chat', async (channel, user, message, self) => {
  if (self) return // bot message

  if (user['custom-reward-id'] === '076bdd03-d155-43af-bb98-f4b4536562c7') {
    if (message.includes("@")) message = message.replace("@", "");
    client.timeout(channel, message, 24 * 60 * 60);
  } else if (user['custom-reward-id'] === 'f348306d-306b-4906-8edc-f544778467bc') {
    if (message.includes("@")) message = message.replace("@", "");
    client.timeout(channel, message, 1);
  }

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

client.on("subscription", (channel, username, method, message, userstate) => {
  client.say(channel, "Clap Clap");
});