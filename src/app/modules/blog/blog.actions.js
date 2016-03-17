import type { FSA } from 'types/app.types'
import postGateway from './universalPostGateway'
import * as constants from './blog.constants'

export const fetchPostList = (): FSA => ({
  type: constants.FETCH_POST_LIST,
  payload: {
    promise: postGateway.getPostList().then(postList => ({ postList })),
  },
})

export const fetchPost = (filename): FSA => ({
  type: constants.FETCH_POST,
  payload: {
    promise: postGateway.getPost(filename).then(post => ({ post })),
  },
})
