import { filter } from 'ramda'
import { typeToReducer, grab } from 'app/utils'
import * as constants from './flash.constants'

const getFlashId = grab([ 'payload', 'flash_id' ])
const initialState = { messages: [] }

export const flashReducers = typeToReducer({

  [ constants.REMOVE_MESSAGE ]: (state, action) => ({
    ...state,
    messages: filter(
      flash => flash.id !== getFlashId(action),
      state.messages
    ),
  }),

  [ constants.ADD_MESSAGE ]: (state, action) => ({
    ...state,
    messages: [ ...state.messages, action.payload ],
  }),

}, initialState)
