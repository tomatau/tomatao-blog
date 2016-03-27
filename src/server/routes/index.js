import Router from 'koa-router'
import koaBody from 'koa-body'
import { API_ENDPOINT } from 'config/paths'
import fsPostGateway from 'server/gateways/fsPostGateway'
import blogPaths from 'app/modules/blog/blog.paths'

const parseBody = koaBody()
const apiRouter = Router({ prefix: API_ENDPOINT })
// const log = {
//   routes: debug('routes'),
// }

apiRouter
  .all('ping', '/ping',
    parseBody, function *() {
      this.body = { pong: this.request.body }
    })
  .get('post.list', blogPaths.postListUrl(),
    function *() {
      this.body = yield fsPostGateway.getPostList()
    })
  .get('post', blogPaths.postUrl(),
    function *() {
      this.body = yield fsPostGateway.getPost(this.params.filename)
    })

export default apiRouter
