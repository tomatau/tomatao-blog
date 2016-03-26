import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-scss'

// add @ to operators
Prism.languages.jsx.operator = /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|@|%/

export const highlight = Prism
