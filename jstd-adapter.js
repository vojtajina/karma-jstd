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


var __jstd_specs = {}, startJasmine, assert, assertTrue;

/**
 * TestCase replacement that will use Jasmine describe and it functions.
 * @param name
 * @param proto
 * @param type
 * @constructor
 */
function TestCase(name, proto, type) {
  var prototype = __jstd_specs[name] = proto || {};

  return {
    prototype: prototype
  };
};

/**
 * ConditionalTestCase replacement to create a special testcase.
 * @param name
 * @param condition
 * @param proto
 * @param type
 * @returns {*}
 * @constructor
 */
function ConditionalTestCase(name, condition, proto, type) {
  if (condition()) {
    return TestCase(name, proto, type);
  }
}

// helper functions
function emptyFunc() {
}

// matchers
/**
 * Throws an error.
 * @param sMessage
 */
function fail(sMessage) {
  throw new Error(sMessage);
}
/**
 * Checks if actual is true.
 * @param message
 * @param actual
 */
assert = assertTrue = function (message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  expect(actual).toBeTruthy();
};
/**
 * Checks if actual is false.
 * @param message
 * @param actual
 */
function assertFalse(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  expect(actual).toBeFalsy();
}
/**
 * Checks that expected is equals to actual
 * Warning the jstd assertEquals is == while jasmine toEqual is ===
 * @param message
 * @param expected
 * @param actual
 */
function assertEquals(message, expected, actual) {
  if (arguments.length < 3) {
    actual = expected;
    expected = message;
  }

  expect(actual).toEqual(expected);
}
/**
 * Checks that actual is not equals to expected
 * @param message
 * @param expected
 * @param actual
 */
function assertNotEquals(message, expected, actual) {
  if (arguments.length < 3) {
    actual = expected;
    expected = message;
  }

  expect(actual).not.toEqual(expected);
}
/**
 * Checks that actual and expected are the same object
 * @param message
 * @param expected
 * @param actual
 */
function assertSame(message, expected, actual) {
  if (arguments.length < 3) {
    actual = expected;
    expected = message;
  }

  expect(actual).toBe(expected);
}
/**
 * Checks that actual and expected are not the same object
 * @param message
 * @param expected
 * @param actual
 */
function assertNotSame(message, expected, actual) {
  if (arguments.length < 3) {
    actual = expected;
    expected = message;
  }

  expect(oActual).not.toBe(oExpected);
}
/**
 * Checks that actual is null
 * @param message
 * @param actual
 */
function assertNull(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }
  expect(actual).toBeNull();
}
/**
 * Checks that actual is not null
 * @param message
 * @param actual
 */
function assertNotNull(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }
  expect(actual).not.toBeNull();
}
/**
 * Checks that actual is undefined
 * @param message
 * @param actual
 */
function assertUndefined(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }
  expect(actual).toBeUndefined();
}
/**
 * Checks that actual is not undefined
 * @param message
 * @param actual
 */
function assertNotUndefined(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }
  expect(actual).not.toBeUndefined();
}
/**
 * Checks that actual is NaN (not a number)
 * @param message
 * @param actual
 */
function assertNaN(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }
  expect(isNaN(actual)).toBeTruthy();
}
/**
 * Checks that actual is not NaN (not a number)
 * @param message
 * @param actual
 */
function assertNotNaN(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }
  expect(isNaN(actual)).toBeFalsy();
}
/**
 * CheckS that executing callback throws an exception
 * @param message
 * @param callback
 * @param error
 */
function assertException(message, callback, error) {
  if (arguments.length < 3) {
    error = callback;
    callback = message;
  }
  error = typeof error === 'string' ? new Error(error) : error;

  if (typeof error === undefined) {
    expect(callback).toThrow();
  } else {
    expect(callback).toThrow(error);
  }
}
/**
 * Checks that executing callback does not throws an Exception
 * @param message
 * @param callback
 * @param error
 */
function assertNoException(message, callback, error) {
  if (arguments.length < 3) {
    error = callback;
    callback = message;
  }
  error = typeof error === 'string' ? new Error(error) : error;

  if (typeof error === undefined) {
    expect(callback).not.toThrow();
  } else {
    expect(callback).not.toThrow(error);
  }
}
/**
 * Checks that actual is an Array
 * @param message
 * @param actual
 */
function assertArray(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  expect(typeof actual === 'array' || actual instanceof Array).toBeTruthy();
}
/**
 * Checks that expected is the expected type
 * @param message
 * @param expected
 * @param type
 */
function assertTypeOf(message, expected, type) {
  if (arguments.length < 3) {
    type = expected;
    expected = message;
  }

  expect(typeof type === expected).toBeTruthy();
}
/**
 * Checks that actual is boolean type
 * @param message
 * @param actual
 */
function assertBoolean(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  assertTypeOf(message, 'boolean', actual);
}
/**
 * Checks that actual is function type
 * @param message
 * @param actual
 */
function assertFunction(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  assertTypeOf(message, 'function', actual);
}
/**
 * Checks that actual is object type
 * @param message
 * @param actual
 */
function assertObject(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  assertTypeOf(message, 'object', actual);
}
/**
 * Checks that actual is number type
 * @param message
 * @param actual
 */
function assertNumber(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  assertTypeOf(message, 'number', actual);
}
/**
 * Checks that actual is string type
 * @param message
 * @param actual
 */
function assertString(message, actual) {
  if (arguments.length < 2) {
    actual = message;
  }

  assertTypeOf(message, 'string', actual);
}
/**
 * Checks that actual matches regexp
 * @param message
 * @param regexp
 * @param actual
 */
function assertMatch(message, regexp, actual) {
  if (arguments.length < 2) {
    actual = regexp;
    regexp = message;
  }

  expect(actual).toMatch(regexp);
}
/**
 * Checks that actual does not matches oRegExp
 * @param message
 * @param regexp
 * @param actual
 */
function assertNoMatch(message, regexp, actual) {
  if (arguments.length < 2) {
    actual = regexp;
    regexp = message;
  }

  expect(actual).not.toMatch(regexp);
}
/**
 * Checks that element's node name is equals to tag
 * @param message
 * @param tag
 * @param element
 */
function assertTagName(message, tag, element) {
  if (arguments.length < 3) {
    element = tag;
    tag = message;
  }

  expect(element.nodeName.toLowerCase() === tag.toLowerCase()).toBeTruthy();
}
/**
 * Checks that element's className contains className
 * @param message
 * @param className
 * @param element
 */
function assertClassName(message, className, element) {
  if (arguments.length < 3) {
    element = className;
    className = message;
  }

  expect(element.className.split(" ")).toContain(className);
}
/**
 * Checks that element's id is equals to id
 * @param message
 * @param id
 * @param element
 */
function assertElementId(message, id, element) {
  if (arguments.length < 3) {
    element = id;
    id = message;
  }

  expect(oElement.id).toEqual(id);
}
/**
 * Checks that actual has been created from constructor
 * @param message
 * @param constructor
 * @param actual
 */
function assertInstanceOf(message, constructor, actual) {
  if (arguments.length < 3) {
    actual = constructor;
    constructor = message;
  }

  expect(actual instanceof constructor).toBeTruthy();
}
/**
 * Checks that actual has been created from constructor
 * @param message
 * @param constructor
 * @param actual
 */
function assertNotInstanceOf(message, constructor, actual) {
  if (arguments.length < 3) {
    actual = constructor;
    constructor = message;
  }

  expect(actual instanceof constructor).toBeFalsy();
}

startJasmine = window.__karma__.start;
window.__karma__.start = function () {
  // register all jstd tests as jasmine specs, before starting jasmine
  Object.keys(__jstd_specs).forEach(function (testName) {
    var prototype = __jstd_specs[testName],
      setUp = prototype.setUp || emptyFunc,
      tearDown = prototype.tearDown || emptyFunc,
      specNames = Object.keys(prototype);

    // setUp and tearDown callbacks are executed as beforeEach and afterEach
    describe(testName, function () {
      beforeEach(function () {
        setUp.call(this);
      });
      afterEach(function () {
        tearDown.call(this);
        // Clean document.body content.
        document.body.innerHTML = '';
      });
      specNames.forEach(function (specName) {
        if (specName.indexOf('test') === 0) {
          it(specName.replace(/^test/, 'should '), prototype[specName]);
        }
      });
    })
  });

  startJasmine();
};
