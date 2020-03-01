//checks and returns if teamString (i.e. 'chc' for Chicago Cubs) had a game
export const findGameForTeam = (teamString, gamesArray) => {
  const myGames = gamesArray.filter(game => game.id.includes(teamString));
  // console.log(myGames);
  return myGames.length === 0 ? null : myGames[0];
}

//checks and returns winner's string initials from a game
export const gameWinnerFileCode = (gameObject) => {
  const { away_file_code, home_file_code, linescore } = gameObject;
  if (linescore.diff == 0) { return 'tie' };
  return linescore.away > linescore.home ? away_file_code : home_file_code;
}

export const gameResultMessage = (ourTeam, winningTeam) => {
  //seriously, why would sportsball have these?
  if (winningTeam === 'tie') { return 'Ugh, ties. So un-American.' };
  //if we don't want to decide, and have a catch-all against these folks in New England
  if (ourTeam === 'bos') {
    return ourTeam === winningTeam ? `Damn, the universe hath no justice.` :
      `Huzzah, the good guys ${mapMlbTeams[ourTeam]} won!`;
  } else {
    return ourTeam === winningTeam ? `Huzzah, the good guys ${mapMlbTeams[ourTeam]} won!` :
      `Damn, the universe hath no justice - ${mapMlbTeams[ourTeam]} lost.`;
  }
}