/* @flow */
import { provideHooks } from 'redial'
import cx from 'classnames'
import { intersperse } from 'ramda'
import { connect } from 'react-redux'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { grab, highlight } from 'app/utils'
import type { PostFile } from 'types/post.types'
import style from './BlogListRoute.module.scss'

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(blogActions.fetchPostList()).payload.promise,
})
@connect(state => ({
  postList: blogSelectors.getPostList(state),
  hasSelectedPost: blogSelectors.hasSelectedPost(state),
  selectedPost: blogSelectors.getSelectedPost(state),
  selectedHtml: blogSelectors.getSelectedHtml(state),
}), { fetchPost: blogActions.fetchPost })
/*::`*/
class BlogListRoute extends React.Component {
  props: {
    postList: Array<PostFile>,
    selectedPost?: PostFile,
    fetchPost: Function,
    hasSelectedPost: boolean,
    selectedHtml: string,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
    const getFilename = grab('selectedPost.filename')
    return (getFilename(nextProps) !== getFilename(this.props))
      || nextProps.postList.length !== this.props.postList.length
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

  handlePostClick(post:PostFile) {
    this.props.fetchPost(post.filename)
  }

  render() {
    const { postList, selectedHtml, hasSelectedPost } = this.props
    return (
      <section className={cx('BlogListRoute', style.listRoute)}>
        <ul className={style.list}>
          {postList.map(post =>
            <li key={post.filename}
              className={style.listItem}
              onClick={() => this.handlePostClick(post)}>
              <h3>{post.meta.title}</h3>
              <p className={style.sub}>
                <time>{post.meta.date}</time>
              </p>
              <div className={style.tagList}>
                {intersperse(', ')(post.meta.tags.map((tag, i) =>
                  <span key={i} className={style.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          )}
        </ul>
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
