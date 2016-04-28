var Git = require('nodegit');

module.exports = function (pathToRepo) {
  var isBare = 0;
  return Git.Repository.init(pathToRepo, isBare)
    .then((repo) => {
      console.log(repo);
    });
};
