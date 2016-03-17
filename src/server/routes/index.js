import Router from 'koa-router'
import koaBody from 'koa-body'
import { API_ENDPOINT } from 'config/paths'
import fsPostGateway from 'server/gateways/fsPostGateway'
import BlogEndpoints from 'app/modules/blog/blog.endpoints'

const parseBody = koaBody()
const apiRouter = Router({ prefix: API_ENDPOINT })
const blogEndpoints = new BlogEndpoints()
// const log = {
//   routes: debug('routes'),
// }

apiRouter
  .all('ping', '/ping',
    parseBody, function *() {
      this.body = { pong: this.request.body }
    })
  .get('post.list', blogEndpoints.postList(),
    function *() {
      this.body = yield fsPostGateway.getPostList()
    })
  .get('post', blogEndpoints.post(),
    function *() {
      this.body = yield fsPostGateway.getPost(this.params.filename)
    })

export default apiRouter
