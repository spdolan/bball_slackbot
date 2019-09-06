const Mlbgames = require('mlbgames');

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
      `Huzzah, the good guys ${winningTeam.toUpperCase()} won!`;
  } else {
    return ourTeam === winningTeam ? `Huzzah, the good guys ${ourTeam.toUpperCase()} won!` :
      `Damn, the universe hath no justice - ${ourTeam.toUpperCase()} lost.`;
  }
  
}

//options will generate based on update the current system date
const options = setYesterdayStringPath();
const mlbgames = new Mlbgames(options);
mlbgames.get((err, games) => {
  
  //let's set and check for our team
  let myTeam = 'sf';
  let yesterdaysGame = findGameForTeam(myTeam, games);
  if(yesterdaysGame){
    //use our helper function to see if it's good news
    let resultMessage = gameResultMessage(myTeam, gameWinnerFileCode(yesterdaysGame));
    //and return a message based on our team
    console.log(resultMessage);
  } else {
    console.log(`No games were played by ${myTeam} yesterday!`)
  }

});