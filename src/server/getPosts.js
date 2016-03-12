import { POSTS } from 'config/paths'

export default function() {
  const fs = require('fs')
  const postList = fs.readdirSync(POSTS)
  console.log(postList)
  return {
    posts: 'moo',
  }
}
