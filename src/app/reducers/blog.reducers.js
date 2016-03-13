/* @flow */
import { typeToReducer, get } from 'app/utils'
import { pipe, propEq, findIndex, update } from 'ramda'
import { FETCH_POST_LIST, FETCH_POST } from 'app/actions/blog.actions'
import marked from 'meta-marked'
import type { FSA } from 'types/app.types'
// import type { PostFile } from 'types/Post.types'

const getPostList = get([ 'payload', 'postList' ])
const getPost = get([ 'payload', 'post' ])
const findPost = pipe(get('filename'), propEq('filename'), findIndex)

const initialState = {
  isPending: false,
  error: false,
  selectedPost: -1,
  postList: [],
}

export const blogReducers = typeToReducer({

  [ FETCH_POST_LIST ]: {
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
      postList: getPostList(action),
    }),
  },

  [ FETCH_POST ]: {
    PENDING: (state) => ({
      ...state,
      isPending: true,
    }),
    REJECTED: (state, action: FSA) => ({
      ...state,
      error: action.payload,
    }),
    FULFILLED: (state, action: FSA) => {
      const post = getPost(action)
      const idx = findPost(post)(state.postList)
      const postDesc = {
        ...post,
        ...marked(post.content),
      }
      return {
        ...initialState,
        selectedPost: idx,
        postList: update(
          idx,
          postDesc,
          state.postList,
        ),
      }
    },
  },

}, initialState)
