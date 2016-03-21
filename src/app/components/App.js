import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
// example s?css module import
import style from './App.module.scss'
// example s?css import (no module)
import './App.scss'

const log = {
  app: debug('App.es'),
}

const metaData = {
  title: 'Tomatao Blog',
  description: 'Tomatao blog',
  meta: {
    charSet: 'utf-8',
  },
}

class App extends React.Component {
  render() {
    const { children } = this.props
    log.app('render')
    return (
      <div className={style.app}>
        <DocumentMeta {...metaData} />
        <HeadNavigation />
        <FlashMessages />
        <main className={style.content}>
          {children}
        </main>
      </div>
    )
  }
}

export default App
