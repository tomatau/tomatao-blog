import Router from 'koa-router'
import koaBody from 'koa-body'
import Posts from 'server/services/Posts'

const parseBody = koaBody()
const apiRouter = Router({ prefix: '/api' })

const log = {
  routes: debug('routes'),
}

apiRouter
  .all('ping', '/ping', parseBody, function *() {
    this.response.body = { pong: this.request.body }
  })
  .get('posts', '/posts', function *() {
    const postList = Posts.getPostList()
    log.routes(postList)
    this.response.body = postList
  })

export default apiRouter
