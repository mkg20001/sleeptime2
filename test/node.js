'use strict'

/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const St2 = require('../src')

describe('sleeptime2', () => {
  let timer

  it('should create the forked process properly', () => {
    timer = new St2(console.log, 1000)
    expect(timer._forked).to.exist()
    expect(typeof timer._forked.pid).to.equal('number') // TODO: use real chai typeOf
  })

  it('should trigger correctly', done => {
    timer.onNotify = () => done()
    timer._forked.send({type: 'freeze', i: 1000000000})
  })

  it('should kill the forked process properly', () => {
    timer.stop()
    expect(timer._forked).to.not.exist()
  })
})
