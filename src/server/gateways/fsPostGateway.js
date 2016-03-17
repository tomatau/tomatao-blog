/* @flow */
import fs from 'fs'
import { capitalize } from 'lodash'
import { pipe, replace } from 'ramda'
import { POSTS } from 'config/paths'
import type { PostGateway, PostFile } from 'types/post.types'

// const log = {
//   posts: debug('posts.server.gateway'),
// }

const filenameToTitle = pipe(
  replace(/-/g, ' '), replace(/.md$/, ''), capitalize
)

const serverGateway: PostGateway = {
  async getPostList(): Promise<Array<PostFile>> {
    return fs.readdirSync(POSTS).map(p => ({
      filename: p,
      title: filenameToTitle(p),
    }))
  },

  async getPost(filename: string): Promise<PostFile> {
    return {
      filename,
      content: fs.readFileSync(`${POSTS}/${filename}`, 'utf8'),
      title: filenameToTitle(filename),
    }
  },
}

export default serverGateway
