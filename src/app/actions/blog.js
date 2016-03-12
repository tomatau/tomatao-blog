import { fetch } from 'app/utils'

export const FETCH_POSTS = 'blog/FETCH_POSTS'

export const fetchPosts = () => ({
  type: FETCH_POSTS,
  payload: {
    promise: getPostList(),
  },
})

const getPostList = async () => {
  const { data } = await fetch.get('http://localhost:9001/api/posts')
  return { posts: data }
}
