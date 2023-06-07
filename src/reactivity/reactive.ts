export function reactive(raw) {
    return new Proxy(raw,{
        get(target,key) {
            // target =>raw => {foo:1} key=>foo
            const res = Reflect.get(target,key)
            // TODO 依赖收集
            return res
        },
        set(target,key,value) {
            const res = Reflect.set(target,key,value)
            // TODO 触发依赖
            return res
        }

    })
}
