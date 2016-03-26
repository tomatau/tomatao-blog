import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
import App from './App'
import { shallow } from 'enzyme'
import styles from './App.module.scss'

describe('App Component', function() {
  beforeEach(()=> {
    this.tree = shallow(<App />)
  })

  it('renders a div tag with app className', ()=> {
    const div = this.tree.find('div')
    expect(div).to.have.length(1)
    expect(div.hasClass(styles.app)).to.eql(true)
  })

  it('renders a document meta', ()=> {
    expect(this.tree.find(DocumentMeta)).to.have.length(1)
  })

  it('renders a head navigation component', ()=> {
    expect(this.tree.find(HeadNavigation)).to.have.length(1)
  })

  it('renders a flash messages component', ()=> {
    expect(this.tree.find(FlashMessages)).to.have.length(1)
  })

  it('renders the children in a main', ()=> {
    const children = <p><span>test</span><span>child</span></p>
    this.tree = shallow(<App>{children}</App>)
    const childTree = shallow(children)
    const content = this.tree.find(`.${styles.content}`)
    expect(content.type()).to.eql('main')
    expect(content.find('p').html()).to.eql(childTree.html())
  })
})
