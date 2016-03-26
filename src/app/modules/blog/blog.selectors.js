import { createSelector } from 'reselect'
import { pipe, find, propEq } from 'ramda'
import marked from 'marked'
import { grab } from 'app/utils'

const findPostByFilename = pipe(propEq('filename'), find)

export const getSelectedPostName = grab('blog.selectedPost')

export const getPostList =  grab('blog.postList')

export const hasSelectedPost = createSelector(
  [ getSelectedPostName ],
  (selectedPostName) => selectedPostName !== null && selectedPostName !== ''
)

export const getSelectedPost = createSelector(
  [ getSelectedPostName, getPostList ],
  (selectedPostName, postList) => findPostByFilename(selectedPostName)(postList)
)

export const getSelectedHtml = createSelector(
  [ hasSelectedPost, getSelectedPost ],
  (hasSelectedPost, selectedPost) =>
    hasSelectedPost ? marked(grab('markdown')(selectedPost)) : ''
)
