import {Event} from 'watch-state'

const e = new Event()

export function event <T extends Function> (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {
  return {
    value: function () {
      e.start()
      const result = descriptor.value.apply(this, arguments)
      e.end()
      return result
    } as unknown as T,
    enumerable: true
  }
}

export default event
