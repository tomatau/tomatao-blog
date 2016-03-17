import { connect } from 'react-redux'
import { flashActions, flashSelectors } from 'app/modules/flash'
import { Bem } from 'app/utils'
import styles from './FlashMessages.module.scss'

const { PropTypes } = React

export const Msg = ({ msg, ...props }) =>
  <span {...props}
    {...Msg.classes(null, msg.type)}>
    {msg.message}
    &nbsp;
    <strong className={styles.close}>x</strong>
  </span>

Msg.classes = Bem(styles.msg)

Msg.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.oneOf([ 'error', 'good', 'info' ]),
    message: PropTypes.string,
  }).isRequired,
}

@connect(state => ({
  messages: flashSelectors.flashMessages(state),
}), { removeMessage: flashActions.removeMessage })
class FlashMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func,
  };

  static defaultProps = {
    messages: [],
    removeMessage: ()=>null,
  };

  render() {
    const { messages } = this.props
    return (
      <div className='FlashMessages'>
        {messages.map(msg =>
          <Msg key={msg.id}
            msg={msg}
            onClick={() => this.clickMessage(msg)}
          />
        )}
      </div>
    )
  }

  clickMessage(msg) {
    this.props.removeMessage(msg.id)
  }
}

export default FlashMessages
