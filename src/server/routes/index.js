import Router from 'koa-router'
import koaBody from 'koa-body'
import Posts from 'server/gateways/post.server'

const parseBody = koaBody()
const apiRouter = Router({ prefix: '/api' })

// const log = {
//   routes: debug('routes'),
// }

apiRouter
  .all('ping', '/ping', parseBody, function *() {
    this.body = { pong: this.request.body }
  })
  .get('posts', '/posts', function *() {
    this.body = yield Posts.getPostList()
  })
  .get('post.file', '/posts/:filename', function *() {
    this.body = yield Posts.getPost(this.params.filename)
  })

export default apiRouter
