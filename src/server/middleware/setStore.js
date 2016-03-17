import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/modules/reducers'
import { middleware } from 'app/services/middleware'
import { flashActions } from 'app/modules/flash'

// make a new store for each request
export default function *setStore(next) {
  this.store = makeCreateStore(middleware)(rootReducer, {})
  // get flash messages from redirect
  this.flash.map(({ message, type }) =>
    this.store.dispatch(flashActions.addMessage(message, type))
  )
  yield next
}
