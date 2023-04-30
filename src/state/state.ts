import { State } from 'watch-state'

import { getDecors } from '../getDecors'

export type StateValues = Record<string, State>

export function state <This, Value = unknown> (
  value: ClassAccessorDecoratorTarget<This, Value>,
  context: ClassAccessorDecoratorContext<This, Value>,
) {
  const propertyKey = context.name

  return {
    get (this) {
      return getDecors(this)[propertyKey].value
    },
    set (this, val) {
      (getDecors(this) as StateValues)[propertyKey as string].value = val
    },
    init (initialValue) {
      const values = getDecors(this)
      values[propertyKey] = new State(initialValue)
      return initialValue
    },
  }
}
