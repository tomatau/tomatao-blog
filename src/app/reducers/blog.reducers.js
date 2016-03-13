/* @flow */
import { typeToReducer, get } from 'app/utils'
import { FETCH_POSTS } from 'app/actions/blog.actions'
import type { FSA } from 'types/app.types'

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
    REJECTED: (state, action: FSA) => ({
      ...initialState,
      error: action.payload,
    }),
    FULFILLED: (state, action: FSA) => ({
      ...initialState,
      posts: getPosts(action),
    }),
  },

}, initialState)
