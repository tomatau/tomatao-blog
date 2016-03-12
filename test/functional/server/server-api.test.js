import server from 'server'
import { setRoutes, rootRouter } from 'server/router'
import supertest from 'supertest-as-promised'

describe('Server API', function() {
  // helpers available from test/test.setup.js
  const app = helpers.cloneApp(server)

  before(()=> {
    app.use(function *() {
      setRoutes({})
      yield rootRouter.routes()
    })
  })

  it('should respond to ping route', ()=> {
    const body = { test: 'body' }
    supertest(app.callback())
      .post('/api/ping')
      .send(body)
      .expect('content-type', /application\/json/)
      .expect({ pong: body })
      .end()
  })
})
