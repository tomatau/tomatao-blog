import { fetch } from 'app/utils'
import BlogEndpoints from './blog.endpoints'
import type { PostGateway, PostFile } from 'types/post.types'

const endpoints = new BlogEndpoints({ useBaseUrl: true })

const browserGateway: PostGateway = {
  async getPostList(): Promise<PostFile[]> {
    const { data } = await fetch.get(endpoints.postList())
    return data
  },
  async getPost(filename): Promise<PostFile> {
    const { data } = await fetch.get(endpoints.post(filename))
    return data
  },
}

export default browserGateway
