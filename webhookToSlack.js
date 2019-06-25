/**
 * Webhook module for Slack bot
 * Author: Daniel Posse
 */

 /**
  * [ ] convert to module pattern and export
  * [X] get url from ~jorge's~ new webhook
  * [X] create post request
  *   [X] need target user name implementation
  * [X] send post request to url
  * [ ] customize bot appearance
  * [ ] set bot name
  */

 //!DON'T CHANGE CHANNEL BOT IS POSTED TO UNTIL TESTING IS COMPLETE!
 const request = require('request-promise');

 const webhookToSlack = () => {
  

  const SLACK_URL = 'https://hooks.slack.com/services/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';

  const sendMessage = async (target, message, altMessage) => {
    try {

      //get data from main.js - maybe refactor this to be a called function in main
      //for now hardcode test data

      //create post body
      const slackPostBody = {
        method: 'POST',
        text: `${target} ${message}`,
        attachments: [
          {
            mkdown: true,
            color: '#40e0d0',
            text: altMessage
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

  };

  return {
    sendMessage
  }

};

//export to use in main.js
//using this syntax, es6 syntax we learned requires installing babel
module.exports = webhookToSlack;