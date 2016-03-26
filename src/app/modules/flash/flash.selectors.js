import { createSelector } from 'reselect'
import { grab } from 'app/utils'

export const flashMessages = grab('flash.messages')

export const nextFlashMessage = createSelector(
  [ flashMessages ],
  (messages=[]) => messages.length > 0 && messages[0]
)
