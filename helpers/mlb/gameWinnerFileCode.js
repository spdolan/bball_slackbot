//checks and returns winner's string initials from a game
const gameWinnerFileCode = (gameObject) => {
  const { away_file_code, home_file_code, linescore } = gameObject;
  if (linescore.diff == 0) { return 'tie' };
  return linescore.away > linescore.home ? away_file_code : home_file_code;
}

module.exports = gameWinnerFileCode;