import { track } from "./effect";
import { trigger } from "./effect";
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // target =>raw => {foo:1} key=>foo
      const res = Reflect.get(target, key);
      // console.log('依赖收集：代理对象',target,'的属性',key,'被读取');
      track(target, key);
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      target[key] = value;
      // TODO 触发依赖
      trigger(target, key);
      return res;
    },
  });
}
