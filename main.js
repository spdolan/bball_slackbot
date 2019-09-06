

const webhookToSlack = require('./webhookToSlack');

//check the day against Boston games

  //create path string if Boston had a game 

const slackInfo = require('./config');

const slackbot = webhookToSlack();


slackbot.sendMessage(slackInfo.SLACK_CHANNEL_URL, 'testing with user but no altmessage', slackInfo.MEMBER_ID);