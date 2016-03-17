export const POSTS_ENDPOINT = '/posts'
import { API_ENDPOINT } from 'config/paths'
const base = Symbol('base')

/*
  BlogEndpoints

  class to make an endpoint builder for the blog module
  this can be used for building koaRouter style paths
  as well as creating endpoint URLs for the same paths
*/
export default class BlogEndpoints {
  constructor({ useBaseUrl }={}) {
    this[base] = useBaseUrl ? API_ENDPOINT : ''
  }

  postList() {
    return `${this[base]}${POSTS_ENDPOINT}`
  }

  post(filename) {
    return `${this[base]}${POSTS_ENDPOINT}/${filename || ':filename'}`
  }
}
