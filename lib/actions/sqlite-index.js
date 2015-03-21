'use strict';
var rsvp = require('rsvp');
var fse = require('fs-extra');
var path = require('path');
var mkdirp = rsvp.denodeify(fse.mkdirp);

function pathFor(target, options) {
  return path.join(options.outdir, target);
}

module.exports = function(options, items, ui) {
  return new rsvp.Promise(function(resolve, reject) {
    var basePath = path.join(options.name + '.docset', 'Contents', 'Resources');
    mkdirp(pathFor(basePath, options))
    .then(function() {
      var sqlite = require('sqlite3').verbose();
      var db = new sqlite.Database(pathFor(path.join(basePath, 'docSet.dsidx'), options));
      db.on('trace', function(result) {
        if (options.verbose) {
          ui.writeLine('result:', result);
        }
      });
      db.serialize(function() {
        try {
          db.run('DROP TABLE searchIndex;', function() {
          });
        } catch (err) {
          ui.writeError(err);
        }
        db.run('CREATE TABLE searchIndex(id INTEGER PRIMARY KEY, name TEXT, type TEXT, path TEXT);');
        db.run('CREATE UNIQUE INDEX anchor ON searchIndex (name, type, path);');
        var stmt = db.prepare('INSERT INTO searchIndex(name, type, path) VALUES (?,?,?)');

        try {
          items.forEach(function(item) {
            stmt.run(item.name, item.type, item.path);
          });
        } catch (error) {
          ui.writeError('SearchIndex error:',error);
        }

        stmt.finalize();
      });
      db.close(function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
};
