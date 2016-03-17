import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise-middleware'
import { outClientViaSocketIO } from 'redux-via-socket.io'
import { isBrowser } from 'app/utils/predicates'
import rootSaga from 'app/modules/sagas'
import { socket } from 'app/services/socket'

const log = {
  action: debug('DISPATCH:'),
}
export const defaultMiddleware = [
  thunkMiddleware,
  promiseMiddleware(),
]
export const middleware = [
  ...defaultMiddleware,
]

if (isBrowser) {
  middleware.push(
    createSagaMiddleware(rootSaga),
    outClientViaSocketIO(socket),
    createLogger({
      predicate: () => process.env.NODE_ENV === 'development',
      collapsed: true,
    })
  )
} else {
  middleware.push(
    () => next => action => {
      if (!action.MONITOR_ACTION)
        log.action(action)
      next(action)
    }
  )
}
