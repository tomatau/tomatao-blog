import { fork, select } from 'redux-saga/effects'
import * as flashSelectors from 'app/modules/flash/flash.selectors'
import * as flashSagas from 'app/modules/flash/flash.sagas'

export default function * rootSaga() {
  const nextFlash = yield select(flashSelectors.nextFlashMessage)
  yield fork(flashSagas.timeoutRemoveFlash, nextFlash)
  yield fork(flashSagas.takeFlashMessages)
}
