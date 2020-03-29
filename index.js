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
const request = require('request-promise');

module.exports.runBaseballSlackbot = async () => {
  console.log(`start of lambda`);

  //checkMLbGames defaults to using NY Yankees code
  const gameResultMessage = MY_TEAM === '' ? 
    await checkMlbGames() :
    await checkMlbGames(MY_TEAM);
  
  // if null, don't send anything
  if (gameResultMessage !== null) {
    const messageWithTarget = `${MEMBER_ID} ${gameResultMessage}`;

    const response = await request({
      url: 'https://hooks.slack.com/services/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',
      method: 'POST',
      body: {
        method: 'POST',
        text: messageWithTarget,
        attachments: [
          {
            mkdown: true,
            color: '#40e0d0',
            text: ''
          }
        ]
      },
      json: true
    });

    return response;
  }

  return 'gameResultMessage is null';
};