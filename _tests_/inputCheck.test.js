const { default: test } = require("node:test");
const inputCheck = require("../utils/inputCheck");

test("inputCheck() returns null when all properties exist", () => {
  const obj = { name: "winston" };

  expect(inputCheck(obj, "name")).toBe(null);
});
