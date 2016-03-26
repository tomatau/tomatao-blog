import { createSelector } from 'reselect'
import { pipe, find, propEq, reverse, lensPath, over, sortBy } from 'ramda'
import marked from 'marked'
import { grab } from 'app/utils'

const findPostByFilename = pipe(propEq('filename'), find)
const setPostMetaDate = over(
  lensPath([ 'meta', 'date' ]), date => new Date(date),
)

export const getPostDate = grab('meta.date')
export const getSelectedPostName = grab('blog.selectedPost')
export const getPostList = grab('blog.postList')

export const getParsedPostList = createSelector(
  [ getPostList ], (postList) => postList.map(setPostMetaDate)
)

export const getSortedPostList = createSelector(
  [ getParsedPostList ], (postList) =>
    pipe(sortBy(getPostDate), reverse)(postList)
)

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
