---
Title:  Node hook filename
Author: Thomas `tomatao` Hudspith-Tatham
Tags:   open-source, testing, universal
Date:   April 23, 2016
---

# Node Hook Filename
## Importing assets is cool

If you've ever imported an asset into your node based browser project - you'll know if feels super cool. Webpack is one great bundler that makes this possible.

```jsx
import src from './brand.jpg'

const Logo = (props) => <img {...props} src={src} />

// throw a party! ♪┏(^.^)┛┗(^.^)┓┗(^.^)┛┏(^.^)┓ ♪
```

Due to configuration (not shown). The above code is importing a path string to an asset which is used when rendering a logo. This works great inside a webpack bundle, but we don't necessarily want to bundle our tests! So how can we get it working in tests and better yet, write meaning full assettions?

# Webpack-Isomorphic-Tools, not here

There are a few solutions to this, one big one is webpack-isomorphic-tools which can be used to map asset files to configurable values. But this relies on an initial webpack build generating a JSON file, so doesn't really work fot testing.

# Node-Hook-Filename

This is a simple module that intercepts node's require calls. Given an array of strings, it will test each `require` against those strings and when a match is found, the result of requiring will be the filename.

```js
require('node-hook-filename')(['foo'])

const foo = require('path/to/foo')
// foo will now be a string of `something/foo`,
// regardless of what exists in the foo file.
const bar = require('path/to/bar')
// bar is uneffected and behaves as normal
```

Above is a simple example of how we can alter require statements and prevent node from reading source files. We can use this!  If we put the `node-hook-filename` call only in our test environment setup it can be used to assist with assertions against assets!

So for CSS-modules, the hook chaning the export to a string isn't enough, we need an object with some classNames!


## An example

So, say we have the same source file as the start of this post, a simple block that makes use of some SCSS modules for classNames.

```js
import src from './brand.jpg'

const Logo = (props) => <img {...props} src={src} />
```

For testing this, we don't want to use webpack, we just want to test that the correct image is used for the logo!

```jsx
// test.setup.js
// hook out all the .jpg imports
require('node-hook-filename')([ '.jpg' ])

// Logo.spec.js
import brandImg from './brand.jpg'
// brandImg === './brand.jpg'

it('sets the img.src as the brand image', () => {
  expect(shallow(<Logo />)).to.have.prop('src', brandImg)
})
```

By using a node hook for an extension, we have stopped the test code from trying to read an image (which would make it barf). And, we have still got a value we can test against.

## More Complex Examples

For CSS-Modules, a string value of the filename isn't enough -- we need an object containing keys that match the appropriate class names. For this, we can provide an implementation for generating the return value.

This is a great excuse to play with proxies! We can proxy the getter of an object to a useful value, such as an string containing the name of the key being called!

##### NB: Proxies don't exist in node yet... but they're coming in Node version 6! Right now you will have to run these tests in a browser based test runner.

Here's what that might look like:

```js
require('node-hook-filename')([ '.module.scss' ], (filename) => {
  const styleObject = { }
  return new Proxy(styleObject, {
    get(target, key) {
      return `${filename}__${key}`
    },
  })
})
```

Here, we've created a hook for files with an extension `.module.scss`. The hooked out require calls will now return an empty object, `styleObject`, wrapped in a proxy. This proxy has defined a custom getter that will now return a string made up of the filename and the key being called on the object.

```js
import styles from './anything.module.scss'

styles.foo        // "./anything.module.scss__foo"
styles.className  // "./anything.module.scss__className"
styles.anything   // "./anything.module.scss__anything"
```

So now, no matter what property is accessed on the object, we're using a proxy to modify the value to something we can easily test!

Stay tuned for more posts!

- tomatao
