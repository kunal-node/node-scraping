const parser = require("../src/parser");

it("should return 4", () => {
  const result = parser.add(2, 2);
  expect(result).toBe(4);
});
