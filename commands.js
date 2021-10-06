const config = require('config')
const client = require('./client.js')
const activeChannel = config.get('channel')
let state = null;

let clear = () => {
  if (!checkModeratorPermission()) return

  client.clear(config.get('channel'))
}

let timeOutUser = (args) => {
  if (!checkModeratorPermission()) return

  let targetUser = args[0]
  let timeOutDuration = args[1]

  client.timeout(activeChannel, targetUser, timeOutDuration)
  client.action(activeChannel, targetUser + ' now u have timeout mode! Duration: ' + timeOutDuration)
}

const callCommand = (command, messageInfo) => {
  state = messageInfo;

  switch (command.command) {
    case 'clear':
      clear();
      break
    case 'hvorlenge':
      client.say(activeChannel, `Streamen startet 03.10.2021 17:30 og har vært gående i\n${time()}`);
      break;
    case 'tid':
      client.say(activeChannel, `Streamen har vært gående i: ${parseInt(dtime() / 3600)} timer (${parseInt(dtime() / 60)} minutter eller ${dtime()} sekunder)`);
      break;
    default:
      break
  }
}

const startDate = new Date("10/03/2021 17:28:00");

const dtime = () => {
  return parseInt(Math.abs(startDate - new Date()) / 1000);
}

const time = () => {

  let t = "";
  // get total seconds between the times
  let delta = Math.abs(startDate - new Date()) / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  t += days > 1 ? days + " dager, " : days > 0 ? "1 dag, " : "";

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  t += hours > 1 ? hours + " timer, " : hours > 0 ? "1 time, " : "";

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  t += minutes > 1 ? minutes + " minutter og " : "1 minutt og ";

  // what's left is seconds
  let seconds = parseInt(delta % 60);
  t += seconds > 1 ? seconds + " sekunder." : "1 sekund";
  return t;
}

const checkModeratorPermission = () => state.user.mod || state.user.username === activeChannel

module.exports = {
  call: (command, messageInfo) => {
    callCommand(command, messageInfo)
  }
}
