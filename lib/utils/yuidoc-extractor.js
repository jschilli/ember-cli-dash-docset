'use strict';
var _ = require('lodash');

module.exports.processClasses = function(jsonDef) {
  return Object.keys(jsonDef.classes).map(function(className) {
    var classDef = jsonDef.classes[className];
    return {
      name: classDef.name,
      type: 'Class',
      path: ['classes/', classDef.name, '.html'].join('')
    };
  });
};


module.exports.processClassItems = function(jsonDef, ui) {
  var values = [],
    validate = function(item) {
      if (typeof(item.itemtype) === 'undefined') {
        ui.writeLine('The item has no \'itemtype\' line:' + item.line + ' file:' + item.file, ui.WARNING);
        return false;
      }
      if (typeof(item.name) === 'undefined' || item.name === '') {
        ui.writeLine('The item has no \'name\' line:' + item.line + ' file:' + item.file, ui.WARNING);
        return false;
      }
      return true;
    };
  jsonDef.classitems.forEach(function(item) {
      if (validate(item)) {
        values.push({
          name: item.name,
          type: _.capitalize(item.itemtype),
          path: ['classes/', item.class, '.html#', item.itemtype, '_', item.name].join('')
        });
      }
    });
    return values;
  };
