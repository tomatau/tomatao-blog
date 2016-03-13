/* @flow */
import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { get } from 'app/utils'
import { fetchPosts } from 'app/actions/blog.actions'
import type { PostFile } from 'types/Post.types'

const getPosts = get('blog.posts')

/*::`*/
@provideHooks({
  prefetch: ({ dispatch }) => dispatch(fetchPosts()).payload.promise,
})
@connect(state => ({
  posts: getPosts(state),
}))
/*::`*/
class BlogListRoute extends React.Component {
  props: {
    posts: Array<PostFile>
  };

  render() {
    const { posts } = this.props
    return (
      <section className='BlogListRoute'>
        {posts.map(post =>
          <div key={post.filename}>
            <h3>{post.title}</h3>
          </div>
        )}
      </section>
    )
  }
}

export default BlogListRoute
