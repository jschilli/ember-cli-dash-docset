'use strict';
var rsvp = require('rsvp');
var fse = require('fs-extra');
var path = require('path');
var mkdirp = rsvp.denodeify(fse.mkdirp);

function pathFor(target, options) {
  return path.join(options.outdir, target);
}

module.exports = function(options) {
  var outputPath = path.join(options.name + '.docset', 'Contents');

  return mkdirp(pathFor(outputPath, options));
};
