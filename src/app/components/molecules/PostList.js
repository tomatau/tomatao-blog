import { Link } from 'react-router'
import { connect } from 'react-redux'
import Post from 'app/components/atoms/Post'
import { blogSelectors } from 'app/modules/blog'
import blogPaths from 'app/modules/blog/blog.paths'
import type { PostFile } from 'types/post.types'
import style from './PostList.module.scss'

@connect(state => ({
  postList: blogSelectors.getSortedPostList(state),
}))
class PostList extends React.Component {
  props: {
    postList: Array<PostFile>,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
    return nextProps.postList.length !== this.props.postList.length
  }

  render() {
    const { postList } = this.props
    return (
      <ul className={style.list}>
        {postList.map(post =>
          <li key={post.filename} className={style.listItem}>
            <Link to={blogPaths.postRoute(post.filename)}>
              <Post post={post} />
            </Link>
          </li>
        )}
      </ul>
    )
  }
}

export default PostList
