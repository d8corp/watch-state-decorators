import {Cache} from 'watch-state'
import getDecors from '../getDecors'

interface CachePropertyDescriptor {
  get?: () => any
  set?: (value: any) => void
}

export function cache (target: object, propertyKey: string, descriptor: CachePropertyDescriptor): CachePropertyDescriptor {
  const origin = descriptor.get

  if (origin) {
    return {
      get () {
        const decorators = getDecors(this)

        if (propertyKey in decorators) {
          return decorators[propertyKey].value
        } else {
          return (decorators[propertyKey] = new Cache(origin.bind(this), true)).value
        }
      }
    }
  }
}

export default cache
