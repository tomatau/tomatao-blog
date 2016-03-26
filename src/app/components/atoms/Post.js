import { intersperse, isEmpty } from 'ramda'
import style from './Post.module.scss'
import { formatDate } from 'app/utils'
import type { PostFile } from 'types/post.types'

const Tag = ({ children, ...props }) =>
  <span className={style.tag} {...props}>
    {children}
  </span>

class Post extends React.Component {
  props: {
    post: PostFile,
    onClickPost?: Function,
  };

  static defaultProps = {
    onClickPost: () => null,
  };

  mapTags(tags) {
    return intersperse(', ', tags).map((tag, i) =>
      <Tag key={i}>{tag}</Tag>
    )
  }

  renderTagList() {
    const { post } = this.props
    return isEmpty(post.meta.tags) ? null : (
      <div className={style.tagList}>
        {this.mapTags(post.meta.tags)}
      </div>
    )
  }

  handleClickPost() {
    const { post, onClickPost } = this.props
    onClickPost(post)
  }

  render() {
    const { post } = this.props
    return (
      <div
        className={style.post}
        onClick={::this.handleClickPost}>
        <h3>{post.meta.title}</h3>
        <p className={style.sub}>
          <time>{formatDate(post.meta.date, 'ddd Do MMMM, YYYY')}</time>
        </p>
        {this.renderTagList()}
      </div>
    )
  }
}

export default Post
