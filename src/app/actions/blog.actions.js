import type { FSA } from 'types/app.types'
import postGateway from 'app/gateways/post.universal'

export const FETCH_POSTS = 'blog/FETCH_POSTS'

export const fetchPosts = (): FSA => ({
  type: FETCH_POSTS,
  payload: {
    promise: postGateway.getPostList().then(posts => ({ posts })),
  },
})
