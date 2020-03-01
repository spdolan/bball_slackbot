//turn today's system date into formatted path mlbGames expects
const setYesterdayStringPath = () => {
  //today as a new Date object
  const yesterdaysDate = new Date();
  //update to yesterday's date string
  yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);
  //split for easier Day and Year extraction
  const yesterdayArray = yesterdaysDate.toDateString().split(' ');
  //we'll concatenate a 0 if the month is after October
  const monthNumber = yesterdaysDate.getMonth() < 10 ? `0${(yesterdaysDate.getMonth()+1)}` : (yesterdaysDate.getMonth()+1);
  //combine it into the MLBGames library format
  const pathString = `year_${yesterdayArray[yesterdayArray.length - 1]}/month_${monthNumber}/day_${yesterdayArray[yesterdayArray.length - 2]}/`;
  
  return pathString
}

module.exports = setYesterdayStringPath;