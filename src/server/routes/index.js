import Router from 'koa-router'
import koaBody from 'koa-body'
import fsPostGateway from 'app/gateways/fsPostGateway'

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
    this.body = yield fsPostGateway.getPostList()
  })
  .get('post.file', '/posts/:filename', function *() {
    this.body = yield fsPostGateway.getPost(this.params.filename)
  })

export default apiRouter
