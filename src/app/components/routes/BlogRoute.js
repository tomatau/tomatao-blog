/* @flow */
import DocumentMeta from 'react-document-meta'
import { provideHooks } from 'redial'
import cx from 'classnames'
import { connect } from 'react-redux'
import { isEmpty } from 'ramda'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { grab, highlight } from 'app/utils'
import { formatDate } from 'app/utils'
import Spinner from 'app/components/atoms/Spinner'
import ReactDisqusThread from 'react-disqus-thread'
import style from './BlogRoute.module.scss'
import type { PostFile } from 'types/post.types'

const getFilename = grab('selectedPost.filename')

@provideHooks({
  prefetch: ({ dispatch, params }) =>
    dispatch(blogActions.fetchPost(params.filename)).payload.promise,
})
@connect(state => ({
  selectedPost: blogSelectors.getSelectedPost(state),
  selectedHtml: blogSelectors.getSelectedHtml(state),
}))
class BlogRoute extends React.Component {
  props: {
    selectedPost: PostFile,
    selectedHtml: string,
    location: { pathname: string },
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
    const { selectedHtml, selectedPost, location } = this.props
    return (
      <section className={cx('BlogRoute', style.blogRoute)}>
        {isEmpty(selectedHtml) ? <Spinner /> : (
          <div>
            <DocumentMeta extend title={`Tomatao Blog | ${selectedPost.meta.title}`} />
            <span className={style.postedOn}>
              Posted on {formatDate(selectedPost.meta.date, 'ddd Do MMMM, YYYY')} by {selectedPost.meta.author}
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedHtml,
              }}
            />
            <ReactDisqusThread
              shortname={'tomatao-blog'}
              identifier={location.pathname}
              title={selectedPost.meta.title}
              url={`http://tomatao-blog.herokuapp.com${location.pathname}`}
            />
          </div>
        )}
      </section>
    )
  }
}

export default BlogRoute
