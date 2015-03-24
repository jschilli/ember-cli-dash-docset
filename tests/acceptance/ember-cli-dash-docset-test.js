/*jshint quotmark: false*/

'use strict';

var assertFile = require('../helpers/assert-file');
var ember = require('../helpers/ember');
var path = require('path');
var root = process.cwd();
var tmp = require('tmp-sync');
var tmproot = path.join(root, 'tmp');
var writeFile = require('fs-extra').writeFileSync;
var merge = require('lodash').merge;

describe('Acceptance: ember ember-cli-dash-docset', function() {
  var tmpdir;
  this.timeout(10000);

  beforeEach(function() {
    tmpdir = tmp.in(tmproot);
    process.chdir(tmpdir);
  });

  function writeConfigFile(options) {
    var outdir = options.outdir || tmpdir;
    var defaults = {
      "name": "dummy",
        "outdir": outdir,
        "input": "tests/fixtures/yuidoc-output",
        "icon": "tests/fixtures/icon.png",
        "dash": {
          "bundleIdentifier": "dummyBI",
          "bundleName": "q2-data",
          "docSetFamily": "q2",
          "docSetIndexPath": "indexPath"
      }
    };
    defaults = merge(defaults, options);
    writeFile(path.join(tmpdir,'dashdocTEST.json'), JSON.stringify(defaults));
  }

  function initApp(options) {
    var args = ['ember-cli-dash-docset'].concat(options);
    return ember(args);
  }

  function buildDashDocs(args, opts) {
    var optArgs = args || [],
        options = opts || {};
    writeConfigFile(options);
    optArgs.push('--config='+path.join(tmpdir,'dashdocTEST.json'));
    return initApp(optArgs);
  }

  it('generates a docset', function() {
    return buildDashDocs().then(function() {
      assertFile('dummy.docset/Contents/Info.plist', {
        contains: [
          "<key>DashDocSetFamily</key>",
          "<string>q2-data</string>"
        ]
      });
    });
  });
  it('generates a docset into specified location', function() {
    return buildDashDocs().then(function() {
      assertFile('dummy.docset/Contents/Info.plist', {
        contains: [
          "<key>DashDocSetFamily</key>",
          "<string>dummyBI</string>"
        ]
      });
    });
  });
  it('overwrites a docset', function() {
    return buildDashDocs().then(function() {
      buildDashDocs().then(function() {
        assertFile('dummy.docset/Contents/Info.plist', {
          contains: [
            "<key>DashDocSetFamily</key>",
            "<string>dummyBI</string>"
          ]
        });
      });
    });
  });
  it('generates a docset with specified name', function() {
    return buildDashDocs(null, { name: 'foobar', dash: { bundleIdentifier: 'foobar'}}).then(function() {
      assertFile('foobar.docset/Contents/Info.plist', {
        contains: [
          "<string>foobar</string>"
        ]
      });
      assertFile('foobar.docset/Contents/Resources/docSet.dsidx');
    });
  });

  it('should have sqlite rows for each method', function() {
    return buildDashDocs().then(function() {
      assertFile('dummy.docset/Contents/Resources/docSet.dsidx');
    });
  });

  it('should have html files in proper location', function() {
    return buildDashDocs().then(function() {
      assertFile('dummy.docset/Contents/Resources/Documents/index.html'), {
        contains: [
          'title="ember-cli-dash-docset"'
        ]
      };
    });
  });

  it('should have an icon file in proper location', function() {
    return buildDashDocs().then(function() {
      assertFile('dummy.docset/icon.png');
    });
  });
  it('should have proper entries in plist');
  it('should have docset folder');
  it('should not generate output unless successful', function() {

  });
  it('should be packed to go');
  it('should generate private feed');
  it('should allow options in a file');

});
