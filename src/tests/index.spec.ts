import { add } from '../reactivity/index'

it("init", () => {
  expect(add(1,2)).toBe(3);
});
