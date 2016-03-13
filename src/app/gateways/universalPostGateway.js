import { hasWindow } from 'app/utils'
import { SERVER } from 'config/paths'

export default hasWindow
  ? require(`./httpPostGateway`)
  : require(`${SERVER}/gateways/fsPostGateway`)
