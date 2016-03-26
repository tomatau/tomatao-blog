import { IndexLink } from 'react-router'
import logoPath from 'assets/tomatao-logo-02.svg'
import styles from './HeadNavigation.module.scss'

// Putting this inside a container will break activeClassName
// unless you also subscribe to changes to routing state or context
export default class HeadNavigation extends React.Component {
  render() {
    const { ...props } = this.props
    return (
      <nav className={styles.nav} {...props}>
        <div className={styles.inner}>
          <IndexLink to='/'
            className={styles.homeLink}
            activeClassName={styles.active}>
            <img src={logoPath} alt='Image Home Link' />
            <h2 className={styles.header}>tomatao blog</h2>
          </IndexLink>
        </div>
      </nav>
    )
  }
}
