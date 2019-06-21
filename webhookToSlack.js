/**
 * Webhook module for Slack bot
 * Author: Daniel Posse
 */

 /**
  * [X] get url from ~jorge's~ new webhook
  * [ ] create post request
  * [ ] send post request to url
  * [ ] customize bot appearance
  * [ ] set bot name
  */

//!DON'T CHANGE CHANNEL BOT IS POSTED TO UNTIL TESTING IS COMPLETE!

const request = require('request-promise');

const SLACK_URL = 'https://hooks.slack.com/services/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';


//async iife? like the cool kids do
(async function() {
  try {

    //get data from main.js - maybe refactor this to be a called function in main
    //for now hardcode test data

    //create post body
    const slackPostBody = {
      method: 'POST',
      text: 'i can ride my bike with no handlebars',
      attachments: [
        {
          color: '#40e0d0',
          text: 'no handlebars'
        },
        {
          color: '#40e0d0',
          text: 'no handlebars?'
        }
      ]
    };

    //send to webhook
    const response = await request({
      url: SLACK_URL,
      method: 'POST',
      body: slackPostBody,
      json: true
    });

    console.log(response);

  }
  catch(error) {
    console.error('hey we got error: ', error);
  }

  debugger;
})();