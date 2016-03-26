/* @flow */
import { provideHooks } from 'redial'
import cx from 'classnames'
import { connect } from 'react-redux'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { grab, highlight } from 'app/utils'
import type { PostFile } from 'types/post.types'
// import style from './BlogRoute.module.scss'

const getFilename = grab('selectedPost.filename')

/*::`*/
@provideHooks({
  prefetch: ({ dispatch, params }) => {
    // console.log(params.filename)
    return dispatch(blogActions.fetchPost(params.filename)).payload.promise
  },
})
@connect(state => ({
  selectedPost: blogSelectors.getSelectedPost(state),
  selectedHtml: blogSelectors.getSelectedHtml(state),
}))
/*::`*/
class BlogRoute extends React.Component {
  props: {
    selectedPost?: PostFile,
    fetchPost: Function,
    hasSelectedPost: boolean,
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
    const { selectedHtml } = this.props
    return (
      <section className={cx('BlogRoute')}>
        <div
          dangerouslySetInnerHTML={{
            __html: selectedHtml,
          }}
        />
      </section>
    )
  }
}

export default BlogRoute
