import getDecors from '../getDecors'
import {State} from 'watch-state'

export interface StateValues {
  [key: string]: State
}

export function state (target: Object, propertyKey: string, desc?): any {
  const value = desc ? (
    desc.initializer ? desc.initializer() : desc.value
  ) : undefined

  return {
    get (): any {
      const values = getDecors(this)
      if (!values[propertyKey]) {
        values[propertyKey] = new State(value)
      }
      return values[propertyKey].value
    },
    set (v: any): void {
      const values: StateValues = getDecors(this) as StateValues

      if (propertyKey in values) {
        values[propertyKey].value = v
      } else {
        values[propertyKey] = new State(v)
      }
    },
    enumerable: true
  }
}

export default state
