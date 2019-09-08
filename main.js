/**
 * General plan -
 * Run node daily (heroku scheduler http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial)
 * GET MLB data
 *  currently hard coded to red sox and yankees, make dynamic in the future
 * Based on result, send slackbot message
 */


const webhookToSlack = require('./webhookToSlack');

//check the day against Boston games

//create path string if Boston had a game 

const slackInfo = require('./config');

const slackbot = webhookToSlack();

// red sox win, lose, tie
// yankees win, lose, tie

// slackbot.sendMessage(slackInfo.SLACK_CHANNEL_URL, 'testing with user but no altmessage', slackInfo.MEMBER_ID);