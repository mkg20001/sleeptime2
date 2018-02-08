'use strict'

const debug = require('debug')
const log = debug('sleeptime2:child')

let lastDidTrigger = false // fix double trigger race
let lastTick

function check (maxDiff) {
  let now = Date.now()
  let diff = now - lastTick
  lastTick = now
  if (diff > maxDiff && !lastDidTrigger) {
    process.send({diff, now})
    lastDidTrigger = true
    log('triggered (%s > %s)', diff, maxDiff)
    return
  }
  lastDidTrigger = false
}

function launch (i) {
  log('launching with maxDiff %s', i)
  lastTick = Date.now()
  setInterval(check.bind(null, i), i / 2)
}

process.on('message', msg => {
  log('ipc %s', msg.type)
  switch (msg.type) {
    case 'launch':
      launch(...msg.params)
      break
    case 'freeze': // debug freeze time
      let i = 1000000000
      while (i--) true
      break
    default:
      console.error('SleepTime2 IPC error: Unknown msg type %s', msg.type)
  }
})
