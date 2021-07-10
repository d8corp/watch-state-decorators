import {Watch} from 'watch-state'
import {state, event} from '..'

describe('event', () => {
  test('brackets', () => {
    class Test {
      @event changeBrackets (left, right) {
        this.left = left
        this.right = right
      }
      @state left = ''
      @state right = ''
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
      @state foo = 0
      @state bar = 0

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
})
