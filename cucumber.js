var common = [
  '--compiler js:babel-register',
  '--strict',
  '--format progress',
  '--format rerun:@rerun.txt'
].join(' ')

module.exports = {
  'default': common,
  'es5': common + ' --tags "not @es6"'
};
