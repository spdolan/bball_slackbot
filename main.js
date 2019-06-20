const Mlbgames = require('mlbgames');
const options = {
  path: 'year_2019/month_06/day_19/'
};

const mlbgames = new Mlbgames(options);
mlbgames.get((err, games) => {
  console.log(games);
  //... do something
});