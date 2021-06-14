import {Watch, Watcher} from 'watch-state'

type Target <P extends string = string> = object & Record<P, Watcher>

export function watch <P extends string = string> (target: Target<P>, propertyKey: P): any {
  const origin = target[propertyKey as string]

  return {
    value () {
      return new Watch(origin.bind(this))
    },
    enumerable: true
  }
}

export default watch
