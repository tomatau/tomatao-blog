import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
// example image import
import avatarPath from 'assets/avatar.jpeg'
// example s?css module import
import style from './App.module.scss'
// example s?css import (no module)
import './App.css'

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
      <main className={style.app}>
        <DocumentMeta {...metaData} />
        <HeadNavigation />
        <FlashMessages />
        <img src={avatarPath} alt='me' width='70' />
        <h1>Breko Hub</h1>
        <div className={style.content}>
          {children}
        </div>
      </main>
    )
  }
}

export default App
