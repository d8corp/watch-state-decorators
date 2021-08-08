import {globalEvent} from 'watch-state'

export function event <T extends Function> (target: Object, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<T>): any {
  if (descriptor) {
    return {
      value: function () {
        globalEvent.start()
        const result = descriptor.value.apply(this, arguments)
        globalEvent.end()
        return result
      } as unknown as T,
      enumerable: true
    }
  } else {
    const EVENT = Symbol('event')

    Object.defineProperty(target, propertyKey, {
      get () {
        return this[EVENT]
      },
      set (runner) {
        this[EVENT] = (...args) => {
          globalEvent.start()
          const result = runner(...args)
          globalEvent.end()
          return result
        }
      }
    })
  }
}
