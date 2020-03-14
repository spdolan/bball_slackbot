const CronJob = require('cron').CronJob;
const returnPriorDayStringPath = require('./helpers/returnPriorDayStringPath');
const path = returnPriorDayStringPath(2);
const job = new CronJob('* * * * * *', function () {
  console.log('You will see the message every second: ', path);
}, null, true, 'America/Los_Angeles');

job.start();

