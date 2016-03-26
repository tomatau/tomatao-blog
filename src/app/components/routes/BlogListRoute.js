/* @flow */
import { provideHooks } from 'redial'
import cx from 'classnames'
import { blogActions } from 'app/modules/blog'
import PostList from 'app/components/molecules/PostList'
import style from './BlogListRoute.module.scss'

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(blogActions.fetchPostList()).payload.promise,
})
/*::`*/
class BlogListRoute extends React.Component {
  render() {
    return (
      <section className={cx('BlogListRoute', style.listRoute)}>
        <PostList />
      </section>
    )
  }
}

export default BlogListRoute
