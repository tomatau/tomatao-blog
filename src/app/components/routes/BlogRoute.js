/* @flow */
import { provideHooks } from 'redial'
import cx from 'classnames'
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { grab, highlight } from 'app/utils'
import { formatDate } from 'app/utils'
import Spinner from 'app/components/atoms/Spinner'
import style from './BlogRoute.module.scss'
import type { PostFile } from 'types/post.types'

const getFilename = grab('selectedPost.filename')

/*::`*/
@provideHooks({
  prefetch: ({ dispatch, params }) => dispatch(blogActions.fetchPost(params.filename)).payload.promise,
})
@connect(state => ({
  selectedPost: blogSelectors.getSelectedPost(state),
  selectedHtml: blogSelectors.getSelectedHtml(state),
}))
/*::`*/
class BlogRoute extends React.Component {
  props: {
    selectedPost: PostFile,
    selectedHtml: string,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
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
    const { selectedHtml, selectedPost } = this.props
    return (
      <section className={cx('BlogRoute', style.blogRoute)}>
        {isEmpty(selectedHtml) ? <Spinner /> : (
          <div>
            <span className={style.postedOn}>
              Posted on {formatDate(selectedPost.meta.date, 'ddd Do MMMM, YYYY')} by {selectedPost.meta.author}
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedHtml,
              }}
            />
          </div>
        )}
      </section>
    )
  }
}

export default BlogRoute
