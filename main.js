/**
 * General plan -
 * Run node daily (heroku scheduler http://www.modeo.co/blog/2015/1/8/heroku-scheduler-with-nodejs-tutorial)
 * GET MLB data
 *  currently hard coded to red sox and yankees, make dynamic in the future
 * Based on result, send slackbot message
 */


const webhookToSlack = require('./webhookToSlack');
//grab yesterday's date string after getting today as a new Date object
const yesterdaysDate = new Date();
yesterdaysDate.setDate(yesterdaysDate.getDate() - 1)
const yesterdayArray = yesterdaysDate.toDateString().split(' ');
//convert to mm/dd/yy format
const yesterdayFormatted = yesterdayArray.splice(1,3).join("/");
//check the day against Boston games

//create path string if Boston had a game 

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

// red sox win, lose, tie
// yankees win, lose, tie

// slackbot.sendMessage(slackInfo.SLACK_CHANNEL_URL, 'testing with user but no altmessage', slackInfo.MEMBER_ID);