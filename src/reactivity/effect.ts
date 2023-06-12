class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }
}
// 用全局变量存储被注册的副作用函数
let activeEffect;
// effect 函数用于注册副作用函数
export function effect(fn) {
  // 当调用effect 注册副作用函数时，将副作用函数fn 赋值给 activeEffect
  const _effect = new ReactiveEffect(fn);
  // 执行副作用函数
  _effect.run();
  return _effect.run.bind(_effect)
}
// 储存所有响应式的对象
const targetMap = new WeakMap();

export function track(target, key) {
  // target → key → dep[fn]
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  // 初始化
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}
// 触发依赖
export function trigger(target, key) {
  console.log(targetMap); //  Map(1) { { age: 19 } => Map(0) {} }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);
  console.log("进入到 trigger", effects);
  // for (const effect of effects) {
  //   effect.run()
  // }
  effects?.forEach((fn) => {
    console.log(fn);
    fn.run();
  });
}
