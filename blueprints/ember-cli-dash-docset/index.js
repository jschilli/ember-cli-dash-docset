'use strict';
module.exports = {
  description: 'Generates dashdoc.json',
  normalizeEntityName: function() {},
  afterInstall: function() {
    var fs = require('fs');
    var pkginfo = this.project.pkg;
    var config = {
      'name': pkginfo.name,
      'outdir': 'docset',
      'input': 'docs',
      'dash': {
        'bundleIdentifier': pkginfo.name,
        'bundleName': pkginfo.name,
        'docSetFamily': pkginfo.name,
        'docSetPlatformFamily': pkginfo.name,
        'docSetIndexPath': 'index.html'
      }
    };
    console.log('Generating dashdoc.json for ' + config.name);
    fs.writeFileSync('dashdoc.json', JSON.stringify(config, null, 2));
  }
};
