/* @flow */
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { fetchPostList, fetchPost } from 'app/actions/blog.actions'
import type { PostFile } from 'types/Post.types'
import * as selectors from 'app/selectors'
import { get } from 'app/utils'

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(fetchPostList()).payload.promise,
})
@connect(state => ({
  postList: selectors.getPostList(state),
  hasSelectedPost: selectors.hasSelectedPost(state),
  selectedPost: selectors.getSelectedPost(state),
}), { fetchPost })
/*::`*/
class BlogListRoute extends React.Component {
  props: {
    postList: Array<PostFile>,
    selectedPost?: PostFile,
    fetchPost: Function,
    hasSelectedPost: boolean,
  };

  handlePostClick(post:PostFile) {
    this.props.fetchPost(post.filename)
  }

  render() {
    const { postList, selectedPost, hasSelectedPost } = this.props
    return (
      <section className='BlogListRoute'>
        {postList.map(post =>
          <div key={post.filename} onClick={() => this.handlePostClick(post)}>
            <h3>{post.title}</h3>
          </div>
        )}
        {!hasSelectedPost ? null :
          <div
            dangerouslySetInnerHTML={{
              __html: get(selectedPost, 'html'),
            }}
          />}
      </section>
    )
  }
}

export default BlogListRoute
