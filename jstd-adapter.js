/**
 * JsTestDriver adapter for Karma (aka use Jasmine)
 * @author  Vojta Jina <vojta.jina@gmail.com>
 *
 * The idea is to keep your old JsTD tests and write new tests in Jasmine. This fake API is
 * basically a convertor to Jasmine API - you call JsTD API, but it defines Jasmine spec. You can
 * also migrate your your old specs to Jasmine syntax, step by step.
 *
 * The API is incomplete. It's just a prototype to prove the concept. Please implement more stuff
 * if you need it.
 */


var __jstd_specs = {};
var TestCase = function(name) {
  var prototype = __jstd_specs[name] = {};
  return {
    prototype: prototype
  };
};


// matchers
var assertEquals = function(message, expected, actual) {
  if (arguments.length < 3) {
    actual = expected;
    expected = message;
  }

  expect(actual).toEqual(expected);
};

var assertTrue = function(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  expect(actual).toBeTruthy();
};

var assertFalse = function(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  expect(actual).toBeFalsy();
};

// TODO(vojta): implement other matchers (https://code.google.com/p/js-test-driver/wiki/Assertions)


var startJasmine = window.__karma__.start;
window.__karma__.start = function() {
  // register all jstd tests as jasmine specs, before starting jasmine
  Object.keys(__jstd_specs).forEach(function(testName) {
    var prototype = __jstd_specs[testName];
    var specNames = Object.keys(prototype);

    describe(testName, function() {
      specNames.forEach(function(specName) {
        it(specName.replace(/^test/, 'should '), prototype[specName]);
      });
    })
  });

  startJasmine();
};
