'use strict';
var rsvp = require('rsvp');
var fse = require('fs-extra');
var path = require('path');

function pathFor(target, options) {
  return path.join(options.outdir, target);
}



module.exports = function(options, ui) {
  var copy = rsvp.denodeify(fse.copy);
  var outputPath = pathFor(path.join(options.name + '.docset', 'Contents','Resources', 'Documents/'), options);
  var inputPath = path.join(options.root, options.input);
  return copy(inputPath, outputPath)
    .catch(function(error) {
      ui.writeError('copyDocError:', error);
    });
};

