import { fetch } from 'app/utils'
import type { PostGateway, PostFile } from 'types/Post.types'

const browserGateway: PostGateway = {
  async getPostList(): Promise<Array<PostFile>> {
    // TODO: coupling between client and server on this path
    const { data } = await fetch.get('/api/posts')
    return data
  },
  async getPost(filename): Promise<PostFile> {
    const { data } = await fetch.get(`/api/posts/${filename}`)
    return data
  },
}

export default browserGateway
