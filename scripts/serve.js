import 'config/environment'
import '~/scripts/helpers/cssModulesHook'
import http from 'http'
import serve from 'koa-static'
import { ROOT, STATIC, SERVER, SOCKETS } from 'config/paths'
import { isomorphicTools } from 'server/isomorphicTools'
import app from 'server/index'

const log = {
  app: debug('app'),
}

app.use(serve(STATIC))

isomorphicTools.server(ROOT, () => {
  log.app('ISOMORPHIC HANDLER')
  const { rootRouter, setRoutes } = require(`${SERVER}/router`)
  setRoutes(isomorphicTools.assets())

  app.use(function *() {
    yield rootRouter.routes()
  })
})

const server = http.createServer(app.callback())
global.socketServer = require(SOCKETS)(server)

server.listen(process.env.PORT, () => {
  log.app(`http://localhost:${process.env.PORT}`)
})
