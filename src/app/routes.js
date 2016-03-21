import { Route } from 'react-router'

import App from 'app/components/App'
import BlogListRoute from 'app/components/routes/BlogListRoute'
import OopsRoute from 'app/components/routes/OopsRoute'
import NotFoundRoute from 'app/components/routes/NotFoundRoute'

export const makeRoutes = () => (
  <Route component={App}>
    <Route path='/' component={BlogListRoute} />
    <Route path='/oops' component={OopsRoute} />
    <Route path='*' component={NotFoundRoute} />
  </Route>
)

export default makeRoutes
