'use strict'

/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const st2 = require('../src')

describe('sleeptime2', () => {

  let timer

  it('should create the forked process properly', () => {
    timer = new st2(console.log)
    expect(timer._forked).to.exist()
    expect(typeof timer._forked.pid).to.equal('number') // TODO: use real chai typeOf
  })

  it('should kill the forked process properly', () => {
    timer.stop()
    expect(timer._forked).to.not.exist()
  })

})
