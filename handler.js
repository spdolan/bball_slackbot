'use strict';

const runBaseballSlackbot = require('./index.js').runBaseballSlackbot
// runBaseballSlackbot();
module.exports.runBot = async (event, context) => {
  console.time('runBaseballSlackbot');
  await runBaseballSlackbot();
  console.timeEnd('runBaseballSlackbot');

  //we aren't returning to anything, this was a recommended return in aws docs iirc
  return context.logStreamName
}

runBaseballSlackbot()