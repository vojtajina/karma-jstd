var GreeterTest = TestCase("GreeterTest");

GreeterTest.prototype.testGreet = function() {
  assertEquals("Hello World!", "Hello World!");
  assertEquals("Optional message", {}, {});

  assertTrue(true);
  assertTrue("Optional message", true);

  assertFalse(false);
  assertFalse("Optional message", false);
};

// Usage of TestCase giving the prototype object with setUp and tearDown
var sHello;
TestCase("OtherTest", {
    setUp: function(){
        sHello = "Hello World!";
    },
    tearDown: function(){
        sHello = "";
    },
    "test Greet": function() {
        assertEquals(sHello, "Hello World!");
        assertEquals("Optional message", {}, {});

        assertTrue(true);
        assertTrue("Optional message", true);

        assertFalse(false);
        assertFalse("Optional message", false);
    }
});

(function () {
    var testCaseRef = {
        sHello: null,
        helperMethod: function () {
          return true;
        },
        setUp: function(){
            assertSame("this in setUp should refernce the TestCase object", testCaseRef, this);
            this.sHello = "Hello World!";
        },
        tearDown: function(){
            assertSame("this in tearDown should reference the TestCase object", testCaseRef, this);
            this.sHello = null;
        },
        "test reference TestCase object": function () {
            assertSame("this in test should reference the TestCase object", testCaseRef, this);
        },
        "test have value from setUp": function() {
            assertEquals("Hello World!", this.sHello);
        },
        "test allow helper methods": function () {
            assertTrue(this.helperMethod());
        }
    };

    TestCase("ThisReferences", testCaseRef);
})();

describe('jasmine spec', function() {
  it('should work', function() {
    expect(true).toBe(true);
  });
});
