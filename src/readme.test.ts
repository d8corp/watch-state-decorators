import { Watch } from 'watch-state'

import { cache, event, state } from '.'

describe('readme', () => {
  test('first example', () => {
    const log = []

    class Counter {
      @state accessor value = 1

      // accessors
      @cache get square () {
        return this.value ** 2
      }

      @event tick () {
        this.value++
      }
    }

    const counter = new Counter()

    new Watch(() => log.push([counter.value, counter.square]))
    expect(log[0]).toEqual([1, 1])

    counter.tick()
    expect(log[1]).toEqual([2, 4])
  })
})
