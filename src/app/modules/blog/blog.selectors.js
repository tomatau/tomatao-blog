import { createSelector } from 'reselect'
import { pipe, find, propEq } from 'ramda'
import { get } from 'app/utils'

const findPostByFilename = pipe(propEq('filename'), find)

export const getSelectedPostName = get('blog.selectedPost')

export const getPostList =  get('blog.postList')

export const hasSelectedPost = createSelector(
  [ getSelectedPostName ],
  (selectedPostName) => selectedPostName !== null && selectedPostName !== ''
)

export const getSelectedPost = createSelector(
  [ getSelectedPostName, getPostList ],
  (selectedPostName, postList) => findPostByFilename(selectedPostName)(postList)
)
