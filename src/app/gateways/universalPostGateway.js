import { hasWindow } from 'app/utils'

export default hasWindow
  ? require(`./httpPostGateway`)
  : require(`./fsPostGateway`)
