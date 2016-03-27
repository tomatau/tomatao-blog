/* @flow */
import fs from 'fs'
import { mapKeys } from 'lodash'
import { pipe, split, map, trim, filter, identity, replace } from 'ramda'
import { POSTS } from 'config/paths'
import marked from 'meta-marked'
import type { PostGateway, PostFile } from 'types/post.types'

const parseTags = pipe(split(','), map(trim), filter(identity))
const keysToLower = (obj) => mapKeys(obj, (val, key) => key.toLowerCase())

const serverGateway: PostGateway = {
  async getPostList(): Promise<Array<PostFile>> {
    return await Promise.all(fs.readdirSync(POSTS)
      .map(replace(/\.md$/, ''))
      .map(this.getPost))
  },

  async getPost(filename: string): Promise<PostFile> {
    const mdFile = marked(fs.readFileSync(`${POSTS}/${filename}.md`, 'utf8'))
    const meta = keysToLower(mdFile.meta)
    return {
      filename: filename,
      markdown: mdFile.markdown,
      meta: {
        title: meta.title,
        author: meta.author,
        tags: parseTags(meta.tags || ''),
        date: new Date(meta.date),
      },
    }
  },
}

export default serverGateway
