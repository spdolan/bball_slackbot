const mapMlbTeams = require('../../services/mlb/mlbTeams')

const gameResultMessage = (ourTeam, winningTeam) => {
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

module.exports = gameResultMessage;