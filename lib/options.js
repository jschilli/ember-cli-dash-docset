// TODO
// - intelligent defaults (e.g no conf file )
'use strict';
var fse = require('fs-extra');
var extend = require('lodash').merge;
var verbose = true;

module.exports = function(opts, ui) {
  var config;
  try {
      config = JSON.parse(fse.readFileSync(opts.config));
    } catch(e){
      ui.writeError(e);
      ui.writeError('No dashdoc.json file in root folder. Run `ember g ember-cli-dash-docset` to generate one.');
      process.exit(1);
    }

  verbose = opts.verbose;
  var outDir = 'docset';
  var name = 'dummy';
  var options = {
    root: opts.root,
    name: name,
    outdir: outDir,
    dash: {
      bundleIdentifier: 'dummyBI',
      bundleName: name,
      docSetFamily: 'dummyFamily',
      docSetIndexPath: 'index.html',
      docSetPlatformFamily: 'dummayPlatformFamily'
    }
  };
  options = extend(options, config);
  return options;
};
