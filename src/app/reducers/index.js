import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { flashReducers as flash } from './flash.reducers'
import { barReducers as bar } from './bar.reducers'
import { fooReducers as foo } from './foo.reducers'
import { blogReducers as blog } from './blog.reducers'
import { enableBatching } from 'redux-batched-actions'

export default enableBatching(combineReducers({
  flash,
  foo,
  bar,
  blog,
  routing: routerReducer,
}))
