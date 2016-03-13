import chai, { expect } from 'chai'
import koa from 'koa'
import sinon from 'sinon'
import lodash from 'lodash/index'
import ramda from 'ramda/dist/ramda'
import { isBrowser } from 'app/utils/predicates'
import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/reducers'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import chaiEnzyme from 'chai-enzyme'

chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))
chai.use(chaiEnzyme())

const helpers = {
  cloneApp(app) {
    const clone = koa()
    clone.keys = lodash.clone(app.keys)
    clone.middleware = lodash.clone(app.middleware)
    return clone
  },
  createStore(initialState={}) {
    return makeCreateStore([
      promiseMiddleware,
      thunkMiddleware,
    ])(rootReducer, initialState)
  },
}

setGlobals(isBrowser ? window : GLOBAL)

function setGlobals(global) {
  global.global = global
  global.expect = expect
  global.sinon = sinon
  global._ = lodash
  global.R = ramda
  global.helpers = helpers
}
