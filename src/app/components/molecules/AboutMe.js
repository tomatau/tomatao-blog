import avatarPath from 'assets/avatar.jpeg'
import style from './AboutMe.module.scss'

const AboutMe = (props) => (
  <div className={style.meContainer} {...props}>
    <div className={style.me}>
      <p>
        <img src={avatarPath} className={style.avatar} alt='tomatao' width='30' />
        Hello, my name is Tom and I'm a web developer!
        I usually go by the alias <em>tomatao</em> and like to write modern JavaScript.
      </p>
      <p>Also, I often say words like "<a href='http://geofflawton.com/'>Permaculture</a>!".</p>
      <p>View my code or say hi! :)</p>
      <ul className={style.findMe}>
        <li>
          <a href='https://github.com/tomatau'>
            <i className='icon-github-circled' />
            <span>github</span>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/thomasht'>
            <i className='icon-linkedin-squared' />
            <span>linkedin</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default AboutMe
