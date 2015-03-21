/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-dash-docset',
  includedCommands: function() {
    return {
      'ember-cli-dash-docset': require('./lib/commands/ember-cli-dash-docset')
    };
  },
  included: function(app) {
    this._super.included.apply(this, arguments);
    this.app = app;
    this.options = getOptions(this);
    console.log('options:', this.options);
  }

};


function getOptions(addonContext) {
  var baseOptions = (addonContext.parent && addonContext.parent.options) || (addonContext.app && addonContext.app.options),
      options = baseOptions && baseOptions['dashDoc'] || {};
  return options;
}


