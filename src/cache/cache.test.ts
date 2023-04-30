import { Watch } from 'watch-state'

import { cache, event, state } from '..'

describe('cache', () => {
  test('two get cache', () => {
    class Test {
      readonly test1 = 1

      readonly test2 = 2
    }

    const test = new Test()

    expect(test.test1).toBe(1)
    expect(test.test2).toBe(2)
  })
  test('useless autorun', () => {
    const logger = []

    class Test {
      @state accessor value = 0
      @cache get log () {
        logger.push(this.value)
        return this.value
      }
    }

    const test = new Test()

    expect(test.value).toBe(0)
    expect(logger.length).toBe(0)

    expect(test.log).toBe(0)

    expect(logger.length).toBe(1)
    expect(logger[0]).toBe(0)

    test.value = 1
    expect(logger.length).toBe(1)
  })
  test('combine', () => {
    const log = []
    class Counter {
      @state accessor value = 1
      @event tick () {
        this.value++
      }

      @cache get square () {
        return this.value ** 2
      }

      run () {
        return new Watch(() => log.push([this.value, this.square]))
      }
    }

    const counter = new Counter()
    expect(log.length).toBe(0)

    counter.run()
    expect(log.length).toBe(1)
    expect(log[0]).toEqual([1, 1])

    counter.tick()
    expect(log.length).toBe(2)
    expect(log[1]).toEqual([2, 4])
  })
  test('combine non-event', () => {
    const log = []
    class Counter {
      @state accessor value = 1
      tick () {
        this.value++
      }

      @cache get square () {
        return this.value ** 2
      }

      run () {
        return new Watch(() => log.push([this.value, this.square]))
      }
    }

    const counter = new Counter()
    expect(log.length).toBe(0)

    counter.run()
    expect(log).toEqual([[1, 1]])

    counter.tick()
    expect(log).toEqual([[1, 1], [2, 4]])
  })
})
