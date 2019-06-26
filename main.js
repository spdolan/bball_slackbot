

const webhookToSlack = require('./webhookToSlack');

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

const SLACK_CHANNEL_URL = 'https://hooks.slack.com/services/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';
const memberID = '<@UJJ36DESJ>';

slackbot.sendMessage(SLACK_CHANNEL_URL, 'testing with user but no altmessage', memberID);