/*jshint quotmark: false */
'use strict';
var expect           = require('chai').expect;
var ClassExtractor   = require('../../lib/utils/yuidoc-extractor');
var jsonDoc          = require('../fixtures/sample-yuidoc.json');
var MockUI           = require('../helpers/mock-ui');
describe('YUIDoc extractor', function() {
  var ui;
  beforeEach(function() {
    ui = new MockUI();
  });
	it('should extract class information', function() {
    var classes = ClassExtractor.processClasses(jsonDoc, ui);
    expect(classes).to.be.ok;
    expect(classes).to.have.length(1);
    expect(classes[0].name).to.equal('Foo');
    expect(classes[0].type).to.equal('Class');
    expect(classes[0].path).to.equal('classes/Foo.html');
	});
  it('should extract properties ', function () {
    var classItems = ClassExtractor.processClassItems(jsonDoc, ui);
    expect(classItems).to.be.ok;
    expect(classItems).to.have.length(4);
    expect(classItems[0].name).to.equal('barName');
    expect(classItems[0].type).to.equal('Property');
    expect(classItems[0].path).to.equal('classes/Foo.html#property_barName');
    // clear method
    // TODO consolidate test method
    expect(classItems[2].name).to.equal('clear');
    expect(classItems[2].type).to.equal('Method');
    expect(classItems[2].path).to.equal('classes/Foo.html#method_clear');
  });
  it('should extract warn when attributes are borked ', function () {
    var classItems = ClassExtractor.processClassItems(jsonDoc, ui);
    expect(ui.output).to.include(
      'The item has no \'itemtype\' line:39 file:tests/dummy/app/models/foo.js');
    expect(classItems).to.have.length(4);

  });
  it('should extract warn when name is borked ', function () {
    var classItems = ClassExtractor.processClassItems(jsonDoc, ui);
    expect(ui.output).to.include(
      'The item has no \'name\' line:45 file:tests/dummy/app/models/foo.js');
    expect(classItems).to.have.length(4);

  });
});
