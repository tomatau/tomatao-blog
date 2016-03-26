import { grab } from './grab'

describe('Grab', function() {
  beforeEach(()=> {
    this.object = {
      foo: 'bar',
      bar: {
        deeply: {
          nested: 'value',
          another: 1,
        },
      },
    }
  })

  it('should return undefined when property doesnt exist', ()=> {
    expect(grab('missing')(this.object)).to.eql(undefined)
  })

  it('should grab a property from an object', ()=> {
    expect(grab('foo')(this.object)).to.eql(this.object.foo)
  })

  it('should grab a deep property from an object by array syntax', ()=> {
    expect(
      grab([ 'bar', 'deeply' ])(this.object)
    ).to.eql(this.object.bar.deeply)
  })

  it('should grab a deep property from an object by dot syntax', ()=> {
    expect(
      grab('bar.deeply.nested')(this.object)
    ).to.eql(this.object.bar.deeply.nested)
  })
})
