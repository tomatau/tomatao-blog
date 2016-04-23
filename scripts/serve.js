import 'config/environment'
import '~/scripts/helpers/cssModulesHook'
import opbeat from 'opbeat'
import http from 'http'
import serve from 'koa-static'
import { ROOT, STATIC, SERVER, SOCKETS } from 'config/paths'
import { isomorphicTools } from 'server/isomorphicTools'
import app from 'server/index'

opbeat.start({
  appId: process.env.OPBEAT_APP_ID,
  organizationId: process.env.OPBEAT_ORD_ID,
  secretToken: process.env.OPBEAT_SECRET,
  active: process.env.NODE_ENV === 'production',
})

const log = {
  app: debug('app'),
}

app.use(serve(STATIC))

isomorphicTools.server(ROOT, () => {
  const { rootRouter, setRoutes } = require(`${SERVER}/router`)
  setRoutes(isomorphicTools.assets())

  rootRouter.use(function *(next) {
    opbeat.setTransactionName(`${this.request.method} ${this._matchedRoute}`)
    yield next
  })

  app.use(rootRouter.routes())
})

const server = http.createServer(app.callback())
global.socketServer = require(SOCKETS)(server)

server.listen(process.env.PORT, () => {
  log.app(`http://localhost:${process.env.PORT}`)
})
