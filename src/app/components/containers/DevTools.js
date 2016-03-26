import { createDevTools } from 'redux-devtools'
import { grab } from 'app/utils'
import FilterMonitor from 'redux-devtools-filter-actions'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'>
    <FilterMonitor blacklist={[ 'EFFECT_' ]}>
      <LogMonitor
        select={state => grab('blog')(state)}
        expandActionRoot={false}
        expandStateRoot={false}
      />
    </FilterMonitor>
  </DockMonitor>
)
