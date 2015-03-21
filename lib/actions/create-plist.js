'use strict';
var rsvp = require('rsvp');
var fse = require('fs-extra');
var path = require('path');
var readFile = rsvp.denodeify(fse.readFile);
var writeFile = rsvp.denodeify(fse.writeFile);

function pathFor(target, options) {
  return path.join(options.outdir, target);
}
module.exports = function(options) {
  var templatePath = path.join(__dirname, '..', 'templates', 'Info.plist');
  return readFile(templatePath, 'utf-8')
    .then(function(contents) {
      // perform substitutions
      Object.keys(options.dash).forEach(function(identifier) {
        contents = contents.replace('{{' + identifier + '}}', options.dash[identifier], 'g');
      });
      return contents;
    }).then(function(contents) {
      var outputPath = path.join(options.name + '.docset', 'Contents', 'Info.plist');
      return writeFile(pathFor(outputPath, options), contents);//.then(function() {
    });
};
