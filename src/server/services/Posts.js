/* @flow */
import fs from 'fs'
import { capitalize } from 'lodash'
import { pipe, replace } from 'ramda'
import { POSTS } from 'config/paths'
import type { PostGateway, PostFile } from './Posts.flow'

const log = {
  posts: debug('Posts'),
}

const filenameToTitle = pipe(
  replace(/-/g, ' '), replace(/.md$/, ''), capitalize
)

const Posts: PostGateway = {
  getPostList(): Array<PostFile> {
    return fs.readdirSync(POSTS).map(p => ({
      filename: p,
      title: filenameToTitle(p),
    }))
  },

  getPost(filename: string): PostFile {
    const content = fs.readFileSync(`${POSTS}/${filename}`, 'utf8')
    log.posts(content)
    return {
      filename,
      content,
      title: filenameToTitle(filename),
    }
  },
}

export default Posts
