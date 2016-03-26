/* @flow */
import fs from 'fs'
import { mapKeys } from 'lodash'
import { pipe, split, map, trim, filter, identity } from 'ramda'
import { POSTS } from 'config/paths'
import marked from 'meta-marked'
import type { PostGateway, PostFile } from 'types/post.types'

const parseTags = pipe(split(','), map(trim), filter(identity))
const keysToLower = (obj) => mapKeys(obj, (val, key) => key.toLowerCase())

const serverGateway: PostGateway = {
  async getPostList(): Promise<Array<PostFile>> {
    return await Promise.all(fs.readdirSync(POSTS).map(this.getPost))
  },

  async getPost(filename: string): Promise<PostFile> {
    const mdFile = marked(fs.readFileSync(`${POSTS}/${filename}`, 'utf8'))
    const meta = keysToLower(mdFile.meta)
    return {
      filename,
      markdown: mdFile.markdown,
      meta: { ...meta, tags: parseTags(meta.tags || '') },
    }
  },
}

export default serverGateway
