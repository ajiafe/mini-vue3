describe("effect", () => {
  it.skip("happy path", () => {
    const user = reactive({
      age: 18,
    });
    let nextYearAge;
    effect((user) => {
      nextYearAge = user.age + 1;
    });
    expect(user.age).toBe(19);
    // when user age update
    user.age++;
    expect(user.age).toBe(20);
  });
});
