const Logger = require('./log');
const logger = new Logger();

logger.on("some_event", (args) => {
  const { text, id } = args;
  console.log(text);
});

logger.log('user logged')