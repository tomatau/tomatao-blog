import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { enableBatching } from 'redux-batched-actions'
import { flashReducers } from 'app/modules/flash/flash.reducers'
import { blogReducers } from 'app/modules/blog/blog.reducers'

export default enableBatching(combineReducers({
  flash: flashReducers,
  blog: blogReducers,
  routing: routerReducer,
}))
