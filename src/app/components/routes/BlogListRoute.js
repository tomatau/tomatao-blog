/* @flow */
import { provideHooks } from 'redial'
import cx from 'classnames'
import { connect } from 'react-redux'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { grab, highlight } from 'app/utils'
import PostList from 'app/components/molecules/PostList'
import type { PostFile } from 'types/post.types'
import style from './BlogListRoute.module.scss'

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(blogActions.fetchPostList()).payload.promise,
})
@connect(state => ({
  hasSelectedPost: blogSelectors.hasSelectedPost(state),
  selectedPost: blogSelectors.getSelectedPost(state),
  selectedHtml: blogSelectors.getSelectedHtml(state),
}))
/*::`*/
class BlogListRoute extends React.Component {
  props: {
    selectedPost?: PostFile,
    fetchPost: Function,
    hasSelectedPost: boolean,
    selectedHtml: string,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
    const getFilename = grab('selectedPost.filename')
    return (getFilename(nextProps) !== getFilename(this.props))
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  componentDidMount() {
    this.highlightCode()
  }

  highlightCode() {
    for (let node of document.querySelectorAll('code')) {
      highlight.highlightElement(node)
    }
  }

  render() {
    const { selectedHtml, hasSelectedPost } = this.props
    return (
      <section className={cx('BlogListRoute', style.listRoute)}>
        <PostList />
        {!hasSelectedPost ? null :
          <div
            dangerouslySetInnerHTML={{
              __html: selectedHtml,
            }}
          />}
      </section>
    )
  }
}

export default BlogListRoute
