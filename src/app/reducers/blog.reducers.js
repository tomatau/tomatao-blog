import { typeToReducer, get } from 'app/utils'
import { FETCH_POSTS } from 'app/actions/blog'

const getPosts = get([ 'payload', 'posts' ])

const initialState = {
  isPending: false,
  error: false,
  posts: [],
}

export const blogReducers = typeToReducer({

  [ FETCH_POSTS ]: {
    PENDING: () => ({
      ...initialState,
      isPending: true,
    }),
    REJECTED: (state, action) => ({
      ...initialState,
      error: action.payload,
    }),
    FULFILLED: (state, action) => {
      return {
        ...initialState,
        posts: getPosts(action),
      }
    },
  },

}, initialState)
