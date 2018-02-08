'use strict'

const SleepTime2 = require('sleeptime2')

function onWakeUp (diff, now) {
  console.log('The system was asleep for ~%s', diff)
  console.log('Time now: %s', now)
  console.log('Time at last check: %s', now - diff)
}

const wakeUpTimer = new SleepTime2(onWakeUp)

console.log(wakeUpTimer)
