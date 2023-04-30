import { Watch } from 'watch-state'

import { state } from '../state'
import { event } from '.'

describe('event', () => {
  test('brackets', () => {
    class Test {
      @event changeBrackets (left, right) {
        this.left = left
        this.right = right
      }

      @state accessor left = ''
      @state accessor right = ''
    }
    const test = new Test()
    const log = []
    new Watch(() => log.push(`${test.left}value${test.right}`))

    expect(log.length).toBe(1)
    expect(log[0]).toBe('value')

    test.changeBrackets('(', ')')

    expect(log.length).toBe(2)
    expect(log[1]).toBe('(value)')
  })
  test('field event', () => {
    class Test {
      @state accessor foo = 0
      @state accessor bar = 0

      @event test = () => {
        this.foo = 1
        this.bar = 2
      }
    }

    const test = new Test()

    const log = []

    new Watch(() => {
      log.push([test.foo, test.bar])
    })

    test.test()

    expect(log).toEqual([[0, 0], [1, 2]])
  })
  test('setter event', () => {
    class Test {
      #value
      @state accessor foo = 0
      @state accessor bar = 0

      @event set test (value: number) {
        this.#value = value
        this.foo = value + 1
        this.bar = value + 2
      }

      get test () {
        return this.#value
      }
    }

    const test = new Test()

    const log = []

    new Watch(() => {
      log.push([test.foo, test.bar])
    })

    test.test = 0

    expect(log).toEqual([[0, 0], [1, 2]])
  })
})
