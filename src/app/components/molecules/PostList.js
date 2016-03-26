import { connect } from 'react-redux'
import Post from 'app/components/atoms/Post'
import { blogSelectors } from 'app/modules/blog'
import { history } from 'app/services/history'
import type { PostFile } from 'types/post.types'
import style from './PostList.module.scss'

@connect(state => ({
  postList: blogSelectors.getSortedPostList(state),
  pushRoute: history.push,
}))
class PostList extends React.Component {
  props: {
    postList: Array<PostFile>,
    pushRoute: Function,
  };

  shouldComponentUpdate(nextProps:Object): boolean {
    return nextProps.postList.length !== this.props.postList.length
  }

  handlePostClick(post: PostFile) {
    this.props.pushRoute(`/post/${post.filename}`)
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
