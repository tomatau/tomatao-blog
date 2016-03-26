/* @flow */
import { typeToReducer, grab } from 'app/utils'
import { propEq, findIndex, update } from 'ramda'
import * as constants from './blog.constants'
import type { FSA } from 'types/app.types'
import type { PostFile } from 'types/post.types'

const getPostList = grab([ 'payload', 'postList' ])
const getPost = grab([ 'payload', 'post' ])

type blogState = {
  isPending: boolean,
  error: boolean,
  selectedPost: string | null,
  postList: Array<PostFile>
};

const initialState: blogState = {
  isPending: false,
  error: false,
  selectedPost: null,
  postList: [],
}

const updateOrAddPost = (postList, post): Array<PostFile> => {
  const filename = grab('filename')(post)
  const idx = findIndex(propEq('filename', filename))(postList)
  return (~idx)
    ? update(idx, post, postList)
    : [ ...postList, post ]
}

export const blogReducers = typeToReducer({

  [ constants.FETCH_POST_LIST ]: {
    PENDING: (): blogState => ({
      ...initialState,
      isPending: true,
    }),
    REJECTED: (state, action: FSA): blogState => ({
      ...initialState,
      error: action.payload,
    }),
    FULFILLED: (state, action: FSA): blogState => ({
      ...initialState,
      postList: getPostList(action),
    }),
  },

  [ constants.FETCH_POST ]: {
    PENDING: (state): blogState => ({
      ...state,
      isPending: true,
    }),
    REJECTED: (state, action: FSA): blogState => ({
      ...state,
      error: action.payload,
    }),
    FULFILLED: (state, action: FSA): blogState => {
      const post = getPost(action)
      return {
        ...initialState,
        selectedPost: post.filename,
        postList: updateOrAddPost(state.postList, post),
      }
    },
  },

}, initialState)
