import style from './Spinner.module.scss'

const Spinner = (props) => (
  <div className={style.spinner} {...props}>
    <div className={style.bounce1}></div>
    <div className={style.bounce2}></div>
    <div className={style.bounce3}></div>
  </div>
)

export default Spinner
