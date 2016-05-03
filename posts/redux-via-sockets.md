---
Title:  Redux Via Sockets!
Author: Thomas `tomatao` Hudspith-Tatham
Tags:   open-source, redux, universal
Date:   May 2, 2016
---

# Redux Via Sockets!

[Redux-via](https://www.npmjs.com/package/redux-via) is a fantastic tool for isomorphic redux apps. [Redux-via-socket](https://github.com/rstuven/redux-via-socket.io) provides the next level on-top of redux-via for integrating with sockets, seamlessly!

Just a few lines, you can dispatch any action to multiple clients in real time... Pretty cool!

## But how!?

I'm not going to explain all the details around setting up a websocket connection for isomorphic apps. You can find an example of this in [breko-hub](https://github.com/tomatau/breko-hub). Let's just look at the redux integration.

First we need to set up a redux store on the server. This isn't the same as a store that will be created and thrown away for each request -- it will live beside each request.

### A socket server

```js
import Socket from 'socket.io'
import http from 'http'

const server = http.createServer()
const socketServer = Socket(server)

socketServer.on('connection', socket => {
  console.log('New connection made with id', socket.id)
  socket.on('disconnect', ()=> {
    console.log('Client id disconnected', socket.id)
  })
})

server.listen(process.env.PORT, () => {
  console.log('Server started and listening...')
})
```

That'll do it, using a simple http server for the socket to integrate with. We can connect this http server to express or koa or whatever, google it.

### Clientside connecting

Not we can hook our client up to this server when the app loads on a browser.

```js
import io from 'socket.io-client'

// connects to current host and port
const clientSocket = io({
  autoConnect: false, // prevent the auto `open()` call
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
})

clientSocket.on('connect', () => {
  console.log('Client connected to clientSocket')
})

clientSocket.open()
```

And with those two snippets your socket connection is live using some handy abstractions from socket.io.  There are a few isomorphic gotchas here to be wary of, but generally restricting connections to only when a window is available should be enough.

## Connect to redux!

Connecting the sockets to redux is also a 2 step process, we want to wire up both our client and server stores so they can communicate.

### Socket Redux on the server

First let's do the server. We'll use **redux-via-socket.io** here.

```js
import { inServerViaSocketIO, outServerViaSocketIO } from 'redux-via-socket.io'
import { createStore, applyMiddleware } from 'redux'
// which reducers you use here depend on your use cases.
// the simpler approach is to use the same reducers from your client app
import rootReducer from 'app/rootReducer'

const socketStore = applyMiddleware([
  thunkMiddleware,
  // add the viaMiddleware to our redux setup
  // also wire up the socketServer we created earlier
  outServerViaSocketIO(socketServer)
])(createStore)(rootReducer, {})
```

First step, shown above, is adding the middleware that sends socket events out to clients when the server store dispatches. This is the `outServerViaSocketIO`, give it the socketServer so it can send events.

```js
inServerViaSocketIO(socketServer, (action, socket) => {
  console.log({
    socket: socket.id,
    ...action,
  })
  // default behaviour,
  // just dispatch the action to other clients
  socketsStore.dispatch(action)
})

// or more simply:
inServerViaSocketIO(socketServer, socketsStore.dispatch)
```

For recieving events from the client, we can use the `inServerViaSocketIO` with a callback to descibe what to do when we get a message from the client.

### Socket Redux on the client

Adding redux-via-socket to the client side app is as simple as adding the redux-via-socket.io client middleware with our client socket.

```js
import { outClientViaSocketIO } from 'redux-via-socket.io'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'app/rootReducer'

const clientStore = applyMiddleware([
  thunkMiddleware,
  outClientViaSocketIO(clientSocket)
])(createStore)(rootReducer, {})
```

And that's all the setup needed... Let's see it in action. Open up two browser sessions with your app and add this line to your client app so it will dispatch an action to all other clients.

```js
socket.on('connect', () => {
  console.log('Client connected to socket')
  // example socket broadcast
  dispatch({
    type: 'NEW_SOCKET_SESSION',
    payload: { data: Math.random() },
    // next=false prevents the local dispatch
    meta: { broadcast: true, next: false },
  })
})
```

If you open two browser sessions, each will log their connection to the socket server. The first browser session should also see a dispatch from the second session! Coooool! :)

### Quick API Overview

Once all is setup, we can dispatch actions to our server using meta properties for each action.

### Client Actions

#### broadcast

By setting the `broadcast` flag on our action, it will be sent through the websocket connection and then broadcast to all other listening clients.

e.g. An action telling all connected clients about a new message in a chat room.
```jsx
{
  type: 'ADD_CHAT_MESSAGE',
  payload: chatMessage,
  meta: {
    broadcast: true
  }
}
```

#### next

By default, each action is passed through the middleware and reducers that it is initially dispatched on. We can disable this by setting `next = false`. Doing this, we are disabling the local dispatch. This is only useful when used in combination with `broadcast` or `server` set to true.

e.g. An action that broadcasts a user has connected, only useful for all other listening clients.
```jsx
{
  type: 'CLIENT_CONNECTED',
  payload: clientInformation,
  meta: {
    broadcast: true,
    next: false
  }
}
```

#### server

We can send an action to our server only, this will not dispatch to other listening clients -- just to the server. This is done by setting the meta property of `server: true`. This is useful if we want our server to persist action information.

e.g. An action used to tell the server to save a chat message, the server can then broadcast a different action to all clients on a successful persistence transaction.
```jsx
{
  type: 'ADD_CHAT_MESSAGE',
  payload: chatMessage,
  meta: {
    server: true,
    next: false
  }
}
```

### Server Actions

#### broadcast

The server can also broadcast actions to all clients. This may be useful if the server needs to drive and push out updates. For example, you may have a multiplayer game that needs to broadcast a tick event to all clients.

```jsx
{
  type: 'TICK',
  payload: tickData,
  meta: {
    broadcast: true
  }
}
```

#### client

We can also send to a specific client who is listening by supplying their id. A server can listen for a specific 'direct message' action from one client, this can then be sent directly to another client from the server using their ID.

```jsx
{
  type: 'ADD_DIRECT_MESSAGE',
  payload: directMessage,
  meta: {
    client: clientId
  }
}
```

When we set the **client** property, it has different behaviours depending on the broadcast property. When broadcast is true, client tells redux-via to omit the client ID instead of sending to it.

## That's all!

With just a few little areas of setup into our universal redux application, we can truly take advantage of sockets to share actions among clients and gain some great benefits!  I really hope to see this library get more traction as I find it very powerful and simple enough to achieve great results!

Stay tuned for more posts!

- tomatao
