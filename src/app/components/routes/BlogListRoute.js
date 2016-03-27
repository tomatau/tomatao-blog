/* @flow */
import { provideHooks } from 'redial'
import cx from 'classnames'
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'
import { blogActions, blogSelectors } from 'app/modules/blog'
import PostList from 'app/components/molecules/PostList'
import Spinner from 'app/components/atoms/Spinner'
import style from './BlogListRoute.module.scss'

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(blogActions.fetchPostList()).payload.promise,
})
@connect(state => ({
  postList: blogSelectors.getParsedPostList(state),
}))
/*::`*/
class BlogListRoute extends React.Component {
  props: {
    postList: Array,
  };

  render() {
    const { postList } = this.props
    return (
      <section className={cx('BlogListRoute', style.listRoute)}>
        {isEmpty(postList) ? <Spinner /> : <PostList />}
      </section>
    )
  }
}

export default BlogListRoute
