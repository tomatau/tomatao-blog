import uuid from 'uuid'
import * as constants from './flash.constants'

const makeFlash = (message, type='info') => ({
  type,
  message,
  id: uuid.v1(),
})

export const removeMessage = (flash_id) => ({
  type: constants.REMOVE_MESSAGE,
  payload: { flash_id },
})

export const addMessage = (message, type='info') => ({
  type: constants.ADD_MESSAGE,
  payload: makeFlash(message, type),
})
