import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
import AboutMe from 'app/components/molecules/AboutMe'
import style from './App.module.scss'
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
        <div className={style.wrapper}>
          <main className={style.content}>
            {children}
          </main>
          <aside className={style.aside}>
            <AboutMe />
          </aside>
        </div>
      </div>
    )
  }
}

export default App
