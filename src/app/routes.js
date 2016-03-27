import { Route } from 'react-router'

import App from 'app/components/App'
import BlogListRoute from 'app/components/routes/BlogListRoute'
import BlogRoute from 'app/components/routes/BlogRoute'
import OopsRoute from 'app/components/routes/OopsRoute'
import NotFoundRoute from 'app/components/routes/NotFoundRoute'

import blogPaths from 'app/modules/blog/blog.paths'

export const makeRoutes = () => (
  <Route component={App}>
    <Route path='/' component={BlogListRoute} />
    <Route path={blogPaths.postRoute()} component={BlogRoute} />
    <Route path='/oops' component={OopsRoute} />
    <Route path='*' component={NotFoundRoute} />
  </Route>
)

export default makeRoutes
