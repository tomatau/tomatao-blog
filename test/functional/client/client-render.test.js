import { mount } from 'enzyme'
import { Main } from 'app/main'
import { history } from 'app/services/history'
import App from 'app/components/App'

describe('Client Render', function() {
  before(()=> {
    this.server = sinon.fakeServer.create()
  })

  after(()=> {
    this.server.restore()
  })

  beforeEach(()=> {
    this.wrapper = mount(Main)
    history.push('/')
  })

  afterEach(()=> {
    this.wrapper.unmount()
  })

  it('should render the app', ()=> {
    expect(this.wrapper.find(App)).to.have.length(1)
  })

  it('should set the page title', ()=> {
    expect(document.title).to.eql('Tomatao Blog')
  })

  it('should set the meta description and chartset', ()=> {
    const metaCharset = document.querySelector('meta[charset]')
    expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
    const metaDesc = document.querySelector('meta[name=description]')
    expect(metaDesc.getAttribute('content')).to.contain('Tomatao blog')
  })

  describe('Routes', ()=> {
    describe('/oops', ()=> {
      it('should render the OopsRoute after navigating to /oops', ()=> {
        expect(this.wrapper.find('.OopsRoute')).to.have.length(0)
        history.push('/oops')
        expect(this.wrapper.find('.OopsRoute')).to.have.length(1)
      })
    })

    describe('404', ()=> {
      it('should render the 404 route when no match found', ()=> {
        history.push('/no-match-found')
        expect(this.wrapper.find('.NotFoundRoute')).to.have.length(1)
      })
    })

    describe('/', ()=> {
      const posts = [
        { filename: 'test.md', title: 'Test' },
        { filename: 'another.md', title: 'Another' },
      ]
      before(()=> {
        this.server.respondWith(
          /\/api\/posts/, JSON.stringify(posts)
        )
        this.server.respondImmediately = true
      })

      it('should render the BlogListRoute route', ()=> {
        expect(this.wrapper.find('.BlogListRoute')).to.have.length(1)
      })

      it('should render a list of blog posts', ()=> {
        posts.forEach(post => {
          expect(
            this.wrapper.find('.BlogListRoute')
          ).to.contain.text(post.title)
        })
      })
    })
  })
})
