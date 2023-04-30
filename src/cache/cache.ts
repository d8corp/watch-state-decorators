import { Cache } from 'watch-state'

import { getDecors } from '../getDecors'

export function cache <This, Value = unknown> (
  value: () => Value,
  context: ClassGetterDecoratorContext<This, Value>,
) {
  const propertyKey = context.name
  return function (): Value {
    const decorators = getDecors(this)

    if (propertyKey in decorators) {
      return decorators[propertyKey].value
    } else {
      return (decorators[propertyKey] = new Cache(value.bind(this), true)).value
    }
  }
}
