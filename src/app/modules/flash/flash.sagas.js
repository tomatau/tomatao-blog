import { call, put, fork, take, race } from 'redux-saga/effects'
import * as constants from './flash.constants'
import { removeMessage } from './flash.actions'

const DAEMON = true
const log = {
  sagas: debug('flash.sagas'),
}

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))

export function * timeoutRemoveFlash(nextFlash) {
  if (nextFlash) {
    const { removed } = yield race({
      timeout: call(wait, 4000),
      removed: take(action =>
        action.type === constants.REMOVE_MESSAGE
        && action.id === nextFlash.id
      ),
    })
    if (!removed) {
      yield put(removeMessage(nextFlash.id))
    }
  }
}

export function * takeFlashMessages() {
  while (DAEMON) {
    const action = yield take(constants.ADD_MESSAGE)
    log.sagas('Flash added, saga will remove it automatically')
    yield fork(timeoutRemoveFlash, action.payload)
  }
}
