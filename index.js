#! /usr/bin/env node

var Git = require('nodegit');
var del = require('del');
var chalk = require('chalk');
var cp = require('child_process');
var init = require('./lib/initialize');

var userArgs = process.argv.slice(2);
var repo = userArgs[0];
var dir = userArgs[1];

var repoUrl = `https://github.com/${repo}`;

Git.Clone(repoUrl, dir)
  .then((repo) => {
    console.log(chalk.blue(`${repo} cloned into ${dir}`));
  })
  .then(() => {
    del(`${dir}/.git/`);
  })
  .then(()=> {
    init(dir);
    console.log('Git is inited');
  })
  .then(() => {
    console.log(chalk.yellow('Installing depenencies from NPM, this could take a while.'));
    cp.exec('npm install', { cwd: dir }, function(error, stdout, stderr) {
      var logger = (error ? chalk.red(error) : chalk.yellow(stdout));
      console.log(logger);
    })
  })
  .catch((err) => {
    console.log(err);
  });
