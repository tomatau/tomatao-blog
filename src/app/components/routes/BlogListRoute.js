/* @flow */
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { blogActions, blogSelectors } from 'app/modules/blog'
import { get } from 'app/utils'
import type { PostFile } from 'types/post.types'

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
              __html: get('html')(selectedPost),
            }}
          />}
      </section>
    )
  }
}

export default BlogListRoute
