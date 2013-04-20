var GreeterTest = TestCase("GreeterTest");

GreeterTest.prototype.testGreet = function() {
  assertEquals("Hello World!", "Hello World!");
  assertEquals("Optional message", {}, {});

  assertTrue(true);
  assertTrue("Optional message", true);

  assertFalse(false);
  assertFalse("Optional message", false);
};


describe('jasmine spec', function() {
  it('should work', function() {
    expect(true).toBe(true);
  });
});
