import { onDestroy, Watch } from 'watch-state'

import { state } from '.'

describe('state', () => {
  test('empty value', () => {
    class Test {
      @state accessor test
    }
    const test1 = new Test()
    expect(test1.test).toBe(undefined)
  })
  test('initializer', () => {
    class Test {
      @state accessor test1 = 1
      @state accessor test2 = 2
    }

    const tests = new Test()

    expect(tests.test1).toBe(1)
    expect(tests.test2).toBe(2)
  })
  test('timeout', async () => {
    class Timer {
      @state accessor counting = true
      @state accessor count = 0
    }
    const timer = new Timer()
    let count
    new Watch(() => {
      if (timer.counting) {
        setTimeout(() => timer.count++, 50)
        count = timer.count
      }
    })

    expect(count).toBe(0)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(1)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(2)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(3)
    timer.counting = false

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(count).toBe(3)
    expect(timer.count).toBe(4)

    timer.counting = true

    expect(count).toBe(4)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(5)
  })
  test('destructor', async () => {
    class Timer {
      @state accessor counting = true
      @state accessor count = 0
    }
    const timer = new Timer()
    let count
    new Watch(() => {
      if (timer.counting) {
        new Watch(() => {
          const interval = setInterval(() => timer.count++, 50)
          onDestroy(() => clearInterval(interval))
        })
        new Watch(() => {
          count = timer.count
        })
      }
    })

    expect(count).toBe(0)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(1)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(2)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(3)
    timer.counting = false

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(count).toBe(3)

    timer.counting = true

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(4)
  })
  test('update destructor', async () => {
    class Timer {
      @state accessor counting = true
      @state accessor count = 0
      start () {
        const interval = setInterval(() => this.count++, 50)
        onDestroy(() => clearInterval(interval))
      }
    }
    const timer = new Timer()

    let count
    new Watch(() => {
      if (timer.counting) {
        new Watch(update => {
          if (!update) {
            timer.start()
          }
        })
        count = timer.count
      }
    })

    expect(count).toBe(0)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(1)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(2)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(3)
    timer.counting = false

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(count).toBe(3)

    timer.counting = true

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(count).toBe(4)
  })
})
