/**
 * Note - gd2.mlb.com states MLB Stats api should be used instead
 * http://statsapi.mlb.com/docs/
 * Might stop working in the future
 * 
 * Team codes, i.e. id: 'yyyy/mm/dd/[teamcode]mlb-[teamcode]mlb-1'
 * ana - LA Angels
 * ari - Arizona D-backs
 * atl - Atlanta Braves
 * bal - Baltimore Orioles
 * bos - Boston Red Sox
 * cha - Chicago White Sox
 * chn - Chicago Cubs
 * cin - Cincinnati Reds
 * cle - Cleveland Indians
 * col - Colorado Rockies
 * det - Detroit Tigers
 * hou - Houston Astros
 * kca - Kansas City Royals
 * lan - LA Dodgers
 * mia - Miami Marlins
 * mil - Milwaukee Brewers
 * min - Minnesota Twins
 * nya - New York Yankees
 * nyn - New York Mets
 * oak - Oakland Athletics
 * phi - Philadelphia Phillies
 * pit - Pittsburgh Pirates
 * sdn - San Diego Padres
 * sea - Seattle Mariners
 * sfn - San Francisco Giants
 * sln - St. Louis Cardinals
 * tba - Tampa Bay Rays
 * tex - Texas Rangers
 * tor - Toronto Blue Jays
 * was - Washington Nationals
 */

const Mlbgames = require('mlbgames');
const mapMlbTeams = require('./mlbTeams');
//turn today's system date into formatted path mlbGames expects
const setYesterdayStringPath = () => {
  //today as a new Date object
  let yesterdaysDate = new Date();
  //update to yesterday's date string
  yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);
  //split for easier Day and Year extraction
  let yesterdayArray = yesterdaysDate.toDateString().split(' ');
  //we'll concatenate a 0 if the month is after October
  let monthNumber = yesterdaysDate.getMonth() < 10 ? `0${yesterdaysDate.getMonth()}` : yesterdaysDate.getMonth();
  //combine it into the MLBGames library format
  let pathString = `year_${yesterdayArray[yesterdayArray.length - 1]}/month_${monthNumber}/day_${yesterdayArray[yesterdayArray.length - 2]}/`;
  return { path: pathString }
}

//checks and returns if teamString (i.e. 'chc' for Chicago Cubs) had a game
const findGameForTeam = (teamString, gamesArray) => {
  let myGames = gamesArray.filter(game => game.id.includes(teamString));
  // console.log(myGames);
  return myGames.length === 0 ? null : myGames[0];
}

//checks and returns winner's string initials from a game
const gameWinnerFileCode = (gameObject) => {
  let {away_file_code, home_file_code, linescore} = gameObject;
  if (linescore.diff == 0){return 'tie'};
  return linescore.away > linescore.home ? away_file_code : home_file_code;
}

const gameResultMessage = (ourTeam, winningTeam) => {
  //seriously, why would sportsball have these?
  if(winningTeam === 'tie'){return 'Ugh, ties. So un-American.'};
  //if we don't want to decide, and have a catch-all against these folks in New England
  if(ourTeam === 'bos'){
    return ourTeam === winningTeam ? `Damn, the universe hath no justice.` :
      `Huzzah, the good guys ${mapMlbTeams[ourTeam]} won!`;
  } else {
    return ourTeam === winningTeam ? `Huzzah, the good guys ${mapMlbTeams[ourTeam]} won!` :
      `Damn, the universe hath no justice - ${mapMlbTeams[ourTeam]} lost.`;
  }
}

/**
 * returns null if no game played yesterday, otherwise string
 * @param {string} myTeam 
 */
const checkMlbGames = (myTeam = 'nya') => {
  return new Promise((resolve, reject) => {
    //options will generate based on update the current system date
    const options = setYesterdayStringPath();
    const mlbgames = new Mlbgames(options);
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