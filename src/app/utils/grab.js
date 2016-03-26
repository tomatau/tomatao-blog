import { curry, view, lensPath } from 'ramda'
import { isArray } from 'lodash'

// grab :: Array<string> | string -> Object -> any
export const grab = curry((path, source) =>
  view(lensPath(isArray(path) ? path : path.split('.')))(source)
)
