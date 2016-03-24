/* @flow */
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { get } from 'app/utils'
import type { PostFile } from 'types/post.types'
import style from './BlogListRoute.module.scss'
// import hljs from 'highlight.js'
import Prism from 'prismjs'

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(blogActions.fetchPostList()).payload.promise,
})
@connect(state => ({
  postList: blogSelectors.getPostList(state),
  hasSelectedPost: blogSelectors.hasSelectedPost(state),
  selectedPost: blogSelectors.getSelectedPost(state),
}), { fetchPost: blogActions.fetchPost })
/*::`*/
class BlogListRoute extends React.Component {
  props: {
    postList: Array<PostFile>,
    selectedPost?: PostFile,
    fetchPost: Function,
    hasSelectedPost: boolean,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
    const getFilename = get('selectedPost.filename')
    return (getFilename(nextProps) !== getFilename(this.props))
      || nextProps.postList.length !== this.props.postList.length
  }

  componentDidUpdate() {
    Prism.highlightAll()
    // for (let node of document.querySelectorAll('code')) {
    //   hljs.highlightBlock(node)
    // }
  }

  handlePostClick(post:PostFile) {
    this.props.fetchPost(post.filename)
  }

  render() {
    const { postList, selectedPost, hasSelectedPost } = this.props
    return (
      <section className='BlogListRoute'>
        <ul>
          {postList.map(post =>
            <li key={post.filename}
              className={style.listItem}
              onClick={() => this.handlePostClick(post)}>
              <h3>{post.title}</h3>
            </li>
          )}
        </ul>
        {!hasSelectedPost ? null :
          <div
            dangerouslySetInnerHTML={{
              __html: get('html')(selectedPost),
            }}
          />}
      </section>
    )
  }
}

export default BlogListRoute
