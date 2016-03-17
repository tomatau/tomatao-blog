import { curry, view, lensPath } from 'ramda'
import { isArray } from 'lodash'

// get :: Array<string> | string -> Object -> any
export const get = curry((path, source) =>
  view(lensPath(isArray(path) ? path : path.split('.')))(source)
)
