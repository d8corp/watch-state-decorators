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
    let run = target[propertyKey]

    function getter () {
      globalEvent.start()
      const result = run.apply(this, arguments)
      globalEvent.end()
      return result
    }

    Object.defineProperty(target, propertyKey, {
      get () {
        return run ? getter : run
      },
      set (runner) {
        run = runner
      }
    })
  }
}
