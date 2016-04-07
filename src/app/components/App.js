import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
import AboutMe from 'app/components/molecules/AboutMe'
import style from './App.module.scss'
import cx from 'classnames'
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
  state = {
    hidden: false,
  };

  toggleHide() {
    this.setState(state => ({
      hidden: !state.hidden,
    }))
  }

  render() {
    const { children } = this.props
    const { hidden } = this.state
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
          <aside className={cx(style.aside, {
            [style.asideHide]: hidden,
          })}>
            <AboutMe className={cx(style.aboutMe, {
              [style.aboutMeHide]: hidden,
            })} />
            <div className={style.hide} onClick={::this.toggleHide}>
              {hidden ? 'show' : 'hide'}
            </div>
          </aside>
        </div>
      </div>
    )
  }
}

export default App
