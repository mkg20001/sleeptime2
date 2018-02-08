'use strict'

const cp = require('child_process')
const path = require('path')
const debug = require('debug')
const log = debug('sleeptime2')

class SleepTime2 {
  /**
    Detects when the system wakes up from standby
    @param {Function} onNotify - Function called as `onNotify(diff, now)` if the time difference between the last check and now is bigger than maxDiff
    @param {Number} maxDiff - Amount of milliseconds that the machine needs to be asleep for the event to trigger
    @returns {undefined}
    */
  constructor (onNotify, maxDiff) {
    if (typeof onNotify !== 'function') throw new TypeError('Expected onNotify to be function!')
    log('new SleepTime2(<Function>, %s)', maxDiff)
    this.onNotify = onNotify
    this.maxDiff = maxDiff || 10 * 1000
    this.start()
  }

  /**
    Spawns a fork that watches the time
    Automatically called after creation
    @returns {undefined}
    */
  start () {
    if (this._forked) return
    this._forked = cp.fork(path.join(__dirname, 'child.js'))
    this._forked.send({ type: 'launch', params: [ this.maxDiff ] })
    this._forked.on('message', this._onTrigger.bind(this))
    log('forked to %s', this._forked.pid)
  }

  /**
    Kills the fork if any is running
    @returns {undefined}
    */
  stop () {
    if (!this._forked) return
    this._forked.kill()
    this._forked = null
    log('killed fork')
  }

  _onTrigger (param) {
    const {diff, now} = param
    this.onNotify(diff, now)
  }
}

module.exports = SleepTime2
