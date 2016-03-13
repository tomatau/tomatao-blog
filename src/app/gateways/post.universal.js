import { hasWindow } from 'app/utils'
import { SERVER } from 'config/paths'

export default hasWindow
  ? require(`./post.browser`)
  : require(`${SERVER}/gateways/post.server`)
