'use strict';
var rsvp = require('rsvp');
var fse = require('fs-extra');
var path = require('path');

function pathFor(target, options) {
  return path.join(options.outdir, target);
}



module.exports = function(options /*, ui */) {
  return new rsvp.Promise(function(resolve, reject) {
    if (options.icon) {
      var copy = rsvp.denodeify(fse.copy);
      var outputPath = pathFor(path.join(options.name + '.docset', 'icon.png'), options);
      var inputPath = path.join(options.root, options.icon);
      copy(inputPath, outputPath)
        .then(resolve)
        .catch(reject);
    } else {
      resolve();
    }

  });
};
