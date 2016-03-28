---
Title:  Server and CSS Hot Updates
Author: Thomas `tomatao` Hudspith-Tatham
Tags:   universal, react, css
Date:   March 28, 2016
---

# Server and CSS Hot Updates

#### **PRE-REQUISITES:** This article assumes you know a fair bit about universal react applications already. You're familiar with Webpack and ES6.

Just a few years back, and the web developer's best friend was **live page refreshes**, a tool that would refresh the browser for you as you coded! Because pressing refresh just wasn't acceptable... But these days, we've hit a whole new level, hot updates.

On the client, Webpack, React and Babel have paved the way with hot update servers, sockets, transforms and proxies -- giving developers a great experience. But 2 parts of our stack often got left out, the server and styles.

## Hot Styles

As styles often live in monolith static CSS files, hot updates don't work for free. There are two solutions here, **in-line styles** or [CSS modules](https://github.com/css-modules/css-modules).

**In-line styles** are the simple solution, they're just JavaScript objects and work like any other hot update. In combination with Babel-Transform, no changes are needed to a regular hot configuration.

```js
// styles.js
export default {
  everything: {
    float: 'left',
    border: '5px solid brown',
  },
}

// some js file
import myStyles from './styles.js'
```

They're not perfect though: vendor prefixes, cascades, third party component libraries, fury from traditionalist developers and ugly functions for hover functionality are some of the known flaws.

**CSS-modules** relieve us of all of these flaws making them quite special. The first step to enable CSS modules is to tell your Webpack [CSS loader](https://github.com/webpack/css-loader) to use modules, like so:

```js
// webpack config
module: {
  loaders: [ {
    test: /\.css$/,
    loaders: [
      'style',
      'css?modules', // set modules here!
    ],
  } ]
}
```

Done!

Now you can benefit from both the traditional power of CSS with the new shiny hot reloading of styles!

```js
// styles.css
.everything {
  float: left;
  border: 5px solid brown;
}

// some js file
import style from './styles.css'
```

#### **IMPORTANT:** To keep hot loading the styles, turn off ExtractTextPlugin for development!!

When optimising your styles, it's a good practice to use Webpack's [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to combine the CSS modules back into one style-sheet. However, this brings us back to the original problem -- a single CSS file. So simply, turn it off for development! Ta-da!

## Hot Server

Now the meat.

The phrase 'hot' update is a little misleading for the server but it gets the point across: we want updates without restarting our server!

**restart the server?**

There are great tools out there such as [Nodemon](https://github.com/remy/nodemon) which will automatically restart your node server after each change. But, in a universal app this can be quite a painful process, especially if you're re-bundling your JS each time! So that just won't do!

**clusters?**

One popular solution to '<em>hot</em>' reloading the server is to use node's **child_process**. Here, you can start one main process that you can reference  and then start a new *child process* of your server application that gets ditched and replaced every time a change happens. This gets taken steps further with modules such as [piping](https://github.com/mdlawson/piping) that can control this whole process for you by making use of the cluster API. It's as simple as:

```js
if (require("piping")()) {
  // application logic here
  app.listen(PORT);
}
```

I'm not happy with this though... it feels like a heavy solution and I aim for something more simple! Also, it doesn't play so clean when working in combination with all the possible client side hot updates implementations.

### Just delete the cache.

There is... another solution :)

When any `require()` call is made, node will store the module in its cache, so it can be required again without executing the module code twice. We can take advantage of this to get hot updates... simply delete the cache! This forces node to reach into our file system again and pick up the modified changes! Here's how to do it.

Step 1: Watch the server files, [Chokidar](https://github.com/paulmillr/chokidar) is good for this.

```js
// hot.js
const watcher = chokidar.watch('/path/to/server/files')
```

Step 2: Delete the server cache when files change.

```js
// hot.js
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach((id) => {
      // delete cache of file when it matches
      // a regex of our server directory
      if (/\/path\/to\/server\/files\//.test(id)) {
        delete require.cache[id]
      }
    })
  })
})
```

Simples! Although, we're not done yet. We also want to delete our server cache whenever the client hot updates. This allows us to have an up-to-date server side render of our client app.

```js
// hot.js
// setup the client hot updates
const compiler = webpack(webpackDevelopmentConfig)
app.use(require('some-webpack-hot-middleware')(compiler))
// delete all the cache on a new compile!
compiler.plugin('done', () => {
  Object.keys(require.cache).forEach((id) => {
    // delete the client cache for the server
    if (/\/path\/to\/client\/files\//.test(id)) {
      delete require.cache[id]
    }
    if (/\/path\/to\/server\/files\//.test(id)) {
      delete require.cache[id]
    }
  })
  // reset asset file mappings 
  // generated during Webpack compile
  isomorphicTools.refresh()
})
```

**Make sure that the code performing the hot update doesn't live in the same directory as the server code you wish to hot update.** Also, you can see I'm calling `isomorphicTools.refresh()`; this is using [webpack-isomorphic-tools](https://www.npmjs.com/package/webpack-isomorphic-tools). 

## Gotchas

### Server Asset Requires

If you change your client code, it could involve requiring a new SCSS file or image, or even just changing the file-name hash generated by the build such as `main.[hash].js`. For the new server hot update to stay in sync, it will need to know about the newly generated asset file-names. **Webpack-isomorphic-tools** provides a refresh function just for this.

The refresh call will replace the assets JSON file that the server is using when it needs to populate a URL for the server side render.

### Reference to the App

Your server app will be listening on a certain port, so you need to keep the reference to the same app object to handle these requests. The way to get around this is to move the listening app outside the scope of the hot updates. You shouldn't ever need to replace the app instance. You can even have a separate app instance that will hot update.

```js
// hot.js
// 1. Create the app instance 
const app = newServer()

// 2. client hot updates
app.use(require('koa-webpack-hot-middleware')(compiler))

// 3. add your app middleware here
isomorphicTools.server('/src/root/', () => {
  app.use(function(req, res){
    require('/path/to/server/files')(req, res)
  })
})

// 4. Server side hot reload logic
const watcher = chokidar.watch(/\/path\/to\/server\/files\//)
watcher.on('ready', () => {
  // server side hot reload as described above
})

// 5. start the app listening
app.listen(PORT)
```

In step 3, we're requiring in the code that will be the subject of hot updates.This way the main app will never change its instance, so when a request comes in, the `.use` call in step 3 will call its handler and make a fresh require call. All the server side hot update logic will live under that said path, and will pick up the changes we've made before deleting the cache.

An important point to note is that the require call is being made inside the use handler function, as we want it to be a fresh require for the request.

### Re-applying middleware

One approach for the code that lives inside the */path/to/server/files*, is to create a new app that gets thrown away for each update.

```js
// path/to/server/files/index.js
const app = newServer()

// add middleware
// api router
// server side render

export default app
```

This will allow you to get hot updates on your core server logic -- but it's a little overkill again. The majority of time, you will only really need hot updates on your routes and render logic. Another problem here is session and cookie middleware; it doesn't play so well in a child app that's mounted into a parent app.

I prefer to just expose a router here instead. Here's what my step 3 looks like:

```js
// hot.js
// 1. Create the app instance 
const app = newServer()

// 2. client hot updates
app.use(require('koa-webpack-hot-middleware')(compiler))

// 3. add your app middleware here
// instead of requiring a whole new app, just mount some routes
isomorphicTools.server('/src/root/', () => {
  app.use(function *() {
    const { rootRouter, setRoutes } = require('/path/to/server/files')
    setRoutes(isomorphicTools.assets())
    yield rootRouter.routes()
  })
})

// 4. Server side hot reload logic
const watcher = chokidar.watch(/\/path\/to\/server\/files\//)
watcher.on('ready', () => {
  // server side hot reload as described above
})

// 5. start the app listening
app.listen(PORT)
```

The only change is step 3, instead of requiring in a whole new app, I'm just requiring in a router. I also keep a separate function that will give the new assets generated by Webpack to the router.

**Be careful**

The above solution works fairly well, but one gotcha is that the call to setRoutes is being invoked on every request, and you may end up reapplying the same routes to the router.

To get around this, you can clear the route middleware stack. Don't do this in production, but don't hot reload in production either!

```js
export const rootRouter = Router()

export function setRoutes(assets) {
  // reset the route middleware stack!
  rootRouter.stack.length = 0

  // create a redux store
  // set a route context using client routing
  // render the route context from the server
  const renderApp = compose(
    setStore,
    setRouteContext(routes.makeRoutes),
    renderRouteContext(assets)
  )

  // add API routes
  // render the react app for error or any other page
  rootRouter
    .use(apiRouter.routes())
    .get('error', '/oops', renderApp)
    .get('react', '/(.*)', renderApp)
}
```

And that's all there is to it! For a complete working example using Babel and [Koa](https://github.com/koajs/), checkout [breko-hub](https://github.com/tomatau/breko-hub). It has hot updates all-round! Even this blog was built using it :)

Stay tuned for more posts!

- tomatao





