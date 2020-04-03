/**
 * General plan -
 * Run node daily
 * GET MLB data
 *  currently hard coded to red sox and yankees, make dynamic in the future
 * Based on result, send slackbot message
 */
// Load the AWS SDK
const AWS = require('aws-sdk');
const checkMlbGames = require('./services/mlb/mlbGames');
const { MEMBER_ID, MY_TEAM } = require('./config');
const request = require('request-promise');

module.exports.runBaseballSlackbot = async () => {
  console.log(`in runBaseballSlackbot`);
  // Following code is from aws secrets docs
  const region = "us-east-1";
  const secretName = "bballSlackbot-slack-url";
  let secret;
  //not used, but here as example
  let decodedBinarySecret;

  // Create a Secrets Manager client
  console.log(`before aws.secretsmanager`);
  const client = new AWS.SecretsManager({ region: region });
  console.log(`client:`, client);

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.
  client.getSecretValue({SecretId: secretName}, async function(err, data) {
    console.log(err, data);
    if (err) {
      if (err.code === 'DecryptionFailureException')
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'InternalServiceErrorException')
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'InvalidParameterException')
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'InvalidRequestException')
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'ResourceNotFoundException')
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
    }
    else {
      // Decrypts secret using the associated KMS CMK.
      // Depending on whether the secret is a string or binary, one of these fields will be populated.
      if ('SecretString' in data) {
        secret = JSON.parse(data.SecretString);
      } else {
        let buff = new Buffer(data.SecretBinary, 'base64');
        decodedBinarySecret = buff.toString('ascii');
      }
    }
  });

  console.log(secret);
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
      url: secret.SLACK_CHANNEL_URL,
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