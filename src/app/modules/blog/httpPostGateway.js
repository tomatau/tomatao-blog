import { fetch } from 'app/utils'
import blogPaths from './blog.paths'
import type { PostGateway, PostFile } from 'types/post.types'

const browserGateway: PostGateway = {
  async getPostList(): Promise<PostFile[]> {
    const { data } = await fetch.get(blogPaths.postListUrl())
    return data
  },
  async getPost(filename): Promise<PostFile> {
    const { data } = await fetch.get(blogPaths.postUrl(filename))
    return data
  },
}

export default browserGateway
