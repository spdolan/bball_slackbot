/**
 * General plan -
 * Run node daily
 * GET MLB data
 *  currently hard coded to red sox and yankees, make dynamic in the future
 * Based on result, send slackbot message
 */
const AWS = require('aws-sdk');
const checkMlbGames = require('./services/mlb/mlbGames');
const { MEMBER_ID, MY_TEAM } = require('./config');
const request = require('request-promise');

//for aws secrets
const region = "us-east-1";
const secretName = "bballSlackbot-slack-url";

const client = new AWS.SecretsManager({ region: region });

const getAwsSecret = (secretName) => {
  return client.getSecretValue({ SecretId: secretName }).promise();
}

const getAwsSecretAsync = async (secretName) => {
  let error;
  const response = await getAwsSecret(secretName)
    .catch(err => error = err);
  return [error, response];
}

module.exports.runBaseballSlackbot = async () => {
  console.log(`in runBaseballSlackbot`);
  const [error, secretObj] = await getAwsSecretAsync(secretName);

  if (error) {
    console.error(error);
    return;
  }

  console.log(secretObj);

  // get slack url from within secret
  const slackUrl = JSON.parse(secretObj.SecretString).SLACK_CHANNEL_URL;

  //checkMLbGames defaults to using NY Yankees code
  const gameResultMessage = MY_TEAM === '' ? 
    await checkMlbGames() :
    await checkMlbGames(MY_TEAM);
  console.log(gameResultMessage);
  // if null, don't send anything
  if (gameResultMessage !== null) {
    const messageWithTarget = `${MEMBER_ID} ${gameResultMessage}`;

    //send message to slack
    const response = await request({
      url: slackUrl,
      method: 'POST',
      body: {
        text: messageWithTarget
      },
      json: true
    });
    console.log(response);
    return response;
  }

  return 'gameResultMessage is null';
};