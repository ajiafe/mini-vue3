import { reactive } from "../reactivity/reactive";
import { effect } from "../reactivity/effect";

describe("effect", () => {
  // skip
  it("happy path", () => {
    const user = reactive({
      age: 18,
    });
    let nextYearAge;
    effect(() => {
      nextYearAge = user.age + 1;
    });
    expect(nextYearAge).toBe(19);
    // when user age update
    user.age++;
    expect(nextYearAge).toBe(20);
  });
  it("should return runner when call effect", () => {
    // 1. effect(fn) -> function(runner) -> fn -> retrun
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return "foo";
    });
    expect(foo).toBe(11);
    const res = runner();
    expect(foo).toBe(12);
    expect(res).toBe("foo");
  });
});
