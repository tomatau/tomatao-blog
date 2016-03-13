import type { FSA } from 'types/app.types'
import postGateway from 'app/gateways/post.universal'

export const FETCH_POST_LIST = 'blog/FETCH_POST_LIST'
export const FETCH_POST = 'blog/FETCH_POST'

export const fetchPostList = (): FSA => ({
  type: FETCH_POST_LIST,
  payload: {
    promise: postGateway.getPostList().then(postList => ({ postList })),
  },
})

export const fetchPost = (filename): FSA => ({
  type: FETCH_POST,
  payload: {
    promise: postGateway.getPost(filename).then(post => ({ post })),
  },
})
