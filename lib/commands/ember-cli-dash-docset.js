'use strict';
var rsvp = require('rsvp');
var writePList = require('../actions/create-plist');
var writeSqlite = require('../actions/sqlite-index');
var copyDocuments = require('../actions/copy-documents');
var copyIcon = require('../actions/copy-icon');
var setupOutput = require('../actions/setup-output');
var buildOptions = require('../options.js');


module.exports = {
  name: 'ember-cli-dash-docset',

  description: 'Generates docset for Dash from yuidoc output',
  availableOptions: [
    { name: 'config',  type: String, default: 'dashdoc.json', aliases: ['c'] },
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] }
    ],

  run: function(opts) {
    opts.root = this.project.root;
    var ui = this.project.ui;
    var options = buildOptions(opts, ui);
    var path = require('path');
    var extractor = require('../../lib/utils/yuidoc-extractor');
    // TODO get from options
    var json = require(path.join(this.project.root, options.input, 'data.json'));
    this.options = options;


    return new rsvp.Promise(function(resolve) {
      var classes, classItems;

      classes = extractor.processClasses(json, ui);
      classItems = extractor.processClassItems(json, ui);

      setupOutput(options, ui)
        .then(function() {
          return writePList(options, ui);
        })
        .then(function() {
          return writeSqlite(options, classes.concat(classItems), ui);
        })
        .then(function() {
          return copyDocuments(options, ui);
        })
        .then(function() {
          return copyIcon(options, ui);
        })
        .then(resolve)
        .catch(function(err) {
          console.log(err);
        });
    }, function(error) {
      ui.writeError('error:', error);
    });
  }
};
