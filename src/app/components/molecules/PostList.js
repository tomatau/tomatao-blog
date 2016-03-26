import { connect } from 'react-redux'
import Post from 'app/components/atoms/Post'
import { blogActions, blogSelectors } from 'app/modules/blog'
import type { PostFile } from 'types/post.types'
import style from './PostList.module.scss'

@connect(state => ({
  postList: blogSelectors.getPostList(state),
}), { selectPost: blogActions.fetchPost })
class PostList extends React.Component {
  props: {
    postList: Array<PostFile>,
    selectPost: Function,
  };

  static defaltProps = {
    selectPost: () => null,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
    return nextProps.postList.length !== this.props.postList.length
  }

  handlePostClick(post: PostFile) {
    this.props.selectPost(post.filename)
  }

  render() {
    const { postList } = this.props
    return (
      <ul className={style.list}>
        {postList.map(post =>
          <li key={post.filename} className={style.listItem}>
            <Post
              post={post}
              onClickPost={::this.handlePostClick}
            />
          </li>
        )}
      </ul>
    )
  }
}

export default PostList
