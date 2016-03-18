/* @flow */
import { typeToReducer, get } from 'app/utils'
import { propEq, findIndex, update } from 'ramda'
import * as constants from './blog.constants'
import marked from 'meta-marked'
import type { FSA } from 'types/app.types'
import type { PostFile } from 'types/post.types'

const getPostList = get([ 'payload', 'postList' ])
const getPost = get([ 'payload', 'post' ])

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
  const filename = get('filename')(post)
  const idx = findIndex(propEq('filename', filename))(postList)
  const postDesc = {
    ...post,
    ...marked(post.content),
  }
  return (~idx)
    ? update(idx, postDesc, postList)
    : [ ...postList, postDesc ]
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
