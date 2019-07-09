/* global it, describe */
'use strict';


var p       = require('path');
var assert  = require('assert');
var testgen = require('..');


describe('Generator', function () {

  it('should parse meta', function (done) {
    testgen.load(p.join(__dirname, 'fixtures/meta.txt'), function (data) {
      assert.deepEqual(data.meta, { desc: 123, skip: true });

      assert.strictEqual(data.fixtures.length, 1);
      assert.strictEqual(data.fixtures[0].first.text, '123\n');
      assert.strictEqual(data.fixtures[0].second.text, '456\n');
      done();
    });
  });

  it('should parse headers', function (done) {
    testgen.load(p.join(__dirname, 'fixtures/headers.txt'), function (data) {

      assert.strictEqual(data.fixtures.length, 3);

      assert.strictEqual(data.fixtures[0].header, '');
      assert.strictEqual(data.fixtures[0].first.text, '123\n');
      assert.strictEqual(data.fixtures[0].second.text, '456\n');

      assert.strictEqual(data.fixtures[1].header, 'header1');
      assert.strictEqual(data.fixtures[1].first.text, 'qwe\n');
      assert.strictEqual(data.fixtures[1].second.text, 'rty\n');

      assert.strictEqual(data.fixtures[2].header, 'header2');
      assert.strictEqual(data.fixtures[2].first.text, 'zxc\n');
      assert.strictEqual(data.fixtures[2].second.text, 'vbn\n');

      done();
    });
  });

  it('should parse multilines', function (done) {
    testgen.load(p.join(__dirname, 'fixtures/multilines.txt'), function (data) {

      assert.strictEqual(data.fixtures.length, 1);

      assert.strictEqual(data.fixtures[0].header, '');
      assert.strictEqual(data.fixtures[0].first.text, '123\n \n456\n');
      assert.strictEqual(data.fixtures[0].second.text, '789\n\n098\n');

      done();
    });
  });

  it('should not add \\n at empty to end of empty line', function (done) {
    testgen.load(p.join(__dirname, 'fixtures/empty.txt'), function (data) {

      assert.strictEqual(data.fixtures[0].first.text, 'a\n');
      assert.strictEqual(data.fixtures[0].second.text, '');

      done();
    });
  });

  it('should scan dir', function () {
    var files = 0;

    testgen.load(p.join(__dirname, 'fixtures'), function () {
      files++;
    });
    assert.strictEqual(files, 4);
  });

});
