//checks and returns if teamString (i.e. 'chc' for Chicago Cubs) had a game
const findGameForTeam = (teamString, gamesArray) => {
  const myGames = gamesArray.filter(game => game.id.includes(teamString));
  // console.log(myGames);
  return myGames.length === 0 ? null : myGames[0];
}

module.exports = findGameForTeam;