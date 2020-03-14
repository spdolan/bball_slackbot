/**
 * Note - gd2.mlb.com states MLB Stats api should be used instead
 * http://statsapi.mlb.com/docs/
 * Might stop working in the future
 * 
 * Team codes, i.e. id: 'yyyy/mm/dd/[teamcode]mlb-[teamcode]mlb-1'
 * actual team codes can be found in ./mlbTeams.js
 */

const Mlbgames = require('mlbgames');
const mapMlbTeams = require('./mlbTeams');
const returnPriorDayStringPath = require('../../helpers/returnPriorDayStringPath');
const findGameForTeam = require('../../helpers/mlb/findGameForTeam');
const gameWinnerFileCode = require('../../helpers/mlb/gameWinnerFileCode');
const gameResultMessage = require('../../helpers/mlb/gameResultMessage');

/**
 * returns null if no game played yesterday, otherwise string
 * @param {string} myTeam 
 */

const checkMlbGames = (myTeam = 'nya') => {
  return new Promise((resolve, reject) => {
    //path will generate based on update the current system date
    const path = returnPriorDayStringPath(1);
    const mlbgames = new Mlbgames({path});
    mlbgames.get((err, games) => {
      //check for issues
      if (err) { return console.log(err) };
      let yesterdaysGame = findGameForTeam(myTeam, games);
      let resultMessage = '';
      if (yesterdaysGame) {
        //use our helper function to see if it's good news
        let winnerCode = gameWinnerFileCode(yesterdaysGame);
        resultMessage = gameResultMessage(myTeam, winnerCode);
      } else {
        resultMessage = `No games were played by ${mapMlbTeams[myTeam]} yesterday!`;
      }
      //return message based on our team
      console.log(resultMessage);
      resolve(resultMessage);
    });
  });
};

module.exports = checkMlbGames;