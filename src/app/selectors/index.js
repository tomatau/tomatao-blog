import { createSelector } from 'reselect'
import { get } from 'app/utils'

export const flashMessages = get('flash.messages')

export const nextFlashMessage = createSelector(
  flashMessages,
  (messages=[]) => messages.length > 0 && messages[0]
)

export const getSelectedPostIdx = get('blog.selectedPost')

export const getPostList =  get('blog.postList')

export const hasSelectedPost = createSelector(
  getSelectedPostIdx,
  (selectedPost) => selectedPost !== -1
)

export const getSelectedPost = createSelector(
  getSelectedPostIdx, getPostList,
  (idx, postList) => postList[idx]
)
