# sleeptime2

Detects when the system wakes up from standby

(Improved version of [sleeptime](npm.im/sleeptime))

# Docs

## Example

```js
const SleepTime2 = require('sleeptime2')

function onWakeUp (diff, now) {
  console.log('The system was asleep for ~%s', diff)
  console.log('Time now: %s', now)
  console.log('Time at last check: %s', now - diff)
}

const wakeUpTimer = new SleepTime2(onWakeUp)

console.log(wakeUpTimer)
```

## API

### `SleepTime2(onWakeUp[, maxDiff])`

 - onWakeUp: Function called if the time difference between the last check and now is bigger than maxDiff
 - maxDiff: Amount of milliseconds that the machine needs to be asleep for the event to trigger

### `.start()`

Spawns a fork that watches the time

Automatically called after creation

### `.stop()`

Kills the fork if any is running
