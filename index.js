/**
 * General plan -
 * Run node daily
 * GET MLB data
 *  currently hard coded to red sox and yankees, make dynamic in the future
 * Based on result, send slackbot message
 */
const webhookToSlack = require('./services/slack/webhookToSlack');
const checkMlbGames = require('./services/mlb/mlbGames');
const {SLACK_CHANNEL_URL, MEMBER_ID, MY_TEAM} = require('./config');
const slackbot = webhookToSlack();

export const runBaseballSlackbot = async () => {
  //checkMLbGames defaults to using NY Yankees code
  const gameResultMessage = MY_TEAM === '' ? 
    await checkMlbGames() :
    await checkMlbGames(MY_TEAM);
  
  //if null, don't send anything
  if (gameResultMessage !== null) {
    slackbot.sendMessage(SLACK_CHANNEL_URL, `TEST: ${gameResultMessage}`, MEMBER_ID);
  }
};

// runBaseballSlackbot();