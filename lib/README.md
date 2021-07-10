<img src="https://raw.githubusercontent.com/d8corp/watch-state/v3.3.1/img/logo.svg" align="left" width="90" height="90" alt="Watch-State logo by Mikhail Lysikov">

# &nbsp; @watch-state/decorators

&nbsp;  
[![NPM](https://img.shields.io/npm/v/@watch-state/decorators.svg)](https://www.npmjs.com/package/@watch-state/decorators)
[![downloads](https://img.shields.io/npm/dm/@watch-state/decorators.svg)](https://www.npmtrends.com/@watch-state/decorators)
[![downloads](https://img.shields.io/badge/Changelog-⋮-brightgreen)](https://changelogs.xyz/@watch-state/decorators)
[![license](https://img.shields.io/npm/l/@watch-state/decorators)](https://github.com/d8corp/watch-state-decorators/blob/master/LICENSE)

State management decorators based on [watch-state](https://www.npmjs.com/package/watch-state)

### Installation
npm
```bash
npm i @watch-state/decorators
```
yarn
```bash
yarn add @watch-state/decorators
```
### Using
You can use one of the next decorators
```javascript
import {watch, state, cache, event} from '@watch-state/decorators'

class Counter {
  // fields
  @state value = 1

  // accessors
  @cache get square () {
    return this.value ** 2
  }

  // methods
  @event tick () {
    this.value++
  }
  @watch run () {
    console.log(this.value, this.square)
  }
}


const counter = new Counter()

counter.run()
// console.log(1, 1)

counter.tick()
// console.log(2, 4)
```
