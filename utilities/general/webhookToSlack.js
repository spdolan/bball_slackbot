/**
 * Webhook module for Slack bot
 * Author: Daniel Posse
 */

 /**
  * [X] convert to module pattern and export
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

  const sendMessage = async (slackURL, message, target, altMessage) => {
    try {
      //create post body
      const messageWithTarget = (target) ? `${target} ${message}` : message;

      const slackPostBody = {
        method: 'POST',
        text: messageWithTarget,
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
        url: slackURL,
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