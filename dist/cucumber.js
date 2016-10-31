'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _commander = require('commander');
var _package = require('../../package.json');
var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

ArgvParser = function () {function ArgvParser() {(0, _classCallCheck3.default)(this, ArgvParser);}(0, _createClass3.default)(ArgvParser, null, [{ key: 'collect', value: function collect(
    val, memo) {
      memo.push(val);
      return memo;} }, { key: 'mergeJson', value: function mergeJson(


    option) {
      return function (str, memo) {
        var val = void 0;
        try {
          val = JSON.parse(str);} 
        catch (error) {
          throw new Error(option + ' passed invalid JSON: ' + error.message + ': ' + str);}

        if (!_lodash2.default.isPlainObject(val)) {
          throw new Error(option + ' must be passed JSON of an object: ' + str);}

        return _lodash2.default.merge(memo, val);};} }, { key: 'parse', value: function parse(



    argv) {
      var program = new _commander.Command(_path2.default.basename(argv[1]));

      program.
      usage('[options] [<DIR|FILE[:LINE]>...]').
      version(_package.version, '-v, --version').
      option('-b, --backtrace', 'show full backtrace for errors').
      option('--compiler <EXTENSION:MODULE>', 'require files with the given EXTENSION after requiring MODULE (repeatable)', ArgvParser.collect, []).
      option('-d, --dry-run', 'invoke formatters without executing steps').
      option('--fail-fast', 'abort the run on first failure').
      option('-f, --format <TYPE[:PATH]>', 'specify the output format, optionally supply PATH to redirect formatter output (repeatable)', ArgvParser.collect, []).
      option('--format-options <JSON>', 'provide options for formatters (repeatable)', ArgvParser.mergeJson('--format-options'), {}).
      option('--name <REGEXP>', 'only execute the scenarios with name matching the expression (repeatable)', ArgvParser.collect, []).
      option('-p, --profile <NAME>', 'specify the profile to use (repeatable)', ArgvParser.collect, []).
      option('-r, --require <FILE|DIR>', 'require files before executing features (repeatable)', ArgvParser.collect, []).
      option('-S, --strict', 'fail if there are any undefined or pending steps').
      option('-t, --tags <EXPRESSION>', 'only execute the features or scenarios with tags matching the expression', '').
      option('--world-parameters <JSON>', 'provide parameters that will be passed to the world constructor (repeatable)', ArgvParser.mergeJson('--world-parameters'), {});

      program.on('--help', function () {
        /* eslint-disable no-console */
        console.log('  For more details please visit https://github.com/cucumber/cucumber-js#cli\n');
        /* eslint-enable no-console */});


      program.parse(argv);

      return { 
        options: program.opts(), 
        args: program.args };} }]);return ArgvParser;}();exports.default = ArgvParser;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _argv_parser = require('./argv_parser');var _argv_parser2 = _interopRequireDefault(_argv_parser);
var _fs = require('mz/fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _path_expander = require('./path_expander');var _path_expander2 = _interopRequireDefault(_path_expander);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

ConfigurationBuilder = function () {(0, _createClass3.default)(ConfigurationBuilder, null, [{ key: 'build', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(
      options) {var 
        builder;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:builder = new ConfigurationBuilder(options);_context.next = 3;return (
                  builder.build());case 3:return _context.abrupt('return', _context.sent);case 4:case 'end':return _context.stop();}}}, _callee, this);}));function build(_x) {return ref.apply(this, arguments);}return build;}() }]);


  function ConfigurationBuilder(_ref) {var argv = _ref.argv;var cwd = _ref.cwd;(0, _classCallCheck3.default)(this, ConfigurationBuilder);
    this.cwd = cwd;
    this.pathExpander = new _path_expander2.default(cwd);

    var parsedArgv = _argv_parser2.default.parse(argv);
    this.args = parsedArgv.args;
    this.options = parsedArgv.options;}(0, _createClass3.default)(ConfigurationBuilder, [{ key: 'build', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var 



        unexpandedFeaturePaths, 
        featurePaths, 
        featureDirectoryPaths, 
        unexpandedSupportCodePaths, 
        supportCodePaths;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this.getUnexpandedFeaturePaths();case 2:unexpandedFeaturePaths = _context2.sent;_context2.next = 5;return this.expandFeaturePaths(unexpandedFeaturePaths);case 5:featurePaths = _context2.sent;featureDirectoryPaths = this.getFeatureDirectoryPaths(featurePaths);unexpandedSupportCodePaths = this.options.require.length > 0 ? this.options.require : featureDirectoryPaths;_context2.next = 10;return this.expandSupportCodePaths(unexpandedSupportCodePaths);case 10:supportCodePaths = _context2.sent;return _context2.abrupt('return', 
                { 
                  featurePaths: featurePaths, 
                  formats: this.getFormats(), 
                  formatOptions: this.getFormatOptions(), 
                  profiles: this.options.profile, 
                  runtimeOptions: { 
                    dryRun: !!this.options.dryRun, 
                    failFast: !!this.options.failFast, 
                    filterStacktraces: !this.options.backtrace, 
                    strict: !!this.options.strict, 
                    worldParameters: this.options.worldParameters }, 

                  scenarioFilterOptions: { 
                    cwd: this.cwd, 
                    featurePaths: unexpandedFeaturePaths, 
                    names: this.options.name, 
                    tagExpression: this.options.tags }, 

                  supportCodePaths: supportCodePaths });case 12:case 'end':return _context2.stop();}}}, _callee2, this);}));function build() {return ref.apply(this, arguments);}return build;}() }, { key: 'expandFeaturePaths', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(



      featurePaths) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                featurePaths = featurePaths.map(function (p) {return p.replace(/(:\d+)*$/g, '');}); // Strip line numbers
                _context3.next = 3;return this.pathExpander.expandPathsWithExtensions(featurePaths, ['feature']);case 3:return _context3.abrupt('return', _context3.sent);case 4:case 'end':return _context3.stop();}}}, _callee3, this);}));function expandFeaturePaths(_x2) {return ref.apply(this, arguments);}return expandFeaturePaths;}() }, { key: 'getFeatureDirectoryPaths', value: function getFeatureDirectoryPaths(


    featurePaths) {var _this = this;
      var featureDirs = featurePaths.map(function (featurePath) {
        return _path2.default.relative(_this.cwd, _path2.default.dirname(featurePath));});

      return _lodash2.default.uniq(featureDirs);} }, { key: 'getFormatOptions', value: function getFormatOptions() 


    {
      var formatOptions = _lodash2.default.clone(this.options.formatOptions);
      formatOptions.cwd = this.cwd;
      _lodash2.default.defaults(formatOptions, { colorsEnabled: true });
      return formatOptions;} }, { key: 'getFormats', value: function getFormats() 


    {
      var mapping = { '': 'pretty' };
      this.options.format.forEach(function (format) {
        var parts = format.split(':');
        var type = parts[0];
        var outputTo = parts.slice(1).join(':');
        mapping[outputTo] = type;});

      return _lodash2.default.map(mapping, function (type, outputTo) {
        return { outputTo: outputTo, type: type };});} }, { key: 'getUnexpandedFeaturePaths', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {var _this2 = this;var 





        nestedFeaturePaths, 









        featurePaths;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:if (!(this.args.length > 0)) {_context5.next = 7;break;}_context5.next = 3;return _bluebird2.default.map(this.args, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(arg) {var filename, filePath, content;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:filename = _path2.default.basename(arg);if (!(filename[0] === '@')) {_context4.next = 9;break;}filePath = _path2.default.join(_this2.cwd, arg);_context4.next = 5;return _fs2.default.readFile(filePath, 'utf8');case 5:content = _context4.sent;return _context4.abrupt('return', _lodash2.default.compact(content.split('\n')));case 9:return _context4.abrupt('return', arg);case 10:case 'end':return _context4.stop();}}}, _callee4, _this2);}));return function (_x3) {return ref.apply(this, arguments);};}());case 3:nestedFeaturePaths = _context5.sent;featurePaths = _lodash2.default.flatten(nestedFeaturePaths);if (!(
                featurePaths.length > 0)) {_context5.next = 7;break;}return _context5.abrupt('return', 
                featurePaths);case 7:return _context5.abrupt('return', 


                ['features']);case 8:case 'end':return _context5.stop();}}}, _callee5, this);}));function getUnexpandedFeaturePaths() {return ref.apply(this, arguments);}return getUnexpandedFeaturePaths;}() }, { key: 'expandSupportCodePaths', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(


      supportCodePaths) {var 
        extensions;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:extensions = ['js'];
                this.options.compiler.forEach(function (compiler) {
                  var parts = compiler.split(':');
                  extensions.push(parts[0]);
                  require(parts[1]);});_context6.next = 4;return (

                  this.pathExpander.expandPathsWithExtensions(supportCodePaths, extensions));case 4:return _context6.abrupt('return', _context6.sent);case 5:case 'end':return _context6.stop();}}}, _callee6, this);}));function expandSupportCodePaths(_x4) {return ref.apply(this, arguments);}return expandSupportCodePaths;}() }]);return ConfigurationBuilder;}();exports.default = ConfigurationBuilder;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _feature = require('../models/feature');var _feature2 = _interopRequireDefault(_feature);
var _gherkin = require('gherkin');var _gherkin2 = _interopRequireDefault(_gherkin);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var gherkinCompiler = new _gherkin2.default.Compiler();
var gherkinParser = new _gherkin2.default.Parser();var 

Parser = function () {function Parser() {(0, _classCallCheck3.default)(this, Parser);}(0, _createClass3.default)(Parser, null, [{ key: 'parse', value: function parse(_ref) 
    {var source = _ref.source;var uri = _ref.uri;
      var gherkinDocument = void 0;
      try {
        gherkinDocument = gherkinParser.parse(source);} 
      catch (error) {
        error.message += '\npath: ' + uri;
        throw error;}


      return new _feature2.default({ 
        gherkinData: gherkinDocument.feature, 
        gherkinPickles: gherkinCompiler.compile(gherkinDocument, uri), 
        uri: uri });} }]);return Parser;}();exports.default = Parser;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.getFeatures = exports.getExpandedArgv = undefined;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var getExpandedArgv = exports.getExpandedArgv = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(







  function _callee(_ref) {var argv = _ref.argv;var cwd = _ref.cwd;var _ArgvParser$parse, 
    options, 
    fullArgv, 
    profileArgv;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_ArgvParser$parse = _argv_parser2.default.parse(argv);options = _ArgvParser$parse.options;fullArgv = argv;_context.next = 5;return new _profile_loader2.default(cwd).getArgv(options.profile);case 5:profileArgv = _context.sent;
            if (profileArgv.length > 0) {
              fullArgv = _lodash2.default.concat(argv.slice(0, 2), profileArgv, argv.slice(2));}return _context.abrupt('return', 

            fullArgv);case 8:case 'end':return _context.stop();}}}, _callee, this);}));return function getExpandedArgv(_x) {return ref.apply(this, arguments);};}();var getFeatures = exports.getFeatures = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(



  function _callee3(featurePaths) {var _this = this;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              _bluebird2.default.map(featurePaths, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(featurePath) {var 
                  source;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return _fs2.default.readFile(featurePath, 'utf8');case 2:source = _context2.sent;return _context2.abrupt('return', 
                          _feature_parser2.default.parse({ source: source, uri: featurePath }));case 4:case 'end':return _context2.stop();}}}, _callee2, _this);}));return function (_x3) {return ref.apply(this, arguments);};}()));case 2:return _context3.abrupt('return', _context3.sent);case 3:case 'end':return _context3.stop();}}}, _callee3, this);}));return function getFeatures(_x2) {return ref.apply(this, arguments);};}();exports.




getSupportCodeFunctions = getSupportCodeFunctions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _argv_parser = require('./argv_parser');var _argv_parser2 = _interopRequireDefault(_argv_parser);var _fs = require('mz/fs');var _fs2 = _interopRequireDefault(_fs);var _feature_parser = require('./feature_parser');var _feature_parser2 = _interopRequireDefault(_feature_parser);var _profile_loader = require('./profile_loader');var _profile_loader2 = _interopRequireDefault(_profile_loader);var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function getSupportCodeFunctions(supportCodePaths) {
  return _lodash2.default.chain(supportCodePaths).
  map(function (codePath) {
    var codeExport = require(codePath);
    if (typeof codeExport === 'function') {
      return codeExport;} else 
    if (codeExport && typeof codeExport.default === 'function') {
      return codeExport.default;}}).


  compact().
  value();}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _helpers = require('./helpers');
var _configuration_builder = require('./configuration_builder');var _configuration_builder2 = _interopRequireDefault(_configuration_builder);
var _builder = require('../formatter/builder');var _builder2 = _interopRequireDefault(_builder);
var _fs = require('mz/fs');var _fs2 = _interopRequireDefault(_fs);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _runtime = require('../runtime');var _runtime2 = _interopRequireDefault(_runtime);
var _scenario_filter = require('../scenario_filter');var _scenario_filter2 = _interopRequireDefault(_scenario_filter);
var _builder3 = require('../support_code_library/builder');var _builder4 = _interopRequireDefault(_builder3);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Cli = function () {
  function Cli(_ref) {var argv = _ref.argv;var cwd = _ref.cwd;var stdout = _ref.stdout;(0, _classCallCheck3.default)(this, Cli);
    this.argv = argv;
    this.cwd = cwd;
    this.stdout = stdout;}(0, _createClass3.default)(Cli, [{ key: 'getConfiguration', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 



        fullArgv;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (0, _helpers.getExpandedArgv)({ argv: this.argv, cwd: this.cwd });case 2:fullArgv = _context.sent;_context.next = 5;return (
                  _configuration_builder2.default.build({ argv: fullArgv, cwd: this.cwd }));case 5:return _context.abrupt('return', _context.sent);case 6:case 'end':return _context.stop();}}}, _callee, this);}));function getConfiguration() {return ref.apply(this, arguments);}return getConfiguration;}() }, { key: 'getFormatters', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref2) {var _this = this;var 


        formatOptions = _ref2.formatOptions;var formats = _ref2.formats;var supportCodeLibrary = _ref2.supportCodeLibrary;var 
        streamsToClose, 
        formatters, 









        cleanup;return _regenerator2.default.wrap(function _callee3$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:streamsToClose = [];_context4.next = 3;return _bluebird2.default.map(formats, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3) {var _context2;var type = _ref3.type;var outputTo = _ref3.outputTo;var stream, fd, typeOptions;return _regenerator2.default.wrap(function _callee2$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:stream = _this.stdout;if (!outputTo) {_context3.next = 7;break;}_context3.next = 4;return _fs2.default.open(outputTo, 'w');case 4:fd = _context3.sent;stream = _fs2.default.createWriteStream(null, { fd: fd });streamsToClose.push(stream);case 7:typeOptions = _lodash2.default.assign({ log: (_context2 = stream).write.bind(_context2), supportCodeLibrary: supportCodeLibrary }, formatOptions);return _context3.abrupt('return', _builder2.default.build(type, typeOptions));case 9:case 'end':return _context3.stop();}}}, _callee2, _this);}));return function (_x2) {return ref.apply(this, arguments);};}());case 3:formatters = _context4.sent;cleanup = function cleanup() {
                  return _bluebird2.default.each(streamsToClose, function (stream) {return _bluebird2.default.promisify(stream.end.bind(stream))();});};return _context4.abrupt('return', 

                { cleanup: cleanup, formatters: formatters });case 6:case 'end':return _context4.stop();}}}, _callee3, this);}));function getFormatters(_x) {return ref.apply(this, arguments);}return getFormatters;}() }, { key: 'getSupportCodeLibrary', value: function getSupportCodeLibrary(


    supportCodePaths) {
      var fns = (0, _helpers.getSupportCodeFunctions)(supportCodePaths);
      return _builder4.default.build({ cwd: this.cwd, fns: fns });} }, { key: 'run', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {var 



        configuration, 
        supportCodeLibrary, _ref4, _ref5, 
        features, _ref5$, cleanup, formatters, 







        scenarioFilter, 
        runtime, 






        result;return _regenerator2.default.wrap(function _callee4$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return this.getConfiguration();case 2:configuration = _context5.sent;supportCodeLibrary = this.getSupportCodeLibrary(configuration.supportCodePaths);_context5.next = 6;return _bluebird2.default.all([(0, _helpers.getFeatures)(configuration.featurePaths), this.getFormatters({ formatOptions: configuration.formatOptions, formats: configuration.formats, supportCodeLibrary: supportCodeLibrary })]);case 6:_ref4 = _context5.sent;_ref5 = (0, _slicedToArray3.default)(_ref4, 2);features = _ref5[0];_ref5$ = _ref5[1];cleanup = _ref5$.cleanup;formatters = _ref5$.formatters;scenarioFilter = new _scenario_filter2.default(configuration.scenarioFilterOptions);runtime = new _runtime2.default({ features: features, listeners: formatters, options: configuration.runtimeOptions, scenarioFilter: scenarioFilter, supportCodeLibrary: supportCodeLibrary });_context5.next = 16;return runtime.start();case 16:result = _context5.sent;_context5.next = 19;return (
                  cleanup());case 19:return _context5.abrupt('return', 
                result);case 20:case 'end':return _context5.stop();}}}, _callee4, this);}));function run() {return ref.apply(this, arguments);}return run;}() }]);return Cli;}();exports.default = Cli;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _fs = require('mz/fs');var _fs2 = _interopRequireDefault(_fs);
var _glob = require('glob');var _glob2 = _interopRequireDefault(_glob);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

PathExpander = function () {
  function PathExpander(directory) {(0, _classCallCheck3.default)(this, PathExpander);
    this.directory = directory;}(0, _createClass3.default)(PathExpander, [{ key: 'expandPathsWithExtensions', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(


      paths, extensions) {var _this = this;var 
        expandedPaths;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return _bluebird2.default.map(paths, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(p) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                              _this.expandPathWithExtensions(p, extensions));case 2:return _context.abrupt('return', _context.sent);case 3:case 'end':return _context.stop();}}}, _callee, _this);}));return function (_x3) {return ref.apply(this, arguments);};}());case 2:expandedPaths = _context2.sent;return _context2.abrupt('return', 

                _lodash2.default.uniq(_lodash2.default.flatten(expandedPaths)));case 4:case 'end':return _context2.stop();}}}, _callee2, this);}));function expandPathsWithExtensions(_x, _x2) {return ref.apply(this, arguments);}return expandPathsWithExtensions;}() }, { key: 'expandPathWithExtensions', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(


      p, extensions) {var 
        realPath, 
        stats;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return _fs2.default.realpath(_path2.default.resolve(this.directory, p));case 2:realPath = _context3.sent;_context3.next = 5;return _fs2.default.stat(realPath);case 5:stats = _context3.sent;if (!
                stats.isDirectory()) {_context3.next = 12;break;}_context3.next = 9;return (
                  this.expandDirectoryWithExtensions(realPath, extensions));case 9:return _context3.abrupt('return', _context3.sent);case 12:return _context3.abrupt('return', 

                [realPath]);case 13:case 'end':return _context3.stop();}}}, _callee3, this);}));function expandPathWithExtensions(_x4, _x5) {return ref.apply(this, arguments);}return expandPathWithExtensions;}() }, { key: 'expandDirectoryWithExtensions', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(



      realPath, extensions) {var 
        pattern, 





        results;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:pattern = realPath + '/**/*.';if (extensions.length > 1) {pattern += '{' + extensions.join(',') + '}';} else {pattern += extensions[0];}_context4.next = 4;return _bluebird2.default.promisify(_glob2.default)(pattern);case 4:results = _context4.sent;return _context4.abrupt('return', 
                results.map(function (filePath) {return filePath.replace(/\//g, _path2.default.sep);}));case 6:case 'end':return _context4.stop();}}}, _callee4, this);}));function expandDirectoryWithExtensions(_x6, _x7) {return ref.apply(this, arguments);}return expandDirectoryWithExtensions;}() }]);return PathExpander;}();exports.default = PathExpander;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _fs = require('mz/fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _stringArgv = require('string-argv');var _stringArgv2 = _interopRequireDefault(_stringArgv);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

ProfileLoader = function () {
  function ProfileLoader(directory) {(0, _classCallCheck3.default)(this, ProfileLoader);
    this.directory = directory;}(0, _createClass3.default)(ProfileLoader, [{ key: 'getDefinitions', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 



        definitionsFilePath, 
        exists, 



        definitions;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:definitionsFilePath = _path2.default.join(this.directory, 'cucumber.js');_context.next = 3;return _fs2.default.exists(definitionsFilePath);case 3:exists = _context.sent;if (exists) {_context.next = 6;break;}return _context.abrupt('return', {});case 6:definitions = require(definitionsFilePath);if (!(
                (typeof definitions === 'undefined' ? 'undefined' : (0, _typeof3.default)(definitions)) !== 'object')) {_context.next = 9;break;}throw (
                  new Error(definitionsFilePath + ' does not export an object'));case 9:return _context.abrupt('return', 

                definitions);case 10:case 'end':return _context.stop();}}}, _callee, this);}));function getDefinitions() {return ref.apply(this, arguments);}return getDefinitions;}() }, { key: 'getArgv', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(


      profiles) {var 
        definitions, 



        argvs;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this.getDefinitions();case 2:definitions = _context2.sent;if (profiles.length === 0 && definitions['default']) {profiles = ['default'];}argvs = profiles.map(function (profile) {
                  if (!definitions[profile]) {
                    throw new Error('Undefined profile: ' + profile);}

                  return (0, _stringArgv2.default)(definitions[profile]);});return _context2.abrupt('return', 

                _lodash2.default.flatten(argvs));case 6:case 'end':return _context2.stop();}}}, _callee2, this);}));function getArgv(_x) {return ref.apply(this, arguments);}return getArgv;}() }]);return ProfileLoader;}();exports.default = ProfileLoader;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _ = require('./');var _2 = _interopRequireDefault(_);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(

  function _callee() {var 
    cli, 





    success, 







    exitCode, 
    exitNow;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:exitNow = function exitNow() {
              process.exit(exitCode);};cli = new _2.default({ argv: process.argv, cwd: process.cwd(), stdout: process.stdout });success = void 0;_context.prev = 3;_context.next = 6;return cli.run();case 6:success = _context.sent;_context.next = 13;break;case 9:_context.prev = 9;_context.t0 = _context['catch'](3);process.nextTick(function () {throw _context.t0;});return _context.abrupt('return');case 13:exitCode = success ? 0 : 1;


            // If stdout.write() returned false, kernel buffer is not empty yet
            if (process.stdout.write('')) {
              exitNow();} else 
            {
              process.stdout.on('drain', exitNow);}case 15:case 'end':return _context.stop();}}}, _callee, this, [[3, 9]]);}));function run() {return ref.apply(this, arguments);}return run;}();
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _get_color_fns = require('./get_color_fns');var _get_color_fns2 = _interopRequireDefault(_get_color_fns);
var _javascript_snippet_syntax = require('./step_definition_snippet_builder/javascript_snippet_syntax');var _javascript_snippet_syntax2 = _interopRequireDefault(_javascript_snippet_syntax);
var _json_formatter = require('./json_formatter');var _json_formatter2 = _interopRequireDefault(_json_formatter);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _pretty_formatter = require('./pretty_formatter');var _pretty_formatter2 = _interopRequireDefault(_pretty_formatter);
var _progress_formatter = require('./progress_formatter');var _progress_formatter2 = _interopRequireDefault(_progress_formatter);
var _rerun_formatter = require('./rerun_formatter');var _rerun_formatter2 = _interopRequireDefault(_rerun_formatter);
var _snippets_formatter = require('./snippets_formatter');var _snippets_formatter2 = _interopRequireDefault(_snippets_formatter);
var _step_definition_snippet_builder = require('./step_definition_snippet_builder');var _step_definition_snippet_builder2 = _interopRequireDefault(_step_definition_snippet_builder);
var _summary_formatter = require('./summary_formatter');var _summary_formatter2 = _interopRequireDefault(_summary_formatter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

FormatterBuilder = function () {function FormatterBuilder() {(0, _classCallCheck3.default)(this, FormatterBuilder);}(0, _createClass3.default)(FormatterBuilder, null, [{ key: 'build', value: function build(
    type, options) {
      var Formatter = FormatterBuilder.getConstructorByType(type, options);
      var extendedOptions = _lodash2.default.assign({}, options, { 
        colorFns: (0, _get_color_fns2.default)(options.colorsEnabled), 
        snippetBuilder: FormatterBuilder.getStepDefinitionSnippetBuilder(options) });

      return new Formatter(extendedOptions);} }, { key: 'getConstructorByType', value: function getConstructorByType(


    type, options) {
      switch (type) {
        case 'json':return _json_formatter2.default;
        case 'pretty':return _pretty_formatter2.default;
        case 'progress':return _progress_formatter2.default;
        case 'rerun':return _rerun_formatter2.default;
        case 'snippets':return _snippets_formatter2.default;
        case 'summary':return _summary_formatter2.default;
        default:return FormatterBuilder.loadCustomFormatter(type, options);}} }, { key: 'getStepDefinitionSnippetBuilder', value: function getStepDefinitionSnippetBuilder(_ref) 



    {var cwd = _ref.cwd;var snippetInterface = _ref.snippetInterface;var snippetSyntax = _ref.snippetSyntax;var supportCodeLibrary = _ref.supportCodeLibrary;
      if (!snippetInterface) {
        snippetInterface = 'callback';}

      var Syntax = _javascript_snippet_syntax2.default;
      if (snippetSyntax) {
        var fullSyntaxPath = _path2.default.resolve(cwd, snippetSyntax);
        Syntax = require(fullSyntaxPath);}

      return new _step_definition_snippet_builder2.default({ 
        snippetSyntax: new Syntax(snippetInterface), 
        transformLookup: supportCodeLibrary.transformLookup });} }, { key: 'loadCustomFormatter', value: function loadCustomFormatter(



    customFormatterPath, _ref2) {var cwd = _ref2.cwd;
      var fullCustomFormatterPath = _path2.default.resolve(cwd, customFormatterPath);
      var CustomFormatter = require(fullCustomFormatterPath);
      if (typeof CustomFormatter === 'function') {
        return CustomFormatter;} else 
      if (CustomFormatter && typeof CustomFormatter.default === 'function') {
        return CustomFormatter.default;} else 
      {
        throw new Error('Custom formatter (' + customFormatterPath + ') does not export a function');}} }]);return FormatterBuilder;}();exports.default = FormatterBuilder;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);exports.default = 


getColorFns;var _safe = require('colors/safe');var _safe2 = _interopRequireDefault(_safe);var _status = require('../status');var _status2 = _interopRequireDefault(_status);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function getColorFns(enabled) {var _ref;
  _safe2.default.enabled = enabled;
  return _ref = {}, (0, _defineProperty3.default)(_ref, 
  _status2.default.AMBIGUOUS, _safe2.default.red), (0, _defineProperty3.default)(_ref, 'bold', 
  _safe2.default.bold), (0, _defineProperty3.default)(_ref, 
  _status2.default.FAILED, _safe2.default.red), (0, _defineProperty3.default)(_ref, 'location', 
  _safe2.default.grey), (0, _defineProperty3.default)(_ref, 
  _status2.default.PASSED, _safe2.default.green), (0, _defineProperty3.default)(_ref, 
  _status2.default.PENDING, _safe2.default.yellow), (0, _defineProperty3.default)(_ref, 
  _status2.default.SKIPPED, _safe2.default.cyan), (0, _defineProperty3.default)(_ref, 'tag', 
  _safe2.default.cyan), (0, _defineProperty3.default)(_ref, 
  _status2.default.UNDEFINED, _safe2.default.yellow), _ref;}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _listener = require('../listener');var _listener2 = _interopRequireDefault(_listener);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Formatter = function (_Listener) {(0, _inherits3.default)(Formatter, _Listener);
  function Formatter(options) {(0, _classCallCheck3.default)(this, Formatter);var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Formatter).call(this, 
    options));
    _this.log = options.log;
    _this.colorFns = options.colorFns;
    _this.snippetBuilder = options.snippetBuilder;return _this;}return Formatter;}(_listener2.default);exports.default = Formatter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _data_table = require('../models/step_arguments/data_table');var _data_table2 = _interopRequireDefault(_data_table);
var _doc_string = require('../models/step_arguments/doc_string');var _doc_string2 = _interopRequireDefault(_doc_string);
var _2 = require('./');var _3 = _interopRequireDefault(_2);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);
var _util = require('util');var _util2 = _interopRequireDefault(_util);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

JsonFormatter = function (_Formatter) {(0, _inherits3.default)(JsonFormatter, _Formatter);
  function JsonFormatter(options) {(0, _classCallCheck3.default)(this, JsonFormatter);var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(JsonFormatter).call(this, 
    options));
    _this.features = [];return _this;}(0, _createClass3.default)(JsonFormatter, [{ key: 'convertNameToId', value: function convertNameToId(


    obj) {
      return obj.name.replace(/ /g, '-').toLowerCase();} }, { key: 'formatAttachments', value: function formatAttachments(


    attachments) {
      return attachments.map(function (attachment) {
        return { 
          data: attachment.data, 
          mime_type: attachment.mimeType };});} }, { key: 'formatDataTable', value: function formatDataTable(




    dataTable) {
      return { 
        rows: dataTable.raw().map(function (row) {
          return { cells: row };}) };} }, { key: 'formatDocString', value: function formatDocString(




    docString) {
      return _lodash2.default.pick(docString, ['content', 'contentType', 'line']);} }, { key: 'formatStepArguments', value: function formatStepArguments(


    stepArguments) {var _this2 = this;
      return _lodash2.default.map(stepArguments, function (arg) {
        if (arg instanceof _data_table2.default) {
          return _this2.formatDataTable(arg);} else 
        if (arg instanceof _doc_string2.default) {
          return _this2.formatDocString(arg);} else 
        {
          throw new Error('Unknown argument type: ' + _util2.default.inspect(arg));}});} }, { key: 'handleAfterFeatures', value: function handleAfterFeatures() 




    {
      this.log(JSON.stringify(this.features, null, 2));} }, { key: 'handleBeforeFeature', value: function handleBeforeFeature(


    feature) {
      this.currentFeature = _lodash2.default.pick(feature, [
      'description', 
      'keyword', 
      'line', 
      'name', 
      'tags', 
      'uri']);

      _lodash2.default.assign(this.currentFeature, { 
        elements: [], 
        id: this.convertNameToId(feature) });

      this.features.push(this.currentFeature);} }, { key: 'handleBeforeScenario', value: function handleBeforeScenario(


    scenario) {
      this.currentScenario = _lodash2.default.pick(scenario, [
      'description', 
      'keyword', 
      'line', 
      'name', 
      'tags']);

      _lodash2.default.assign(this.currentScenario, { 
        id: this.currentFeature.id + ';' + this.convertNameToId(scenario), 
        steps: [] });

      this.currentFeature.elements.push(this.currentScenario);} }, { key: 'handleStepResult', value: function handleStepResult(


    stepResult) {
      var step = stepResult.step;
      var status = stepResult.status;

      var currentStep = { 
        arguments: this.formatStepArguments(step.arguments), 
        keyword: step.keyword, 
        name: step.name, 
        result: { status: status } };


      if (step.constructor.name === 'Hook') {
        currentStep.hidden = true;} else 
      {
        currentStep.line = step.line;}


      if (status === _status2.default.PASSED || status === _status2.default.FAILED) {
        currentStep.result.duration = stepResult.duration;}


      if (_lodash2.default.size(stepResult.attachments) > 0) {
        currentStep.embeddings = this.formatAttachments(stepResult.attachments);}


      if (status === _status2.default.FAILED && stepResult.failureException) {
        currentStep.result.error_message = stepResult.failureException.stack || stepResult.failureException;}


      if (stepResult.stepDefinition) {
        var location = stepResult.stepDefinition.uri + ':' + stepResult.stepDefinition.line;
        currentStep.match = { location: location };}


      this.currentScenario.steps.push(currentStep);} }]);return JsonFormatter;}(_3.default);exports.default = JsonFormatter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _PrettyFormatter$CHAR;var _data_table = require('../models/step_arguments/data_table');var _data_table2 = _interopRequireDefault(_data_table);
var _doc_string = require('../models/step_arguments/doc_string');var _doc_string2 = _interopRequireDefault(_doc_string);
var _figures = require('figures');var _figures2 = _interopRequireDefault(_figures);
var _hook = require('../models/hook');var _hook2 = _interopRequireDefault(_hook);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);
var _summary_formatter = require('./summary_formatter');var _summary_formatter2 = _interopRequireDefault(_summary_formatter);
var _cliTable = require('cli-table');var _cliTable2 = _interopRequireDefault(_cliTable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

PrettyFormatter = function (_SummaryFormatter) {(0, _inherits3.default)(PrettyFormatter, _SummaryFormatter);function PrettyFormatter() {(0, _classCallCheck3.default)(this, PrettyFormatter);return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(PrettyFormatter).apply(this, arguments));}(0, _createClass3.default)(PrettyFormatter, [{ key: 'applyColor', value: function applyColor(
    stepResult, text) {
      var status = stepResult.status;
      return this.colorFns[status](text);} }, { key: 'formatDataTable', value: function formatDataTable(


    dataTable) {
      var rows = dataTable.raw().map(function (row) {
        return row.map(function (cell) {
          return cell.replace(/\\/g, '\\\\').replace(/\n/g, '\\n');});});


      var table = new _cliTable2.default({ 
        chars: { 
          'bottom': '', 'bottom-left': '', 'bottom-mid': '', 'bottom-right': '', 
          'left': '|', 'left-mid': '', 
          'mid': '', 'mid-mid': '', 'middle': '|', 
          'right': '|', 'right-mid': '', 
          'top': '', 'top-left': '', 'top-mid': '', 'top-right': '' }, 

        style: { 
          border: [], 'padding-left': 1, 'padding-right': 1 } });


      table.push.apply(table, rows);
      return table.toString();} }, { key: 'formatDocString', value: function formatDocString(


    docString) {
      return '"""\n' + docString.content + '\n"""';} }, { key: 'formatTags', value: function formatTags(


    tags) {
      if (tags.length === 0) {
        return '';}

      var tagNames = tags.map(function (tag) {return tag.name;});
      return this.colorFns.tag(tagNames.join(' '));} }, { key: 'handleAfterScenario', value: function handleAfterScenario() 


    {
      this.log('\n');} }, { key: 'handleBeforeFeature', value: function handleBeforeFeature(


    feature) {
      var text = '';
      var tagsText = this.formatTags(feature.tags);
      if (tagsText) {
        text = tagsText + '\n';}

      text += feature.keyword + ': ' + feature.name;
      var description = feature.description;
      if (description) {
        text += '\n\n' + this.indent(description, 2);}

      this.log(text + '\n\n');} }, { key: 'handleBeforeScenario', value: function handleBeforeScenario(


    scenario) {
      var text = '';
      var tagsText = this.formatTags(scenario.tags);
      if (tagsText) {
        text = tagsText + '\n';}

      text += scenario.keyword + ': ' + scenario.name;
      this.logIndented(text + '\n', 1);} }, { key: 'handleStepResult', value: function handleStepResult(


    stepResult) {
      if (!(stepResult.step instanceof _hook2.default)) {
        this.logStepResult(stepResult);}} }, { key: 'logIndented', value: function logIndented(



    text, level) {
      this.log(this.indent(text, level * 2));} }, { key: 'logStepResult', value: function logStepResult(


    stepResult) {var _this2 = this;var 
      status = stepResult.status;var step = stepResult.step;
      var colorFn = this.colorFns[status];

      var symbol = PrettyFormatter.CHARACTERS[stepResult.status];
      var identifier = colorFn(symbol + ' ' + step.keyword + (step.name || ''));
      this.logIndented(identifier + '\n', 1);

      step.arguments.forEach(function (arg) {
        var str = void 0;
        if (arg instanceof _data_table2.default) {
          str = _this2.formatDataTable(arg);} else 
        if (arg instanceof _doc_string2.default) {
          str = _this2.formatDocString(arg);} else 
        {
          throw new Error('Unknown argument type: ' + arg);}

        _this2.logIndented(colorFn(str) + '\n', 3);});} }]);return PrettyFormatter;}(_summary_formatter2.default);exports.default = PrettyFormatter;




PrettyFormatter.CHARACTERS = (_PrettyFormatter$CHAR = {}, (0, _defineProperty3.default)(_PrettyFormatter$CHAR, 
_status2.default.AMBIGUOUS, _figures2.default.cross), (0, _defineProperty3.default)(_PrettyFormatter$CHAR, 
_status2.default.FAILED, _figures2.default.cross), (0, _defineProperty3.default)(_PrettyFormatter$CHAR, 
_status2.default.PASSED, _figures2.default.tick), (0, _defineProperty3.default)(_PrettyFormatter$CHAR, 
_status2.default.PENDING, '?'), (0, _defineProperty3.default)(_PrettyFormatter$CHAR, 
_status2.default.SKIPPED, '-'), (0, _defineProperty3.default)(_PrettyFormatter$CHAR, 
_status2.default.UNDEFINED, '?'), _PrettyFormatter$CHAR);
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _get2 = require('babel-runtime/helpers/get');var _get3 = _interopRequireDefault(_get2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _STATUS_CHARACTER_MAP;var _hook = require('../models/hook');var _hook2 = _interopRequireDefault(_hook);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);
var _summary_formatter = require('./summary_formatter');var _summary_formatter2 = _interopRequireDefault(_summary_formatter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var STATUS_CHARACTER_MAPPING = (_STATUS_CHARACTER_MAP = {}, (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, 
_status2.default.AMBIGUOUS, 'A'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, 
_status2.default.FAILED, 'F'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, 
_status2.default.PASSED, '.'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, 
_status2.default.PENDING, 'P'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, 
_status2.default.SKIPPED, '-'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, 
_status2.default.UNDEFINED, 'U'), _STATUS_CHARACTER_MAP);var 


ProgressFormatter = function (_SummaryFormatter) {(0, _inherits3.default)(ProgressFormatter, _SummaryFormatter);function ProgressFormatter() {(0, _classCallCheck3.default)(this, ProgressFormatter);return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ProgressFormatter).apply(this, arguments));}(0, _createClass3.default)(ProgressFormatter, [{ key: 'handleStepResult', value: function handleStepResult(
    stepResult) {
      var status = stepResult.status;
      if (!(stepResult.step instanceof _hook2.default && status === _status2.default.PASSED)) {
        var character = this.colorFns[status](STATUS_CHARACTER_MAPPING[status]);
        this.log(character);}} }, { key: 'handleFeaturesResult', value: function handleFeaturesResult(



    featuresResult) {
      this.log('\n\n');
      (0, _get3.default)(Object.getPrototypeOf(ProgressFormatter.prototype), 'handleFeaturesResult', this).call(this, featuresResult);} }]);return ProgressFormatter;}(_summary_formatter2.default);exports.default = ProgressFormatter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _2 = require('./');var _3 = _interopRequireDefault(_2);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var RERUN_STATUSES = [
_status2.default.AMBIGUOUS, 
_status2.default.FAILED, 
_status2.default.PENDING, 
_status2.default.UNDEFINED];var 


RerunFormatter = function (_Formatter) {(0, _inherits3.default)(RerunFormatter, _Formatter);function RerunFormatter() {(0, _classCallCheck3.default)(this, RerunFormatter);return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(RerunFormatter).apply(this, arguments));}(0, _createClass3.default)(RerunFormatter, [{ key: 'handleFeaturesResult', value: function handleFeaturesResult(
    featuresResult) {var _this2 = this;
      var mapping = {};
      featuresResult.scenarioResults.forEach(function (scenarioResult) {
        if (_lodash2.default.includes(RERUN_STATUSES, scenarioResult.status)) {
          var scenario = scenarioResult.scenario;
          var relativeUri = _path2.default.relative(_this2.cwd, scenario.uri);
          if (!mapping[relativeUri]) {
            mapping[relativeUri] = [];}

          mapping[relativeUri].push(scenario.line);}});


      var text = _lodash2.default.map(mapping, function (lines, relativeUri) {
        return relativeUri + ':' + lines.join(':');}).
      join('\n');
      this.log(text);} }]);return RerunFormatter;}(_3.default);exports.default = RerunFormatter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _ = require('./');var _2 = _interopRequireDefault(_);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

SnippetsFormatter = function (_Formatter) {(0, _inherits3.default)(SnippetsFormatter, _Formatter);function SnippetsFormatter() {(0, _classCallCheck3.default)(this, SnippetsFormatter);return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SnippetsFormatter).apply(this, arguments));}(0, _createClass3.default)(SnippetsFormatter, [{ key: 'handleStepResult', value: function handleStepResult(
    stepResult) {
      if (stepResult.status === _status2.default.UNDEFINED) {
        var snippet = this.snippetBuilder.build(stepResult.step);
        this.log(snippet + '\n\n');}} }]);return SnippetsFormatter;}(_2.default);exports.default = SnippetsFormatter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _cucumberExpressions = require('cucumber-expressions');
var _data_table = require('../../models/step_arguments/data_table');var _data_table2 = _interopRequireDefault(_data_table);
var _doc_string = require('../../models/step_arguments/doc_string');var _doc_string2 = _interopRequireDefault(_doc_string);
var _keyword_type = require('../../keyword_type');var _keyword_type2 = _interopRequireDefault(_keyword_type);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

StepDefinitionSnippetBuilder = function () {
  function StepDefinitionSnippetBuilder(_ref) {var snippetSyntax = _ref.snippetSyntax;var transformLookup = _ref.transformLookup;(0, _classCallCheck3.default)(this, StepDefinitionSnippetBuilder);
    this.snippetSyntax = snippetSyntax;
    this.cucumberExpressionGenerator = new _cucumberExpressions.CucumberExpressionGenerator(transformLookup);}(0, _createClass3.default)(StepDefinitionSnippetBuilder, [{ key: 'build', value: function build(


    step) {
      var functionName = this.getFunctionName(step);
      var generatedExpression = this.cucumberExpressionGenerator.generateExpression(step.name, true);
      var pattern = generatedExpression.source;
      var parameters = this.getParameters(step, generatedExpression.transforms);
      var comment = 'Write code here that turns the phrase above into concrete actions';
      return this.snippetSyntax.build(functionName, pattern, parameters, comment);} }, { key: 'getFunctionName', value: function getFunctionName(


    step) {
      switch (step.keywordType) {
        case _keyword_type2.default.EVENT:return 'When';
        case _keyword_type2.default.OUTCOME:return 'Then';
        case _keyword_type2.default.PRECONDITION:return 'Given';}} }, { key: 'getParameters', value: function getParameters(



    step, expressionTranforms) {
      return _lodash2.default.concat(
      this.getPatternMatchingGroupParameters(expressionTranforms), 
      this.getStepArgumentParameters(step), 
      'callback');} }, { key: 'getPatternMatchingGroupParameters', value: function getPatternMatchingGroupParameters(



    expressionTranforms) {
      return _lodash2.default.times(expressionTranforms.length, function (n) {
        return 'arg' + (n + 1);});} }, { key: 'getStepArgumentParameters', value: function getStepArgumentParameters(



    step) {
      return step.arguments.map(function (arg) {
        if (arg instanceof _data_table2.default) {
          return 'table';} else 
        if (arg instanceof _doc_string2.default) {
          return 'string';} else 
        {
          throw new Error('Unknown argument type: ' + arg);}});} }]);return StepDefinitionSnippetBuilder;}();exports.default = StepDefinitionSnippetBuilder;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

JavaScriptSnippetSyntax = function () {
  function JavaScriptSnippetSyntax(snippetInterface) {(0, _classCallCheck3.default)(this, JavaScriptSnippetSyntax);
    this.snippetInterface = snippetInterface;}(0, _createClass3.default)(JavaScriptSnippetSyntax, [{ key: 'build', value: function build(


    functionName, pattern, parameters, comment) {
      var functionKeyword = 'function ';
      if (this.snippetInterface === 'generator') {
        functionKeyword += '*';}


      var implementation = void 0;
      if (this.snippetInterface === 'callback') {
        var callbackName = _lodash2.default.last(parameters);
        implementation = callbackName + '(null, \'pending\');';} else 
      {
        parameters.pop();
        implementation = 'return \'pending\';';}


      var snippet = 
      'this.' + functionName + '(\'' + pattern.replace(/'/g, '\\\'') + '\', ' + functionKeyword + '(' + parameters.join(', ') + ') {' + '\n' + 
      '  // ' + comment + '\n' + 
      '  ' + implementation + '\n' + 
      '});';
      return snippet;} }]);return JavaScriptSnippetSyntax;}();exports.default = JavaScriptSnippetSyntax;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _utils = require('./utils');
var _duration = require('duration');var _duration2 = _interopRequireDefault(_duration);
var _2 = require('./');var _3 = _interopRequireDefault(_2);
var _indentString = require('indent-string');var _indentString2 = _interopRequireDefault(_indentString);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);
var _cliTable = require('cli-table');var _cliTable2 = _interopRequireDefault(_cliTable);
var _hook = require('../models/hook');var _hook2 = _interopRequireDefault(_hook);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var STATUS_REPORT_ORDER = [
_status2.default.FAILED, 
_status2.default.AMBIGUOUS, 
_status2.default.UNDEFINED, 
_status2.default.PENDING, 
_status2.default.SKIPPED, 
_status2.default.PASSED];var 


SummaryFormatter = function (_Formatter) {(0, _inherits3.default)(SummaryFormatter, _Formatter);function SummaryFormatter() {(0, _classCallCheck3.default)(this, SummaryFormatter);return (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SummaryFormatter).apply(this, arguments));}(0, _createClass3.default)(SummaryFormatter, [{ key: 'getAmbiguousStepResultMessage', value: function getAmbiguousStepResultMessage(
    stepResult) {var _this2 = this;var 
      ambiguousStepDefinitions = stepResult.ambiguousStepDefinitions;
      var table = new _cliTable2.default({ 
        chars: { 
          'bottom': '', 'bottom-left': '', 'bottom-mid': '', 'bottom-right': '', 
          'left': '', 'left-mid': '', 
          'mid': '', 'mid-mid': '', 'middle': ' - ', 
          'right': '', 'right-mid': '', 
          'top': '', 'top-left': '', 'top-mid': '', 'top-right': '' }, 

        style: { 
          border: [], 'padding-left': 0, 'padding-right': 0 } });


      table.push.apply(table, ambiguousStepDefinitions.map(function (stepDefinition) {
        var pattern = stepDefinition.pattern.toString();
        return [pattern, (0, _utils.formatLocation)(_this2.cwd, stepDefinition)];}));

      return 'Multiple step definitions match:' + '\n' + this.indent(table.toString(), 2);} }, { key: 'getFailedStepResultMessage', value: function getFailedStepResultMessage(


    stepResult) {var 
      failureException = stepResult.failureException;
      return failureException.stack || failureException;} }, { key: 'getPendingStepResultMessage', value: function getPendingStepResultMessage() 


    {
      return 'Pending';} }, { key: 'getStepResultMessage', value: function getStepResultMessage(


    stepResult) {
      switch (stepResult.status) {
        case _status2.default.AMBIGUOUS:
          return this.getAmbiguousStepResultMessage(stepResult);
        case _status2.default.FAILED:
          return this.getFailedStepResultMessage(stepResult);
        case _status2.default.UNDEFINED:
          return this.getUndefinedStepResultMessage(stepResult);
        case _status2.default.PENDING:
          return this.getPendingStepResultMessage(stepResult);}} }, { key: 'getUndefinedStepResultMessage', value: function getUndefinedStepResultMessage(



    stepResult) {var 
      step = stepResult.step;
      var snippet = this.snippetBuilder.build(step);
      return 'Undefined. Implement with the following snippet:' + '\n\n' + this.indent(snippet, 2);} }, { key: 'handleFeaturesResult', value: function handleFeaturesResult(


    featuresResult) {
      var failures = featuresResult.stepResults.filter(function (stepResult) {
        return _lodash2.default.includes([_status2.default.AMBIGUOUS, _status2.default.FAILED], stepResult.status);});

      if (failures.length > 0) {
        this.logIssues({ stepResults: failures, title: 'Failures' });}

      var warnings = featuresResult.stepResults.filter(function (stepResult) {
        return _lodash2.default.includes([_status2.default.PENDING, _status2.default.UNDEFINED], stepResult.status);});

      if (warnings.length > 0) {
        this.logIssues({ stepResults: warnings, title: 'Warnings' });}

      this.logCountSummary('scenario', featuresResult.scenarioResults);
      this.logCountSummary('step', featuresResult.stepResults.filter(function (_ref) {var step = _ref.step;return !(step instanceof _hook2.default);}));
      this.logDuration(featuresResult);} }, { key: 'indent', value: function indent(


    text, numberOfSpaces) {
      return (0, _indentString2.default)(text, ' ', numberOfSpaces);} }, { key: 'logCountSummary', value: function logCountSummary(


    type, objects) {var _this3 = this;
      var counts = _lodash2.default.chain(objects).groupBy('status').mapValues('length').value();
      var total = _lodash2.default.reduce(counts, function (memo, value) {return memo + value;}) || 0;
      var text = total + ' ' + type + (total !== 1 ? 's' : '');
      if (total > 0) {(function () {
          var details = [];
          STATUS_REPORT_ORDER.forEach(function (status) {
            if (counts[status] > 0) {
              details.push(_this3.colorFns[status](counts[status] + ' ' + status));}});


          text += ' (' + details.join(', ') + ')';})();}

      this.log(text + '\n');} }, { key: 'logDuration', value: function logDuration(


    featuresResult) {
      var milliseconds = featuresResult.duration;
      var start = new Date(0);
      var end = new Date(milliseconds);
      var duration = new _duration2.default(start, end);

      this.log(
      duration.minutes + 'm' + 
      duration.toString('%S') + '.' + 
      duration.toString('%L') + 's' + '\n');} }, { key: 'logIssue', value: function logIssue(_ref2) 



    {var number = _ref2.number;var stepResult = _ref2.stepResult;
      var message = this.getStepResultMessage(stepResult);
      var prefix = number + ') ';var 
      step = stepResult.step;var 
      scenario = step.scenario;
      var text = prefix;

      if (scenario) {
        var scenarioLocation = (0, _utils.formatLocation)(this.cwd, scenario);
        text += 'Scenario: ' + this.colorFns.bold(scenario.name) + ' - ' + this.colorFns.location(scenarioLocation);} else 
      {
        text += 'Background:';}

      text += '\n';

      var stepText = 'Step: ' + this.colorFns.bold(step.keyword + (step.name || ''));
      if (step.uri) {
        var stepLocation = (0, _utils.formatLocation)(this.cwd, step);
        stepText += ' - ' + this.colorFns.location(stepLocation);}

      text += this.indent(stepText, prefix.length) + '\n';var 

      stepDefinition = stepResult.stepDefinition;
      if (stepDefinition) {
        var stepDefinitionLocation = (0, _utils.formatLocation)(this.cwd, stepDefinition);
        var stepDefinitionLine = 'Step Definition: ' + this.colorFns.location(stepDefinitionLocation);
        text += this.indent(stepDefinitionLine, prefix.length) + '\n';}


      var messageColorFn = this.colorFns[stepResult.status];
      text += this.indent('Message:', prefix.length) + '\n';
      text += this.indent(messageColorFn(message), prefix.length + 2) + '\n\n';
      this.log(text);} }, { key: 'logIssues', value: function logIssues(_ref3) 


    {var _this4 = this;var stepResults = _ref3.stepResults;var title = _ref3.title;
      this.log(title + ':\n\n');
      stepResults.forEach(function (stepResult, index) {
        _this4.logIssue({ number: index + 1, stepResult: stepResult });});} }]);return SummaryFormatter;}(_3.default);exports.default = SummaryFormatter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

formatLocation = formatLocation;var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function formatLocation(cwd, obj) {
  return _path2.default.relative(cwd, obj.uri) + ':' + obj.line;}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _cli = require('./cli');var _cli2 = _interopRequireDefault(_cli);
var _listener = require('./listener');var _listener2 = _interopRequireDefault(_listener);
var _formatter = require('./formatter');var _formatter2 = _interopRequireDefault(_formatter);
var _runtime = require('./runtime');var _runtime2 = _interopRequireDefault(_runtime);
var _status = require('./status');var _status2 = _interopRequireDefault(_status);
var _summary_formatter = require('./formatter/summary_formatter');var _summary_formatter2 = _interopRequireDefault(_summary_formatter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = 

{ 
  Cli: _cli2.default, 
  Formatter: _formatter2.default, 
  Listener: _listener2.default, 
  Runtime: _runtime2.default, 
  Status: _status2.default, 
  SummaryFormatter: _summary_formatter2.default };
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.










getStepKeywordType = getStepKeywordType;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _gherkin = require('gherkin');var _gherkin2 = _interopRequireDefault(_gherkin);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var types = { EVENT: 'event', OUTCOME: 'outcome', PRECONDITION: 'precondition' };exports.default = types;function getStepKeywordType(_ref) {var language = _ref.language;var previousStep = _ref.previousStep;var step = _ref.step;
  var dialect = _gherkin2.default.DIALECTS[language];
  var type = _lodash2.default.find(['given', 'when', 'then', 'and', 'but'], function (type) {
    return _lodash2.default.includes(dialect[type], step.keyword);});

  switch (type) {
    case 'when':
      return types.EVENT;
    case 'then':
      return types.OUTCOME;
    case 'and':
    case 'but':
      if (previousStep) {
        return previousStep.keywordType;}

    // fallthrough
    default:
      return types.PRECONDITION;}}
"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Listener = 
function Listener(_ref) {var cwd = _ref.cwd;var line = _ref.line;var timeout = _ref.timeout;var uri = _ref.uri;(0, _classCallCheck3.default)(this, Listener);
  this.cwd = cwd;
  this.line = line;
  this.timeout = timeout;
  this.uri = uri;};exports.default = Listener;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _scenario = require('./scenario');var _scenario2 = _interopRequireDefault(_scenario);
var _tag = require('./tag');var _tag2 = _interopRequireDefault(_tag);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Feature = 
function Feature(_ref) {var _this = this;var gherkinData = _ref.gherkinData;var gherkinPickles = _ref.gherkinPickles;var uri = _ref.uri;(0, _classCallCheck3.default)(this, Feature);
  this.description = gherkinData.description;
  this.keyword = gherkinData.keyword;
  this.line = gherkinData.location.line;
  this.name = gherkinData.name;
  this.tags = _lodash2.default.map(gherkinData.tags, _tag2.default.build);
  this.uri = uri;

  var scenarioLineToDescriptionMapping = _lodash2.default.chain(gherkinData.children).
  map(function (element) {return [element.location.line, element.description];}).
  fromPairs().
  value();

  var stepLineToKeywordMapping = _lodash2.default.chain(gherkinData.children).
  map('steps').
  flatten().
  map(function (step) {return [step.location.line, step.keyword];}).
  fromPairs().
  value();

  this.scenarios = _lodash2.default.map(gherkinPickles, function (gherkinPickle) {
    return new _scenario2.default({ 
      feature: _this, 
      gherkinData: gherkinPickle, 
      language: gherkinData.language, 
      lineToDescriptionMapping: scenarioLineToDescriptionMapping, 
      stepLineToKeywordMapping: stepLineToKeywordMapping });});};exports.default = Feature;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

FeaturesResult = function () {
  function FeaturesResult(strict) {(0, _classCallCheck3.default)(this, FeaturesResult);
    this.duration = 0;
    this.scenarioResults = [];
    this.success = true;
    this.stepResults = [];
    this.strict = strict;}(0, _createClass3.default)(FeaturesResult, [{ key: 'witnessScenarioResult', value: function witnessScenarioResult(


    scenarioResult) {var 
      duration = scenarioResult.duration;var status = scenarioResult.status;var stepResults = scenarioResult.stepResults;
      this.duration += duration;
      this.scenarioResults.push(scenarioResult);
      this.stepResults = this.stepResults.concat(stepResults);
      if (_lodash2.default.includes([_status2.default.AMBIGUOUS, _status2.default.FAILED], status)) {
        this.success = false;}

      if (this.strict && _lodash2.default.includes([_status2.default.PENDING, _status2.default.UNDEFINED], status)) {
        this.success = false;}} }]);return FeaturesResult;}();exports.default = FeaturesResult;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Hook = 
function Hook(_ref) {var keyword = _ref.keyword;var scenario = _ref.scenario;(0, _classCallCheck3.default)(this, Hook);
  this.keyword = keyword;
  this.scenario = scenario;};exports.default = Hook;



Hook.BEFORE_STEP_KEYWORD = 'Before ';
Hook.AFTER_STEP_KEYWORD = 'After ';
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _scenario_filter = require('../scenario_filter');var _scenario_filter2 = _interopRequireDefault(_scenario_filter);
var _step_definition = require('./step_definition');var _step_definition2 = _interopRequireDefault(_step_definition);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

HookDefinition = function (_StepDefinition) {(0, _inherits3.default)(HookDefinition, _StepDefinition);
  function HookDefinition(data) {(0, _classCallCheck3.default)(this, HookDefinition);var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(HookDefinition).call(this, 
    data));
    _this.scenarioFilter = new _scenario_filter2.default({ tagExpression: _this.options.tags });return _this;}(0, _createClass3.default)(HookDefinition, [{ key: 'appliesToScenario', value: function appliesToScenario(


    scenario) {
      return this.scenarioFilter.matches(scenario);} }, { key: 'getInvalidCodeLengthMessage', value: function getInvalidCodeLengthMessage() 


    {
      return this.buildInvalidCodeLengthMessage('0 or 1', '2');} }, { key: 'getInvocationParameters', value: function getInvocationParameters(_ref) 


    {var scenarioResult = _ref.scenarioResult;
      return [scenarioResult];} }, { key: 'getValidCodeLengths', value: function getValidCodeLengths() 


    {
      return [0, 1, 2];} }]);return HookDefinition;}(_step_definition2.default);exports.default = HookDefinition;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _gherkin = require('gherkin');var _gherkin2 = _interopRequireDefault(_gherkin);
var _step = require('./step');var _step2 = _interopRequireDefault(_step);
var _tag = require('./tag');var _tag2 = _interopRequireDefault(_tag);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Scenario = 
function Scenario(options) {var _this = this;(0, _classCallCheck3.default)(this, Scenario);var 

  feature = 




  options.feature;var gherkinData = options.gherkinData;var language = options.language;var lineToDescriptionMapping = options.lineToDescriptionMapping;var stepLineToKeywordMapping = options.stepLineToKeywordMapping;

  this.feature = feature;
  this.keyword = _lodash2.default.first(_gherkin2.default.DIALECTS[language].scenario);
  this.lines = _lodash2.default.map(gherkinData.locations, 'line');
  this.name = gherkinData.name;
  this.tags = _lodash2.default.map(gherkinData.tags, _tag2.default.build);
  this.uri = gherkinData.locations[0].path;

  this.line = _lodash2.default.first(this.lines);
  this.description = _lodash2.default.chain(this.lines).
  map(function (line) {return lineToDescriptionMapping[line];}).
  compact().
  first().
  value();

  var previousStep = void 0;
  this.steps = _lodash2.default.map(gherkinData.steps, function (gherkinStepData) {
    var step = new _step2.default({ 
      gherkinData: gherkinStepData, 
      language: language, 
      lineToKeywordMapping: stepLineToKeywordMapping, 
      previousStep: previousStep, 
      scenario: _this });

    previousStep = step;
    return step;});};exports.default = Scenario;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _status = require('../status');var _status2 = _interopRequireDefault(_status);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

ScenarioResult = function () {
  function ScenarioResult(scenario) {(0, _classCallCheck3.default)(this, ScenarioResult);
    this.duration = 0;
    this.failureException = null;
    this.scenario = scenario;
    this.status = _status2.default.PASSED;
    this.stepResults = [];}(0, _createClass3.default)(ScenarioResult, [{ key: 'shouldUpdateStatus', value: function shouldUpdateStatus(


    stepResultStatus) {
      switch (stepResultStatus) {
        case _status2.default.FAILED:
          return true;
        case _status2.default.AMBIGUOUS:
        case _status2.default.PENDING:
        case _status2.default.SKIPPED:
        case _status2.default.UNDEFINED:
          return this.status === _status2.default.PASSED;
        default:
          return false;}} }, { key: 'witnessStepResult', value: function witnessStepResult(



    stepResult) {var 
      duration = stepResult.duration;var failureException = stepResult.failureException;var status = stepResult.status;
      if (duration) {
        this.duration += duration;}

      if (status === _status2.default.FAILED) {
        this.failureException = failureException;}

      if (this.shouldUpdateStatus(status)) {
        this.status = status;}

      this.stepResults.push(stepResult);} }]);return ScenarioResult;}();exports.default = ScenarioResult;



(0, _status.addStatusPredicates)(ScenarioResult.prototype);
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _keyword_type = require('../keyword_type');
var _step_arguments = require('./step_arguments');var _step_arguments2 = _interopRequireDefault(_step_arguments);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Step = 
function Step(_ref) {var gherkinData = _ref.gherkinData;var language = _ref.language;var lineToKeywordMapping = _ref.lineToKeywordMapping;var previousStep = _ref.previousStep;var scenario = _ref.scenario;(0, _classCallCheck3.default)(this, Step);
  this.arguments = _lodash2.default.map(gherkinData.arguments, _step_arguments2.default.build);
  this.line = _lodash2.default.last(_lodash2.default.map(gherkinData.locations, 'line'));
  this.name = gherkinData.text;
  this.scenario = scenario;
  this.uri = gherkinData.locations[0].path;

  this.keyword = _lodash2.default.chain(gherkinData.locations).
  map(function (_ref2) {var line = _ref2.line;return lineToKeywordMapping[line];}).
  compact().
  first().
  value();

  this.keywordType = (0, _keyword_type.getStepKeywordType)({ language: language, previousStep: previousStep, step: this });};exports.default = Step;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

DataTable = function () {
  function DataTable(gherkinData) {(0, _classCallCheck3.default)(this, DataTable);
    this.rawTable = gherkinData.rows.map(function (row) {return row.cells.map(function (cell) {return cell.value;});});}(0, _createClass3.default)(DataTable, [{ key: 'hashes', value: function hashes() 


    {
      var copy = this.raw();
      var keys = copy[0];
      var valuesArray = copy.slice(1);
      return valuesArray.map(function (values) {return _lodash2.default.zipObject(keys, values);});} }, { key: 'raw', value: function raw() 


    {
      return this.rawTable.slice(0);} }, { key: 'rows', value: function rows() 


    {
      var copy = this.raw();
      copy.shift();
      return copy;} }, { key: 'rowsHash', value: function rowsHash() 


    {
      var rows = this.raw();
      var everyRowHasTwoColumns = _lodash2.default.every(rows, function (row) {return row.length === 2;});
      if (!everyRowHasTwoColumns) {
        throw new Error('rowsHash can only be called on a data table where all rows have exactly two columns');}

      return _lodash2.default.fromPairs(rows);} }]);return DataTable;}();exports.default = DataTable;
"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var DocString = 
function DocString(gherkinData) {(0, _classCallCheck3.default)(this, DocString);
  this.content = gherkinData.content;
  this.contentType = gherkinData.contentType;
  this.line = gherkinData.location.line;};exports.default = DocString;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _data_table = require('./data_table');var _data_table2 = _interopRequireDefault(_data_table);
var _doc_string = require('./doc_string');var _doc_string2 = _interopRequireDefault(_doc_string);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

StepArguments = function () {function StepArguments() {(0, _classCallCheck3.default)(this, StepArguments);}(0, _createClass3.default)(StepArguments, null, [{ key: 'build', value: function build(
    gherkinData) {
      if (gherkinData.hasOwnProperty('content')) {
        return new _doc_string2.default(gherkinData);} else 
      if (gherkinData.hasOwnProperty('rows')) {
        return new _data_table2.default(gherkinData);} else 
      {
        throw new Error('Unknown step argument type: ' + JSON.stringify(gherkinData));}} }]);return StepArguments;}();exports.default = StepArguments;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _cucumberExpressions = require('cucumber-expressions');
var _data_table = require('./step_arguments/data_table');var _data_table2 = _interopRequireDefault(_data_table);
var _doc_string = require('./step_arguments/doc_string');var _doc_string2 = _interopRequireDefault(_doc_string);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

StepDefinition = function () {
  function StepDefinition(_ref) {var code = _ref.code;var line = _ref.line;var options = _ref.options;var pattern = _ref.pattern;var uri = _ref.uri;(0, _classCallCheck3.default)(this, StepDefinition);
    this.code = code;
    this.line = line;
    this.options = options;
    this.pattern = pattern;
    this.uri = uri;}(0, _createClass3.default)(StepDefinition, [{ key: 'buildInvalidCodeLengthMessage', value: function buildInvalidCodeLengthMessage(


    syncOrPromiseLength, callbackLength) {
      return 'function has ' + this.code.length + ' arguments' + 
      ', should have ' + syncOrPromiseLength + ' (if synchronous or returning a promise)' + 
      ' or ' + callbackLength + ' (if accepting a callback)';} }, { key: 'getInvalidCodeLengthMessage', value: function getInvalidCodeLengthMessage(


    parameters) {
      return this.buildInvalidCodeLengthMessage(parameters.length, parameters.length + 1);} }, { key: 'getInvocationParameters', value: function getInvocationParameters(_ref2) 


    {var step = _ref2.step;var transformLookup = _ref2.transformLookup;
      var cucumberExpression = this.getCucumberExpression(transformLookup);
      var stepNameParameters = _lodash2.default.map(cucumberExpression.match(step.name), 'transformedValue');
      var stepArgumentParameters = step.arguments.map(function (arg) {
        if (arg instanceof _data_table2.default) {
          return arg;} else 
        if (arg instanceof _doc_string2.default) {
          return arg.content;} else 
        {
          throw new Error('Unknown argument type:' + arg);}});


      return stepNameParameters.concat(stepArgumentParameters);} }, { key: 'getCucumberExpression', value: function getCucumberExpression(


    transformLookup) {
      if (typeof this.pattern === 'string') {
        return new _cucumberExpressions.CucumberExpression(this.pattern, [], transformLookup);} else 
      {
        return new _cucumberExpressions.RegularExpression(this.pattern, [], transformLookup);}} }, { key: 'getValidCodeLengths', value: function getValidCodeLengths(



    parameters) {
      return [parameters.length, parameters.length + 1];} }, { key: 'matchesStepName', value: function matchesStepName(_ref3) 


    {var stepName = _ref3.stepName;var transformLookup = _ref3.transformLookup;
      var cucumberExpression = this.getCucumberExpression(transformLookup);
      return Boolean(cucumberExpression.match(stepName));} }]);return StepDefinition;}();exports.default = StepDefinition;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _status = require('../status');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

StepResult = 
function StepResult(data) {(0, _classCallCheck3.default)(this, StepResult);
  _lodash2.default.assign(this, _lodash2.default.pick(data, [
  'ambiguousStepDefinitions', 
  'attachments', 
  'duration', 
  'failureException', 
  'step', 
  'stepDefinition', 
  'status']));};exports.default = StepResult;




(0, _status.addStatusPredicates)(StepResult.prototype);
"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require("babel-runtime/helpers/createClass");var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Tag = function () {(0, _createClass3.default)(Tag, null, [{ key: "build", value: function build(
    gherkinData) {
      return new Tag(gherkinData);} }]);


  function Tag(gherkinData) {(0, _classCallCheck3.default)(this, Tag);
    this.line = gherkinData.location.line;
    this.name = gherkinData.name;}return Tag;}();exports.default = Tag;
"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Attachment = 
function Attachment(_ref) {var data = _ref.data;var mimeType = _ref.mimeType;(0, _classCallCheck3.default)(this, Attachment);
  this.data = data;
  this.mimeType = mimeType;};exports.default = Attachment;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _attachment = require('./attachment');var _attachment2 = _interopRequireDefault(_attachment);
var _isStream = require('is-stream');var _isStream2 = _interopRequireDefault(_isStream);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

AttachmentManager = function () {
  function AttachmentManager() {(0, _classCallCheck3.default)(this, AttachmentManager);
    this.attachments = [];}(0, _createClass3.default)(AttachmentManager, [{ key: 'create', value: function create(


    data, mimeType, callback) {
      if (Buffer.isBuffer(data)) {
        if (!mimeType) {
          throw Error('Buffer attachments must specify a mimeType');}

        this.createBufferAttachment(data, mimeType);} else 
      if (_isStream2.default.readable(data)) {
        if (!mimeType) {
          throw Error('Stream attachments must specify a mimeType');}

        return this.createStreamAttachment(data, mimeType, callback);} else 
      if (typeof data === 'string') {
        if (!mimeType) {
          mimeType = 'text/plain';}

        this.createStringAttachment(data, mimeType);} else 
      {
        throw Error('Invalid attachment data: must be a buffer, readable stream, or string');}} }, { key: 'createBufferAttachment', value: function createBufferAttachment(



    data, mimeType) {
      this.createStringAttachment(data.toString('base64'), mimeType);} }, { key: 'createStreamAttachment', value: function createStreamAttachment(


    data, mimeType, callback) {var _this = this;
      var promise = new _bluebird2.default(function (resolve, reject) {
        var buffers = [];
        data.on('data', function (chunk) {buffers.push(chunk);});
        data.on('end', function () {
          _this.createBufferAttachment(Buffer.concat(buffers), mimeType);
          resolve();});

        data.on('error', reject);});

      if (callback) {
        promise.then(callback, callback);} else 
      {
        return promise;}} }, { key: 'createStringAttachment', value: function createStringAttachment(



    data, mimeType) {
      var attachment = new _attachment2.default({ data: data, mimeType: mimeType });
      this.attachments.push(attachment);} }, { key: 'getAll', value: function getAll() 


    {
      return this.attachments;} }]);return AttachmentManager;}();exports.default = AttachmentManager;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Event = function () {
  function Event(_ref) {var data = _ref.data;var name = _ref.name;(0, _classCallCheck3.default)(this, Event);
    this.data = data;
    this.name = name;}(0, _createClass3.default)(Event, [{ key: 'buildBeforeEvent', value: function buildBeforeEvent() 


    {
      return new Event({ 
        data: this.data, 
        name: 'Before' + this.name });} }, { key: 'buildAfterEvent', value: function buildAfterEvent() 



    {
      return new Event({ 
        data: this.data, 
        name: 'After' + this.name });} }]);return Event;}();exports.default = Event;




_lodash2.default.assign(Event, { 
  FEATURES_EVENT_NAME: 'Features', 
  FEATURES_RESULT_EVENT_NAME: 'FeaturesResult', 
  FEATURE_EVENT_NAME: 'Feature', 
  SCENARIO_EVENT_NAME: 'Scenario', 
  SCENARIO_RESULT_EVENT_NAME: 'ScenarioResult', 
  STEP_EVENT_NAME: 'Step', 
  STEP_RESULT_EVENT_NAME: 'StepResult' });
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _user_code_runner = require('../user_code_runner');var _user_code_runner2 = _interopRequireDefault(_user_code_runner);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

EventBroadcaster = function () {
  function EventBroadcaster(_ref) {var cwd = _ref.cwd;var listenerDefaultTimeout = _ref.listenerDefaultTimeout;var listeners = _ref.listeners;(0, _classCallCheck3.default)(this, EventBroadcaster);
    this.cwd = cwd;
    this.listenerDefaultTimeout = listenerDefaultTimeout;
    this.listeners = listeners;}(0, _createClass3.default)(EventBroadcaster, [{ key: 'broadcastAroundEvent', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(


      event, fn) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                  this.broadcastEvent(event.buildBeforeEvent()));case 2:_context.next = 4;return (
                  fn());case 4:_context.next = 6;return (
                  this.broadcastEvent(event.buildAfterEvent()));case 6:case 'end':return _context.stop();}}}, _callee, this);}));function broadcastAroundEvent(_x, _x2) {return ref.apply(this, arguments);}return broadcastAroundEvent;}() }, { key: 'broadcastEvent', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(


      event) {var _this = this;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                  _bluebird2.default.each(this.listeners, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(listener) {var 
                      fnName, 
                      handler, 

                      timeout, _ref2, 
                      error, 






                      location;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:fnName = 'handle' + event.name;handler = listener[fnName];if (!handler) {_context2.next = 11;break;}timeout = listener.timeout || _this.listenerDefaultTimeout;_context2.next = 6;return _user_code_runner2.default.run({ argsArray: [event.data], fn: handler, timeoutInMilliseconds: timeout, thisArg: listener });case 6:_ref2 = _context2.sent;error = _ref2.error;if (!error) {_context2.next = 11;break;}location = _this.getListenerErrorLocation({ fnName: fnName, listener: listener });throw (
                                _this.prependLocationToError({ error: error, location: location }));case 11:case 'end':return _context2.stop();}}}, _callee2, _this);}));return function (_x4) {return ref.apply(this, arguments);};}()));case 2:case 'end':return _context3.stop();}}}, _callee3, this);}));function broadcastEvent(_x3) {return ref.apply(this, arguments);}return broadcastEvent;}() }, { key: 'getListenerErrorLocation', value: function getListenerErrorLocation(_ref3) 





    {var fnName = _ref3.fnName;var listener = _ref3.listener;
      if (listener.cwd && listener.uri) {
        return _path2.default.relative(listener.cwd, listener.uri) + ':' + listener.line;} else 
      {
        return listener.constructor.name + '::' + fnName;}} }, { key: 'prependLocationToError', value: function prependLocationToError(_ref4) 



    {var error = _ref4.error;var location = _ref4.location;
      if (error instanceof Error) {
        error.message = location + ' ' + error.message;} else 
      {
        error = location + ' ' + error;}

      return error;} }]);return EventBroadcaster;}();exports.default = EventBroadcaster;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _event = require('./event');var _event2 = _interopRequireDefault(_event);
var _features_result = require('../models/features_result');var _features_result2 = _interopRequireDefault(_features_result);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _scenario_runner = require('./scenario_runner');var _scenario_runner2 = _interopRequireDefault(_scenario_runner);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

FeaturesRunner = function () {
  function FeaturesRunner(_ref) {var eventBroadcaster = _ref.eventBroadcaster;var features = _ref.features;var options = _ref.options;var scenarioFilter = _ref.scenarioFilter;var supportCodeLibrary = _ref.supportCodeLibrary;(0, _classCallCheck3.default)(this, FeaturesRunner);
    this.eventBroadcaster = eventBroadcaster;
    this.features = features;
    this.options = options;
    this.scenarioFilter = scenarioFilter;
    this.supportCodeLibrary = supportCodeLibrary;
    this.featuresResult = new _features_result2.default(options.strict);}(0, _createClass3.default)(FeaturesRunner, [{ key: 'run', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var _this = this;var 



        event;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:event = new _event2.default({ data: this.features, name: _event2.default.FEATURES_EVENT_NAME });_context2.next = 3;return (
                  this.eventBroadcaster.broadcastAroundEvent(event, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                              _bluebird2.default.each(_this.features, _this.runFeature.bind(_this)));case 2:_context.next = 4;return (
                              _this.broadcastFeaturesResult());case 4:case 'end':return _context.stop();}}}, _callee, _this);}))));case 3:return _context2.abrupt('return', 

                this.featuresResult.success);case 4:case 'end':return _context2.stop();}}}, _callee2, this);}));function run() {return ref.apply(this, arguments);}return run;}() }, { key: 'broadcastFeaturesResult', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {var 



        event;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:event = new _event2.default({ data: this.featuresResult, name: _event2.default.FEATURES_RESULT_EVENT_NAME });_context3.next = 3;return (
                  this.eventBroadcaster.broadcastEvent(event));case 3:case 'end':return _context3.stop();}}}, _callee3, this);}));function broadcastFeaturesResult() {return ref.apply(this, arguments);}return broadcastFeaturesResult;}() }, { key: 'runFeature', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(


      feature) {var _this2 = this;var 



        event;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:if (!(!this.featuresResult.success && this.options.failFast)) {_context5.next = 2;break;}return _context5.abrupt('return');case 2:event = new _event2.default({ data: feature, name: _event2.default.FEATURE_EVENT_NAME });_context5.next = 5;return (
                  this.eventBroadcaster.broadcastAroundEvent(event, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                              _bluebird2.default.each(feature.scenarios, _this2.runScenario.bind(_this2)));case 2:case 'end':return _context4.stop();}}}, _callee4, _this2);}))));case 5:case 'end':return _context5.stop();}}}, _callee5, this);}));function runFeature(_x) {return ref.apply(this, arguments);}return runFeature;}() }, { key: 'runScenario', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(



      scenario) {var 






        scenarioRunner, 





        scenarioResult;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:if (!(!this.featuresResult.success && this.options.failFast)) {_context6.next = 2;break;}return _context6.abrupt('return');case 2:if (this.scenarioFilter.matches(scenario)) {_context6.next = 4;break;}return _context6.abrupt('return');case 4:scenarioRunner = new _scenario_runner2.default({ eventBroadcaster: this.eventBroadcaster, options: this.options, scenario: scenario, supportCodeLibrary: this.supportCodeLibrary });_context6.next = 7;return scenarioRunner.run();case 7:scenarioResult = _context6.sent;
                this.featuresResult.witnessScenarioResult(scenarioResult);case 9:case 'end':return _context6.stop();}}}, _callee6, this);}));function runScenario(_x2) {return ref.apply(this, arguments);}return runScenario;}() }]);return FeaturesRunner;}();exports.default = FeaturesRunner;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _event_broadcaster = require('./event_broadcaster');var _event_broadcaster2 = _interopRequireDefault(_event_broadcaster);
var _features_runner = require('./features_runner');var _features_runner2 = _interopRequireDefault(_features_runner);
var _stack_trace_filter = require('./stack_trace_filter');var _stack_trace_filter2 = _interopRequireDefault(_stack_trace_filter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Runtime = function () {
  // options - {dryRun, failFast, filterStacktraces, strict}
  function Runtime(_ref) {var features = _ref.features;var listeners = _ref.listeners;var options = _ref.options;var scenarioFilter = _ref.scenarioFilter;var supportCodeLibrary = _ref.supportCodeLibrary;(0, _classCallCheck3.default)(this, Runtime);
    this.features = features;
    this.listeners = listeners;
    this.options = options;
    this.scenarioFilter = scenarioFilter;
    this.supportCodeLibrary = supportCodeLibrary;
    this.stackTraceFilter = new _stack_trace_filter2.default();}(0, _createClass3.default)(Runtime, [{ key: 'start', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 



        eventBroadcaster, 



        featuresRunner, 











        result;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:eventBroadcaster = new _event_broadcaster2.default({ listenerDefaultTimeout: this.supportCodeLibrary.defaultTimeout, listeners: this.listeners.concat(this.supportCodeLibrary.listeners) });featuresRunner = new _features_runner2.default({ eventBroadcaster: eventBroadcaster, features: this.features, options: this.options, scenarioFilter: this.scenarioFilter, supportCodeLibrary: this.supportCodeLibrary });if (this.options.filterStacktraces) {this.stackTraceFilter.filter();}_context.next = 5;return featuresRunner.run();case 5:result = _context.sent;

                if (this.options.filterStacktraces) {
                  this.stackTraceFilter.unfilter();}return _context.abrupt('return', 


                result);case 8:case 'end':return _context.stop();}}}, _callee, this);}));function start() {return ref.apply(this, arguments);}return start;}() }, { key: 'attachListener', value: function attachListener(


    listener) {
      this.listeners.push(listener);} }]);return Runtime;}();exports.default = Runtime;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _event = require('./event');var _event2 = _interopRequireDefault(_event);
var _hook = require('../models/hook');var _hook2 = _interopRequireDefault(_hook);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _scenario_result = require('../models/scenario_result');var _scenario_result2 = _interopRequireDefault(_scenario_result);
var _status = require('../status');var _status2 = _interopRequireDefault(_status);
var _step_result = require('../models/step_result');var _step_result2 = _interopRequireDefault(_step_result);
var _step_runner = require('./step_runner');var _step_runner2 = _interopRequireDefault(_step_runner);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

ScenarioRunner = function () {
  function ScenarioRunner(_ref) {var eventBroadcaster = _ref.eventBroadcaster;var options = _ref.options;var scenario = _ref.scenario;var supportCodeLibrary = _ref.supportCodeLibrary;(0, _classCallCheck3.default)(this, ScenarioRunner);
    this.eventBroadcaster = eventBroadcaster;
    this.options = options;
    this.scenario = scenario;
    this.supportCodeLibrary = supportCodeLibrary;
    this.scenarioResult = new _scenario_result2.default(scenario);
    this.world = new supportCodeLibrary.World(options.worldParameters);}(0, _createClass3.default)(ScenarioRunner, [{ key: 'broadcastScenarioResult', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 



        event;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:event = new _event2.default({ data: this.scenarioResult, name: _event2.default.SCENARIO_RESULT_EVENT_NAME });_context.next = 3;return (
                  this.eventBroadcaster.broadcastEvent(event));case 3:case 'end':return _context.stop();}}}, _callee, this);}));function broadcastScenarioResult() {return ref.apply(this, arguments);}return broadcastScenarioResult;}() }, { key: 'broadcastStepResult', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(


      stepResult) {var 

        event;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:this.scenarioResult.witnessStepResult(stepResult);event = new _event2.default({ data: stepResult, name: _event2.default.STEP_RESULT_EVENT_NAME });_context2.next = 4;return (
                  this.eventBroadcaster.broadcastEvent(event));case 4:case 'end':return _context2.stop();}}}, _callee2, this);}));function broadcastStepResult(_x) {return ref.apply(this, arguments);}return broadcastStepResult;}() }, { key: 'invokeStep', value: function invokeStep(


    step, stepDefinition) {
      return _step_runner2.default.run({ 
        defaultTimeout: this.supportCodeLibrary.defaultTimeout, 
        scenarioResult: this.scenarioResult, 
        step: step, 
        stepDefinition: stepDefinition, 
        transformLookup: this.supportCodeLibrary.transformLookup, 
        world: this.world });} }, { key: 'isSkippingSteps', value: function isSkippingSteps() 



    {
      return this.scenarioResult.status !== _status2.default.PASSED;} }, { key: 'run', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {var _this = this;var 



        event;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:event = new _event2.default({ data: this.scenario, name: _event2.default.SCENARIO_EVENT_NAME });_context4.next = 3;return (
                  this.eventBroadcaster.broadcastAroundEvent(event, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                              _this.runBeforeHooks());case 2:_context3.next = 4;return (
                              _this.runSteps());case 4:_context3.next = 6;return (
                              _this.runAfterHooks());case 6:_context3.next = 8;return (
                              _this.broadcastScenarioResult());case 8:case 'end':return _context3.stop();}}}, _callee3, _this);}))));case 3:return _context4.abrupt('return', 

                this.scenarioResult);case 4:case 'end':return _context4.stop();}}}, _callee4, this);}));function run() {return ref.apply(this, arguments);}return run;}() }, { key: 'runAfterHooks', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (



                  this.runHooks({ 
                    hookDefinitions: this.supportCodeLibrary.afterHookDefinitions.reverse(), 
                    hookKeyword: _hook2.default.AFTER_STEP_KEYWORD }));case 2:case 'end':return _context5.stop();}}}, _callee5, this);}));function runAfterHooks() {return ref.apply(this, arguments);}return runAfterHooks;}() }, { key: 'runBeforeHooks', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (




                  this.runHooks({ 
                    hookDefinitions: this.supportCodeLibrary.beforeHookDefinitions, 
                    hookKeyword: _hook2.default.BEFORE_STEP_KEYWORD }));case 2:case 'end':return _context6.stop();}}}, _callee6, this);}));function runBeforeHooks() {return ref.apply(this, arguments);}return runBeforeHooks;}() }, { key: 'runHook', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(



      hook, hookDefinition) {return _regenerator2.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:if (!
                this.options.dryRun) {_context7.next = 4;break;}return _context7.abrupt('return', 
                new _step_result2.default({ 
                  step: hook, 
                  stepDefinition: hookDefinition, 
                  status: _status2.default.SKIPPED }));case 4:_context7.next = 6;return (


                  this.invokeStep(hook, hookDefinition));case 6:return _context7.abrupt('return', _context7.sent);case 7:case 'end':return _context7.stop();}}}, _callee7, this);}));function runHook(_x2, _x3) {return ref.apply(this, arguments);}return runHook;}() }, { key: 'runHooks', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(_ref2) {var _this2 = this;var 



        hookDefinitions = _ref2.hookDefinitions;var hookKeyword = _ref2.hookKeyword;return _regenerator2.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return (
                  _bluebird2.default.each(hookDefinitions, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(hookDefinition) {var 



                      hook, 
                      event;return _regenerator2.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:if (hookDefinition.appliesToScenario(_this2.scenario)) {_context9.next = 2;break;}return _context9.abrupt('return');case 2:hook = new _hook2.default({ keyword: hookKeyword, scenario: _this2.scenario });event = new _event2.default({ data: hook, name: _event2.default.STEP_EVENT_NAME });_context9.next = 6;return (
                                _this2.eventBroadcaster.broadcastAroundEvent(event, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {var 
                                  stepResult;return _regenerator2.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return _this2.runHook(hook, hookDefinition);case 2:stepResult = _context8.sent;_context8.next = 5;return (
                                            _this2.broadcastStepResult(stepResult));case 5:case 'end':return _context8.stop();}}}, _callee8, _this2);}))));case 6:case 'end':return _context9.stop();}}}, _callee9, _this2);}));return function (_x5) {return ref.apply(this, arguments);};}()));case 2:case 'end':return _context10.stop();}}}, _callee10, this);}));function runHooks(_x4) {return ref.apply(this, arguments);}return runHooks;}() }, { key: 'runStep', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(




      step) {var _this3 = this;var 
        stepDefinitions;return _regenerator2.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:stepDefinitions = this.supportCodeLibrary.stepDefinitions.filter(function (stepDefinition) {
                  return stepDefinition.matchesStepName({ 
                    stepName: step.name, 
                    transformLookup: _this3.supportCodeLibrary.transformLookup });});if (!(


                stepDefinitions.length === 0)) {_context11.next = 5;break;}return _context11.abrupt('return', 
                new _step_result2.default({ 
                  step: step, 
                  status: _status2.default.UNDEFINED }));case 5:if (!(

                stepDefinitions.length > 1)) {_context11.next = 9;break;}return _context11.abrupt('return', 
                new _step_result2.default({ 
                  ambiguousStepDefinitions: stepDefinitions, 
                  step: step, 
                  status: _status2.default.AMBIGUOUS }));case 9:if (!(

                this.options.dryRun || this.isSkippingSteps())) {_context11.next = 13;break;}return _context11.abrupt('return', 
                new _step_result2.default({ 
                  step: step, 
                  stepDefinition: stepDefinitions[0], 
                  status: _status2.default.SKIPPED }));case 13:_context11.next = 15;return (


                  this.invokeStep(step, stepDefinitions[0]));case 15:return _context11.abrupt('return', _context11.sent);case 16:case 'end':return _context11.stop();}}}, _callee11, this);}));function runStep(_x6) {return ref.apply(this, arguments);}return runStep;}() }, { key: 'runSteps', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {var _this4 = this;return _regenerator2.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_context14.next = 2;return (




                  _bluebird2.default.each(this.scenario.steps, function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(step) {var 
                      event;return _regenerator2.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:event = new _event2.default({ data: step, name: _event2.default.STEP_EVENT_NAME });_context13.next = 3;return (
                                _this4.eventBroadcaster.broadcastAroundEvent(event, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {var 

                                  stepResult;return _regenerator2.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return _bluebird2.default.resolve();case 2:_context12.next = 4;return _this4.runStep(step);case 4:stepResult = _context12.sent;_context12.next = 7;return (
                                            _this4.broadcastStepResult(stepResult));case 7:case 'end':return _context12.stop();}}}, _callee12, _this4);}))));case 3:case 'end':return _context13.stop();}}}, _callee13, _this4);}));return function (_x7) {return ref.apply(this, arguments);};}()));case 2:case 'end':return _context14.stop();}}}, _callee14, this);}));function runSteps() {return ref.apply(this, arguments);}return runSteps;}() }]);return ScenarioRunner;}();exports.default = ScenarioRunner;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _stackChain = require('stack-chain');var _stackChain2 = _interopRequireDefault(_stackChain);
var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

StackTraceFilter = function () {
  function StackTraceFilter() {(0, _classCallCheck3.default)(this, StackTraceFilter);
    this.cucumberPath = _path2.default.join(__dirname, '..', '..');}(0, _createClass3.default)(StackTraceFilter, [{ key: 'filter', value: function filter() 


    {var _this = this;
      this.currentFilter = _stackChain2.default.filter.attach(function (error, frames) {
        if (frames.length > 0 && _this.isFrameInCucumber(frames[0])) {
          return frames;}

        var index = _lodash2.default.findIndex(frames, _this.isFrameInCucumber.bind(_this));
        if (index === -1) {
          return frames;} else 
        {
          return frames.slice(0, index);}});} }, { key: 'isFrameInCucumber', value: function isFrameInCucumber(




    frame) {
      var fileName = frame.getFileName() || '';
      return _lodash2.default.startsWith(fileName, this.cucumberPath);} }, { key: 'unfilter', value: function unfilter() 


    {
      _stackChain2.default.filter.deattach(this.currentFilter);} }]);return StackTraceFilter;}();exports.default = StackTraceFilter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var run = function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(








  function _callee(_ref) {var defaultTimeout = _ref.defaultTimeout;var scenarioResult = _ref.scenarioResult;var step = _ref.step;var stepDefinition = _ref.stepDefinition;var transformLookup = _ref.transformLookup;var world = _ref.world;var 

    parameters, 
    timeoutInMilliseconds, 
    attachmentManager, 


    error, result, 
    validCodeLengths, 

    data, 











    stepResultData;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:beginTiming();parameters = stepDefinition.getInvocationParameters({ scenarioResult: scenarioResult, step: step, transformLookup: transformLookup });timeoutInMilliseconds = stepDefinition.options.timeout || defaultTimeout;attachmentManager = new _attachment_manager2.default();world.attach = attachmentManager.create.bind(attachmentManager);error = void 0, result = void 0;validCodeLengths = stepDefinition.getValidCodeLengths(parameters);if (!_lodash2.default.includes(validCodeLengths, stepDefinition.code.length)) {_context.next = 15;break;}_context.next = 10;return _user_code_runner2.default.run({ argsArray: parameters, fn: stepDefinition.code, thisArg: world, timeoutInMilliseconds: timeoutInMilliseconds });case 10:data = _context.sent;error = data.error;result = data.result;_context.next = 16;break;case 15:error = stepDefinition.getInvalidCodeLengthMessage(parameters);case 16:stepResultData = { 
              attachments: attachmentManager.getAll(), 
              duration: endTiming(), 
              step: step, 
              stepDefinition: stepDefinition };


            if (result === 'pending') {
              stepResultData.status = _status2.default.PENDING;} else 
            if (error) {
              stepResultData.failureException = error;
              stepResultData.status = _status2.default.FAILED;} else 
            {
              stepResultData.status = _status2.default.PASSED;}return _context.abrupt('return', 


            new _step_result2.default(stepResultData));case 19:case 'end':return _context.stop();}}}, _callee, this);}));return function run(_x) {return ref.apply(this, arguments);};}();var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _attachment_manager = require('./attachment_manager');var _attachment_manager2 = _interopRequireDefault(_attachment_manager);var _status = require('../status');var _status2 = _interopRequireDefault(_status);var _step_result = require('../models/step_result');var _step_result2 = _interopRequireDefault(_step_result);var _time = require('../time');var _time2 = _interopRequireDefault(_time);var _user_code_runner = require('../user_code_runner');var _user_code_runner2 = _interopRequireDefault(_user_code_runner);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var beginTiming = _time2.default.beginTiming;var endTiming = _time2.default.endTiming;exports.default = 


{ run: run };
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _tag_expression_parser = require('cucumber-tag-expressions/lib/tag_expression_parser');var _tag_expression_parser2 = _interopRequireDefault(_tag_expression_parser);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var FEATURE_LINENUM_REGEXP = /^(.*?)((?::[\d]+)+)?$/;
var tagExpressionParser = new _tag_expression_parser2.default();var 

ScenarioFilter = function () {
  function ScenarioFilter(_ref) {var cwd = _ref.cwd;var featurePaths = _ref.featurePaths;var names = _ref.names;var tagExpression = _ref.tagExpression;(0, _classCallCheck3.default)(this, ScenarioFilter);
    this.cwd = cwd;
    this.featureUriToLinesMapping = this.getFeatureUriToLinesMapping(featurePaths || []);
    this.names = names || [];
    if (tagExpression) {
      this.tagExpressionNode = tagExpressionParser.parse(tagExpression || '');}}(0, _createClass3.default)(ScenarioFilter, [{ key: 'getFeatureUriToLinesMapping', value: function getFeatureUriToLinesMapping(



    featurePaths) {var _this = this;
      var mapping = {};
      featurePaths.forEach(function (featurePath) {
        var match = FEATURE_LINENUM_REGEXP.exec(featurePath);
        if (match) {(function () {
            var uri = _path2.default.resolve(_this.cwd, match[1]);
            var linesExpression = match[2];
            if (linesExpression) {
              if (!mapping[uri]) {
                mapping[uri] = [];}

              linesExpression.slice(1).split(':').forEach(function (line) {
                mapping[uri].push(parseInt(line));});}})();}});




      return mapping;} }, { key: 'matches', value: function matches(


    scenario) {
      return this.matchesAnyLine(scenario) && 
      this.matchesAnyName(scenario) && 
      this.matchesAllTagExpressions(scenario);} }, { key: 'matchesAnyLine', value: function matchesAnyLine(


    scenario) {
      var lines = this.featureUriToLinesMapping[scenario.uri];
      if (lines) {
        return _lodash2.default.size(_lodash2.default.intersection(lines, scenario.lines)) > 0;} else 
      {
        return true;}} }, { key: 'matchesAnyName', value: function matchesAnyName(



    scenario) {
      if (this.names.length === 0) {
        return true;}

      var scenarioName = scenario.name;
      return _lodash2.default.some(this.names, function (name) {
        return scenarioName.match(name);});} }, { key: 'matchesAllTagExpressions', value: function matchesAllTagExpressions(



    scenario) {
      if (!this.tagExpressionNode) {
        return true;}

      var scenarioTags = scenario.tags.map(function (t) {return t.name;});
      return this.tagExpressionNode.evaluate(scenarioTags);} }]);return ScenarioFilter;}();exports.default = ScenarioFilter;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.













addStatusPredicates = addStatusPredicates;exports.







getStatusMapping = getStatusMapping;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _upperCaseFirst = require('upper-case-first');var _upperCaseFirst2 = _interopRequireDefault(_upperCaseFirst);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var statuses = { AMBIGUOUS: 'ambiguous', FAILED: 'failed', PASSED: 'passed', PENDING: 'pending', SKIPPED: 'skipped', UNDEFINED: 'undefined' };exports.default = statuses;function addStatusPredicates(protoype) {_lodash2.default.each(statuses, function (status) {protoype['is' + (0, _upperCaseFirst2.default)(status)] = function () {return this.status === status;};});}function getStatusMapping(initialValue) {
  return _lodash2.default.chain(statuses).
  map(function (status) {return [status, initialValue];}).
  fromPairs().
  value();}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.


























































wrapDefinitions = wrapDefinitions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _utilArity = require('util-arity');var _utilArity2 = _interopRequireDefault(_utilArity);var _isGenerator = require('is-generator');var _isGenerator2 = _interopRequireDefault(_isGenerator);var _cucumberExpressions = require('cucumber-expressions');var _path = require('path');var _path2 = _interopRequireDefault(_path);var _transform_lookup_builder = require('./transform_lookup_builder');var _transform_lookup_builder2 = _interopRequireDefault(_transform_lookup_builder);var _helpers = require('./helpers');var helpers = _interopRequireWildcard(_helpers);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function build(_ref) {var cwd = _ref.cwd;var fns = _ref.fns;var options = { afterHookDefinitions: [], beforeHookDefinitions: [], defaultTimeout: 5000, listeners: [], stepDefinitions: [], transformLookup: _transform_lookup_builder2.default.build() };var definitionFunctionWrapper = null;var fnContext = { addTransform: function addTransform(_ref2) {var captureGroupRegexps = _ref2.captureGroupRegexps;var transformer = _ref2.transformer;var typeName = _ref2.typeName;var transform = new _cucumberExpressions.Transform(typeName, function () {}, captureGroupRegexps, transformer);options.transformLookup.addTransform(transform);}, After: helpers.defineHook(options.afterHookDefinitions), Before: helpers.defineHook(options.beforeHookDefinitions), defineStep: helpers.defineStep(options.stepDefinitions), registerHandler: helpers.registerHandler(cwd, options.listeners), registerListener: function registerListener(listener) {options.listeners.push(listener);}, setDefaultTimeout: function setDefaultTimeout(milliseconds) {options.defaultTimeout = milliseconds;}, setDefinitionFunctionWrapper: function setDefinitionFunctionWrapper(fn) {definitionFunctionWrapper = fn;}, World: function World(parameters) {this.parameters = parameters;} };fnContext.Given = fnContext.When = fnContext.Then = fnContext.defineStep;fns.forEach(function (fn) {return fn.call(fnContext);});wrapDefinitions({ cwd: cwd, definitionFunctionWrapper: definitionFunctionWrapper, definitions: _lodash2.default.chain(['afterHook', 'beforeHook', 'step']).map(function (key) {return options[key + 'Definitions'];}).flatten().value() });options.World = fnContext.World;return options;}function wrapDefinitions(_ref3) {var cwd = _ref3.cwd;var definitionFunctionWrapper = _ref3.definitionFunctionWrapper;var definitions = _ref3.definitions;
  if (definitionFunctionWrapper) {
    definitions.forEach(function (definition) {
      var codeLength = definition.code.length;
      var wrappedFn = definitionFunctionWrapper(definition.code);
      if (wrappedFn !== definition.code) {
        definition.code = (0, _utilArity2.default)(codeLength, wrappedFn);}});} else 


  {
    var generatorDefinitions = _lodash2.default.filter(definitions, function (definition) {
      return _isGenerator2.default.fn(definition.code);});

    if (generatorDefinitions.length > 0) {
      var references = generatorDefinitions.map(function (definition) {
        return _path2.default.relative(cwd, definition.uri) + ':' + definition.line;}).
      join('\n  ');
      var message = '\n        The following hook/step definitions use generator functions:\n\n          ' + 


      references + '\n\n        Use \'this.setDefinitionFunctionWrapper(fn)\' to wrap then in a function that returns a promise.\n        ';



      throw new Error(message);}}}exports.default = 




{ build: build };
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.





defineHook = defineHook;exports.













defineStep = defineStep;exports.



















registerHandler = registerHandler;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);var _hook_definition = require('../models/hook_definition');var _hook_definition2 = _interopRequireDefault(_hook_definition);var _listener = require('../listener');var _listener2 = _interopRequireDefault(_listener);var _stacktraceJs = require('stacktrace-js');var _stacktraceJs2 = _interopRequireDefault(_stacktraceJs);var _step_definition = require('../models/step_definition');var _step_definition2 = _interopRequireDefault(_step_definition);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function defineHook(collection) {return function (options, code) {if (typeof options === 'string') {options = { tags: options };} else if (typeof options === 'function') {code = options;options = {};}var _getDefinitionLineAnd = getDefinitionLineAndUri();var line = _getDefinitionLineAnd.line;var uri = _getDefinitionLineAnd.uri;var hookDefinition = new _hook_definition2.default({ code: code, line: line, options: options, uri: uri });collection.push(hookDefinition);};}function defineStep(collection) {return function (pattern, options, code) {if (typeof options === 'function') {code = options;options = {};}var _getDefinitionLineAnd2 = getDefinitionLineAndUri();var line = _getDefinitionLineAnd2.line;var uri = _getDefinitionLineAnd2.uri;var stepDefinition = new _step_definition2.default({ code: code, line: line, options: options, pattern: pattern, uri: uri });collection.push(stepDefinition);};}function getDefinitionLineAndUri() {var stackframes = _stacktraceJs2.default.getSync();var stackframe = stackframes.length > 2 ? stackframes[2] : stackframes[0];var line = stackframe.getLineNumber();var uri = stackframe.getFileName() || 'unknown';return { line: line, uri: uri };}function registerHandler(cwd, collection) {
  return function (eventName, options, handler) {
    if (typeof options === 'function') {
      handler = options;
      options = {};}

    _lodash2.default.assign(options, getDefinitionLineAndUri(), { cwd: cwd });
    var listener = new _listener2.default(options);
    listener['handle' + eventName] = handler;
    collection.push(listener);};}
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _cucumberExpressions = require('cucumber-expressions');

function build() {
  var transformLookup = new _cucumberExpressions.TransformLookup();
  var stringInDoubleQuotesTransform = new _cucumberExpressions.Transform(
  'stringInDoubleQuotes', 
  function () {}, 
  '"[^"]*"', 
  JSON.parse);

  transformLookup.addTransform(stringInDoubleQuotesTransform);
  return transformLookup;}exports.default = 


{ build: build };
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var previousTimestamp = void 0;

var methods = { 
  beginTiming: function beginTiming() {
    previousTimestamp = getTimestamp();}, 

  clearInterval: clearInterval.bind(global), 
  clearTimeout: clearTimeout.bind(global), 
  Date: Date, 
  endTiming: function endTiming() {
    return getTimestamp() - previousTimestamp;}, 

  setInterval: setInterval.bind(global), 
  setTimeout: setTimeout.bind(global) };


if (typeof setImmediate !== 'undefined') {
  methods.setImmediate = setImmediate.bind(global);
  methods.clearImmediate = clearImmediate.bind(global);}


function getTimestamp() {
  return new methods.Date().getTime();}exports.default = 


methods;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var UncaughtExceptionManager = function () {function UncaughtExceptionManager() {(0, _classCallCheck3.default)(this, UncaughtExceptionManager);}(0, _createClass3.default)(UncaughtExceptionManager, null, [{ key: 'registerHandler', value: function registerHandler(
    handler) {
      if (process.on) {
        process.on('uncaughtException', handler);} else 
      if (typeof window !== 'undefined') {
        window.onerror = handler;}} }, { key: 'unregisterHandler', value: function unregisterHandler(



    handler) {
      if (process.removeListener) {
        process.removeListener('uncaughtException', handler);} else 
      if (typeof window !== 'undefined') {
        window.onerror = void 0;}} }]);return UncaughtExceptionManager;}();exports.default = UncaughtExceptionManager;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _time = require('./time');var _time2 = _interopRequireDefault(_time);
var _uncaught_exception_manager = require('./uncaught_exception_manager');var _uncaught_exception_manager2 = _interopRequireDefault(_uncaught_exception_manager);
var _util = require('util');var _util2 = _interopRequireDefault(_util);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

UserCodeRunner = function () {function UserCodeRunner() {(0, _classCallCheck3.default)(this, UserCodeRunner);}(0, _createClass3.default)(UserCodeRunner, null, [{ key: 'run', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {var 
        argsArray = _ref.argsArray;var thisArg = _ref.thisArg;var fn = _ref.fn;var timeoutInMilliseconds = _ref.timeoutInMilliseconds;var 
        callbackDeferred, 








        fnReturn, 



        _error, 



        racingPromises, 
        callbackInterface, 
        promiseInterface, 











        uncaughtExceptionDeferred, 
        exceptionHandler, 





        timeoutDeferred, 






        error, result;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:callbackDeferred = _bluebird2.default.defer();argsArray.push(function (error, result) {if (error) {callbackDeferred.reject(error);} else {callbackDeferred.resolve(result);}});fnReturn = void 0;_context.prev = 3;fnReturn = fn.apply(thisArg, argsArray);_context.next = 11;break;case 7:_context.prev = 7;_context.t0 = _context['catch'](3);_error = _context.t0 instanceof Error ? _context.t0 : _util2.default.format(_context.t0);return _context.abrupt('return', { error: _error });case 11:racingPromises = [];callbackInterface = fn.length === argsArray.length;promiseInterface = fnReturn && typeof fnReturn.then === 'function';if (!(callbackInterface && promiseInterface)) {_context.next = 18;break;}return _context.abrupt('return', { error: 'function uses multiple asynchronous interfaces: callback and promise' });case 18:if (!callbackInterface) {_context.next = 22;break;}racingPromises.push(callbackDeferred.promise);_context.next = 27;break;case 22:if (!promiseInterface) {_context.next = 26;break;}racingPromises.push(fnReturn);_context.next = 27;break;case 26:return _context.abrupt('return', { result: fnReturn });case 27:uncaughtExceptionDeferred = _bluebird2.default.defer();exceptionHandler = function exceptionHandler(err) {uncaughtExceptionDeferred.reject(err);};_uncaught_exception_manager2.default.registerHandler(exceptionHandler);racingPromises.push(uncaughtExceptionDeferred.promise);timeoutDeferred = _bluebird2.default.defer();_time2.default.setTimeout(function () {var timeoutMessage = 'function timed out after ' + timeoutInMilliseconds + ' milliseconds';timeoutDeferred.reject(new Error(timeoutMessage));}, timeoutInMilliseconds);racingPromises.push(timeoutDeferred.promise);error = void 0, result = void 0;_context.prev = 35;_context.next = 38;return (

                  _bluebird2.default.race(racingPromises));case 38:result = _context.sent;_context.next = 44;break;case 41:_context.prev = 41;_context.t1 = _context['catch'](35);

                if (_context.t1 instanceof Error) {
                  error = _context.t1;} else 
                if (_context.t1) {
                  error = _util2.default.format(_context.t1);} else 
                {
                  error = 'Promise rejected without a reason';}case 44:



                _uncaught_exception_manager2.default.unregisterHandler(exceptionHandler);return _context.abrupt('return', 

                { error: error, result: result });case 46:case 'end':return _context.stop();}}}, _callee, this, [[3, 7], [35, 41]]);}));function run(_x) {return ref.apply(this, arguments);}return run;}() }]);return UserCodeRunner;}();exports.default = UserCodeRunner;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkvYXJndl9wYXJzZXIuanMiLCIuLi9zcmMvY2xpL2NvbmZpZ3VyYXRpb25fYnVpbGRlci5qcyIsIi4uL3NyYy9jbGkvZmVhdHVyZV9wYXJzZXIuanMiLCIuLi9zcmMvY2xpL2hlbHBlcnMuanMiLCIuLi9zcmMvY2xpL2luZGV4LmpzIiwiLi4vc3JjL2NsaS9wYXRoX2V4cGFuZGVyLmpzIiwiLi4vc3JjL2NsaS9wcm9maWxlX2xvYWRlci5qcyIsIi4uL3NyYy9jbGkvcnVuLmpzIiwiLi4vc3JjL2Zvcm1hdHRlci9idWlsZGVyLmpzIiwiLi4vc3JjL2Zvcm1hdHRlci9nZXRfY29sb3JfZm5zLmpzIiwiLi4vc3JjL2Zvcm1hdHRlci9pbmRleC5qcyIsIi4uL3NyYy9mb3JtYXR0ZXIvanNvbl9mb3JtYXR0ZXIuanMiLCIuLi9zcmMvZm9ybWF0dGVyL3ByZXR0eV9mb3JtYXR0ZXIuanMiLCIuLi9zcmMvZm9ybWF0dGVyL3Byb2dyZXNzX2Zvcm1hdHRlci5qcyIsIi4uL3NyYy9mb3JtYXR0ZXIvcmVydW5fZm9ybWF0dGVyLmpzIiwiLi4vc3JjL2Zvcm1hdHRlci9zbmlwcGV0c19mb3JtYXR0ZXIuanMiLCIuLi9zcmMvZm9ybWF0dGVyL3N0ZXBfZGVmaW5pdGlvbl9zbmlwcGV0X2J1aWxkZXIvaW5kZXguanMiLCIuLi9zcmMvZm9ybWF0dGVyL3N0ZXBfZGVmaW5pdGlvbl9zbmlwcGV0X2J1aWxkZXIvamF2YXNjcmlwdF9zbmlwcGV0X3N5bnRheC5qcyIsIi4uL3NyYy9mb3JtYXR0ZXIvc3VtbWFyeV9mb3JtYXR0ZXIuanMiLCIuLi9zcmMvZm9ybWF0dGVyL3V0aWxzLmpzIiwiLi4vc3JjL2luZGV4LmpzIiwiLi4vc3JjL2tleXdvcmRfdHlwZS5qcyIsIi4uL3NyYy9saXN0ZW5lci5qcyIsIi4uL3NyYy9tb2RlbHMvZmVhdHVyZS5qcyIsIi4uL3NyYy9tb2RlbHMvZmVhdHVyZXNfcmVzdWx0LmpzIiwiLi4vc3JjL21vZGVscy9ob29rLmpzIiwiLi4vc3JjL21vZGVscy9ob29rX2RlZmluaXRpb24uanMiLCIuLi9zcmMvbW9kZWxzL3NjZW5hcmlvLmpzIiwiLi4vc3JjL21vZGVscy9zY2VuYXJpb19yZXN1bHQuanMiLCIuLi9zcmMvbW9kZWxzL3N0ZXAuanMiLCIuLi9zcmMvbW9kZWxzL3N0ZXBfYXJndW1lbnRzL2RhdGFfdGFibGUuanMiLCIuLi9zcmMvbW9kZWxzL3N0ZXBfYXJndW1lbnRzL2RvY19zdHJpbmcuanMiLCIuLi9zcmMvbW9kZWxzL3N0ZXBfYXJndW1lbnRzL2luZGV4LmpzIiwiLi4vc3JjL21vZGVscy9zdGVwX2RlZmluaXRpb24uanMiLCIuLi9zcmMvbW9kZWxzL3N0ZXBfcmVzdWx0LmpzIiwiLi4vc3JjL21vZGVscy90YWcuanMiLCIuLi9zcmMvcnVudGltZS9hdHRhY2htZW50X21hbmFnZXIvYXR0YWNobWVudC5qcyIsIi4uL3NyYy9ydW50aW1lL2F0dGFjaG1lbnRfbWFuYWdlci9pbmRleC5qcyIsIi4uL3NyYy9ydW50aW1lL2V2ZW50LmpzIiwiLi4vc3JjL3J1bnRpbWUvZXZlbnRfYnJvYWRjYXN0ZXIuanMiLCIuLi9zcmMvcnVudGltZS9mZWF0dXJlc19ydW5uZXIuanMiLCIuLi9zcmMvcnVudGltZS9pbmRleC5qcyIsIi4uL3NyYy9ydW50aW1lL3NjZW5hcmlvX3J1bm5lci5qcyIsIi4uL3NyYy9ydW50aW1lL3N0YWNrX3RyYWNlX2ZpbHRlci5qcyIsIi4uL3NyYy9ydW50aW1lL3N0ZXBfcnVubmVyLmpzIiwiLi4vc3JjL3NjZW5hcmlvX2ZpbHRlci5qcyIsIi4uL3NyYy9zdGF0dXMuanMiLCIuLi9zcmMvc3VwcG9ydF9jb2RlX2xpYnJhcnkvYnVpbGRlci5qcyIsIi4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeS9oZWxwZXJzLmpzIiwiLi4vc3JjL3N1cHBvcnRfY29kZV9saWJyYXJ5L3RyYW5zZm9ybV9sb29rdXBfYnVpbGRlci5qcyIsIi4uL3NyYy90aW1lLmpzIiwiLi4vc3JjL3VuY2F1Z2h0X2V4Y2VwdGlvbl9tYW5h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LEUsVUFHSCx5QixHQUE0QixtQkFBUSxLQUFSLEUsQ0FDNUIsZ0IsR0FBbUIsU0FBbkIsZ0JBQW1CLENBQVMsR0FBVCxFQUFjLENBQ3JDLDBCQUEwQixNQUExQixDQUFpQyxHQUFqQyxFQUNELEMsQ0FDRCxxQ0FBeUIsZUFBekIsQ0FBeUMsZ0JBQXpDLEVBQ0EsZUFBZSxJQUFmLENBQW9CLDBCQUEwQixPQUE5QyxFQUVNLGUsR0FBa0IsbUJBQVEsS0FBUixFLENBQ3hCLGVBQUssVUFBTCxDQUFnQixZQUFXLENBQ3pCLElBQU0saUJBQWlCLDhCQUE4QixxQkFBOUIsR0FBc0QsZUFBN0UsQ0FDQSxnQkFBZ0IsTUFBaEIsQ0FBdUIsSUFBSSxLQUFKLENBQVUsY0FBVixDQUF2QixFQUNELENBSEQsRUFHRyxxQkFISCxFQUlBLGVBQWUsSUFBZixDQUFvQixnQkFBZ0IsT0FBcEMsRUFFSSxLLFdBQU8sTTs7QUFFTSxxQ0FBUSxJQUFSLENBQWEsY0FBYixDLFVBQWYsTTs7QUFFQSxvQkFBSyx1QkFBYSxLQUFsQixFQUEwQjtBQUN4QixzQ0FDRCxDQUZEO0FBRU8saUNBQU87QUFDWiwwQkFBUSxlQUFLLE1BQUwsYUFBUixDQUNELENBRk07QUFFQTtBQUNMLDBCQUFRLG1DQUFSLENBQ0QsQzs7OztBQUdILHFEQUF5QixpQkFBekIsQ0FBMkMsZ0JBQTNDLEU7O0FBRU8sa0JBQUMsWUFBRCxFQUFRLGNBQVIsRSw0TUE5RFUsYyIsImZpbGUiOiJjdWN1bWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7Q29tbWFuZH0gZnJvbSAnY29tbWFuZGVyJ1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmd2UGFyc2VyIHtcbiAgc3RhdGljIGNvbGxlY3QodmFsLCBtZW1vKSB7XG4gICAgbWVtby5wdXNoKHZhbClcbiAgICByZXR1cm4gbWVtb1xuICB9XG5cbiAgc3RhdGljIG1lcmdlSnNvbihvcHRpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyLCBtZW1vKSB7XG4gICAgICBsZXQgdmFsXG4gICAgICB0cnkge1xuICAgICAgICB2YWwgPSBKU09OLnBhcnNlKHN0cilcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihvcHRpb24gKyAnIHBhc3NlZCBpbnZhbGlkIEpTT046ICcgKyBlcnJvci5tZXNzYWdlICsgJzogJyArIHN0cilcbiAgICAgIH1cbiAgICAgIGlmICghXy5pc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG9wdGlvbiArICcgbXVzdCBiZSBwYXNzZWQgSlNPTiBvZiBhbiBvYmplY3Q6ICcgKyBzdHIpXG4gICAgICB9XG4gICAgICByZXR1cm4gXy5tZXJnZShtZW1vLCB2YWwpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHBhcnNlIChhcmd2KSB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKHBhdGguYmFzZW5hbWUoYXJndlsxXSkpXG5cbiAgICBwcm9ncmFtXG4gICAgICAudXNhZ2UoJ1tvcHRpb25zXSBbPERJUnxGSUxFWzpMSU5FXT4uLi5dJylcbiAgICAgIC52ZXJzaW9uKHZlcnNpb24sICctdiwgLS12ZXJzaW9uJylcbiAgICAgIC5vcHRpb24oJy1iLCAtLWJhY2t0cmFjZScsICdzaG93IGZ1bGwgYmFja3RyYWNlIGZvciBlcnJvcnMnKVxuICAgICAgLm9wdGlvbignLS1jb21waWxlciA8RVhURU5TSU9OOk1PRFVMRT4nLCAncmVxdWlyZSBmaWxlcyB3aXRoIHRoZSBnaXZlbiBFWFRFTlNJT04gYWZ0ZXIgcmVxdWlyaW5nIE1PRFVMRSAocmVwZWF0YWJsZSknLCBBcmd2UGFyc2VyLmNvbGxlY3QsIFtdKVxuICAgICAgLm9wdGlvbignLWQsIC0tZHJ5LXJ1bicsICdpbnZva2UgZm9ybWF0dGVycyB3aXRob3V0IGV4ZWN1dGluZyBzdGVwcycpXG4gICAgICAub3B0aW9uKCctLWZhaWwtZmFzdCcsICdhYm9ydCB0aGUgcnVuIG9uIGZpcnN0IGZhaWx1cmUnKVxuICAgICAgLm9wdGlvbignLWYsIC0tZm9ybWF0IDxUWVBFWzpQQVRIXT4nLCAnc3BlY2lmeSB0aGUgb3V0cHV0IGZvcm1hdCwgb3B0aW9uYWxseSBzdXBwbHkgUEFUSCB0byByZWRpcmVjdCBmb3JtYXR0ZXIgb3V0cHV0IChyZXBlYXRhYmxlKScsIEFyZ3ZQYXJzZXIuY29sbGVjdCwgW10pXG4gICAgICAub3B0aW9uKCctLWZvcm1hdC1vcHRpb25zIDxKU09OPicsICdwcm92aWRlIG9wdGlvbnMgZm9yIGZvcm1hdHRlcnMgKHJlcGVhdGFibGUpJywgQXJndlBhcnNlci5tZXJnZUpzb24oJy0tZm9ybWF0LW9wdGlvbnMnKSwge30pXG4gICAgICAub3B0aW9uKCctLW5hbWUgPFJFR0VYUD4nLCAnb25seSBleGVjdXRlIHRoZSBzY2VuYXJpb3Mgd2l0aCBuYW1lIG1hdGNoaW5nIHRoZSBleHByZXNzaW9uIChyZXBlYXRhYmxlKScsIEFyZ3ZQYXJzZXIuY29sbGVjdCwgW10pXG4gICAgICAub3B0aW9uKCctcCwgLS1wcm9maWxlIDxOQU1FPicsICdzcGVjaWZ5IHRoZSBwcm9maWxlIHRvIHVzZSAocmVwZWF0YWJsZSknLCBBcmd2UGFyc2VyLmNvbGxlY3QsIFtdKVxuICAgICAgLm9wdGlvbignLXIsIC0tcmVxdWlyZSA8RklMRXxESVI+JywgJ3JlcXVpcmUgZmlsZXMgYmVmb3JlIGV4ZWN1dGluZyBmZWF0dXJlcyAocmVwZWF0YWJsZSknLCBBcmd2UGFyc2VyLmNvbGxlY3QsIFtdKVxuICAgICAgLm9wdGlvbignLVMsIC0tc3RyaWN0JywgJ2ZhaWwgaWYgdGhlcmUgYXJlIGFueSB1bmRlZmluZWQgb3IgcGVuZGluZyBzdGVwcycpXG4gICAgICAub3B0aW9uKCctdCwgLS10YWdzIDxFWFBSRVNTSU9OPicsICdvbmx5IGV4ZWN1dGUgdGhlIGZlYXR1cmVzIG9yIHNjZW5hcmlvcyB3aXRoIHRhZ3MgbWF0Y2hpbmcgdGhlIGV4cHJlc3Npb24nLCAnJylcbiAgICAgIC5vcHRpb24oJy0td29ybGQtcGFyYW1ldGVycyA8SlNPTj4nLCAncHJvdmlkZSBwYXJhbWV0ZXJzIHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHdvcmxkIGNvbnN0cnVjdG9yIChyZXBlYXRhYmxlKScsIEFyZ3ZQYXJzZXIubWVyZ2VKc29uKCctLXdvcmxkLXBhcmFtZXRlcnMnKSwge30pXG5cbiAgICBwcm9ncmFtLm9uKCctLWhlbHAnLCAoKSA9PiB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICBjb25zb2xlLmxvZygnICBGb3IgbW9yZSBkZXRhaWxzIHBsZWFzZSB2aXNpdCBodHRwczovL2dpdGh1Yi5jb20vY3VjdW1iZXIvY3VjdW1iZXItanMjY2xpXFxuJylcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICAgIH0pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3YpXG5cbiAgICByZXR1cm4ge1xuICAgICAgb3B0aW9uczogcHJvZ3JhbS5vcHRzKCksXG4gICAgICBhcmdzOiBwcm9ncmFtLmFyZ3NcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBBcmd2UGFyc2VyIGZyb20gJy4vYXJndl9wYXJzZXInXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFBhdGhFeHBhbmRlciBmcm9tICcuL3BhdGhfZXhwYW5kZXInXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlndXJhdGlvbkJ1aWxkZXIge1xuICBzdGF0aWMgYXN5bmMgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGJ1aWxkZXIgPSBuZXcgQ29uZmlndXJhdGlvbkJ1aWxkZXIob3B0aW9ucylcbiAgICByZXR1cm4gYXdhaXQgYnVpbGRlci5idWlsZCgpXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7YXJndiwgY3dkfSkge1xuICAgIHRoaXMuY3dkID0gY3dkXG4gICAgdGhpcy5wYXRoRXhwYW5kZXIgPSBuZXcgUGF0aEV4cGFuZGVyKGN3ZClcblxuICAgIGNvbnN0IHBhcnNlZEFyZ3YgPSBBcmd2UGFyc2VyLnBhcnNlKGFyZ3YpXG4gICAgdGhpcy5hcmdzID0gcGFyc2VkQXJndi5hcmdzXG4gICAgdGhpcy5vcHRpb25zID0gcGFyc2VkQXJndi5vcHRpb25zXG4gIH1cblxuICBhc3luYyBidWlsZCgpIHtcbiAgICBjb25zdCB1bmV4cGFuZGVkRmVhdHVyZVBhdGhzID0gYXdhaXQgdGhpcy5nZXRVbmV4cGFuZGVkRmVhdHVyZVBhdGhzKClcbiAgICBjb25zdCBmZWF0dXJlUGF0aHMgPSBhd2FpdCB0aGlzLmV4cGFuZEZlYXR1cmVQYXRocyh1bmV4cGFuZGVkRmVhdHVyZVBhdGhzKVxuICAgIGNvbnN0IGZlYXR1cmVEaXJlY3RvcnlQYXRocyA9IHRoaXMuZ2V0RmVhdHVyZURpcmVjdG9yeVBhdGhzKGZlYXR1cmVQYXRocylcbiAgICBjb25zdCB1bmV4cGFuZGVkU3VwcG9ydENvZGVQYXRocyA9IHRoaXMub3B0aW9ucy5yZXF1aXJlLmxlbmd0aCA+IDAgPyB0aGlzLm9wdGlvbnMucmVxdWlyZSA6IGZlYXR1cmVEaXJlY3RvcnlQYXRoc1xuICAgIGNvbnN0IHN1cHBvcnRDb2RlUGF0aHMgPSBhd2FpdCB0aGlzLmV4cGFuZFN1cHBvcnRDb2RlUGF0aHModW5leHBhbmRlZFN1cHBvcnRDb2RlUGF0aHMpXG4gICAgcmV0dXJuIHtcbiAgICAgIGZlYXR1cmVQYXRocyxcbiAgICAgIGZvcm1hdHM6IHRoaXMuZ2V0Rm9ybWF0cygpLFxuICAgICAgZm9ybWF0T3B0aW9uczogdGhpcy5nZXRGb3JtYXRPcHRpb25zKCksXG4gICAgICBwcm9maWxlczogdGhpcy5vcHRpb25zLnByb2ZpbGUsXG4gICAgICBydW50aW1lT3B0aW9uczoge1xuICAgICAgICBkcnlSdW46ICEhdGhpcy5vcHRpb25zLmRyeVJ1bixcbiAgICAgICAgZmFpbEZhc3Q6ICEhdGhpcy5vcHRpb25zLmZhaWxGYXN0LFxuICAgICAgICBmaWx0ZXJTdGFja3RyYWNlczogIXRoaXMub3B0aW9ucy5iYWNrdHJhY2UsXG4gICAgICAgIHN0cmljdDogISF0aGlzLm9wdGlvbnMuc3RyaWN0LFxuICAgICAgICB3b3JsZFBhcmFtZXRlcnM6IHRoaXMub3B0aW9ucy53b3JsZFBhcmFtZXRlcnNcbiAgICAgIH0sXG4gICAgICBzY2VuYXJpb0ZpbHRlck9wdGlvbnM6IHtcbiAgICAgICAgY3dkOiB0aGlzLmN3ZCxcbiAgICAgICAgZmVhdHVyZVBhdGhzOiB1bmV4cGFuZGVkRmVhdHVyZVBhdGhzLFxuICAgICAgICBuYW1lczogdGhpcy5vcHRpb25zLm5hbWUsXG4gICAgICAgIHRhZ0V4cHJlc3Npb246IHRoaXMub3B0aW9ucy50YWdzXG4gICAgICB9LFxuICAgICAgc3VwcG9ydENvZGVQYXRoc1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGV4cGFuZEZlYXR1cmVQYXRocyhmZWF0dXJlUGF0aHMpIHtcbiAgICBmZWF0dXJlUGF0aHMgPSBmZWF0dXJlUGF0aHMubWFwKChwKSA9PiBwLnJlcGxhY2UoLyg6XFxkKykqJC9nLCAnJykpIC8vIFN0cmlwIGxpbmUgbnVtYmVyc1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnBhdGhFeHBhbmRlci5leHBhbmRQYXRoc1dpdGhFeHRlbnNpb25zKGZlYXR1cmVQYXRocywgWydmZWF0dXJlJ10pXG4gIH1cblxuICBnZXRGZWF0dXJlRGlyZWN0b3J5UGF0aHMoZmVhdHVyZVBhdGhzKSB7XG4gICAgY29uc3QgZmVhdHVyZURpcnMgPSBmZWF0dXJlUGF0aHMubWFwKChmZWF0dXJlUGF0aCkgPT4ge1xuICAgICAgcmV0dXJuIHBhdGgucmVsYXRpdmUodGhpcy5jd2QsIHBhdGguZGlybmFtZShmZWF0dXJlUGF0aCkpXG4gICAgfSlcbiAgICByZXR1cm4gXy51bmlxKGZlYXR1cmVEaXJzKVxuICB9XG5cbiAgZ2V0Rm9ybWF0T3B0aW9ucygpIHtcbiAgICBjb25zdCBmb3JtYXRPcHRpb25zID0gXy5jbG9uZSh0aGlzLm9wdGlvbnMuZm9ybWF0T3B0aW9ucylcbiAgICBmb3JtYXRPcHRpb25zLmN3ZCA9IHRoaXMuY3dkXG4gICAgXy5kZWZhdWx0cyhmb3JtYXRPcHRpb25zLCB7Y29sb3JzRW5hYmxlZDogdHJ1ZX0pXG4gICAgcmV0dXJuIGZvcm1hdE9wdGlvbnNcbiAgfVxuXG4gIGdldEZvcm1hdHMoKSB7XG4gICAgY29uc3QgbWFwcGluZyA9IHsnJzogJ3ByZXR0eSd9XG4gICAgdGhpcy5vcHRpb25zLmZvcm1hdC5mb3JFYWNoKGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgIGNvbnN0IHBhcnRzID0gZm9ybWF0LnNwbGl0KCc6JylcbiAgICAgIGNvbnN0IHR5cGUgPSBwYXJ0c1swXVxuICAgICAgY29uc3Qgb3V0cHV0VG8gPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc6JylcbiAgICAgIG1hcHBpbmdbb3V0cHV0VG9dID0gdHlwZVxuICAgIH0pXG4gICAgcmV0dXJuIF8ubWFwKG1hcHBpbmcsIGZ1bmN0aW9uKHR5cGUsIG91dHB1dFRvKSB7XG4gICAgICByZXR1cm4ge291dHB1dFRvLCB0eXBlfVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRVbmV4cGFuZGVkRmVhdHVyZVBhdGhzKCkge1xuICAgIGlmICh0aGlzLmFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmVzdGVkRmVhdHVyZVBhdGhzID0gYXdhaXQgUHJvbWlzZS5tYXAodGhpcy5hcmdzLCBhc3luYyAoYXJnKSA9PiB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUoYXJnKVxuICAgICAgICBpZiAoZmlsZW5hbWVbMF0gPT09ICdAJykge1xuICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHRoaXMuY3dkLCBhcmcpXG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAndXRmOCcpXG4gICAgICAgICAgcmV0dXJuIF8uY29tcGFjdChjb250ZW50LnNwbGl0KCdcXG4nKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYXJnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBjb25zdCBmZWF0dXJlUGF0aHMgPV8uZmxhdHRlbihuZXN0ZWRGZWF0dXJlUGF0aHMpXG4gICAgICBpZiAoZmVhdHVyZVBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVQYXRoc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWydmZWF0dXJlcyddXG4gIH1cblxuICBhc3luYyBleHBhbmRTdXBwb3J0Q29kZVBhdGhzKHN1cHBvcnRDb2RlUGF0aHMpIHtcbiAgICBjb25zdCBleHRlbnNpb25zID0gWydqcyddXG4gICAgdGhpcy5vcHRpb25zLmNvbXBpbGVyLmZvckVhY2goKGNvbXBpbGVyKSA9PiB7XG4gICAgICBjb25zdCBwYXJ0cyA9IGNvbXBpbGVyLnNwbGl0KCc6JylcbiAgICAgIGV4dGVuc2lvbnMucHVzaChwYXJ0c1swXSlcbiAgICAgIHJlcXVpcmUocGFydHNbMV0pXG4gICAgfSlcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5wYXRoRXhwYW5kZXIuZXhwYW5kUGF0aHNXaXRoRXh0ZW5zaW9ucyhzdXBwb3J0Q29kZVBhdGhzLCBleHRlbnNpb25zKVxuICB9XG59XG4iLCJpbXBvcnQgRmVhdHVyZSBmcm9tICcuLi9tb2RlbHMvZmVhdHVyZSdcbmltcG9ydCBHaGVya2luIGZyb20gJ2doZXJraW4nXG5cbmNvbnN0IGdoZXJraW5Db21waWxlciA9IG5ldyBHaGVya2luLkNvbXBpbGVyKClcbmNvbnN0IGdoZXJraW5QYXJzZXIgPSBuZXcgR2hlcmtpbi5QYXJzZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJzZXIge1xuICBzdGF0aWMgcGFyc2Uoe3NvdXJjZSwgdXJpfSkge1xuICAgIGxldCBnaGVya2luRG9jdW1lbnRcbiAgICB0cnkge1xuICAgICAgZ2hlcmtpbkRvY3VtZW50ID0gZ2hlcmtpblBhcnNlci5wYXJzZShzb3VyY2UpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLm1lc3NhZ2UgKz0gJ1xcbnBhdGg6ICcgKyB1cmlcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGZWF0dXJlKHtcbiAgICAgIGdoZXJraW5EYXRhOiBnaGVya2luRG9jdW1lbnQuZmVhdHVyZSxcbiAgICAgIGdoZXJraW5QaWNrbGVzOiBnaGVya2luQ29tcGlsZXIuY29tcGlsZShnaGVya2luRG9jdW1lbnQsIHVyaSksXG4gICAgICB1cmlcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgQXJndlBhcnNlciBmcm9tICcuL2FyZ3ZfcGFyc2VyJ1xuaW1wb3J0IGZzIGZyb20gJ216L2ZzJ1xuaW1wb3J0IFBhcnNlciBmcm9tICcuL2ZlYXR1cmVfcGFyc2VyJ1xuaW1wb3J0IFByb2ZpbGVMb2FkZXIgZnJvbSAnLi9wcm9maWxlX2xvYWRlcidcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRFeHBhbmRlZEFyZ3Yoe2FyZ3YsIGN3ZH0pIHtcbiAgbGV0IHtvcHRpb25zfSA9IEFyZ3ZQYXJzZXIucGFyc2UoYXJndilcbiAgbGV0IGZ1bGxBcmd2ID0gYXJndlxuICBjb25zdCBwcm9maWxlQXJndiA9IGF3YWl0IG5ldyBQcm9maWxlTG9hZGVyKGN3ZCkuZ2V0QXJndihvcHRpb25zLnByb2ZpbGUpXG4gIGlmIChwcm9maWxlQXJndi5sZW5ndGggPiAwKSB7XG4gICAgZnVsbEFyZ3YgPSBfLmNvbmNhdChhcmd2LnNsaWNlKDAsIDIpLCBwcm9maWxlQXJndiwgYXJndi5zbGljZSgyKSlcbiAgfVxuICByZXR1cm4gZnVsbEFyZ3Zcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RmVhdHVyZXMoZmVhdHVyZVBhdGhzKSB7XG4gIHJldHVybiBhd2FpdCBQcm9taXNlLm1hcChmZWF0dXJlUGF0aHMsIGFzeW5jIChmZWF0dXJlUGF0aCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IGF3YWl0IGZzLnJlYWRGaWxlKGZlYXR1cmVQYXRoLCAndXRmOCcpXG4gICAgcmV0dXJuIFBhcnNlci5wYXJzZSh7c291cmNlLCB1cmk6IGZlYXR1cmVQYXRofSlcbiAgfSlcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VwcG9ydENvZGVGdW5jdGlvbnMoc3VwcG9ydENvZGVQYXRocykge1xuICByZXR1cm4gXy5jaGFpbihzdXBwb3J0Q29kZVBhdGhzKVxuICAgIC5tYXAoKGNvZGVQYXRoKSA9PiB7XG4gICAgICBjb25zdCBjb2RlRXhwb3J0ID0gcmVxdWlyZShjb2RlUGF0aClcbiAgICAgIGlmICh0eXBlb2YoY29kZUV4cG9ydCkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNvZGVFeHBvcnRcbiAgICAgIH0gZWxzZSBpZiAoY29kZUV4cG9ydCAmJiB0eXBlb2YoY29kZUV4cG9ydC5kZWZhdWx0KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gY29kZUV4cG9ydC5kZWZhdWx0XG4gICAgICB9XG4gICAgfSlcbiAgICAuY29tcGFjdCgpXG4gICAgLnZhbHVlKClcbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7Z2V0RXhwYW5kZWRBcmd2LCBnZXRGZWF0dXJlcywgZ2V0U3VwcG9ydENvZGVGdW5jdGlvbnN9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCBDb25maWd1cmF0aW9uQnVpbGRlciBmcm9tICcuL2NvbmZpZ3VyYXRpb25fYnVpbGRlcidcbmltcG9ydCBGb3JtYXR0ZXJCdWlsZGVyIGZyb20gJy4uL2Zvcm1hdHRlci9idWlsZGVyJ1xuaW1wb3J0IGZzIGZyb20gJ216L2ZzJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgUnVudGltZSBmcm9tICcuLi9ydW50aW1lJ1xuaW1wb3J0IFNjZW5hcmlvRmlsdGVyIGZyb20gJy4uL3NjZW5hcmlvX2ZpbHRlcidcbmltcG9ydCBTdXBwb3J0Q29kZUxpYnJhcnlCdWlsZGVyIGZyb20gJy4uL3N1cHBvcnRfY29kZV9saWJyYXJ5L2J1aWxkZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaSB7XG4gIGNvbnN0cnVjdG9yICh7YXJndiwgY3dkLCBzdGRvdXR9KSB7XG4gICAgdGhpcy5hcmd2ID0gYXJndlxuICAgIHRoaXMuY3dkID0gY3dkXG4gICAgdGhpcy5zdGRvdXQgPSBzdGRvdXRcbiAgfVxuXG4gIGFzeW5jIGdldENvbmZpZ3VyYXRpb24oKSB7XG4gICAgY29uc3QgZnVsbEFyZ3YgPSBhd2FpdCBnZXRFeHBhbmRlZEFyZ3Yoe2FyZ3Y6IHRoaXMuYXJndiwgY3dkOiB0aGlzLmN3ZH0pXG4gICAgcmV0dXJuIGF3YWl0IENvbmZpZ3VyYXRpb25CdWlsZGVyLmJ1aWxkKHthcmd2OiBmdWxsQXJndiwgY3dkOiB0aGlzLmN3ZH0pXG4gIH1cblxuICBhc3luYyBnZXRGb3JtYXR0ZXJzKHtmb3JtYXRPcHRpb25zLCBmb3JtYXRzLCBzdXBwb3J0Q29kZUxpYnJhcnl9KSB7XG4gICAgY29uc3Qgc3RyZWFtc1RvQ2xvc2UgPSBbXVxuICAgIGNvbnN0IGZvcm1hdHRlcnMgPSBhd2FpdCBQcm9taXNlLm1hcChmb3JtYXRzLCBhc3luYyAoe3R5cGUsIG91dHB1dFRvfSkgPT4ge1xuICAgICAgbGV0IHN0cmVhbSA9IHRoaXMuc3Rkb3V0XG4gICAgICBpZiAob3V0cHV0VG8pIHtcbiAgICAgICAgbGV0IGZkID0gYXdhaXQgZnMub3BlbihvdXRwdXRUbywgJ3cnKVxuICAgICAgICBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShudWxsLCB7ZmR9KVxuICAgICAgICBzdHJlYW1zVG9DbG9zZS5wdXNoKHN0cmVhbSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGVPcHRpb25zID0gXy5hc3NpZ24oe2xvZzogOjpzdHJlYW0ud3JpdGUsIHN1cHBvcnRDb2RlTGlicmFyeX0sIGZvcm1hdE9wdGlvbnMpXG4gICAgICByZXR1cm4gRm9ybWF0dGVyQnVpbGRlci5idWlsZCh0eXBlLCB0eXBlT3B0aW9ucylcbiAgICB9KVxuICAgIGNvbnN0IGNsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmVhY2goc3RyZWFtc1RvQ2xvc2UsIChzdHJlYW0pID0+IFByb21pc2UucHJvbWlzaWZ5KDo6c3RyZWFtLmVuZCkoKSlcbiAgICB9XG4gICAgcmV0dXJuIHtjbGVhbnVwLCBmb3JtYXR0ZXJzfVxuICB9XG5cbiAgZ2V0U3VwcG9ydENvZGVMaWJyYXJ5KHN1cHBvcnRDb2RlUGF0aHMpIHtcbiAgICBjb25zdCBmbnMgPSBnZXRTdXBwb3J0Q29kZUZ1bmN0aW9ucyhzdXBwb3J0Q29kZVBhdGhzKVxuICAgIHJldHVybiBTdXBwb3J0Q29kZUxpYnJhcnlCdWlsZGVyLmJ1aWxkKHtjd2Q6IHRoaXMuY3dkLCBmbnN9KVxuICB9XG5cbiAgYXN5bmMgcnVuKCkge1xuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBhd2FpdCB0aGlzLmdldENvbmZpZ3VyYXRpb24oKVxuICAgIGNvbnN0IHN1cHBvcnRDb2RlTGlicmFyeSA9IHRoaXMuZ2V0U3VwcG9ydENvZGVMaWJyYXJ5KGNvbmZpZ3VyYXRpb24uc3VwcG9ydENvZGVQYXRocylcbiAgICBjb25zdCBbZmVhdHVyZXMsIHtjbGVhbnVwLCBmb3JtYXR0ZXJzfV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBnZXRGZWF0dXJlcyhjb25maWd1cmF0aW9uLmZlYXR1cmVQYXRocyksXG4gICAgICB0aGlzLmdldEZvcm1hdHRlcnMoe1xuICAgICAgICBmb3JtYXRPcHRpb25zOiBjb25maWd1cmF0aW9uLmZvcm1hdE9wdGlvbnMsXG4gICAgICAgIGZvcm1hdHM6IGNvbmZpZ3VyYXRpb24uZm9ybWF0cyxcbiAgICAgICAgc3VwcG9ydENvZGVMaWJyYXJ5XG4gICAgICB9KVxuICAgIF0pXG4gICAgY29uc3Qgc2NlbmFyaW9GaWx0ZXIgPSBuZXcgU2NlbmFyaW9GaWx0ZXIoY29uZmlndXJhdGlvbi5zY2VuYXJpb0ZpbHRlck9wdGlvbnMpXG4gICAgY29uc3QgcnVudGltZSA9IG5ldyBSdW50aW1lKHtcbiAgICAgIGZlYXR1cmVzLFxuICAgICAgbGlzdGVuZXJzOiBmb3JtYXR0ZXJzLFxuICAgICAgb3B0aW9uczogY29uZmlndXJhdGlvbi5ydW50aW1lT3B0aW9ucyxcbiAgICAgIHNjZW5hcmlvRmlsdGVyLFxuICAgICAgc3VwcG9ydENvZGVMaWJyYXJ5XG4gICAgfSlcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBydW50aW1lLnN0YXJ0KClcbiAgICBhd2FpdCBjbGVhbnVwKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBmcyBmcm9tICdtei9mcydcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGhFeHBhbmRlciB7XG4gIGNvbnN0cnVjdG9yKGRpcmVjdG9yeSkge1xuICAgIHRoaXMuZGlyZWN0b3J5ID0gZGlyZWN0b3J5XG4gIH1cblxuICBhc3luYyBleHBhbmRQYXRoc1dpdGhFeHRlbnNpb25zKHBhdGhzLCBleHRlbnNpb25zKSB7XG4gICAgY29uc3QgZXhwYW5kZWRQYXRocyA9IGF3YWl0IFByb21pc2UubWFwKHBhdGhzLCBhc3luYyAocCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZXhwYW5kUGF0aFdpdGhFeHRlbnNpb25zKHAsIGV4dGVuc2lvbnMpXG4gICAgfSlcbiAgICByZXR1cm4gXy51bmlxKF8uZmxhdHRlbihleHBhbmRlZFBhdGhzKSlcbiAgfVxuXG4gIGFzeW5jIGV4cGFuZFBhdGhXaXRoRXh0ZW5zaW9ucyhwLCBleHRlbnNpb25zKSB7XG4gICAgY29uc3QgcmVhbFBhdGggPSBhd2FpdCBmcy5yZWFscGF0aChwYXRoLnJlc29sdmUodGhpcy5kaXJlY3RvcnksIHApKVxuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgZnMuc3RhdChyZWFsUGF0aClcbiAgICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZXhwYW5kRGlyZWN0b3J5V2l0aEV4dGVuc2lvbnMocmVhbFBhdGgsIGV4dGVuc2lvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbcmVhbFBhdGhdXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZXhwYW5kRGlyZWN0b3J5V2l0aEV4dGVuc2lvbnMocmVhbFBhdGgsIGV4dGVuc2lvbnMpIHtcbiAgICBsZXQgcGF0dGVybiA9IHJlYWxQYXRoICsgJy8qKi8qLidcbiAgICBpZiAoZXh0ZW5zaW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICBwYXR0ZXJuICs9ICd7JyArIGV4dGVuc2lvbnMuam9pbignLCcpICsgJ30nXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdHRlcm4gKz0gZXh0ZW5zaW9uc1swXVxuICAgIH1cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5wcm9taXNpZnkoZ2xvYikocGF0dGVybilcbiAgICByZXR1cm4gcmVzdWx0cy5tYXAoKGZpbGVQYXRoKSA9PiBmaWxlUGF0aC5yZXBsYWNlKC9cXC8vZywgcGF0aC5zZXApKVxuICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHN0cmluZ0FyZ3YgZnJvbSAnc3RyaW5nLWFyZ3YnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2ZpbGVMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihkaXJlY3RvcnkpIHtcbiAgICB0aGlzLmRpcmVjdG9yeSA9IGRpcmVjdG9yeVxuICB9XG5cbiAgYXN5bmMgZ2V0RGVmaW5pdGlvbnMoKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbnNGaWxlUGF0aCA9IHBhdGguam9pbih0aGlzLmRpcmVjdG9yeSwgJ2N1Y3VtYmVyLmpzJylcbiAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBmcy5leGlzdHMoZGVmaW5pdGlvbnNGaWxlUGF0aClcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICAgIGNvbnN0IGRlZmluaXRpb25zID0gcmVxdWlyZShkZWZpbml0aW9uc0ZpbGVQYXRoKVxuICAgIGlmICh0eXBlb2YgZGVmaW5pdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZGVmaW5pdGlvbnNGaWxlUGF0aCArICcgZG9lcyBub3QgZXhwb3J0IGFuIG9iamVjdCcpXG4gICAgfVxuICAgIHJldHVybiBkZWZpbml0aW9uc1xuICB9XG5cbiAgYXN5bmMgZ2V0QXJndihwcm9maWxlcykge1xuICAgIGNvbnN0IGRlZmluaXRpb25zID0gYXdhaXQgdGhpcy5nZXREZWZpbml0aW9ucygpXG4gICAgaWYgKHByb2ZpbGVzLmxlbmd0aCA9PT0gMCAmJiBkZWZpbml0aW9uc1snZGVmYXVsdCddKSB7XG4gICAgICBwcm9maWxlcyA9IFsnZGVmYXVsdCddXG4gICAgfVxuICAgIHZhciBhcmd2cyA9IHByb2ZpbGVzLm1hcChmdW5jdGlvbiAocHJvZmlsZSl7XG4gICAgICBpZiAoIWRlZmluaXRpb25zW3Byb2ZpbGVdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5kZWZpbmVkIHByb2ZpbGU6ICcgKyBwcm9maWxlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmluZ0FyZ3YoZGVmaW5pdGlvbnNbcHJvZmlsZV0pXG4gICAgfSlcbiAgICByZXR1cm4gXy5mbGF0dGVuKGFyZ3ZzKVxuICB9XG59XG4iLCJpbXBvcnQgQ2xpIGZyb20gJy4vJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBydW4oKSB7XG4gIGNvbnN0IGNsaSA9IG5ldyBDbGkoe1xuICAgIGFyZ3Y6IHByb2Nlc3MuYXJndixcbiAgICBjd2Q6IHByb2Nlc3MuY3dkKCksXG4gICAgc3Rkb3V0OiBwcm9jZXNzLnN0ZG91dFxuICB9KVxuXG4gIGxldCBzdWNjZXNzXG4gIHRyeSB7XG4gICAgc3VjY2VzcyA9IGF3YWl0IGNsaS5ydW4oKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKXsgdGhyb3cgZXJyb3IgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGV4aXRDb2RlID0gc3VjY2VzcyA/IDAgOiAxXG4gIGZ1bmN0aW9uIGV4aXROb3coKSB7XG4gICAgcHJvY2Vzcy5leGl0KGV4aXRDb2RlKVxuICB9XG5cbiAgLy8gSWYgc3Rkb3V0LndyaXRlKCkgcmV0dXJuZWQgZmFsc2UsIGtlcm5lbCBidWZmZXIgaXMgbm90IGVtcHR5IHlldFxuICBpZiAocHJvY2Vzcy5zdGRvdXQud3JpdGUoJycpKSB7XG4gICAgZXhpdE5vdygpXG4gIH0gZWxzZSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQub24oJ2RyYWluJywgZXhpdE5vdylcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGdldENvbG9yRm5zIGZyb20gJy4vZ2V0X2NvbG9yX2ZucydcbmltcG9ydCBKYXZhc2NyaXB0U25pcHBldFN5bnRheCBmcm9tICcuL3N0ZXBfZGVmaW5pdGlvbl9zbmlwcGV0X2J1aWxkZXIvamF2YXNjcmlwdF9zbmlwcGV0X3N5bnRheCdcbmltcG9ydCBKc29uRm9ybWF0dGVyIGZyb20gJy4vanNvbl9mb3JtYXR0ZXInXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFByZXR0eUZvcm1hdHRlciBmcm9tICcuL3ByZXR0eV9mb3JtYXR0ZXInXG5pbXBvcnQgUHJvZ3Jlc3NGb3JtYXR0ZXIgZnJvbSAnLi9wcm9ncmVzc19mb3JtYXR0ZXInXG5pbXBvcnQgUmVydW5Gb3JtYXR0ZXIgZnJvbSAnLi9yZXJ1bl9mb3JtYXR0ZXInXG5pbXBvcnQgU25pcHBldHNGb3JtYXR0ZXIgZnJvbSAnLi9zbmlwcGV0c19mb3JtYXR0ZXInXG5pbXBvcnQgU3RlcERlZmluaXRpb25TbmlwcGV0QnVpbGRlciBmcm9tICcuL3N0ZXBfZGVmaW5pdGlvbl9zbmlwcGV0X2J1aWxkZXInXG5pbXBvcnQgU3VtbWFyeUZvcm1hdHRlciBmcm9tICcuL3N1bW1hcnlfZm9ybWF0dGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXR0ZXJCdWlsZGVyIHtcbiAgc3RhdGljIGJ1aWxkKHR5cGUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBGb3JtYXR0ZXIgPSBGb3JtYXR0ZXJCdWlsZGVyLmdldENvbnN0cnVjdG9yQnlUeXBlKHR5cGUsIG9wdGlvbnMpXG4gICAgY29uc3QgZXh0ZW5kZWRPcHRpb25zID0gXy5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgIGNvbG9yRm5zOiBnZXRDb2xvckZucyhvcHRpb25zLmNvbG9yc0VuYWJsZWQpLFxuICAgICAgc25pcHBldEJ1aWxkZXI6IEZvcm1hdHRlckJ1aWxkZXIuZ2V0U3RlcERlZmluaXRpb25TbmlwcGV0QnVpbGRlcihvcHRpb25zKVxuICAgIH0pXG4gICAgcmV0dXJuIG5ldyBGb3JtYXR0ZXIoZXh0ZW5kZWRPcHRpb25zKVxuICB9XG5cbiAgc3RhdGljIGdldENvbnN0cnVjdG9yQnlUeXBlKHR5cGUsIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnanNvbic6IHJldHVybiBKc29uRm9ybWF0dGVyXG4gICAgICBjYXNlICdwcmV0dHknOiByZXR1cm4gUHJldHR5Rm9ybWF0dGVyXG4gICAgICBjYXNlICdwcm9ncmVzcyc6IHJldHVybiBQcm9ncmVzc0Zvcm1hdHRlclxuICAgICAgY2FzZSAncmVydW4nOiByZXR1cm4gUmVydW5Gb3JtYXR0ZXJcbiAgICAgIGNhc2UgJ3NuaXBwZXRzJzogcmV0dXJuIFNuaXBwZXRzRm9ybWF0dGVyXG4gICAgICBjYXNlICdzdW1tYXJ5JzogcmV0dXJuIFN1bW1hcnlGb3JtYXR0ZXJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBGb3JtYXR0ZXJCdWlsZGVyLmxvYWRDdXN0b21Gb3JtYXR0ZXIodHlwZSwgb3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0U3RlcERlZmluaXRpb25TbmlwcGV0QnVpbGRlcih7Y3dkLCBzbmlwcGV0SW50ZXJmYWNlLCBzbmlwcGV0U3ludGF4LCBzdXBwb3J0Q29kZUxpYnJhcnl9KSB7XG4gICAgaWYgKCFzbmlwcGV0SW50ZXJmYWNlKSB7XG4gICAgICBzbmlwcGV0SW50ZXJmYWNlID0gJ2NhbGxiYWNrJ1xuICAgIH1cbiAgICBsZXQgU3ludGF4ID0gSmF2YXNjcmlwdFNuaXBwZXRTeW50YXhcbiAgICBpZiAoc25pcHBldFN5bnRheCkge1xuICAgICAgY29uc3QgZnVsbFN5bnRheFBhdGggPSBwYXRoLnJlc29sdmUoY3dkLCBzbmlwcGV0U3ludGF4KVxuICAgICAgU3ludGF4ID0gcmVxdWlyZShmdWxsU3ludGF4UGF0aClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdGVwRGVmaW5pdGlvblNuaXBwZXRCdWlsZGVyKHtcbiAgICAgIHNuaXBwZXRTeW50YXg6IG5ldyBTeW50YXgoc25pcHBldEludGVyZmFjZSksXG4gICAgICB0cmFuc2Zvcm1Mb29rdXA6IHN1cHBvcnRDb2RlTGlicmFyeS50cmFuc2Zvcm1Mb29rdXBcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGxvYWRDdXN0b21Gb3JtYXR0ZXIoY3VzdG9tRm9ybWF0dGVyUGF0aCwge2N3ZH0pIHtcbiAgICBjb25zdCBmdWxsQ3VzdG9tRm9ybWF0dGVyUGF0aCA9IHBhdGgucmVzb2x2ZShjd2QsIGN1c3RvbUZvcm1hdHRlclBhdGgpXG4gICAgY29uc3QgQ3VzdG9tRm9ybWF0dGVyID0gcmVxdWlyZShmdWxsQ3VzdG9tRm9ybWF0dGVyUGF0aClcbiAgICBpZiAodHlwZW9mKEN1c3RvbUZvcm1hdHRlcikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBDdXN0b21Gb3JtYXR0ZXJcbiAgICB9IGVsc2UgaWYgKEN1c3RvbUZvcm1hdHRlciAmJiB0eXBlb2YoQ3VzdG9tRm9ybWF0dGVyLmRlZmF1bHQpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gQ3VzdG9tRm9ybWF0dGVyLmRlZmF1bHRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDdXN0b20gZm9ybWF0dGVyICgke2N1c3RvbUZvcm1hdHRlclBhdGh9KSBkb2VzIG5vdCBleHBvcnQgYSBmdW5jdGlvbmApXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gJ2NvbG9ycy9zYWZlJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi9zdGF0dXMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbG9yRm5zKGVuYWJsZWQpIHtcbiAgY29sb3JzLmVuYWJsZWQgPSBlbmFibGVkXG4gIHJldHVybiB7XG4gICAgW1N0YXR1cy5BTUJJR1VPVVNdOiBjb2xvcnMucmVkLFxuICAgIGJvbGQ6IGNvbG9ycy5ib2xkLFxuICAgIFtTdGF0dXMuRkFJTEVEXTogY29sb3JzLnJlZCxcbiAgICBsb2NhdGlvbjogY29sb3JzLmdyZXksXG4gICAgW1N0YXR1cy5QQVNTRURdOiBjb2xvcnMuZ3JlZW4sXG4gICAgW1N0YXR1cy5QRU5ESU5HXTogY29sb3JzLnllbGxvdyxcbiAgICBbU3RhdHVzLlNLSVBQRURdOiBjb2xvcnMuY3lhbixcbiAgICB0YWc6IGNvbG9ycy5jeWFuLFxuICAgIFtTdGF0dXMuVU5ERUZJTkVEXTogY29sb3JzLnllbGxvd1xuICB9XG59XG4iLCJpbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi4vbGlzdGVuZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdHRlciBleHRlbmRzIExpc3RlbmVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5sb2cgPSBvcHRpb25zLmxvZ1xuICAgIHRoaXMuY29sb3JGbnMgPSBvcHRpb25zLmNvbG9yRm5zXG4gICAgdGhpcy5zbmlwcGV0QnVpbGRlciA9IG9wdGlvbnMuc25pcHBldEJ1aWxkZXJcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IERhdGFUYWJsZSBmcm9tICcuLi9tb2RlbHMvc3RlcF9hcmd1bWVudHMvZGF0YV90YWJsZSdcbmltcG9ydCBEb2NTdHJpbmcgZnJvbSAnLi4vbW9kZWxzL3N0ZXBfYXJndW1lbnRzL2RvY19zdHJpbmcnXG5pbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4vJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi9zdGF0dXMnXG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKc29uRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5mZWF0dXJlcyA9IFtdXG4gIH1cblxuICBjb252ZXJ0TmFtZVRvSWQob2JqKSB7XG4gICAgcmV0dXJuIG9iai5uYW1lLnJlcGxhY2UoLyAvZywgJy0nKS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmb3JtYXRBdHRhY2htZW50cyhhdHRhY2htZW50cykge1xuICAgIHJldHVybiBhdHRhY2htZW50cy5tYXAoZnVuY3Rpb24gKGF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IGF0dGFjaG1lbnQuZGF0YSxcbiAgICAgICAgbWltZV90eXBlOiBhdHRhY2htZW50Lm1pbWVUeXBlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZvcm1hdERhdGFUYWJsZShkYXRhVGFibGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm93czogZGF0YVRhYmxlLnJhdygpLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiB7Y2VsbHM6IHJvd31cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZm9ybWF0RG9jU3RyaW5nKGRvY1N0cmluZykge1xuICAgIHJldHVybiBfLnBpY2soZG9jU3RyaW5nLCBbJ2NvbnRlbnQnLCAnY29udGVudFR5cGUnLCAnbGluZSddKVxuICB9XG5cbiAgZm9ybWF0U3RlcEFyZ3VtZW50cyhzdGVwQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIF8ubWFwKHN0ZXBBcmd1bWVudHMsIChhcmcpID0+IHtcbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBEYXRhVGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0RGF0YVRhYmxlKGFyZylcbiAgICAgIH0gZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgRG9jU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdERvY1N0cmluZyhhcmcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYXJndW1lbnQgdHlwZTogJHt1dGlsLmluc3BlY3QoYXJnKX1gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVBZnRlckZlYXR1cmVzKCkge1xuICAgIHRoaXMubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZmVhdHVyZXMsIG51bGwsIDIpKVxuICB9XG5cbiAgaGFuZGxlQmVmb3JlRmVhdHVyZShmZWF0dXJlKSB7XG4gICAgdGhpcy5jdXJyZW50RmVhdHVyZSA9IF8ucGljayhmZWF0dXJlLCBbXG4gICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgJ2tleXdvcmQnLFxuICAgICAgJ2xpbmUnICxcbiAgICAgICduYW1lJyxcbiAgICAgICd0YWdzJyxcbiAgICAgICd1cmknXG4gICAgXSlcbiAgICBfLmFzc2lnbih0aGlzLmN1cnJlbnRGZWF0dXJlLCB7XG4gICAgICBlbGVtZW50czogW10sXG4gICAgICBpZDogdGhpcy5jb252ZXJ0TmFtZVRvSWQoZmVhdHVyZSlcbiAgICB9KVxuICAgIHRoaXMuZmVhdHVyZXMucHVzaCh0aGlzLmN1cnJlbnRGZWF0dXJlKVxuICB9XG5cbiAgaGFuZGxlQmVmb3JlU2NlbmFyaW8oc2NlbmFyaW8pIHtcbiAgICB0aGlzLmN1cnJlbnRTY2VuYXJpbyA9IF8ucGljayhzY2VuYXJpbywgW1xuICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICdrZXl3b3JkJyxcbiAgICAgICdsaW5lJyxcbiAgICAgICduYW1lJyxcbiAgICAgICd0YWdzJ1xuICAgIF0pXG4gICAgXy5hc3NpZ24odGhpcy5jdXJyZW50U2NlbmFyaW8sIHtcbiAgICAgIGlkOiB0aGlzLmN1cnJlbnRGZWF0dXJlLmlkICsgJzsnICsgdGhpcy5jb252ZXJ0TmFtZVRvSWQoc2NlbmFyaW8pLFxuICAgICAgc3RlcHM6IFtdXG4gICAgfSlcbiAgICB0aGlzLmN1cnJlbnRGZWF0dXJlLmVsZW1lbnRzLnB1c2godGhpcy5jdXJyZW50U2NlbmFyaW8pXG4gIH1cblxuICBoYW5kbGVTdGVwUmVzdWx0KHN0ZXBSZXN1bHQpIHtcbiAgICBjb25zdCBzdGVwID0gc3RlcFJlc3VsdC5zdGVwXG4gICAgY29uc3Qgc3RhdHVzID0gc3RlcFJlc3VsdC5zdGF0dXNcblxuICAgIGNvbnN0IGN1cnJlbnRTdGVwID0ge1xuICAgICAgYXJndW1lbnRzOiB0aGlzLmZvcm1hdFN0ZXBBcmd1bWVudHMoc3RlcC5hcmd1bWVudHMpLFxuICAgICAga2V5d29yZDogc3RlcC5rZXl3b3JkLFxuICAgICAgbmFtZTogc3RlcC5uYW1lLFxuICAgICAgcmVzdWx0OiB7c3RhdHVzfVxuICAgIH1cblxuICAgIGlmIChzdGVwLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdIb29rJykge1xuICAgICAgY3VycmVudFN0ZXAuaGlkZGVuID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50U3RlcC5saW5lID0gc3RlcC5saW5lXG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cyA9PT0gU3RhdHVzLlBBU1NFRCB8fCBzdGF0dXMgPT09IFN0YXR1cy5GQUlMRUQpIHtcbiAgICAgIGN1cnJlbnRTdGVwLnJlc3VsdC5kdXJhdGlvbiA9IHN0ZXBSZXN1bHQuZHVyYXRpb25cbiAgICB9XG5cbiAgICBpZiAoXy5zaXplKHN0ZXBSZXN1bHQuYXR0YWNobWVudHMpID4gMCkge1xuICAgICAgY3VycmVudFN0ZXAuZW1iZWRkaW5ncyA9IHRoaXMuZm9ybWF0QXR0YWNobWVudHMoc3RlcFJlc3VsdC5hdHRhY2htZW50cylcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzID09PSBTdGF0dXMuRkFJTEVEICYmIHN0ZXBSZXN1bHQuZmFpbHVyZUV4Y2VwdGlvbikge1xuICAgICAgY3VycmVudFN0ZXAucmVzdWx0LmVycm9yX21lc3NhZ2UgPSAoc3RlcFJlc3VsdC5mYWlsdXJlRXhjZXB0aW9uLnN0YWNrIHx8IHN0ZXBSZXN1bHQuZmFpbHVyZUV4Y2VwdGlvbilcbiAgICB9XG5cbiAgICBpZiAoc3RlcFJlc3VsdC5zdGVwRGVmaW5pdGlvbikge1xuICAgICAgdmFyIGxvY2F0aW9uID0gc3RlcFJlc3VsdC5zdGVwRGVmaW5pdGlvbi51cmkgKyAnOicgKyBzdGVwUmVzdWx0LnN0ZXBEZWZpbml0aW9uLmxpbmVcbiAgICAgIGN1cnJlbnRTdGVwLm1hdGNoID0ge2xvY2F0aW9ufVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFNjZW5hcmlvLnN0ZXBzLnB1c2goY3VycmVudFN0ZXApXG4gIH1cbn1cbiIsImltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi4vbW9kZWxzL3N0ZXBfYXJndW1lbnRzL2RhdGFfdGFibGUnXG5pbXBvcnQgRG9jU3RyaW5nIGZyb20gJy4uL21vZGVscy9zdGVwX2FyZ3VtZW50cy9kb2Nfc3RyaW5nJ1xuaW1wb3J0IGZpZ3VyZXMgZnJvbSAnZmlndXJlcydcbmltcG9ydCBIb29rIGZyb20gJy4uL21vZGVscy9ob29rJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi9zdGF0dXMnXG5pbXBvcnQgU3VtbWFyeUZvcm1hdHRlciBmcm9tICcuL3N1bW1hcnlfZm9ybWF0dGVyJ1xuaW1wb3J0IFRhYmxlIGZyb20gJ2NsaS10YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldHR5Rm9ybWF0dGVyIGV4dGVuZHMgU3VtbWFyeUZvcm1hdHRlciB7XG4gIGFwcGx5Q29sb3Ioc3RlcFJlc3VsdCwgdGV4dCkge1xuICAgIGNvbnN0IHN0YXR1cyA9IHN0ZXBSZXN1bHQuc3RhdHVzXG4gICAgcmV0dXJuIHRoaXMuY29sb3JGbnNbc3RhdHVzXSh0ZXh0KVxuICB9XG5cbiAgZm9ybWF0RGF0YVRhYmxlKGRhdGFUYWJsZSkge1xuICAgIHZhciByb3dzID0gZGF0YVRhYmxlLnJhdygpLm1hcCgocm93KSA9PiB7XG4gICAgICByZXR1cm4gcm93Lm1hcCgoY2VsbCkgPT4ge1xuICAgICAgICByZXR1cm4gY2VsbC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgfSlcbiAgICB9KVxuICAgIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHtcbiAgICAgIGNoYXJzOiB7XG4gICAgICAgICdib3R0b20nOiAnJywgJ2JvdHRvbS1sZWZ0JzogJycsICdib3R0b20tbWlkJzogJycsICdib3R0b20tcmlnaHQnOiAnJyxcbiAgICAgICAgJ2xlZnQnOiAnfCcsICdsZWZ0LW1pZCc6ICcnLFxuICAgICAgICAnbWlkJzogJycsICdtaWQtbWlkJzogJycsICdtaWRkbGUnOiAnfCcsXG4gICAgICAgICdyaWdodCc6ICd8JywgJ3JpZ2h0LW1pZCc6ICcnLFxuICAgICAgICAndG9wJzogJycgLCAndG9wLWxlZnQnOiAnJywgJ3RvcC1taWQnOiAnJywgJ3RvcC1yaWdodCc6ICcnXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgYm9yZGVyOiBbXSwgJ3BhZGRpbmctbGVmdCc6IDEsICdwYWRkaW5nLXJpZ2h0JzogMVxuICAgICAgfVxuICAgIH0pXG4gICAgdGFibGUucHVzaC5hcHBseSh0YWJsZSwgcm93cylcbiAgICByZXR1cm4gdGFibGUudG9TdHJpbmcoKVxuICB9XG5cbiAgZm9ybWF0RG9jU3RyaW5nKGRvY1N0cmluZykge1xuICAgIHJldHVybiAnXCJcIlwiXFxuJyArIGRvY1N0cmluZy5jb250ZW50ICsgJ1xcblwiXCJcIidcbiAgfVxuXG4gIGZvcm1hdFRhZ3ModGFncykge1xuICAgIGlmICh0YWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIGNvbnN0IHRhZ05hbWVzID0gdGFncy5tYXAoKHRhZykgPT4gdGFnLm5hbWUpXG4gICAgcmV0dXJuIHRoaXMuY29sb3JGbnMudGFnKHRhZ05hbWVzLmpvaW4oJyAnKSlcbiAgfVxuXG4gIGhhbmRsZUFmdGVyU2NlbmFyaW8oKSB7XG4gICAgdGhpcy5sb2coJ1xcbicpXG4gIH1cblxuICBoYW5kbGVCZWZvcmVGZWF0dXJlKGZlYXR1cmUpIHtcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgbGV0IHRhZ3NUZXh0ID0gdGhpcy5mb3JtYXRUYWdzKGZlYXR1cmUudGFncylcbiAgICBpZiAodGFnc1RleHQpIHtcbiAgICAgIHRleHQgPSB0YWdzVGV4dCArICdcXG4nXG4gICAgfVxuICAgIHRleHQgKz0gZmVhdHVyZS5rZXl3b3JkICsgJzogJyArIGZlYXR1cmUubmFtZVxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGZlYXR1cmUuZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICAgIHRleHQgKz0gJ1xcblxcbicgKyB0aGlzLmluZGVudChkZXNjcmlwdGlvbiwgMilcbiAgICB9XG4gICAgdGhpcy5sb2codGV4dCArICdcXG5cXG4nKVxuICB9XG5cbiAgaGFuZGxlQmVmb3JlU2NlbmFyaW8oc2NlbmFyaW8pIHtcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgbGV0IHRhZ3NUZXh0ID0gdGhpcy5mb3JtYXRUYWdzKHNjZW5hcmlvLnRhZ3MpXG4gICAgaWYgKHRhZ3NUZXh0KSB7XG4gICAgICB0ZXh0ID0gdGFnc1RleHQgKyAnXFxuJ1xuICAgIH1cbiAgICB0ZXh0ICs9IHNjZW5hcmlvLmtleXdvcmQgKyAnOiAnICsgc2NlbmFyaW8ubmFtZVxuICAgIHRoaXMubG9nSW5kZW50ZWQodGV4dCArICdcXG4nLCAxKVxuICB9XG5cbiAgaGFuZGxlU3RlcFJlc3VsdChzdGVwUmVzdWx0KSB7XG4gICAgaWYgKCEoc3RlcFJlc3VsdC5zdGVwIGluc3RhbmNlb2YgSG9vaykpIHtcbiAgICAgIHRoaXMubG9nU3RlcFJlc3VsdChzdGVwUmVzdWx0KVxuICAgIH1cbiAgfVxuXG4gIGxvZ0luZGVudGVkKHRleHQsIGxldmVsKSB7XG4gICAgdGhpcy5sb2codGhpcy5pbmRlbnQodGV4dCwgbGV2ZWwgKiAyKSlcbiAgfVxuXG4gIGxvZ1N0ZXBSZXN1bHQoc3RlcFJlc3VsdCkge1xuICAgIGNvbnN0IHtzdGF0dXMsIHN0ZXB9ID0gc3RlcFJlc3VsdFxuICAgIGNvbnN0IGNvbG9yRm4gPSB0aGlzLmNvbG9yRm5zW3N0YXR1c11cblxuICAgIGNvbnN0IHN5bWJvbCA9IFByZXR0eUZvcm1hdHRlci5DSEFSQUNURVJTW3N0ZXBSZXN1bHQuc3RhdHVzXVxuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBjb2xvckZuKHN5bWJvbCArICcgJyArIHN0ZXAua2V5d29yZCArIChzdGVwLm5hbWUgfHwgJycpKVxuICAgIHRoaXMubG9nSW5kZW50ZWQoaWRlbnRpZmllciArICdcXG4nLCAxKVxuXG4gICAgc3RlcC5hcmd1bWVudHMuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICBsZXQgc3RyXG4gICAgICBpZiAoYXJnIGluc3RhbmNlb2YgRGF0YVRhYmxlKSB7XG4gICAgICAgIHN0ciA9IHRoaXMuZm9ybWF0RGF0YVRhYmxlKGFyZylcbiAgICAgIH0gZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgRG9jU3RyaW5nKSB7XG4gICAgICAgIHN0ciA9IHRoaXMuZm9ybWF0RG9jU3RyaW5nKGFyZylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBhcmd1bWVudCB0eXBlOiAnICsgYXJnKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2dJbmRlbnRlZChjb2xvckZuKHN0cikgKyAnXFxuJywgMylcbiAgICB9KVxuICB9XG59XG5cblByZXR0eUZvcm1hdHRlci5DSEFSQUNURVJTID0ge1xuICBbU3RhdHVzLkFNQklHVU9VU106IGZpZ3VyZXMuY3Jvc3MsXG4gIFtTdGF0dXMuRkFJTEVEXTogZmlndXJlcy5jcm9zcyxcbiAgW1N0YXR1cy5QQVNTRURdOiBmaWd1cmVzLnRpY2ssXG4gIFtTdGF0dXMuUEVORElOR106ICc/JyxcbiAgW1N0YXR1cy5TS0lQUEVEXTogJy0nLFxuICBbU3RhdHVzLlVOREVGSU5FRF06ICc/J1xufVxuIiwiaW1wb3J0IEhvb2sgZnJvbSAnLi4vbW9kZWxzL2hvb2snXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcbmltcG9ydCBTdW1tYXJ5Rm9ybWF0dGVyIGZyb20gJy4vc3VtbWFyeV9mb3JtYXR0ZXInXG5cbmNvbnN0IFNUQVRVU19DSEFSQUNURVJfTUFQUElORyA9IHtcbiAgW1N0YXR1cy5BTUJJR1VPVVNdOiAnQScsXG4gIFtTdGF0dXMuRkFJTEVEXTogJ0YnLFxuICBbU3RhdHVzLlBBU1NFRF06ICcuJyxcbiAgW1N0YXR1cy5QRU5ESU5HXTogJ1AnLFxuICBbU3RhdHVzLlNLSVBQRURdOiAnLScsXG4gIFtTdGF0dXMuVU5ERUZJTkVEXTogJ1UnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2dyZXNzRm9ybWF0dGVyIGV4dGVuZHMgU3VtbWFyeUZvcm1hdHRlciB7XG4gIGhhbmRsZVN0ZXBSZXN1bHQoc3RlcFJlc3VsdCkge1xuICAgIGNvbnN0IHN0YXR1cyA9IHN0ZXBSZXN1bHQuc3RhdHVzXG4gICAgaWYgKCEoc3RlcFJlc3VsdC5zdGVwIGluc3RhbmNlb2YgSG9vayAmJiBzdGF0dXMgPT09IFN0YXR1cy5QQVNTRUQpKSB7XG4gICAgICBjb25zdCBjaGFyYWN0ZXIgPSB0aGlzLmNvbG9yRm5zW3N0YXR1c10oU1RBVFVTX0NIQVJBQ1RFUl9NQVBQSU5HW3N0YXR1c10pXG4gICAgICB0aGlzLmxvZyhjaGFyYWN0ZXIpXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRmVhdHVyZXNSZXN1bHQoZmVhdHVyZXNSZXN1bHQpIHtcbiAgICB0aGlzLmxvZygnXFxuXFxuJylcbiAgICBzdXBlci5oYW5kbGVGZWF0dXJlc1Jlc3VsdChmZWF0dXJlc1Jlc3VsdClcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcblxuY29uc3QgUkVSVU5fU1RBVFVTRVMgPSBbXG4gIFN0YXR1cy5BTUJJR1VPVVMsXG4gIFN0YXR1cy5GQUlMRUQsXG4gIFN0YXR1cy5QRU5ESU5HLFxuICBTdGF0dXMuVU5ERUZJTkVEXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcnVuRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgaGFuZGxlRmVhdHVyZXNSZXN1bHQoZmVhdHVyZXNSZXN1bHQpIHtcbiAgICBjb25zdCBtYXBwaW5nID0ge31cbiAgICBmZWF0dXJlc1Jlc3VsdC5zY2VuYXJpb1Jlc3VsdHMuZm9yRWFjaCgoc2NlbmFyaW9SZXN1bHQpID0+IHtcbiAgICAgIGlmIChfLmluY2x1ZGVzKFJFUlVOX1NUQVRVU0VTLCBzY2VuYXJpb1Jlc3VsdC5zdGF0dXMpKSB7XG4gICAgICAgIGNvbnN0IHNjZW5hcmlvID0gc2NlbmFyaW9SZXN1bHQuc2NlbmFyaW9cbiAgICAgICAgY29uc3QgcmVsYXRpdmVVcmkgPSBwYXRoLnJlbGF0aXZlKHRoaXMuY3dkLCBzY2VuYXJpby51cmkpXG4gICAgICAgIGlmICghbWFwcGluZ1tyZWxhdGl2ZVVyaV0pIHtcbiAgICAgICAgICBtYXBwaW5nW3JlbGF0aXZlVXJpXSA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgbWFwcGluZ1tyZWxhdGl2ZVVyaV0ucHVzaChzY2VuYXJpby5saW5lKVxuICAgICAgfVxuICAgIH0pXG4gICAgY29uc3QgdGV4dCA9IF8ubWFwKG1hcHBpbmcsIChsaW5lcywgcmVsYXRpdmVVcmkpID0+IHtcbiAgICAgIHJldHVybiByZWxhdGl2ZVVyaSArICc6JyArIGxpbmVzLmpvaW4oJzonKVxuICAgIH0pLmpvaW4oJ1xcbicpXG4gICAgdGhpcy5sb2codGV4dClcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLydcbmltcG9ydCBTdGF0dXMgZnJvbSAnLi4vc3RhdHVzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmlwcGV0c0Zvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIGhhbmRsZVN0ZXBSZXN1bHQoc3RlcFJlc3VsdCkge1xuICAgIGlmIChzdGVwUmVzdWx0LnN0YXR1cyA9PT0gU3RhdHVzLlVOREVGSU5FRCkge1xuICAgICAgY29uc3Qgc25pcHBldCA9IHRoaXMuc25pcHBldEJ1aWxkZXIuYnVpbGQoc3RlcFJlc3VsdC5zdGVwKVxuICAgICAgdGhpcy5sb2coc25pcHBldCArICdcXG5cXG4nKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHtDdWN1bWJlckV4cHJlc3Npb25HZW5lcmF0b3J9IGZyb20gJ2N1Y3VtYmVyLWV4cHJlc3Npb25zJ1xuaW1wb3J0IERhdGFUYWJsZSBmcm9tICcuLi8uLi9tb2RlbHMvc3RlcF9hcmd1bWVudHMvZGF0YV90YWJsZSdcbmltcG9ydCBEb2NTdHJpbmcgZnJvbSAnLi4vLi4vbW9kZWxzL3N0ZXBfYXJndW1lbnRzL2RvY19zdHJpbmcnXG5pbXBvcnQgS2V5d29yZFR5cGUgZnJvbSAnLi4vLi4va2V5d29yZF90eXBlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwRGVmaW5pdGlvblNuaXBwZXRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3Ioe3NuaXBwZXRTeW50YXgsIHRyYW5zZm9ybUxvb2t1cH0pIHtcbiAgICB0aGlzLnNuaXBwZXRTeW50YXggPSBzbmlwcGV0U3ludGF4XG4gICAgdGhpcy5jdWN1bWJlckV4cHJlc3Npb25HZW5lcmF0b3IgPSBuZXcgQ3VjdW1iZXJFeHByZXNzaW9uR2VuZXJhdG9yKHRyYW5zZm9ybUxvb2t1cClcbiAgfVxuXG4gIGJ1aWxkKHN0ZXApIHtcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSB0aGlzLmdldEZ1bmN0aW9uTmFtZShzdGVwKVxuICAgIGNvbnN0IGdlbmVyYXRlZEV4cHJlc3Npb24gPSB0aGlzLmN1Y3VtYmVyRXhwcmVzc2lvbkdlbmVyYXRvci5nZW5lcmF0ZUV4cHJlc3Npb24oc3RlcC5uYW1lLCB0cnVlKVxuICAgIGNvbnN0IHBhdHRlcm4gPSBnZW5lcmF0ZWRFeHByZXNzaW9uLnNvdXJjZVxuICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB0aGlzLmdldFBhcmFtZXRlcnMoc3RlcCwgZ2VuZXJhdGVkRXhwcmVzc2lvbi50cmFuc2Zvcm1zKVxuICAgIGNvbnN0IGNvbW1lbnQgPSAnV3JpdGUgY29kZSBoZXJlIHRoYXQgdHVybnMgdGhlIHBocmFzZSBhYm92ZSBpbnRvIGNvbmNyZXRlIGFjdGlvbnMnXG4gICAgcmV0dXJuIHRoaXMuc25pcHBldFN5bnRheC5idWlsZChmdW5jdGlvbk5hbWUsIHBhdHRlcm4sIHBhcmFtZXRlcnMsIGNvbW1lbnQpXG4gIH1cblxuICBnZXRGdW5jdGlvbk5hbWUoc3RlcCkge1xuICAgIHN3aXRjaChzdGVwLmtleXdvcmRUeXBlKSB7XG4gICAgICBjYXNlIEtleXdvcmRUeXBlLkVWRU5UOiByZXR1cm4gJ1doZW4nXG4gICAgICBjYXNlIEtleXdvcmRUeXBlLk9VVENPTUU6IHJldHVybiAnVGhlbidcbiAgICAgIGNhc2UgS2V5d29yZFR5cGUuUFJFQ09ORElUSU9OOiByZXR1cm4gJ0dpdmVuJ1xuICAgIH1cbiAgfVxuXG4gIGdldFBhcmFtZXRlcnMoc3RlcCwgZXhwcmVzc2lvblRyYW5mb3Jtcykge1xuICAgIHJldHVybiBfLmNvbmNhdChcbiAgICAgIHRoaXMuZ2V0UGF0dGVybk1hdGNoaW5nR3JvdXBQYXJhbWV0ZXJzKGV4cHJlc3Npb25UcmFuZm9ybXMpLFxuICAgICAgdGhpcy5nZXRTdGVwQXJndW1lbnRQYXJhbWV0ZXJzKHN0ZXApLFxuICAgICAgJ2NhbGxiYWNrJ1xuICAgIClcbiAgfVxuXG4gIGdldFBhdHRlcm5NYXRjaGluZ0dyb3VwUGFyYW1ldGVycyhleHByZXNzaW9uVHJhbmZvcm1zKSB7XG4gICAgcmV0dXJuIF8udGltZXMoZXhwcmVzc2lvblRyYW5mb3Jtcy5sZW5ndGgsIGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gYGFyZyR7biArIDF9YFxuICAgIH0pXG4gIH1cblxuICBnZXRTdGVwQXJndW1lbnRQYXJhbWV0ZXJzKHN0ZXApIHtcbiAgICByZXR1cm4gc3RlcC5hcmd1bWVudHMubWFwKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBEYXRhVGFibGUpIHtcbiAgICAgICAgcmV0dXJuICd0YWJsZSdcbiAgICAgIH0gZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgRG9jU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGFyZ3VtZW50IHR5cGU6ICR7YXJnfWApXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKYXZhU2NyaXB0U25pcHBldFN5bnRheCB7XG4gIGNvbnN0cnVjdG9yKHNuaXBwZXRJbnRlcmZhY2UpIHtcbiAgICB0aGlzLnNuaXBwZXRJbnRlcmZhY2UgPSBzbmlwcGV0SW50ZXJmYWNlXG4gIH1cblxuICBidWlsZChmdW5jdGlvbk5hbWUsIHBhdHRlcm4sIHBhcmFtZXRlcnMsIGNvbW1lbnQpIHtcbiAgICBsZXQgZnVuY3Rpb25LZXl3b3JkID0gJ2Z1bmN0aW9uICdcbiAgICBpZiAodGhpcy5zbmlwcGV0SW50ZXJmYWNlID09PSAnZ2VuZXJhdG9yJykge1xuICAgICAgZnVuY3Rpb25LZXl3b3JkICs9ICcqJ1xuICAgIH1cblxuICAgIGxldCBpbXBsZW1lbnRhdGlvblxuICAgIGlmICh0aGlzLnNuaXBwZXRJbnRlcmZhY2UgPT09ICdjYWxsYmFjaycpIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrTmFtZSA9IF8ubGFzdChwYXJhbWV0ZXJzKVxuICAgICAgaW1wbGVtZW50YXRpb24gPSBjYWxsYmFja05hbWUgKyAnKG51bGwsIFxcJ3BlbmRpbmdcXCcpOydcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1ldGVycy5wb3AoKVxuICAgICAgaW1wbGVtZW50YXRpb24gPSAncmV0dXJuIFxcJ3BlbmRpbmdcXCc7J1xuICAgIH1cblxuICAgIGNvbnN0IHNuaXBwZXQgPVxuICAgICAgJ3RoaXMuJyArIGZ1bmN0aW9uTmFtZSArICcoXFwnJyArIHBhdHRlcm4ucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpICsgJ1xcJywgJyArIGZ1bmN0aW9uS2V5d29yZCArICcoJyArIHBhcmFtZXRlcnMuam9pbignLCAnKSArICcpIHsnICsgJ1xcbicgK1xuICAgICAgJyAgLy8gJyArIGNvbW1lbnQgKyAnXFxuJyArXG4gICAgICAnICAnICsgaW1wbGVtZW50YXRpb24gKyAnXFxuJyArXG4gICAgICAnfSk7J1xuICAgIHJldHVybiBzbmlwcGV0XG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7Zm9ybWF0TG9jYXRpb259IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgRHVyYXRpb24gZnJvbSAnZHVyYXRpb24nXG5pbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4vJ1xuaW1wb3J0IGluZGVudFN0cmluZyBmcm9tICdpbmRlbnQtc3RyaW5nJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi9zdGF0dXMnXG5pbXBvcnQgVGFibGUgZnJvbSAnY2xpLXRhYmxlJ1xuaW1wb3J0IEhvb2sgZnJvbSAnLi4vbW9kZWxzL2hvb2snXG5cbmNvbnN0IFNUQVRVU19SRVBPUlRfT1JERVIgPSBbXG4gIFN0YXR1cy5GQUlMRUQsXG4gIFN0YXR1cy5BTUJJR1VPVVMsXG4gIFN0YXR1cy5VTkRFRklORUQsXG4gIFN0YXR1cy5QRU5ESU5HLFxuICBTdGF0dXMuU0tJUFBFRCxcbiAgU3RhdHVzLlBBU1NFRFxuXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdW1tYXJ5Rm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgZ2V0QW1iaWd1b3VzU3RlcFJlc3VsdE1lc3NhZ2Uoc3RlcFJlc3VsdCkge1xuICAgIGNvbnN0IHthbWJpZ3VvdXNTdGVwRGVmaW5pdGlvbnN9ID0gc3RlcFJlc3VsdFxuICAgIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHtcbiAgICAgIGNoYXJzOiB7XG4gICAgICAgICdib3R0b20nOiAnJywgJ2JvdHRvbS1sZWZ0JzogJycsICdib3R0b20tbWlkJzogJycsICdib3R0b20tcmlnaHQnOiAnJyxcbiAgICAgICAgJ2xlZnQnOiAnJywgJ2xlZnQtbWlkJzogJycsXG4gICAgICAgICdtaWQnOiAnJywgJ21pZC1taWQnOiAnJywgJ21pZGRsZSc6ICcgLSAnLFxuICAgICAgICAncmlnaHQnOiAnJywgJ3JpZ2h0LW1pZCc6ICcnLFxuICAgICAgICAndG9wJzogJycgLCAndG9wLWxlZnQnOiAnJywgJ3RvcC1taWQnOiAnJywgJ3RvcC1yaWdodCc6ICcnXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgYm9yZGVyOiBbXSwgJ3BhZGRpbmctbGVmdCc6IDAsICdwYWRkaW5nLXJpZ2h0JzogMFxuICAgICAgfVxuICAgIH0pXG4gICAgdGFibGUucHVzaC5hcHBseSh0YWJsZSwgYW1iaWd1b3VzU3RlcERlZmluaXRpb25zLm1hcCgoc3RlcERlZmluaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSBzdGVwRGVmaW5pdGlvbi5wYXR0ZXJuLnRvU3RyaW5nKClcbiAgICAgIHJldHVybiBbcGF0dGVybiwgZm9ybWF0TG9jYXRpb24odGhpcy5jd2QsIHN0ZXBEZWZpbml0aW9uKV1cbiAgICB9KSlcbiAgICByZXR1cm4gJ011bHRpcGxlIHN0ZXAgZGVmaW5pdGlvbnMgbWF0Y2g6JyArICdcXG4nICsgdGhpcy5pbmRlbnQodGFibGUudG9TdHJpbmcoKSwgMilcbiAgfVxuXG4gIGdldEZhaWxlZFN0ZXBSZXN1bHRNZXNzYWdlKHN0ZXBSZXN1bHQpIHtcbiAgICBjb25zdCB7ZmFpbHVyZUV4Y2VwdGlvbn0gPSBzdGVwUmVzdWx0XG4gICAgcmV0dXJuIGZhaWx1cmVFeGNlcHRpb24uc3RhY2sgfHwgZmFpbHVyZUV4Y2VwdGlvblxuICB9XG5cbiAgZ2V0UGVuZGluZ1N0ZXBSZXN1bHRNZXNzYWdlKCkge1xuICAgIHJldHVybiAnUGVuZGluZydcbiAgfVxuXG4gIGdldFN0ZXBSZXN1bHRNZXNzYWdlKHN0ZXBSZXN1bHQpIHtcbiAgICBzd2l0Y2ggKHN0ZXBSZXN1bHQuc3RhdHVzKSB7XG4gICAgICBjYXNlIFN0YXR1cy5BTUJJR1VPVVM6XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFtYmlndW91c1N0ZXBSZXN1bHRNZXNzYWdlKHN0ZXBSZXN1bHQpXG4gICAgICBjYXNlIFN0YXR1cy5GQUlMRUQ6XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZhaWxlZFN0ZXBSZXN1bHRNZXNzYWdlKHN0ZXBSZXN1bHQpXG4gICAgICBjYXNlIFN0YXR1cy5VTkRFRklORUQ6XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVuZGVmaW5lZFN0ZXBSZXN1bHRNZXNzYWdlKHN0ZXBSZXN1bHQpXG4gICAgICBjYXNlIFN0YXR1cy5QRU5ESU5HOlxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQZW5kaW5nU3RlcFJlc3VsdE1lc3NhZ2Uoc3RlcFJlc3VsdClcbiAgICB9XG4gIH1cblxuICBnZXRVbmRlZmluZWRTdGVwUmVzdWx0TWVzc2FnZShzdGVwUmVzdWx0KSB7XG4gICAgY29uc3Qge3N0ZXB9ID0gc3RlcFJlc3VsdFxuICAgIGNvbnN0IHNuaXBwZXQgPSB0aGlzLnNuaXBwZXRCdWlsZGVyLmJ1aWxkKHN0ZXApXG4gICAgcmV0dXJuICdVbmRlZmluZWQuIEltcGxlbWVudCB3aXRoIHRoZSBmb2xsb3dpbmcgc25pcHBldDonICsgJ1xcblxcbicgKyB0aGlzLmluZGVudChzbmlwcGV0LCAyKVxuICB9XG5cbiAgaGFuZGxlRmVhdHVyZXNSZXN1bHQoZmVhdHVyZXNSZXN1bHQpIHtcbiAgICBjb25zdCBmYWlsdXJlcyA9IGZlYXR1cmVzUmVzdWx0LnN0ZXBSZXN1bHRzLmZpbHRlcihmdW5jdGlvbiAoc3RlcFJlc3VsdCkge1xuICAgICAgcmV0dXJuIF8uaW5jbHVkZXMoW1N0YXR1cy5BTUJJR1VPVVMsIFN0YXR1cy5GQUlMRURdLCBzdGVwUmVzdWx0LnN0YXR1cylcbiAgICB9KVxuICAgIGlmIChmYWlsdXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvZ0lzc3Vlcyh7c3RlcFJlc3VsdHM6IGZhaWx1cmVzLCB0aXRsZTogJ0ZhaWx1cmVzJ30pXG4gICAgfVxuICAgIGNvbnN0IHdhcm5pbmdzID0gZmVhdHVyZXNSZXN1bHQuc3RlcFJlc3VsdHMuZmlsdGVyKGZ1bmN0aW9uIChzdGVwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gXy5pbmNsdWRlcyhbU3RhdHVzLlBFTkRJTkcsIFN0YXR1cy5VTkRFRklORURdLCBzdGVwUmVzdWx0LnN0YXR1cylcbiAgICB9KVxuICAgIGlmICh3YXJuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvZ0lzc3Vlcyh7c3RlcFJlc3VsdHM6IHdhcm5pbmdzLCB0aXRsZTogJ1dhcm5pbmdzJ30pXG4gICAgfVxuICAgIHRoaXMubG9nQ291bnRTdW1tYXJ5KCdzY2VuYXJpbycsIGZlYXR1cmVzUmVzdWx0LnNjZW5hcmlvUmVzdWx0cylcbiAgICB0aGlzLmxvZ0NvdW50U3VtbWFyeSgnc3RlcCcsIGZlYXR1cmVzUmVzdWx0LnN0ZXBSZXN1bHRzLmZpbHRlcigoe3N0ZXB9KSA9PiAhKHN0ZXAgaW5zdGFuY2VvZiBIb29rKSkpXG4gICAgdGhpcy5sb2dEdXJhdGlvbihmZWF0dXJlc1Jlc3VsdClcbiAgfVxuXG4gIGluZGVudCh0ZXh0LCBudW1iZXJPZlNwYWNlcykge1xuICAgIHJldHVybiBpbmRlbnRTdHJpbmcodGV4dCwgJyAnLCBudW1iZXJPZlNwYWNlcylcbiAgfVxuXG4gIGxvZ0NvdW50U3VtbWFyeSh0eXBlLCBvYmplY3RzKSB7XG4gICAgY29uc3QgY291bnRzID0gXy5jaGFpbihvYmplY3RzKS5ncm91cEJ5KCdzdGF0dXMnKS5tYXBWYWx1ZXMoJ2xlbmd0aCcpLnZhbHVlKClcbiAgICBjb25zdCB0b3RhbCA9IF8ucmVkdWNlKGNvdW50cywgKG1lbW8sIHZhbHVlKSA9PiBtZW1vICsgdmFsdWUpIHx8IDBcbiAgICBsZXQgdGV4dCA9IHRvdGFsICsgJyAnICsgdHlwZSArICh0b3RhbCAhPT0gMSA/ICdzJyA6ICcnKVxuICAgIGlmICh0b3RhbCA+IDApIHtcbiAgICAgIGNvbnN0IGRldGFpbHMgPSBbXVxuICAgICAgU1RBVFVTX1JFUE9SVF9PUkRFUi5mb3JFYWNoKChzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKGNvdW50c1tzdGF0dXNdID4gMCkge1xuICAgICAgICAgIGRldGFpbHMucHVzaCh0aGlzLmNvbG9yRm5zW3N0YXR1c10oY291bnRzW3N0YXR1c10gKyAnICcgKyBzdGF0dXMpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGV4dCArPSAnICgnICsgZGV0YWlscy5qb2luKCcsICcpICsgJyknXG4gICAgfVxuICAgIHRoaXMubG9nKHRleHQgKyAnXFxuJylcbiAgfVxuXG4gIGxvZ0R1cmF0aW9uKGZlYXR1cmVzUmVzdWx0KSB7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gZmVhdHVyZXNSZXN1bHQuZHVyYXRpb25cbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKDApXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUobWlsbGlzZWNvbmRzKVxuICAgIGNvbnN0IGR1cmF0aW9uID0gbmV3IER1cmF0aW9uKHN0YXJ0LCBlbmQpXG5cbiAgICB0aGlzLmxvZyhcbiAgICAgIGR1cmF0aW9uLm1pbnV0ZXMgKyAnbScgK1xuICAgICAgZHVyYXRpb24udG9TdHJpbmcoJyVTJykgKyAnLicgK1xuICAgICAgZHVyYXRpb24udG9TdHJpbmcoJyVMJykgKyAncycgKyAnXFxuJ1xuICAgIClcbiAgfVxuXG4gIGxvZ0lzc3VlKHtudW1iZXIsIHN0ZXBSZXN1bHR9KSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuZ2V0U3RlcFJlc3VsdE1lc3NhZ2Uoc3RlcFJlc3VsdClcbiAgICBjb25zdCBwcmVmaXggPSBudW1iZXIgKyAnKSAnXG4gICAgY29uc3Qge3N0ZXB9ID0gc3RlcFJlc3VsdFxuICAgIGNvbnN0IHtzY2VuYXJpb30gPSBzdGVwXG4gICAgbGV0IHRleHQgPSBwcmVmaXhcblxuICAgIGlmIChzY2VuYXJpbykge1xuICAgICAgY29uc3Qgc2NlbmFyaW9Mb2NhdGlvbiA9IGZvcm1hdExvY2F0aW9uKHRoaXMuY3dkLCBzY2VuYXJpbylcbiAgICAgIHRleHQgKz0gJ1NjZW5hcmlvOiAnICsgdGhpcy5jb2xvckZucy5ib2xkKHNjZW5hcmlvLm5hbWUpICsgJyAtICcgKyB0aGlzLmNvbG9yRm5zLmxvY2F0aW9uKHNjZW5hcmlvTG9jYXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgKz0gJ0JhY2tncm91bmQ6J1xuICAgIH1cbiAgICB0ZXh0ICs9ICdcXG4nXG5cbiAgICBsZXQgc3RlcFRleHQgPSAnU3RlcDogJyArIHRoaXMuY29sb3JGbnMuYm9sZChzdGVwLmtleXdvcmQgKyAoc3RlcC5uYW1lIHx8ICcnKSlcbiAgICBpZiAoc3RlcC51cmkpIHtcbiAgICAgIGNvbnN0IHN0ZXBMb2NhdGlvbiA9IGZvcm1hdExvY2F0aW9uKHRoaXMuY3dkLCBzdGVwKVxuICAgICAgc3RlcFRleHQgKz0gJyAtICcgKyB0aGlzLmNvbG9yRm5zLmxvY2F0aW9uKHN0ZXBMb2NhdGlvbilcbiAgICB9XG4gICAgdGV4dCArPSB0aGlzLmluZGVudChzdGVwVGV4dCwgcHJlZml4Lmxlbmd0aCkgKyAnXFxuJ1xuXG4gICAgY29uc3Qge3N0ZXBEZWZpbml0aW9ufSA9IHN0ZXBSZXN1bHRcbiAgICBpZiAoc3RlcERlZmluaXRpb24pIHtcbiAgICAgIGNvbnN0IHN0ZXBEZWZpbml0aW9uTG9jYXRpb24gPSBmb3JtYXRMb2NhdGlvbih0aGlzLmN3ZCwgc3RlcERlZmluaXRpb24pXG4gICAgICBjb25zdCBzdGVwRGVmaW5pdGlvbkxpbmUgPSAnU3RlcCBEZWZpbml0aW9uOiAnICsgdGhpcy5jb2xvckZucy5sb2NhdGlvbihzdGVwRGVmaW5pdGlvbkxvY2F0aW9uKVxuICAgICAgdGV4dCArPSB0aGlzLmluZGVudChzdGVwRGVmaW5pdGlvbkxpbmUsIHByZWZpeC5sZW5ndGgpICsgJ1xcbidcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlQ29sb3JGbiA9IHRoaXMuY29sb3JGbnNbc3RlcFJlc3VsdC5zdGF0dXNdXG4gICAgdGV4dCArPSB0aGlzLmluZGVudCgnTWVzc2FnZTonLCBwcmVmaXgubGVuZ3RoKSArICdcXG4nXG4gICAgdGV4dCArPSB0aGlzLmluZGVudChtZXNzYWdlQ29sb3JGbihtZXNzYWdlKSwgcHJlZml4Lmxlbmd0aCArIDIpICsgJ1xcblxcbidcbiAgICB0aGlzLmxvZyh0ZXh0KVxuICB9XG5cbiAgbG9nSXNzdWVzKHtzdGVwUmVzdWx0cywgdGl0bGV9KSB7XG4gICAgdGhpcy5sb2codGl0bGUgKyAnOlxcblxcbicpXG4gICAgc3RlcFJlc3VsdHMuZm9yRWFjaCgoc3RlcFJlc3VsdCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMubG9nSXNzdWUoe251bWJlcjogaW5kZXggKyAxLCBzdGVwUmVzdWx0fSlcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TG9jYXRpb24oY3dkLCBvYmopIHtcbiAgcmV0dXJuIHBhdGgucmVsYXRpdmUoY3dkLCBvYmoudXJpKSArICc6JyArIG9iai5saW5lXG59XG4iLCJpbXBvcnQgQ2xpIGZyb20gJy4vY2xpJ1xuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vbGlzdGVuZXInXG5pbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4vZm9ybWF0dGVyJ1xuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnLi9ydW50aW1lJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuL3N0YXR1cydcbmltcG9ydCBTdW1tYXJ5Rm9ybWF0dGVyIGZyb20gJy4vZm9ybWF0dGVyL3N1bW1hcnlfZm9ybWF0dGVyJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIENsaSxcbiAgRm9ybWF0dGVyLFxuICBMaXN0ZW5lcixcbiAgUnVudGltZSxcbiAgU3RhdHVzLFxuICBTdW1tYXJ5Rm9ybWF0dGVyXG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgR2hlcmtpbiBmcm9tICdnaGVya2luJ1xuXG5jb25zdCB0eXBlcyA9IHtcbiAgRVZFTlQ6ICdldmVudCcsXG4gIE9VVENPTUU6ICdvdXRjb21lJyxcbiAgUFJFQ09ORElUSU9OOiAncHJlY29uZGl0aW9uJ1xufVxuXG5leHBvcnQgZGVmYXVsdCB0eXBlc1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RlcEtleXdvcmRUeXBlKHtsYW5ndWFnZSwgcHJldmlvdXNTdGVwLCBzdGVwfSkge1xuICBjb25zdCBkaWFsZWN0ID0gR2hlcmtpbi5ESUFMRUNUU1tsYW5ndWFnZV1cbiAgY29uc3QgdHlwZSA9IF8uZmluZChbJ2dpdmVuJywgJ3doZW4nLCAndGhlbicsICdhbmQnLCAnYnV0J10sICh0eXBlKSA9PiB7XG4gICAgcmV0dXJuIF8uaW5jbHVkZXMoZGlhbGVjdFt0eXBlXSwgc3RlcC5rZXl3b3JkKVxuICB9KVxuICBzd2l0Y2godHlwZSkge1xuICAgIGNhc2UgJ3doZW4nOlxuICAgICAgcmV0dXJuIHR5cGVzLkVWRU5UXG4gICAgY2FzZSAndGhlbic6XG4gICAgICByZXR1cm4gdHlwZXMuT1VUQ09NRVxuICAgIGNhc2UgJ2FuZCc6XG4gICAgY2FzZSAnYnV0JzpcbiAgICAgIGlmIChwcmV2aW91c1N0ZXApIHtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RlcC5rZXl3b3JkVHlwZVxuICAgICAgfVxuICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHR5cGVzLlBSRUNPTkRJVElPTlxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lciB7XG4gIGNvbnN0cnVjdG9yKHtjd2QsIGxpbmUsIHRpbWVvdXQsIHVyaX0pIHtcbiAgICB0aGlzLmN3ZCA9IGN3ZFxuICAgIHRoaXMubGluZSA9IGxpbmVcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy51cmkgPSB1cmlcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IFNjZW5hcmlvIGZyb20gJy4vc2NlbmFyaW8nXG5pbXBvcnQgVGFnIGZyb20gJy4vdGFnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWF0dXJlIHtcbiAgY29uc3RydWN0b3IgKHtnaGVya2luRGF0YSwgZ2hlcmtpblBpY2tsZXMsIHVyaX0pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZ2hlcmtpbkRhdGEuZGVzY3JpcHRpb25cbiAgICB0aGlzLmtleXdvcmQgPSBnaGVya2luRGF0YS5rZXl3b3JkXG4gICAgdGhpcy5saW5lID0gZ2hlcmtpbkRhdGEubG9jYXRpb24ubGluZVxuICAgIHRoaXMubmFtZSA9IGdoZXJraW5EYXRhLm5hbWVcbiAgICB0aGlzLnRhZ3MgPSBfLm1hcChnaGVya2luRGF0YS50YWdzLCBUYWcuYnVpbGQpXG4gICAgdGhpcy51cmkgPSB1cmlcblxuICAgIGNvbnN0IHNjZW5hcmlvTGluZVRvRGVzY3JpcHRpb25NYXBwaW5nID0gXy5jaGFpbihnaGVya2luRGF0YS5jaGlsZHJlbilcbiAgICAgIC5tYXAoKGVsZW1lbnQpID0+IFtlbGVtZW50LmxvY2F0aW9uLmxpbmUsIGVsZW1lbnQuZGVzY3JpcHRpb25dKVxuICAgICAgLmZyb21QYWlycygpXG4gICAgICAudmFsdWUoKVxuXG4gICAgY29uc3Qgc3RlcExpbmVUb0tleXdvcmRNYXBwaW5nID0gXy5jaGFpbihnaGVya2luRGF0YS5jaGlsZHJlbilcbiAgICAgIC5tYXAoJ3N0ZXBzJylcbiAgICAgIC5mbGF0dGVuKClcbiAgICAgIC5tYXAoKHN0ZXApID0+IFtzdGVwLmxvY2F0aW9uLmxpbmUsIHN0ZXAua2V5d29yZF0pXG4gICAgICAuZnJvbVBhaXJzKClcbiAgICAgIC52YWx1ZSgpXG5cbiAgICB0aGlzLnNjZW5hcmlvcyA9IF8ubWFwKGdoZXJraW5QaWNrbGVzLCAoZ2hlcmtpblBpY2tsZSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBTY2VuYXJpbyh7XG4gICAgICAgIGZlYXR1cmU6IHRoaXMsXG4gICAgICAgIGdoZXJraW5EYXRhOiBnaGVya2luUGlja2xlLFxuICAgICAgICBsYW5ndWFnZTogZ2hlcmtpbkRhdGEubGFuZ3VhZ2UsXG4gICAgICAgIGxpbmVUb0Rlc2NyaXB0aW9uTWFwcGluZzogc2NlbmFyaW9MaW5lVG9EZXNjcmlwdGlvbk1hcHBpbmcsXG4gICAgICAgIHN0ZXBMaW5lVG9LZXl3b3JkTWFwcGluZ1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmVhdHVyZXNSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihzdHJpY3QpIHtcbiAgICB0aGlzLmR1cmF0aW9uID0gMFxuICAgIHRoaXMuc2NlbmFyaW9SZXN1bHRzID0gW11cbiAgICB0aGlzLnN1Y2Nlc3MgPSB0cnVlXG4gICAgdGhpcy5zdGVwUmVzdWx0cyA9IFtdXG4gICAgdGhpcy5zdHJpY3QgPSBzdHJpY3RcbiAgfVxuXG4gIHdpdG5lc3NTY2VuYXJpb1Jlc3VsdChzY2VuYXJpb1Jlc3VsdCkge1xuICAgIGNvbnN0IHtkdXJhdGlvbiwgc3RhdHVzLCBzdGVwUmVzdWx0c30gPSBzY2VuYXJpb1Jlc3VsdFxuICAgIHRoaXMuZHVyYXRpb24gKz0gZHVyYXRpb25cbiAgICB0aGlzLnNjZW5hcmlvUmVzdWx0cy5wdXNoKHNjZW5hcmlvUmVzdWx0KVxuICAgIHRoaXMuc3RlcFJlc3VsdHMgPSB0aGlzLnN0ZXBSZXN1bHRzLmNvbmNhdChzdGVwUmVzdWx0cylcbiAgICBpZiAoXy5pbmNsdWRlcyhbU3RhdHVzLkFNQklHVU9VUywgU3RhdHVzLkZBSUxFRF0sIHN0YXR1cykpIHtcbiAgICAgIHRoaXMuc3VjY2VzcyA9IGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLnN0cmljdCAmJiBfLmluY2x1ZGVzKFtTdGF0dXMuUEVORElORywgU3RhdHVzLlVOREVGSU5FRF0sIHN0YXR1cykpIHtcbiAgICAgIHRoaXMuc3VjY2VzcyA9IGZhbHNlXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIb29rIHtcbiAgY29uc3RydWN0b3Ioe2tleXdvcmQsIHNjZW5hcmlvfSkge1xuICAgIHRoaXMua2V5d29yZCA9IGtleXdvcmRcbiAgICB0aGlzLnNjZW5hcmlvID0gc2NlbmFyaW9cbiAgfVxufVxuXG5Ib29rLkJFRk9SRV9TVEVQX0tFWVdPUkQgPSAnQmVmb3JlICdcbkhvb2suQUZURVJfU1RFUF9LRVlXT1JEID0gJ0FmdGVyICdcbiIsImltcG9ydCBTY2VuYXJpb0ZpbHRlciBmcm9tICcuLi9zY2VuYXJpb19maWx0ZXInXG5pbXBvcnQgU3RlcERlZmluaXRpb24gZnJvbSAnLi9zdGVwX2RlZmluaXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvb2tEZWZpbml0aW9uIGV4dGVuZHMgU3RlcERlZmluaXRpb24ge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgc3VwZXIoZGF0YSlcbiAgICB0aGlzLnNjZW5hcmlvRmlsdGVyID0gbmV3IFNjZW5hcmlvRmlsdGVyKHt0YWdFeHByZXNzaW9uOiB0aGlzLm9wdGlvbnMudGFnc30pXG4gIH1cblxuICBhcHBsaWVzVG9TY2VuYXJpbyhzY2VuYXJpbykge1xuICAgIHJldHVybiB0aGlzLnNjZW5hcmlvRmlsdGVyLm1hdGNoZXMoc2NlbmFyaW8pXG4gIH1cblxuICBnZXRJbnZhbGlkQ29kZUxlbmd0aE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRJbnZhbGlkQ29kZUxlbmd0aE1lc3NhZ2UoJzAgb3IgMScsICcyJylcbiAgfVxuXG4gIGdldEludm9jYXRpb25QYXJhbWV0ZXJzKHtzY2VuYXJpb1Jlc3VsdH0pIHtcbiAgICByZXR1cm4gW3NjZW5hcmlvUmVzdWx0XVxuICB9XG5cbiAgZ2V0VmFsaWRDb2RlTGVuZ3RocyAoKSB7XG4gICAgcmV0dXJuIFswLCAxLCAyXVxuICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgR2hlcmtpbiBmcm9tICdnaGVya2luJ1xuaW1wb3J0IFN0ZXAgZnJvbSAnLi9zdGVwJ1xuaW1wb3J0IFRhZyBmcm9tICcuL3RhZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmFyaW8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgY29uc3Qge1xuICAgICAgZmVhdHVyZSxcbiAgICAgIGdoZXJraW5EYXRhLFxuICAgICAgbGFuZ3VhZ2UsXG4gICAgICBsaW5lVG9EZXNjcmlwdGlvbk1hcHBpbmcsXG4gICAgICBzdGVwTGluZVRvS2V5d29yZE1hcHBpbmdcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgdGhpcy5mZWF0dXJlID0gZmVhdHVyZVxuICAgIHRoaXMua2V5d29yZCA9IF8uZmlyc3QoR2hlcmtpbi5ESUFMRUNUU1tsYW5ndWFnZV0uc2NlbmFyaW8pXG4gICAgdGhpcy5saW5lcyA9IF8ubWFwKGdoZXJraW5EYXRhLmxvY2F0aW9ucywgJ2xpbmUnKVxuICAgIHRoaXMubmFtZSA9IGdoZXJraW5EYXRhLm5hbWVcbiAgICB0aGlzLnRhZ3MgPSBfLm1hcChnaGVya2luRGF0YS50YWdzLCBUYWcuYnVpbGQpXG4gICAgdGhpcy51cmkgPSBnaGVya2luRGF0YS5sb2NhdGlvbnNbMF0ucGF0aFxuXG4gICAgdGhpcy5saW5lID0gXy5maXJzdCh0aGlzLmxpbmVzKVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBfLmNoYWluKHRoaXMubGluZXMpXG4gICAgICAubWFwKChsaW5lKSA9PiBsaW5lVG9EZXNjcmlwdGlvbk1hcHBpbmdbbGluZV0pXG4gICAgICAuY29tcGFjdCgpXG4gICAgICAuZmlyc3QoKVxuICAgICAgLnZhbHVlKClcblxuICAgIGxldCBwcmV2aW91c1N0ZXBcbiAgICB0aGlzLnN0ZXBzID0gXy5tYXAoZ2hlcmtpbkRhdGEuc3RlcHMsIChnaGVya2luU3RlcERhdGEpID0+IHtcbiAgICAgIGNvbnN0IHN0ZXAgPSBuZXcgU3RlcCh7XG4gICAgICAgIGdoZXJraW5EYXRhOiBnaGVya2luU3RlcERhdGEsXG4gICAgICAgIGxhbmd1YWdlLFxuICAgICAgICBsaW5lVG9LZXl3b3JkTWFwcGluZzogc3RlcExpbmVUb0tleXdvcmRNYXBwaW5nLFxuICAgICAgICBwcmV2aW91c1N0ZXAsXG4gICAgICAgIHNjZW5hcmlvOiB0aGlzXG4gICAgICB9KVxuICAgICAgcHJldmlvdXNTdGVwID0gc3RlcFxuICAgICAgcmV0dXJuIHN0ZXBcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgU3RhdHVzLCB7YWRkU3RhdHVzUHJlZGljYXRlc30gZnJvbSAnLi4vc3RhdHVzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuYXJpb1Jlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHNjZW5hcmlvKSB7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDBcbiAgICB0aGlzLmZhaWx1cmVFeGNlcHRpb24gPSBudWxsXG4gICAgdGhpcy5zY2VuYXJpbyA9IHNjZW5hcmlvXG4gICAgdGhpcy5zdGF0dXMgPSBTdGF0dXMuUEFTU0VEXG4gICAgdGhpcy5zdGVwUmVzdWx0cyA9IFtdXG4gIH1cblxuICBzaG91bGRVcGRhdGVTdGF0dXMoc3RlcFJlc3VsdFN0YXR1cykge1xuICAgIHN3aXRjaCAoc3RlcFJlc3VsdFN0YXR1cykge1xuICAgICAgY2FzZSBTdGF0dXMuRkFJTEVEOlxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgY2FzZSBTdGF0dXMuQU1CSUdVT1VTOlxuICAgICAgY2FzZSBTdGF0dXMuUEVORElORzpcbiAgICAgIGNhc2UgU3RhdHVzLlNLSVBQRUQ6XG4gICAgICBjYXNlIFN0YXR1cy5VTkRFRklORUQ6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gU3RhdHVzLlBBU1NFRFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgd2l0bmVzc1N0ZXBSZXN1bHQoc3RlcFJlc3VsdCkge1xuICAgIGNvbnN0IHtkdXJhdGlvbiwgZmFpbHVyZUV4Y2VwdGlvbiwgc3RhdHVzfSA9IHN0ZXBSZXN1bHRcbiAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgIHRoaXMuZHVyYXRpb24gKz0gZHVyYXRpb25cbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gU3RhdHVzLkZBSUxFRCkge1xuICAgICAgdGhpcy5mYWlsdXJlRXhjZXB0aW9uID0gZmFpbHVyZUV4Y2VwdGlvblxuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRVcGRhdGVTdGF0dXMoc3RhdHVzKSkge1xuICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXNcbiAgICB9XG4gICAgdGhpcy5zdGVwUmVzdWx0cy5wdXNoKHN0ZXBSZXN1bHQpXG4gIH1cbn1cblxuYWRkU3RhdHVzUHJlZGljYXRlcyhTY2VuYXJpb1Jlc3VsdC5wcm90b3R5cGUpXG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQge2dldFN0ZXBLZXl3b3JkVHlwZX0gZnJvbSAnLi4va2V5d29yZF90eXBlJ1xuaW1wb3J0IFN0ZXBBcmd1bWVudHMgZnJvbSAnLi9zdGVwX2FyZ3VtZW50cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHtnaGVya2luRGF0YSwgbGFuZ3VhZ2UsIGxpbmVUb0tleXdvcmRNYXBwaW5nLCBwcmV2aW91c1N0ZXAsIHNjZW5hcmlvfSkge1xuICAgIHRoaXMuYXJndW1lbnRzID0gXy5tYXAoZ2hlcmtpbkRhdGEuYXJndW1lbnRzLCBTdGVwQXJndW1lbnRzLmJ1aWxkKVxuICAgIHRoaXMubGluZSA9IF8ubGFzdChfLm1hcChnaGVya2luRGF0YS5sb2NhdGlvbnMsICdsaW5lJykpXG4gICAgdGhpcy5uYW1lID0gZ2hlcmtpbkRhdGEudGV4dFxuICAgIHRoaXMuc2NlbmFyaW8gPSBzY2VuYXJpb1xuICAgIHRoaXMudXJpID0gZ2hlcmtpbkRhdGEubG9jYXRpb25zWzBdLnBhdGhcblxuICAgIHRoaXMua2V5d29yZCA9IF8uY2hhaW4oZ2hlcmtpbkRhdGEubG9jYXRpb25zKVxuICAgICAgLm1hcCgoe2xpbmV9KSA9PiBsaW5lVG9LZXl3b3JkTWFwcGluZ1tsaW5lXSlcbiAgICAgIC5jb21wYWN0KClcbiAgICAgIC5maXJzdCgpXG4gICAgICAudmFsdWUoKVxuXG4gICAgdGhpcy5rZXl3b3JkVHlwZSA9IGdldFN0ZXBLZXl3b3JkVHlwZSh7bGFuZ3VhZ2UsIHByZXZpb3VzU3RlcCwgc3RlcDogdGhpc30pXG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVRhYmxlIHtcbiAgY29uc3RydWN0b3IoZ2hlcmtpbkRhdGEpIHtcbiAgICB0aGlzLnJhd1RhYmxlID0gZ2hlcmtpbkRhdGEucm93cy5tYXAoKHJvdykgPT4gcm93LmNlbGxzLm1hcCgoY2VsbCkgPT4gY2VsbC52YWx1ZSkpXG4gIH1cblxuICBoYXNoZXMoKSB7XG4gICAgY29uc3QgY29weSA9IHRoaXMucmF3KClcbiAgICBjb25zdCBrZXlzID0gY29weVswXVxuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gY29weS5zbGljZSgxKVxuICAgIHJldHVybiB2YWx1ZXNBcnJheS5tYXAoKHZhbHVlcykgPT4gXy56aXBPYmplY3Qoa2V5cywgdmFsdWVzKSlcbiAgfVxuXG4gIHJhdygpIHtcbiAgICByZXR1cm4gdGhpcy5yYXdUYWJsZS5zbGljZSgwKVxuICB9XG5cbiAgcm93cygpIHtcbiAgICBjb25zdCBjb3B5ID0gdGhpcy5yYXcoKVxuICAgIGNvcHkuc2hpZnQoKVxuICAgIHJldHVybiBjb3B5XG4gIH1cblxuICByb3dzSGFzaCgpIHtcbiAgICBjb25zdCByb3dzID0gdGhpcy5yYXcoKVxuICAgIGNvbnN0IGV2ZXJ5Um93SGFzVHdvQ29sdW1ucyA9IF8uZXZlcnkocm93cywgKHJvdykgPT4gcm93Lmxlbmd0aCA9PT0gMilcbiAgICBpZiAoIWV2ZXJ5Um93SGFzVHdvQ29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyb3dzSGFzaCBjYW4gb25seSBiZSBjYWxsZWQgb24gYSBkYXRhIHRhYmxlIHdoZXJlIGFsbCByb3dzIGhhdmUgZXhhY3RseSB0d28gY29sdW1ucycpXG4gICAgfVxuICAgIHJldHVybiBfLmZyb21QYWlycyhyb3dzKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb2NTdHJpbmcge1xuICBjb25zdHJ1Y3RvcihnaGVya2luRGF0YSkge1xuICAgIHRoaXMuY29udGVudCA9IGdoZXJraW5EYXRhLmNvbnRlbnRcbiAgICB0aGlzLmNvbnRlbnRUeXBlID0gZ2hlcmtpbkRhdGEuY29udGVudFR5cGVcbiAgICB0aGlzLmxpbmUgPSBnaGVya2luRGF0YS5sb2NhdGlvbi5saW5lXG4gIH1cbn1cbiIsImltcG9ydCBEYXRhVGFibGUgZnJvbSAnLi9kYXRhX3RhYmxlJ1xuaW1wb3J0IERvY1N0cmluZyBmcm9tICcuL2RvY19zdHJpbmcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXBBcmd1bWVudHMge1xuICBzdGF0aWMgYnVpbGQoZ2hlcmtpbkRhdGEpIHtcbiAgICBpZiAoZ2hlcmtpbkRhdGEuaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSkge1xuICAgICAgcmV0dXJuIG5ldyBEb2NTdHJpbmcoZ2hlcmtpbkRhdGEpXG4gICAgfSBlbHNlIGlmIChnaGVya2luRGF0YS5oYXNPd25Qcm9wZXJ0eSgncm93cycpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGFUYWJsZShnaGVya2luRGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHN0ZXAgYXJndW1lbnQgdHlwZTogJyArIEpTT04uc3RyaW5naWZ5KGdoZXJraW5EYXRhKSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7Q3VjdW1iZXJFeHByZXNzaW9uLCBSZWd1bGFyRXhwcmVzc2lvbn0gZnJvbSAnY3VjdW1iZXItZXhwcmVzc2lvbnMnXG5pbXBvcnQgRGF0YVRhYmxlIGZyb20gJy4vc3RlcF9hcmd1bWVudHMvZGF0YV90YWJsZSdcbmltcG9ydCBEb2NTdHJpbmcgZnJvbSAnLi9zdGVwX2FyZ3VtZW50cy9kb2Nfc3RyaW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwRGVmaW5pdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHtjb2RlLCBsaW5lLCBvcHRpb25zLCBwYXR0ZXJuLCB1cml9KSB7XG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIHRoaXMubGluZSA9IGxpbmVcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVyblxuICAgIHRoaXMudXJpID0gdXJpXG4gIH1cblxuICBidWlsZEludmFsaWRDb2RlTGVuZ3RoTWVzc2FnZShzeW5jT3JQcm9taXNlTGVuZ3RoLCBjYWxsYmFja0xlbmd0aCkge1xuICAgIHJldHVybiAnZnVuY3Rpb24gaGFzICcgKyB0aGlzLmNvZGUubGVuZ3RoICsgJyBhcmd1bWVudHMnICtcbiAgICAgICcsIHNob3VsZCBoYXZlICcgKyBzeW5jT3JQcm9taXNlTGVuZ3RoICsgJyAoaWYgc3luY2hyb25vdXMgb3IgcmV0dXJuaW5nIGEgcHJvbWlzZSknICtcbiAgICAgICcgb3IgJyAgKyBjYWxsYmFja0xlbmd0aCArICcgKGlmIGFjY2VwdGluZyBhIGNhbGxiYWNrKSdcbiAgfVxuXG4gIGdldEludmFsaWRDb2RlTGVuZ3RoTWVzc2FnZShwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRJbnZhbGlkQ29kZUxlbmd0aE1lc3NhZ2UocGFyYW1ldGVycy5sZW5ndGgsIHBhcmFtZXRlcnMubGVuZ3RoICsgMSlcbiAgfVxuXG4gIGdldEludm9jYXRpb25QYXJhbWV0ZXJzKHtzdGVwLCB0cmFuc2Zvcm1Mb29rdXB9KSB7XG4gICAgY29uc3QgY3VjdW1iZXJFeHByZXNzaW9uID0gdGhpcy5nZXRDdWN1bWJlckV4cHJlc3Npb24odHJhbnNmb3JtTG9va3VwKVxuICAgIGNvbnN0IHN0ZXBOYW1lUGFyYW1ldGVycyA9IF8ubWFwKGN1Y3VtYmVyRXhwcmVzc2lvbi5tYXRjaChzdGVwLm5hbWUpLCAndHJhbnNmb3JtZWRWYWx1ZScpXG4gICAgY29uc3Qgc3RlcEFyZ3VtZW50UGFyYW1ldGVycyA9IHN0ZXAuYXJndW1lbnRzLm1hcChmdW5jdGlvbihhcmcpIHtcbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBEYXRhVGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGFyZ1xuICAgICAgfSBlbHNlIGlmIChhcmcgaW5zdGFuY2VvZiBEb2NTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGFyZy5jb250ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYXJndW1lbnQgdHlwZTonICsgYXJnKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHN0ZXBOYW1lUGFyYW1ldGVycy5jb25jYXQoc3RlcEFyZ3VtZW50UGFyYW1ldGVycylcbiAgfVxuXG4gIGdldEN1Y3VtYmVyRXhwcmVzc2lvbih0cmFuc2Zvcm1Mb29rdXApIHtcbiAgICBpZiAodHlwZW9mKHRoaXMucGF0dGVybikgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IEN1Y3VtYmVyRXhwcmVzc2lvbih0aGlzLnBhdHRlcm4sIFtdLCB0cmFuc2Zvcm1Mb29rdXApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUmVndWxhckV4cHJlc3Npb24odGhpcy5wYXR0ZXJuLCBbXSwgdHJhbnNmb3JtTG9va3VwKVxuICAgIH1cbiAgfVxuXG4gIGdldFZhbGlkQ29kZUxlbmd0aHMocGFyYW1ldGVycykge1xuICAgIHJldHVybiBbcGFyYW1ldGVycy5sZW5ndGgsIHBhcmFtZXRlcnMubGVuZ3RoICsgMV1cbiAgfVxuXG4gIG1hdGNoZXNTdGVwTmFtZSh7c3RlcE5hbWUsIHRyYW5zZm9ybUxvb2t1cH0pIHtcbiAgICBjb25zdCBjdWN1bWJlckV4cHJlc3Npb24gPSB0aGlzLmdldEN1Y3VtYmVyRXhwcmVzc2lvbih0cmFuc2Zvcm1Mb29rdXApXG4gICAgcmV0dXJuIEJvb2xlYW4oY3VjdW1iZXJFeHByZXNzaW9uLm1hdGNoKHN0ZXBOYW1lKSlcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHthZGRTdGF0dXNQcmVkaWNhdGVzfSBmcm9tICcuLi9zdGF0dXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXBSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgXy5hc3NpZ24odGhpcywgXy5waWNrKGRhdGEsIFtcbiAgICAgICdhbWJpZ3VvdXNTdGVwRGVmaW5pdGlvbnMnLFxuICAgICAgJ2F0dGFjaG1lbnRzJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnZmFpbHVyZUV4Y2VwdGlvbicsXG4gICAgICAnc3RlcCcsXG4gICAgICAnc3RlcERlZmluaXRpb24nLFxuICAgICAgJ3N0YXR1cydcbiAgICBdKSlcbiAgfVxufVxuXG5hZGRTdGF0dXNQcmVkaWNhdGVzKFN0ZXBSZXN1bHQucHJvdG90eXBlKVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFnIHtcbiAgc3RhdGljIGJ1aWxkKGdoZXJraW5EYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBUYWcoZ2hlcmtpbkRhdGEpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihnaGVya2luRGF0YSkge1xuICAgIHRoaXMubGluZSA9IGdoZXJraW5EYXRhLmxvY2F0aW9uLmxpbmVcbiAgICB0aGlzLm5hbWUgPSBnaGVya2luRGF0YS5uYW1lXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dGFjaG1lbnQge1xuICBjb25zdHJ1Y3Rvcih7ZGF0YSwgbWltZVR5cGV9KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICAgIHRoaXMubWltZVR5cGUgPSBtaW1lVHlwZVxuICB9XG59XG4iLCJpbXBvcnQgQXR0YWNobWVudCBmcm9tICcuL2F0dGFjaG1lbnQnXG5pbXBvcnQgaXNTdHJlYW0gZnJvbSAnaXMtc3RyZWFtJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dGFjaG1lbnRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRhY2htZW50cyA9IFtdXG4gIH1cblxuICBjcmVhdGUoZGF0YSwgbWltZVR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgaWYgKCFtaW1lVHlwZSkge1xuICAgICAgICB0aHJvdyBFcnJvcignQnVmZmVyIGF0dGFjaG1lbnRzIG11c3Qgc3BlY2lmeSBhIG1pbWVUeXBlJylcbiAgICAgIH1cbiAgICAgIHRoaXMuY3JlYXRlQnVmZmVyQXR0YWNobWVudChkYXRhLCBtaW1lVHlwZSlcbiAgICB9IGVsc2UgaWYgKGlzU3RyZWFtLnJlYWRhYmxlKGRhdGEpKSB7XG4gICAgICBpZiAoIW1pbWVUeXBlKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdHJlYW0gYXR0YWNobWVudHMgbXVzdCBzcGVjaWZ5IGEgbWltZVR5cGUnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU3RyZWFtQXR0YWNobWVudChkYXRhLCBtaW1lVHlwZSwgY2FsbGJhY2spXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoZGF0YSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIW1pbWVUeXBlKSB7XG4gICAgICAgIG1pbWVUeXBlID0gJ3RleHQvcGxhaW4nXG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZVN0cmluZ0F0dGFjaG1lbnQoZGF0YSwgbWltZVR5cGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGF0dGFjaG1lbnQgZGF0YTogbXVzdCBiZSBhIGJ1ZmZlciwgcmVhZGFibGUgc3RyZWFtLCBvciBzdHJpbmcnKVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUJ1ZmZlckF0dGFjaG1lbnQoZGF0YSwgbWltZVR5cGUpIHtcbiAgICB0aGlzLmNyZWF0ZVN0cmluZ0F0dGFjaG1lbnQoZGF0YS50b1N0cmluZygnYmFzZTY0JyksIG1pbWVUeXBlKVxuICB9XG5cbiAgY3JlYXRlU3RyZWFtQXR0YWNobWVudChkYXRhLCBtaW1lVHlwZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYnVmZmVycyA9IFtdXG4gICAgICBkYXRhLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7IGJ1ZmZlcnMucHVzaChjaHVuaykgfSlcbiAgICAgIGRhdGEub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdWZmZXJBdHRhY2htZW50KEJ1ZmZlci5jb25jYXQoYnVmZmVycyksIG1pbWVUeXBlKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgICBkYXRhLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICB9KVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgcHJvbWlzZS50aGVuKGNhbGxiYWNrLCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByb21pc2VcbiAgICB9XG4gIH1cblxuICBjcmVhdGVTdHJpbmdBdHRhY2htZW50KGRhdGEsIG1pbWVUeXBlKSB7XG4gICAgY29uc3QgYXR0YWNobWVudCA9IG5ldyBBdHRhY2htZW50KHtkYXRhLCBtaW1lVHlwZX0pXG4gICAgdGhpcy5hdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpXG4gIH1cblxuICBnZXRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0YWNobWVudHNcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKHtkYXRhLCBuYW1lfSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gIH1cblxuICBidWlsZEJlZm9yZUV2ZW50KCkge1xuICAgIHJldHVybiBuZXcgRXZlbnQoe1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgbmFtZTogJ0JlZm9yZScgKyB0aGlzLm5hbWUsXG4gICAgfSlcbiAgfVxuXG4gIGJ1aWxkQWZ0ZXJFdmVudCgpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50KHtcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIG5hbWU6ICdBZnRlcicgKyB0aGlzLm5hbWUsXG4gICAgfSlcbiAgfVxufVxuXG5fLmFzc2lnbihFdmVudCwge1xuICBGRUFUVVJFU19FVkVOVF9OQU1FOiAnRmVhdHVyZXMnLFxuICBGRUFUVVJFU19SRVNVTFRfRVZFTlRfTkFNRTogJ0ZlYXR1cmVzUmVzdWx0JyxcbiAgRkVBVFVSRV9FVkVOVF9OQU1FOiAnRmVhdHVyZScsXG4gIFNDRU5BUklPX0VWRU5UX05BTUU6ICdTY2VuYXJpbycsXG4gIFNDRU5BUklPX1JFU1VMVF9FVkVOVF9OQU1FOiAnU2NlbmFyaW9SZXN1bHQnLFxuICBTVEVQX0VWRU5UX05BTUU6ICdTdGVwJyxcbiAgU1RFUF9SRVNVTFRfRVZFTlRfTkFNRTogJ1N0ZXBSZXN1bHQnXG59KVxuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IFVzZXJDb2RlUnVubmVyIGZyb20gJy4uL3VzZXJfY29kZV9ydW5uZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50QnJvYWRjYXN0ZXIge1xuICBjb25zdHJ1Y3Rvcih7Y3dkLCBsaXN0ZW5lckRlZmF1bHRUaW1lb3V0LCBsaXN0ZW5lcnN9KSB7XG4gICAgdGhpcy5jd2QgPSBjd2RcbiAgICB0aGlzLmxpc3RlbmVyRGVmYXVsdFRpbWVvdXQgPSBsaXN0ZW5lckRlZmF1bHRUaW1lb3V0XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIGFzeW5jIGJyb2FkY2FzdEFyb3VuZEV2ZW50KGV2ZW50LCBmbikge1xuICAgIGF3YWl0IHRoaXMuYnJvYWRjYXN0RXZlbnQoZXZlbnQuYnVpbGRCZWZvcmVFdmVudCgpKVxuICAgIGF3YWl0IGZuKClcbiAgICBhd2FpdCB0aGlzLmJyb2FkY2FzdEV2ZW50KGV2ZW50LmJ1aWxkQWZ0ZXJFdmVudCgpKVxuICB9XG5cbiAgYXN5bmMgYnJvYWRjYXN0RXZlbnQoZXZlbnQpIHtcbiAgICBhd2FpdCBQcm9taXNlLmVhY2godGhpcy5saXN0ZW5lcnMsIGFzeW5jKGxpc3RlbmVyKSA9PiB7XG4gICAgICBjb25zdCBmbk5hbWUgPSBgaGFuZGxlJHtldmVudC5uYW1lfWBcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBsaXN0ZW5lcltmbk5hbWVdXG4gICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICBjb25zdCB0aW1lb3V0ID0gbGlzdGVuZXIudGltZW91dCB8fCB0aGlzLmxpc3RlbmVyRGVmYXVsdFRpbWVvdXRcbiAgICAgICAgY29uc3Qge2Vycm9yfSA9IGF3YWl0IFVzZXJDb2RlUnVubmVyLnJ1bih7XG4gICAgICAgICAgYXJnc0FycmF5OiBbZXZlbnQuZGF0YV0sXG4gICAgICAgICAgZm46IGhhbmRsZXIsXG4gICAgICAgICAgdGltZW91dEluTWlsbGlzZWNvbmRzOiB0aW1lb3V0LFxuICAgICAgICAgIHRoaXNBcmc6IGxpc3RlbmVyXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRMaXN0ZW5lckVycm9yTG9jYXRpb24oe2ZuTmFtZSwgbGlzdGVuZXJ9KVxuICAgICAgICAgIHRocm93IHRoaXMucHJlcGVuZExvY2F0aW9uVG9FcnJvcih7ZXJyb3IsIGxvY2F0aW9ufSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRMaXN0ZW5lckVycm9yTG9jYXRpb24oe2ZuTmFtZSwgbGlzdGVuZXJ9KSB7XG4gICAgaWYgKGxpc3RlbmVyLmN3ZCAmJiBsaXN0ZW5lci51cmkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlbGF0aXZlKGxpc3RlbmVyLmN3ZCwgbGlzdGVuZXIudXJpKSArICc6JyArIGxpc3RlbmVyLmxpbmVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2xpc3RlbmVyLmNvbnN0cnVjdG9yLm5hbWV9Ojoke2ZuTmFtZX1gXG4gICAgfVxuICB9XG5cbiAgcHJlcGVuZExvY2F0aW9uVG9FcnJvcih7ZXJyb3IsIGxvY2F0aW9ufSkge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBlcnJvci5tZXNzYWdlID0gbG9jYXRpb24gKyAnICcgKyBlcnJvci5tZXNzYWdlXG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbG9jYXRpb24gKyAnICcgKyBlcnJvclxuICAgIH1cbiAgICByZXR1cm4gZXJyb3JcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnXG5pbXBvcnQgRmVhdHVyZXNSZXN1bHQgZnJvbSAnLi4vbW9kZWxzL2ZlYXR1cmVzX3Jlc3VsdCdcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IFNjZW5hcmlvUnVubmVyIGZyb20gJy4vc2NlbmFyaW9fcnVubmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWF0dXJlc1J1bm5lciB7XG4gIGNvbnN0cnVjdG9yKHtldmVudEJyb2FkY2FzdGVyLCBmZWF0dXJlcywgb3B0aW9ucywgc2NlbmFyaW9GaWx0ZXIsIHN1cHBvcnRDb2RlTGlicmFyeX0pIHtcbiAgICB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIgPSBldmVudEJyb2FkY2FzdGVyXG4gICAgdGhpcy5mZWF0dXJlcyA9IGZlYXR1cmVzXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuc2NlbmFyaW9GaWx0ZXIgPSBzY2VuYXJpb0ZpbHRlclxuICAgIHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5ID0gc3VwcG9ydENvZGVMaWJyYXJ5XG4gICAgdGhpcy5mZWF0dXJlc1Jlc3VsdCA9IG5ldyBGZWF0dXJlc1Jlc3VsdChvcHRpb25zLnN0cmljdClcbiAgfVxuXG4gIGFzeW5jIHJ1bigpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh7ZGF0YTogdGhpcy5mZWF0dXJlcywgbmFtZTogRXZlbnQuRkVBVFVSRVNfRVZFTlRfTkFNRX0pXG4gICAgYXdhaXQgdGhpcy5ldmVudEJyb2FkY2FzdGVyLmJyb2FkY2FzdEFyb3VuZEV2ZW50KGV2ZW50LCBhc3luYygpID0+IHtcbiAgICAgIGF3YWl0IFByb21pc2UuZWFjaCh0aGlzLmZlYXR1cmVzLCA6OnRoaXMucnVuRmVhdHVyZSlcbiAgICAgIGF3YWl0IHRoaXMuYnJvYWRjYXN0RmVhdHVyZXNSZXN1bHQoKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZXNSZXN1bHQuc3VjY2Vzc1xuICB9XG5cbiAgYXN5bmMgYnJvYWRjYXN0RmVhdHVyZXNSZXN1bHQoKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoe2RhdGE6IHRoaXMuZmVhdHVyZXNSZXN1bHQsIG5hbWU6IEV2ZW50LkZFQVRVUkVTX1JFU1VMVF9FVkVOVF9OQU1FfSlcbiAgICBhd2FpdCB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIuYnJvYWRjYXN0RXZlbnQoZXZlbnQpXG4gIH1cblxuICBhc3luYyBydW5GZWF0dXJlKGZlYXR1cmUpIHtcbiAgICBpZiAoIXRoaXMuZmVhdHVyZXNSZXN1bHQuc3VjY2VzcyAmJiB0aGlzLm9wdGlvbnMuZmFpbEZhc3QpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh7ZGF0YTogZmVhdHVyZSwgbmFtZTogRXZlbnQuRkVBVFVSRV9FVkVOVF9OQU1FfSlcbiAgICBhd2FpdCB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIuYnJvYWRjYXN0QXJvdW5kRXZlbnQoZXZlbnQsIGFzeW5jKCkgPT4ge1xuICAgICAgYXdhaXQgUHJvbWlzZS5lYWNoKGZlYXR1cmUuc2NlbmFyaW9zLCA6OnRoaXMucnVuU2NlbmFyaW8pXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHJ1blNjZW5hcmlvKHNjZW5hcmlvKSB7XG4gICAgaWYgKCF0aGlzLmZlYXR1cmVzUmVzdWx0LnN1Y2Nlc3MgJiYgdGhpcy5vcHRpb25zLmZhaWxGYXN0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNjZW5hcmlvRmlsdGVyLm1hdGNoZXMoc2NlbmFyaW8pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgc2NlbmFyaW9SdW5uZXIgPSBuZXcgU2NlbmFyaW9SdW5uZXIoe1xuICAgICAgZXZlbnRCcm9hZGNhc3RlcjogdGhpcy5ldmVudEJyb2FkY2FzdGVyLFxuICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgc2NlbmFyaW8sXG4gICAgICBzdXBwb3J0Q29kZUxpYnJhcnk6IHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5XG4gICAgfSlcbiAgICBjb25zdCBzY2VuYXJpb1Jlc3VsdCA9IGF3YWl0IHNjZW5hcmlvUnVubmVyLnJ1bigpXG4gICAgdGhpcy5mZWF0dXJlc1Jlc3VsdC53aXRuZXNzU2NlbmFyaW9SZXN1bHQoc2NlbmFyaW9SZXN1bHQpXG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEJyb2FkY2FzdGVyIGZyb20gJy4vZXZlbnRfYnJvYWRjYXN0ZXInXG5pbXBvcnQgRmVhdHVyZXNSdW5uZXIgZnJvbSAnLi9mZWF0dXJlc19ydW5uZXInXG5pbXBvcnQgU3RhY2tUcmFjZUZpbHRlciBmcm9tICcuL3N0YWNrX3RyYWNlX2ZpbHRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVudGltZSB7XG4gIC8vIG9wdGlvbnMgLSB7ZHJ5UnVuLCBmYWlsRmFzdCwgZmlsdGVyU3RhY2t0cmFjZXMsIHN0cmljdH1cbiAgY29uc3RydWN0b3Ioe2ZlYXR1cmVzLCBsaXN0ZW5lcnMsIG9wdGlvbnMsIHNjZW5hcmlvRmlsdGVyLCBzdXBwb3J0Q29kZUxpYnJhcnl9KSB7XG4gICAgdGhpcy5mZWF0dXJlcyA9IGZlYXR1cmVzXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBsaXN0ZW5lcnNcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5zY2VuYXJpb0ZpbHRlciA9IHNjZW5hcmlvRmlsdGVyXG4gICAgdGhpcy5zdXBwb3J0Q29kZUxpYnJhcnkgPSBzdXBwb3J0Q29kZUxpYnJhcnlcbiAgICB0aGlzLnN0YWNrVHJhY2VGaWx0ZXIgPSBuZXcgU3RhY2tUcmFjZUZpbHRlcigpXG4gIH1cblxuICBhc3luYyBzdGFydCgpIHtcbiAgICBjb25zdCBldmVudEJyb2FkY2FzdGVyID0gbmV3IEV2ZW50QnJvYWRjYXN0ZXIoe1xuICAgICAgbGlzdGVuZXJEZWZhdWx0VGltZW91dDogdGhpcy5zdXBwb3J0Q29kZUxpYnJhcnkuZGVmYXVsdFRpbWVvdXQsXG4gICAgICBsaXN0ZW5lcnM6IHRoaXMubGlzdGVuZXJzLmNvbmNhdCh0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS5saXN0ZW5lcnMpXG4gICAgfSlcbiAgICBjb25zdCBmZWF0dXJlc1J1bm5lciA9IG5ldyBGZWF0dXJlc1J1bm5lcih7XG4gICAgICBldmVudEJyb2FkY2FzdGVyLFxuICAgICAgZmVhdHVyZXM6IHRoaXMuZmVhdHVyZXMsXG4gICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICBzY2VuYXJpb0ZpbHRlcjogdGhpcy5zY2VuYXJpb0ZpbHRlcixcbiAgICAgIHN1cHBvcnRDb2RlTGlicmFyeTogdGhpcy5zdXBwb3J0Q29kZUxpYnJhcnlcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJTdGFja3RyYWNlcykge1xuICAgICAgdGhpcy5zdGFja1RyYWNlRmlsdGVyLmZpbHRlcigpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmVhdHVyZXNSdW5uZXIucnVuKClcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlsdGVyU3RhY2t0cmFjZXMpIHtcbiAgICAgIHRoaXMuc3RhY2tUcmFjZUZpbHRlci51bmZpbHRlcigpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgYXR0YWNoTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICB9XG59XG4iLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCdcbmltcG9ydCBIb29rIGZyb20gJy4uL21vZGVscy9ob29rJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgU2NlbmFyaW9SZXN1bHQgZnJvbSAnLi4vbW9kZWxzL3NjZW5hcmlvX3Jlc3VsdCdcbmltcG9ydCBTdGF0dXMgZnJvbSAnLi4vc3RhdHVzJ1xuaW1wb3J0IFN0ZXBSZXN1bHQgZnJvbSAnLi4vbW9kZWxzL3N0ZXBfcmVzdWx0J1xuaW1wb3J0IFN0ZXBSdW5uZXIgZnJvbSAnLi9zdGVwX3J1bm5lcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmFyaW9SdW5uZXIge1xuICBjb25zdHJ1Y3Rvcih7ZXZlbnRCcm9hZGNhc3Rlciwgb3B0aW9ucywgc2NlbmFyaW8sIHN1cHBvcnRDb2RlTGlicmFyeX0pIHtcbiAgICB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIgPSBldmVudEJyb2FkY2FzdGVyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuc2NlbmFyaW8gPSBzY2VuYXJpb1xuICAgIHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5ID0gc3VwcG9ydENvZGVMaWJyYXJ5XG4gICAgdGhpcy5zY2VuYXJpb1Jlc3VsdCA9IG5ldyBTY2VuYXJpb1Jlc3VsdChzY2VuYXJpbylcbiAgICB0aGlzLndvcmxkID0gbmV3IHN1cHBvcnRDb2RlTGlicmFyeS5Xb3JsZChvcHRpb25zLndvcmxkUGFyYW1ldGVycylcbiAgfVxuXG4gIGFzeW5jIGJyb2FkY2FzdFNjZW5hcmlvUmVzdWx0KCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHtkYXRhOiB0aGlzLnNjZW5hcmlvUmVzdWx0LCBuYW1lOiBFdmVudC5TQ0VOQVJJT19SRVNVTFRfRVZFTlRfTkFNRX0pXG4gICAgYXdhaXQgdGhpcy5ldmVudEJyb2FkY2FzdGVyLmJyb2FkY2FzdEV2ZW50KGV2ZW50KVxuICB9XG5cbiAgYXN5bmMgYnJvYWRjYXN0U3RlcFJlc3VsdChzdGVwUmVzdWx0KSB7XG4gICAgdGhpcy5zY2VuYXJpb1Jlc3VsdC53aXRuZXNzU3RlcFJlc3VsdChzdGVwUmVzdWx0KVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHtkYXRhOiBzdGVwUmVzdWx0LCBuYW1lOiBFdmVudC5TVEVQX1JFU1VMVF9FVkVOVF9OQU1FfSlcbiAgICBhd2FpdCB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIuYnJvYWRjYXN0RXZlbnQoZXZlbnQpXG4gIH1cblxuICBpbnZva2VTdGVwKHN0ZXAsIHN0ZXBEZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIFN0ZXBSdW5uZXIucnVuKHtcbiAgICAgIGRlZmF1bHRUaW1lb3V0OiB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS5kZWZhdWx0VGltZW91dCxcbiAgICAgIHNjZW5hcmlvUmVzdWx0OiB0aGlzLnNjZW5hcmlvUmVzdWx0LFxuICAgICAgc3RlcCxcbiAgICAgIHN0ZXBEZWZpbml0aW9uLFxuICAgICAgdHJhbnNmb3JtTG9va3VwOiB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS50cmFuc2Zvcm1Mb29rdXAsXG4gICAgICB3b3JsZDogdGhpcy53b3JsZFxuICAgIH0pXG4gIH1cblxuICBpc1NraXBwaW5nU3RlcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NlbmFyaW9SZXN1bHQuc3RhdHVzICE9PSBTdGF0dXMuUEFTU0VEXG4gIH1cblxuICBhc3luYyBydW4oKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoe2RhdGE6IHRoaXMuc2NlbmFyaW8sIG5hbWU6IEV2ZW50LlNDRU5BUklPX0VWRU5UX05BTUV9KVxuICAgIGF3YWl0IHRoaXMuZXZlbnRCcm9hZGNhc3Rlci5icm9hZGNhc3RBcm91bmRFdmVudChldmVudCwgYXN5bmMoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnJ1bkJlZm9yZUhvb2tzKClcbiAgICAgIGF3YWl0IHRoaXMucnVuU3RlcHMoKVxuICAgICAgYXdhaXQgdGhpcy5ydW5BZnRlckhvb2tzKClcbiAgICAgIGF3YWl0IHRoaXMuYnJvYWRjYXN0U2NlbmFyaW9SZXN1bHQoKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuc2NlbmFyaW9SZXN1bHRcbiAgfVxuXG4gIGFzeW5jIHJ1bkFmdGVySG9va3MoKSB7XG4gICAgYXdhaXQgdGhpcy5ydW5Ib29rcyh7XG4gICAgICBob29rRGVmaW5pdGlvbnM6IHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LmFmdGVySG9va0RlZmluaXRpb25zLnJldmVyc2UoKSxcbiAgICAgIGhvb2tLZXl3b3JkOiBIb29rLkFGVEVSX1NURVBfS0VZV09SRFxuICAgIH0pXG4gIH1cblxuICBhc3luYyBydW5CZWZvcmVIb29rcygpIHtcbiAgICBhd2FpdCB0aGlzLnJ1bkhvb2tzKHtcbiAgICAgIGhvb2tEZWZpbml0aW9uczogdGhpcy5zdXBwb3J0Q29kZUxpYnJhcnkuYmVmb3JlSG9va0RlZmluaXRpb25zLFxuICAgICAgaG9va0tleXdvcmQ6IEhvb2suQkVGT1JFX1NURVBfS0VZV09SRFxuICAgIH0pXG4gIH1cblxuICBhc3luYyBydW5Ib29rKGhvb2ssIGhvb2tEZWZpbml0aW9uKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kcnlSdW4pIHtcbiAgICAgIHJldHVybiBuZXcgU3RlcFJlc3VsdCh7XG4gICAgICAgIHN0ZXA6IGhvb2ssXG4gICAgICAgIHN0ZXBEZWZpbml0aW9uOiBob29rRGVmaW5pdGlvbixcbiAgICAgICAgc3RhdHVzOiBTdGF0dXMuU0tJUFBFRFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW52b2tlU3RlcChob29rLCBob29rRGVmaW5pdGlvbilcbiAgICB9XG4gIH1cblxuICBhc3luYyBydW5Ib29rcyh7aG9va0RlZmluaXRpb25zLCBob29rS2V5d29yZH0pIHtcbiAgICBhd2FpdCBQcm9taXNlLmVhY2goaG9va0RlZmluaXRpb25zLCBhc3luYyAoaG9va0RlZmluaXRpb24pID0+IHtcbiAgICAgIGlmICghaG9va0RlZmluaXRpb24uYXBwbGllc1RvU2NlbmFyaW8odGhpcy5zY2VuYXJpbykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBob29rID0gbmV3IEhvb2soe2tleXdvcmQ6IGhvb2tLZXl3b3JkLCBzY2VuYXJpbzogdGhpcy5zY2VuYXJpb30pXG4gICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh7ZGF0YTogaG9vaywgbmFtZTogRXZlbnQuU1RFUF9FVkVOVF9OQU1FfSlcbiAgICAgIGF3YWl0IHRoaXMuZXZlbnRCcm9hZGNhc3Rlci5icm9hZGNhc3RBcm91bmRFdmVudChldmVudCwgYXN5bmMoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0ZXBSZXN1bHQgPSBhd2FpdCB0aGlzLnJ1bkhvb2soaG9vaywgaG9va0RlZmluaXRpb24pXG4gICAgICAgIGF3YWl0IHRoaXMuYnJvYWRjYXN0U3RlcFJlc3VsdChzdGVwUmVzdWx0KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgcnVuU3RlcChzdGVwKSB7XG4gICAgY29uc3Qgc3RlcERlZmluaXRpb25zID0gdGhpcy5zdXBwb3J0Q29kZUxpYnJhcnkuc3RlcERlZmluaXRpb25zLmZpbHRlcigoc3RlcERlZmluaXRpb24pID0+IHtcbiAgICAgIHJldHVybiBzdGVwRGVmaW5pdGlvbi5tYXRjaGVzU3RlcE5hbWUoe1xuICAgICAgICBzdGVwTmFtZTogc3RlcC5uYW1lLFxuICAgICAgICB0cmFuc2Zvcm1Mb29rdXA6IHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LnRyYW5zZm9ybUxvb2t1cFxuICAgICAgfSlcbiAgICB9KVxuICAgIGlmIChzdGVwRGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbmV3IFN0ZXBSZXN1bHQoe1xuICAgICAgICBzdGVwLFxuICAgICAgICBzdGF0dXM6IFN0YXR1cy5VTkRFRklORURcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmIChzdGVwRGVmaW5pdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIG5ldyBTdGVwUmVzdWx0KHtcbiAgICAgICAgYW1iaWd1b3VzU3RlcERlZmluaXRpb25zOiBzdGVwRGVmaW5pdGlvbnMsXG4gICAgICAgIHN0ZXAsXG4gICAgICAgIHN0YXR1czogU3RhdHVzLkFNQklHVU9VU1xuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kcnlSdW4gfHwgdGhpcy5pc1NraXBwaW5nU3RlcHMoKSkge1xuICAgICAgcmV0dXJuIG5ldyBTdGVwUmVzdWx0KHtcbiAgICAgICAgc3RlcCxcbiAgICAgICAgc3RlcERlZmluaXRpb246IHN0ZXBEZWZpbml0aW9uc1swXSxcbiAgICAgICAgc3RhdHVzOiBTdGF0dXMuU0tJUFBFRFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW52b2tlU3RlcChzdGVwLCBzdGVwRGVmaW5pdGlvbnNbMF0pXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcnVuU3RlcHMoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5lYWNoKHRoaXMuc2NlbmFyaW8uc3RlcHMsIGFzeW5jKHN0ZXApID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHtkYXRhOiBzdGVwLCBuYW1lOiBFdmVudC5TVEVQX0VWRU5UX05BTUV9KVxuICAgICAgYXdhaXQgdGhpcy5ldmVudEJyb2FkY2FzdGVyLmJyb2FkY2FzdEFyb3VuZEV2ZW50KGV2ZW50LCBhc3luYygpID0+IHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKCkgLy8gc3lub255bW91cyB0byBwcm9jZXNzLm5leHRUaWNrIC8gc2V0SW1tZWRpYXRlXG4gICAgICAgIGNvbnN0IHN0ZXBSZXN1bHQgPSBhd2FpdCB0aGlzLnJ1blN0ZXAoc3RlcClcbiAgICAgICAgYXdhaXQgdGhpcy5icm9hZGNhc3RTdGVwUmVzdWx0KHN0ZXBSZXN1bHQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBzdGFja0NoYWluIGZyb20gJ3N0YWNrLWNoYWluJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhY2tUcmFjZUZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VjdW1iZXJQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJylcbiAgfVxuXG4gIGZpbHRlcigpIHtcbiAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSBzdGFja0NoYWluLmZpbHRlci5hdHRhY2goKGVycm9yLCBmcmFtZXMpID0+IHtcbiAgICAgIGlmIChmcmFtZXMubGVuZ3RoID4gMCAmJiB0aGlzLmlzRnJhbWVJbkN1Y3VtYmVyKGZyYW1lc1swXSkpIHtcbiAgICAgICAgcmV0dXJuIGZyYW1lc1xuICAgICAgfVxuICAgICAgY29uc3QgaW5kZXggPSBfLmZpbmRJbmRleChmcmFtZXMsIDo6dGhpcy5pc0ZyYW1lSW5DdWN1bWJlcilcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZyYW1lc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZyYW1lcy5zbGljZSgwLCBpbmRleClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaXNGcmFtZUluQ3VjdW1iZXIoZnJhbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZSA9IGZyYW1lLmdldEZpbGVOYW1lKCkgfHwgJydcbiAgICByZXR1cm4gXy5zdGFydHNXaXRoKGZpbGVOYW1lLCB0aGlzLmN1Y3VtYmVyUGF0aClcbiAgfVxuXG4gIHVuZmlsdGVyKCkge1xuICAgIHN0YWNrQ2hhaW4uZmlsdGVyLmRlYXR0YWNoKHRoaXMuY3VycmVudEZpbHRlcilcbiAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEF0dGFjaG1lbnRNYW5hZ2VyIGZyb20gJy4vYXR0YWNobWVudF9tYW5hZ2VyJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi9zdGF0dXMnXG5pbXBvcnQgU3RlcFJlc3VsdCBmcm9tICcuLi9tb2RlbHMvc3RlcF9yZXN1bHQnXG5pbXBvcnQgVGltZSBmcm9tICcuLi90aW1lJ1xuaW1wb3J0IFVzZXJDb2RlUnVubmVyIGZyb20gJy4uL3VzZXJfY29kZV9ydW5uZXInXG5cbmNvbnN0IHtiZWdpblRpbWluZywgZW5kVGltaW5nfSA9IFRpbWVcblxuYXN5bmMgZnVuY3Rpb24gcnVuKHtkZWZhdWx0VGltZW91dCwgc2NlbmFyaW9SZXN1bHQsIHN0ZXAsIHN0ZXBEZWZpbml0aW9uLCB0cmFuc2Zvcm1Mb29rdXAsIHdvcmxkfSkge1xuICBiZWdpblRpbWluZygpXG4gIGNvbnN0IHBhcmFtZXRlcnMgPSBzdGVwRGVmaW5pdGlvbi5nZXRJbnZvY2F0aW9uUGFyYW1ldGVycyh7c2NlbmFyaW9SZXN1bHQsIHN0ZXAsIHRyYW5zZm9ybUxvb2t1cH0pXG4gIGNvbnN0IHRpbWVvdXRJbk1pbGxpc2Vjb25kcyA9IHN0ZXBEZWZpbml0aW9uLm9wdGlvbnMudGltZW91dCB8fCBkZWZhdWx0VGltZW91dFxuICBjb25zdCBhdHRhY2htZW50TWFuYWdlciA9IG5ldyBBdHRhY2htZW50TWFuYWdlcigpXG4gIHdvcmxkLmF0dGFjaCA9IDo6YXR0YWNobWVudE1hbmFnZXIuY3JlYXRlXG5cbiAgbGV0IGVycm9yLCByZXN1bHRcbiAgY29uc3QgdmFsaWRDb2RlTGVuZ3RocyA9IHN0ZXBEZWZpbml0aW9uLmdldFZhbGlkQ29kZUxlbmd0aHMocGFyYW1ldGVycylcbiAgaWYgKF8uaW5jbHVkZXModmFsaWRDb2RlTGVuZ3Rocywgc3RlcERlZmluaXRpb24uY29kZS5sZW5ndGgpKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IFVzZXJDb2RlUnVubmVyLnJ1bih7XG4gICAgICBhcmdzQXJyYXk6IHBhcmFtZXRlcnMsXG4gICAgICBmbjogc3RlcERlZmluaXRpb24uY29kZSxcbiAgICAgIHRoaXNBcmc6IHdvcmxkLFxuICAgICAgdGltZW91dEluTWlsbGlzZWNvbmRzXG4gICAgfSlcbiAgICBlcnJvciA9IGRhdGEuZXJyb3JcbiAgICByZXN1bHQgPSBkYXRhLnJlc3VsdFxuICB9IGVsc2Uge1xuICAgIGVycm9yID0gc3RlcERlZmluaXRpb24uZ2V0SW52YWxpZENvZGVMZW5ndGhNZXNzYWdlKHBhcmFtZXRlcnMpXG4gIH1cblxuICBjb25zdCBzdGVwUmVzdWx0RGF0YSA9IHtcbiAgICBhdHRhY2htZW50czogYXR0YWNobWVudE1hbmFnZXIuZ2V0QWxsKCksXG4gICAgZHVyYXRpb246IGVuZFRpbWluZygpLFxuICAgIHN0ZXAsXG4gICAgc3RlcERlZmluaXRpb25cbiAgfVxuXG4gIGlmIChyZXN1bHQgPT09ICdwZW5kaW5nJykge1xuICAgIHN0ZXBSZXN1bHREYXRhLnN0YXR1cyA9IFN0YXR1cy5QRU5ESU5HXG4gIH0gZWxzZSBpZiAoZXJyb3IpIHtcbiAgICBzdGVwUmVzdWx0RGF0YS5mYWlsdXJlRXhjZXB0aW9uID0gZXJyb3JcbiAgICBzdGVwUmVzdWx0RGF0YS5zdGF0dXMgPSBTdGF0dXMuRkFJTEVEXG4gIH0gZWxzZSB7XG4gICAgc3RlcFJlc3VsdERhdGEuc3RhdHVzID0gU3RhdHVzLlBBU1NFRFxuICB9XG5cbiAgcmV0dXJuIG5ldyBTdGVwUmVzdWx0KHN0ZXBSZXN1bHREYXRhKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7cnVufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBUYWdFeHByZXNzaW9uUGFyc2VyIGZyb20gJ2N1Y3VtYmVyLXRhZy1leHByZXNzaW9ucy9saWIvdGFnX2V4cHJlc3Npb25fcGFyc2VyJ1xuXG5jb25zdCBGRUFUVVJFX0xJTkVOVU1fUkVHRVhQID0gL14oLio/KSgoPzo6W1xcZF0rKSspPyQvXG5jb25zdCB0YWdFeHByZXNzaW9uUGFyc2VyID0gbmV3IFRhZ0V4cHJlc3Npb25QYXJzZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuYXJpb0ZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKHtjd2QsIGZlYXR1cmVQYXRocywgbmFtZXMsIHRhZ0V4cHJlc3Npb259KSB7XG4gICAgdGhpcy5jd2QgPSBjd2RcbiAgICB0aGlzLmZlYXR1cmVVcmlUb0xpbmVzTWFwcGluZyA9IHRoaXMuZ2V0RmVhdHVyZVVyaVRvTGluZXNNYXBwaW5nKGZlYXR1cmVQYXRocyB8fCBbXSlcbiAgICB0aGlzLm5hbWVzID0gbmFtZXMgfHwgW11cbiAgICBpZiAodGFnRXhwcmVzc2lvbikge1xuICAgICAgdGhpcy50YWdFeHByZXNzaW9uTm9kZSA9IHRhZ0V4cHJlc3Npb25QYXJzZXIucGFyc2UodGFnRXhwcmVzc2lvbiB8fCAnJylcbiAgICB9XG4gIH1cblxuICBnZXRGZWF0dXJlVXJpVG9MaW5lc01hcHBpbmcoZmVhdHVyZVBhdGhzKSB7XG4gICAgY29uc3QgbWFwcGluZyA9IHt9XG4gICAgZmVhdHVyZVBhdGhzLmZvckVhY2goKGZlYXR1cmVQYXRoKSA9PiB7XG4gICAgICB2YXIgbWF0Y2ggPSBGRUFUVVJFX0xJTkVOVU1fUkVHRVhQLmV4ZWMoZmVhdHVyZVBhdGgpXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY29uc3QgdXJpID0gcGF0aC5yZXNvbHZlKHRoaXMuY3dkLCBtYXRjaFsxXSlcbiAgICAgICAgY29uc3QgbGluZXNFeHByZXNzaW9uID0gbWF0Y2hbMl1cbiAgICAgICAgaWYgKGxpbmVzRXhwcmVzc2lvbikge1xuICAgICAgICAgIGlmICghbWFwcGluZ1t1cmldKSB7XG4gICAgICAgICAgICBtYXBwaW5nW3VyaV0gPSBbXVxuICAgICAgICAgIH1cbiAgICAgICAgICBsaW5lc0V4cHJlc3Npb24uc2xpY2UoMSkuc3BsaXQoJzonKS5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICBtYXBwaW5nW3VyaV0ucHVzaChwYXJzZUludChsaW5lKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbWFwcGluZ1xuICB9XG5cbiAgbWF0Y2hlcyhzY2VuYXJpbykge1xuICAgIHJldHVybiB0aGlzLm1hdGNoZXNBbnlMaW5lKHNjZW5hcmlvKSAmJlxuICAgICAgdGhpcy5tYXRjaGVzQW55TmFtZShzY2VuYXJpbykgJiZcbiAgICAgIHRoaXMubWF0Y2hlc0FsbFRhZ0V4cHJlc3Npb25zKHNjZW5hcmlvKVxuICB9XG5cbiAgbWF0Y2hlc0FueUxpbmUoc2NlbmFyaW8pIHtcbiAgICBjb25zdCBsaW5lcyA9IHRoaXMuZmVhdHVyZVVyaVRvTGluZXNNYXBwaW5nW3NjZW5hcmlvLnVyaV1cbiAgICBpZiAobGluZXMpIHtcbiAgICAgIHJldHVybiBfLnNpemUoXy5pbnRlcnNlY3Rpb24obGluZXMsIHNjZW5hcmlvLmxpbmVzKSkgPiAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgbWF0Y2hlc0FueU5hbWUoc2NlbmFyaW8pIHtcbiAgICBpZiAodGhpcy5uYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGNvbnN0IHNjZW5hcmlvTmFtZSA9IHNjZW5hcmlvLm5hbWVcbiAgICByZXR1cm4gXy5zb21lKHRoaXMubmFtZXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gc2NlbmFyaW9OYW1lLm1hdGNoKG5hbWUpXG4gICAgfSlcbiAgfVxuXG4gIG1hdGNoZXNBbGxUYWdFeHByZXNzaW9ucyhzY2VuYXJpbykge1xuICAgIGlmICghdGhpcy50YWdFeHByZXNzaW9uTm9kZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgY29uc3Qgc2NlbmFyaW9UYWdzID0gc2NlbmFyaW8udGFncy5tYXAoKHQpID0+IHQubmFtZSlcbiAgICByZXR1cm4gdGhpcy50YWdFeHByZXNzaW9uTm9kZS5ldmFsdWF0ZShzY2VuYXJpb1RhZ3MpXG4gIH1cbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB1cHBlckNhc2VGaXJzdCBmcm9tICd1cHBlci1jYXNlLWZpcnN0J1xuXG5jb25zdCBzdGF0dXNlcyA9IHtcbiAgQU1CSUdVT1VTOiAnYW1iaWd1b3VzJyxcbiAgRkFJTEVEOiAnZmFpbGVkJyxcbiAgUEFTU0VEOiAncGFzc2VkJyxcbiAgUEVORElORzogJ3BlbmRpbmcnLFxuICBTS0lQUEVEOiAnc2tpcHBlZCcsXG4gIFVOREVGSU5FRDogJ3VuZGVmaW5lZCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhdHVzZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN0YXR1c1ByZWRpY2F0ZXMocHJvdG95cGUpIHtcbiAgXy5lYWNoKHN0YXR1c2VzLCAoc3RhdHVzKSA9PiB7XG4gICAgcHJvdG95cGVbJ2lzJyArIHVwcGVyQ2FzZUZpcnN0KHN0YXR1cyldID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSBzdGF0dXNcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNNYXBwaW5nKGluaXRpYWxWYWx1ZSkge1xuICByZXR1cm4gXy5jaGFpbihzdGF0dXNlcylcbiAgICAubWFwKChzdGF0dXMpID0+IFtzdGF0dXMsIGluaXRpYWxWYWx1ZV0pXG4gICAgLmZyb21QYWlycygpXG4gICAgLnZhbHVlKClcbn1cbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBhcml0eSBmcm9tICd1dGlsLWFyaXR5J1xuaW1wb3J0IGlzR2VuZXJhdG9yIGZyb20gJ2lzLWdlbmVyYXRvcidcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tICdjdWN1bWJlci1leHByZXNzaW9ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgVHJhbnNmb3JtTG9va3VwQnVpbGRlciBmcm9tICcuL3RyYW5zZm9ybV9sb29rdXBfYnVpbGRlcidcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJ1xuXG5mdW5jdGlvbiBidWlsZCh7Y3dkLCBmbnN9KSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgYWZ0ZXJIb29rRGVmaW5pdGlvbnM6IFtdLFxuICAgIGJlZm9yZUhvb2tEZWZpbml0aW9uczogW10sXG4gICAgZGVmYXVsdFRpbWVvdXQ6IDUwMDAsXG4gICAgbGlzdGVuZXJzOiBbXSxcbiAgICBzdGVwRGVmaW5pdGlvbnM6IFtdLFxuICAgIHRyYW5zZm9ybUxvb2t1cDogVHJhbnNmb3JtTG9va3VwQnVpbGRlci5idWlsZCgpXG4gIH1cbiAgbGV0IGRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIgPSBudWxsXG4gIGNvbnN0IGZuQ29udGV4dCA9IHtcbiAgICBhZGRUcmFuc2Zvcm0oe2NhcHR1cmVHcm91cFJlZ2V4cHMsIHRyYW5zZm9ybWVyLCB0eXBlTmFtZX0pIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oXG4gICAgICAgIHR5cGVOYW1lLFxuICAgICAgICBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjYXB0dXJlR3JvdXBSZWdleHBzLFxuICAgICAgICB0cmFuc2Zvcm1lclxuICAgICAgKVxuICAgICAgb3B0aW9ucy50cmFuc2Zvcm1Mb29rdXAuYWRkVHJhbnNmb3JtKHRyYW5zZm9ybSlcbiAgICB9LFxuICAgIEFmdGVyOiBoZWxwZXJzLmRlZmluZUhvb2sob3B0aW9ucy5hZnRlckhvb2tEZWZpbml0aW9ucyksXG4gICAgQmVmb3JlOiBoZWxwZXJzLmRlZmluZUhvb2sob3B0aW9ucy5iZWZvcmVIb29rRGVmaW5pdGlvbnMpLFxuICAgIGRlZmluZVN0ZXA6IGhlbHBlcnMuZGVmaW5lU3RlcChvcHRpb25zLnN0ZXBEZWZpbml0aW9ucyksXG4gICAgcmVnaXN0ZXJIYW5kbGVyOiBoZWxwZXJzLnJlZ2lzdGVySGFuZGxlcihjd2QsIG9wdGlvbnMubGlzdGVuZXJzKSxcbiAgICByZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICBvcHRpb25zLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgIH0sXG4gICAgc2V0RGVmYXVsdFRpbWVvdXQobWlsbGlzZWNvbmRzKSB7XG4gICAgICBvcHRpb25zLmRlZmF1bHRUaW1lb3V0ID0gbWlsbGlzZWNvbmRzXG4gICAgfSxcbiAgICBzZXREZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyKGZuKSB7XG4gICAgICBkZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyID0gZm5cbiAgICB9LFxuICAgIFdvcmxkKHBhcmFtZXRlcnMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycyA9IHBhcmFtZXRlcnNcbiAgICB9XG4gIH1cbiAgZm5Db250ZXh0LkdpdmVuID0gZm5Db250ZXh0LldoZW4gPSBmbkNvbnRleHQuVGhlbiA9IGZuQ29udGV4dC5kZWZpbmVTdGVwXG4gIGZucy5mb3JFYWNoKChmbikgPT4gZm4uY2FsbChmbkNvbnRleHQpKVxuICB3cmFwRGVmaW5pdGlvbnMoe1xuICAgIGN3ZCxcbiAgICBkZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyLFxuICAgIGRlZmluaXRpb25zOiBfLmNoYWluKFsnYWZ0ZXJIb29rJywgJ2JlZm9yZUhvb2snLCAnc3RlcCddKVxuICAgICAgLm1hcCgoa2V5KSA9PiBvcHRpb25zW2tleSArICdEZWZpbml0aW9ucyddKVxuICAgICAgLmZsYXR0ZW4oKVxuICAgICAgLnZhbHVlKClcbiAgfSlcbiAgb3B0aW9ucy5Xb3JsZCA9IGZuQ29udGV4dC5Xb3JsZFxuICByZXR1cm4gb3B0aW9uc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcERlZmluaXRpb25zKHtjd2QsIGRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIsIGRlZmluaXRpb25zfSkge1xuICBpZiAoZGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlcikge1xuICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGNvZGVMZW5ndGggPSBkZWZpbml0aW9uLmNvZGUubGVuZ3RoXG4gICAgICBjb25zdCB3cmFwcGVkRm4gPSBkZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyKGRlZmluaXRpb24uY29kZSlcbiAgICAgIGlmICh3cmFwcGVkRm4gIT09IGRlZmluaXRpb24uY29kZSkge1xuICAgICAgICBkZWZpbml0aW9uLmNvZGUgPSBhcml0eShjb2RlTGVuZ3RoLCB3cmFwcGVkRm4pXG4gICAgICB9XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBnZW5lcmF0b3JEZWZpbml0aW9ucyA9IF8uZmlsdGVyKGRlZmluaXRpb25zLCAoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIGlzR2VuZXJhdG9yLmZuKGRlZmluaXRpb24uY29kZSlcbiAgICB9KVxuICAgIGlmIChnZW5lcmF0b3JEZWZpbml0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZ2VuZXJhdG9yRGVmaW5pdGlvbnMubWFwKChkZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXRoLnJlbGF0aXZlKGN3ZCwgZGVmaW5pdGlvbi51cmkpICsgJzonICsgZGVmaW5pdGlvbi5saW5lXG4gICAgICB9KS5qb2luKCdcXG4gICcpXG4gICAgICBjb25zdCBtZXNzYWdlID0gYFxuICAgICAgICBUaGUgZm9sbG93aW5nIGhvb2svc3RlcCBkZWZpbml0aW9ucyB1c2UgZ2VuZXJhdG9yIGZ1bmN0aW9uczpcblxuICAgICAgICAgICR7cmVmZXJlbmNlc31cblxuICAgICAgICBVc2UgJ3RoaXMuc2V0RGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlcihmbiknIHRvIHdyYXAgdGhlbiBpbiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UuXG4gICAgICAgIGBcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7YnVpbGR9XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgSG9va0RlZmluaXRpb24gZnJvbSAnLi4vbW9kZWxzL2hvb2tfZGVmaW5pdGlvbidcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuLi9saXN0ZW5lcidcbmltcG9ydCBTdGFja1RyYWNlIGZyb20gJ3N0YWNrdHJhY2UtanMnXG5pbXBvcnQgU3RlcERlZmluaXRpb24gZnJvbSAnLi4vbW9kZWxzL3N0ZXBfZGVmaW5pdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUhvb2soY29sbGVjdGlvbikge1xuICByZXR1cm4gKG9wdGlvbnMsIGNvZGUpID0+IHtcbiAgICBpZiAodHlwZW9mKG9wdGlvbnMpID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0aW9ucyA9IHt0YWdzOiBvcHRpb25zfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mKG9wdGlvbnMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb2RlID0gb3B0aW9uc1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuICAgIGNvbnN0IHtsaW5lLCB1cml9ID0gZ2V0RGVmaW5pdGlvbkxpbmVBbmRVcmkoKVxuICAgIGNvbnN0IGhvb2tEZWZpbml0aW9uID0gbmV3IEhvb2tEZWZpbml0aW9uKHtjb2RlLCBsaW5lLCBvcHRpb25zLCB1cml9KVxuICAgIGNvbGxlY3Rpb24ucHVzaChob29rRGVmaW5pdGlvbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lU3RlcChjb2xsZWN0aW9uKSB7XG4gIHJldHVybiAocGF0dGVybiwgb3B0aW9ucywgY29kZSkgPT4ge1xuICAgIGlmICh0eXBlb2Yob3B0aW9ucykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvZGUgPSBvcHRpb25zXG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG4gICAgY29uc3Qge2xpbmUsIHVyaX0gPSBnZXREZWZpbml0aW9uTGluZUFuZFVyaSgpXG4gICAgY29uc3Qgc3RlcERlZmluaXRpb24gPSBuZXcgU3RlcERlZmluaXRpb24oe2NvZGUsIGxpbmUsIG9wdGlvbnMsIHBhdHRlcm4sIHVyaX0pXG4gICAgY29sbGVjdGlvbi5wdXNoKHN0ZXBEZWZpbml0aW9uKVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmluaXRpb25MaW5lQW5kVXJpKCkge1xuICBjb25zdCBzdGFja2ZyYW1lcyA9IFN0YWNrVHJhY2UuZ2V0U3luYygpXG4gIGNvbnN0IHN0YWNrZnJhbWUgPSBzdGFja2ZyYW1lcy5sZW5ndGggPiAyID8gc3RhY2tmcmFtZXNbMl0gOiBzdGFja2ZyYW1lc1swXVxuICBjb25zdCBsaW5lID0gc3RhY2tmcmFtZS5nZXRMaW5lTnVtYmVyKClcbiAgY29uc3QgdXJpID0gc3RhY2tmcmFtZS5nZXRGaWxlTmFtZSgpIHx8ICd1bmtub3duJ1xuICByZXR1cm4ge2xpbmUsIHVyaX1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcihjd2QsIGNvbGxlY3Rpb24pIHtcbiAgcmV0dXJuIChldmVudE5hbWUsIG9wdGlvbnMsIGhhbmRsZXIpID0+IHtcbiAgICBpZiAodHlwZW9mKG9wdGlvbnMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBoYW5kbGVyID0gb3B0aW9uc1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuICAgIF8uYXNzaWduKG9wdGlvbnMsIGdldERlZmluaXRpb25MaW5lQW5kVXJpKCksIHtjd2R9KVxuICAgIGNvbnN0IGxpc3RlbmVyID0gbmV3IExpc3RlbmVyKG9wdGlvbnMpXG4gICAgbGlzdGVuZXJbYGhhbmRsZSR7ZXZlbnROYW1lfWBdID0gaGFuZGxlclxuICAgIGNvbGxlY3Rpb24ucHVzaChsaXN0ZW5lcilcbiAgfVxufVxuIiwiaW1wb3J0IHtUcmFuc2Zvcm0sIFRyYW5zZm9ybUxvb2t1cH0gZnJvbSAnY3VjdW1iZXItZXhwcmVzc2lvbnMnXG5cbmZ1bmN0aW9uIGJ1aWxkKCkge1xuICBjb25zdCB0cmFuc2Zvcm1Mb29rdXAgPSBuZXcgVHJhbnNmb3JtTG9va3VwKClcbiAgY29uc3Qgc3RyaW5nSW5Eb3VibGVRdW90ZXNUcmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKFxuICAgICdzdHJpbmdJbkRvdWJsZVF1b3RlcycsXG4gICAgZnVuY3Rpb24oKSB7fSxcbiAgICAnXCJbXlwiXSpcIicsXG4gICAgSlNPTi5wYXJzZVxuICApXG4gIHRyYW5zZm9ybUxvb2t1cC5hZGRUcmFuc2Zvcm0oc3RyaW5nSW5Eb3VibGVRdW90ZXNUcmFuc2Zvcm0pXG4gIHJldHVybiB0cmFuc2Zvcm1Mb29rdXBcbn1cblxuZXhwb3J0IGRlZmF1bHQge2J1aWxkfVxuIiwibGV0IHByZXZpb3VzVGltZXN0YW1wXG5cbmNvbnN0IG1ldGhvZHMgPSB7XG4gIGJlZ2luVGltaW5nKCkge1xuICAgIHByZXZpb3VzVGltZXN0YW1wID0gZ2V0VGltZXN0YW1wKClcbiAgfSxcbiAgY2xlYXJJbnRlcnZhbDogY2xlYXJJbnRlcnZhbC5iaW5kKGdsb2JhbCksXG4gIGNsZWFyVGltZW91dDogY2xlYXJUaW1lb3V0LmJpbmQoZ2xvYmFsKSxcbiAgRGF0ZSxcbiAgZW5kVGltaW5nKCkge1xuICAgIHJldHVybiAoZ2V0VGltZXN0YW1wKCkgLSBwcmV2aW91c1RpbWVzdGFtcClcbiAgfSxcbiAgc2V0SW50ZXJ2YWw6IHNldEludGVydmFsLmJpbmQoZ2xvYmFsKSxcbiAgc2V0VGltZW91dDogc2V0VGltZW91dC5iaW5kKGdsb2JhbClcbn1cblxuaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1ldGhvZHMuc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlLmJpbmQoZ2xvYmFsKVxuICBtZXRob2RzLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGUuYmluZChnbG9iYWwpXG59XG5cbmZ1bmN0aW9uIGdldFRpbWVzdGFtcCgpIHtcbiAgcmV0dXJuIG5ldyBtZXRob2RzLkRhdGUoKS5nZXRUaW1lKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWV0aG9kc1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5jYXVnaHRFeGNlcHRpb25NYW5hZ2VyIHtcbiAgc3RhdGljIHJlZ2lzdGVySGFuZGxlcihoYW5kbGVyKSB7XG4gICAgaWYgKHByb2Nlc3Mub24pIHtcbiAgICAgIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgaGFuZGxlcilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93Lm9uZXJyb3IgPSBoYW5kbGVyXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVucmVnaXN0ZXJIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBpZiAocHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcigndW5jYXVnaHRFeGNlcHRpb24nLCBoYW5kbGVyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cub25lcnJvciA9IHZvaWQoMClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IFRpbWUgZnJvbSAnLi90aW1lJ1xuaW1wb3J0IFVuY2F1Z2h0RXhjZXB0aW9uTWFuYWdlciBmcm9tICcuL3VuY2F1Z2h0X2V4Y2VwdGlvbl9tYW5hZ2VyJ1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNvZGVSdW5uZXIge1xuICBzdGF0aWMgYXN5bmMgcnVuICh7YXJnc0FycmF5LCB0aGlzQXJnLCBmbiwgdGltZW91dEluTWlsbGlzZWNvbmRzfSkge1xuICAgIGNvbnN0IGNhbGxiYWNrRGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKClcbiAgICBhcmdzQXJyYXkucHVzaChmdW5jdGlvbihlcnJvciwgcmVzdWx0KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2tEZWZlcnJlZC5yZWplY3QoZXJyb3IpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja0RlZmVycmVkLnJlc29sdmUocmVzdWx0KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgZm5SZXR1cm5cbiAgICB0cnkge1xuICAgICAgZm5SZXR1cm4gPSBmbi5hcHBseSh0aGlzQXJnLCBhcmdzQXJyYXkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgZXJyb3IgPSAoZSBpbnN0YW5jZW9mIEVycm9yKSA/IGUgOiB1dGlsLmZvcm1hdChlKVxuICAgICAgcmV0dXJuIHtlcnJvcn1cbiAgICB9XG5cbiAgICBjb25zdCByYWNpbmdQcm9taXNlcyA9IFtdXG4gICAgY29uc3QgY2FsbGJhY2tJbnRlcmZhY2UgPSBmbi5sZW5ndGggPT09IGFyZ3NBcnJheS5sZW5ndGhcbiAgICBjb25zdCBwcm9taXNlSW50ZXJmYWNlID0gZm5SZXR1cm4gJiYgdHlwZW9mIGZuUmV0dXJuLnRoZW4gPT09ICdmdW5jdGlvbidcblxuICAgIGlmIChjYWxsYmFja0ludGVyZmFjZSAmJiBwcm9taXNlSW50ZXJmYWNlKSB7XG4gICAgICByZXR1cm4ge2Vycm9yOiAnZnVuY3Rpb24gdXNlcyBtdWx0aXBsZSBhc3luY2hyb25vdXMgaW50ZXJmYWNlczogY2FsbGJhY2sgYW5kIHByb21pc2UnfVxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2tJbnRlcmZhY2UpIHtcbiAgICAgIHJhY2luZ1Byb21pc2VzLnB1c2goY2FsbGJhY2tEZWZlcnJlZC5wcm9taXNlKVxuICAgIH0gZWxzZSBpZiAocHJvbWlzZUludGVyZmFjZSkge1xuICAgICAgcmFjaW5nUHJvbWlzZXMucHVzaChmblJldHVybilcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtyZXN1bHQ6IGZuUmV0dXJufVxuICAgIH1cblxuICAgIGNvbnN0IHVuY2F1Z2h0RXhjZXB0aW9uRGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKClcbiAgICBjb25zdCBleGNlcHRpb25IYW5kbGVyID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICB1bmNhdWdodEV4Y2VwdGlvbkRlZmVycmVkLnJlamVjdChlcnIpXG4gICAgfVxuICAgIFVuY2F1Z2h0RXhjZXB0aW9uTWFuYWdlci5yZWdpc3RlckhhbmRsZXIoZXhjZXB0aW9uSGFuZGxlcilcbiAgICByYWNpbmdQcm9taXNlcy5wdXNoKHVuY2F1Z2h0RXhjZXB0aW9uRGVmZXJyZWQucHJvbWlzZSlcblxuICAgIGNvbnN0IHRpbWVvdXREZWZlcnJlZCA9IFByb21pc2UuZGVmZXIoKVxuICAgIFRpbWUuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IHRpbWVvdXRNZXNzYWdlID0gJ2Z1bmN0aW9uIHRpbWVkIG91dCBhZnRlciAnICsgdGltZW91dEluTWlsbGlzZWNvbmRzICsgJyBtaWxsaXNlY29uZHMnXG4gICAgICB0aW1lb3V0RGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcih0aW1lb3V0TWVzc2FnZSkpXG4gICAgfSwgdGltZW91dEluTWlsbGlzZWNvbmRzKVxuICAgIHJhY2luZ1Byb21pc2VzLnB1c2godGltZW91dERlZmVycmVkLnByb21pc2UpXG5cbiAgICBsZXQgZXJyb3IsIHJlc3VsdFxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBQcm9taXNlLnJhY2UocmFjaW5nUHJvbWlzZXMpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKChlIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgIGVycm9yID0gZVxuICAgICAgfSBlbHNlIGlmIChlKSB7XG4gICAgICAgIGVycm9yID0gdXRpbC5mb3JtYXQoZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gJ1Byb21pc2UgcmVqZWN0ZWQgd2l0aG91dCBhIHJlYXNvbidcbiAgICAgIH1cbiAgICB9XG5cbiAgICBVbmNhdWdodEV4Y2VwdGlvbk1hbmFnZXIudW5yZWdpc3RlckhhbmRsZXIoZXhjZXB0aW9uSGFuZGxlcilcblxuICAgIHJldHVybiB7ZXJyb3IsIHJlc3VsdH1cbiAgfVxufVxuIl19