
const { SLACK_CHANNEL_URL, MEMBER_ID, MY_TEAM } = require('./config');
const Mlbgames = require('mlbgames');
const mapMlbTeams = require('./utilities/mlb/mlbTeams');
const setYesterdayStringPath = require('./utilities/general/yesterdayString');
// const { findGameForTeam, gameWinnerFileCode, gameResultMessage } = require('./gameHelpers');

const path = setYesterdayStringPath();
console.log(path)
const mlbgames = new Mlbgames({ path });
mlbgames.get((err, games) => {
  //check for issues
  if (err) { return console.log(err) };

  console.log(games);
})

