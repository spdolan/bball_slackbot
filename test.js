const Mlbgames = require('mlbgames');
const mapMlbTeams = require('./services/mlb/mlbTeams');
const returnPriorDayStringPath = require('./helpers/returnPriorDayStringPath');
// const { findGameForTeam, gameWinnerFileCode, gameResultMessage } = require('./gameHelpers');
const path = returnPriorDayStringPath(2);
console.log(path)
const mlbgames = new Mlbgames({ path });
mlbgames.get((err, games) => {
  //check for issues
  if (err) { return console.log(err) };

  console.log(games);
})