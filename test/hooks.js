import fs from 'fs'
import _ from 'lodash'
import nodeHookFilename from 'node-hook-filename'
import { ROOT } from 'config/paths'

nodeHookFilename([ '.jpeg' ])
nodeHookFilename([ 'blog.config.js' ], () => {
  const keys = fs.readdirSync(ROOT + '/posts')
  const sources = keys.map(k => ({
    src: `<h1>${k}</h1>`,
  }))
  return _.zipObject(keys, sources)
})
