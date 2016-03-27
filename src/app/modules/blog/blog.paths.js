import { hasWindow } from 'app/utils'
import { API_ENDPOINT } from 'config/paths'
export const POSTS_ENDPOINT = '/posts'
const baseUrlSymbol = Symbol('baseUrl')
const baseRouteSymbol = Symbol('baseRoute')

/*
  BlogPaths

  class to make an endpoint builder for the blog module
  this can be used for building koaRouter style paths
  as well as creating endpoint URLs for the same paths
*/
export class BlogPaths {
  constructor({ baseUrl, baseRoute }={}) {
    this[baseUrlSymbol] = baseUrl || ''
    this[baseRouteSymbol] = baseRoute || ''
  }

  postListUrl() {
    return `${this[baseUrlSymbol]}${POSTS_ENDPOINT}`
  }

  postUrl(filename) {
    return `${this[baseUrlSymbol]}${POSTS_ENDPOINT}/${filename || ':filename'}`
  }

  postRoute(filename) {
    return `${this[baseRouteSymbol]}/post/${filename || ':filename'}`
  }
}

// prefix is already set on server side route setup so no need for endpoint
const blogPaths = new BlogPaths({
  baseUrl: hasWindow ? API_ENDPOINT : null,
})

export default blogPaths
