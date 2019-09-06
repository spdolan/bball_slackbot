

const webhookToSlack = require('./webhookToSlack');
const slackInfo = require('./config');

// const Mlbgames = require('mlbgames');
// const options = {
//   path: 'year_2019/month_06/day_19/'
// };

// const mlbgames = new Mlbgames(options);
// mlbgames.get((err, games) => {
//   console.log(games);
//   //... do something
// });

const slackbot = webhookToSlack();


slackbot.sendMessage(slackInfo.SLACK_CHANNEL_URL, 'testing with user but no altmessage', slackInfo.MEMBER_ID);