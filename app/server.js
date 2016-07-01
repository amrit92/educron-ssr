/**
 * We are going to use hapi to server side render our application.
 * Inspired by: https://github.com/luandro/hapi-universal-redux
 *
 *
 * Created December 11th, 2015
 * @author: ywarezk
 * @version: 0.18
 *
 */

/*******************
 * begin imports
 *******************/

console.log('1');

import {Server} from "hapi";
import h2o2 from "h2o2";
import inert from "inert";
import React from "react";
import ReactDOM from "react-dom/server";
import {RouterContext, match} from "react-router";
import createLocation from "history/lib/createLocation";
import configureStore from "../app/redux/store/configureStore";
import { Provider } from 'react-redux';
import routesContainer from "../app/routes/index";
import url from "url";
const fs = require('fs');
// const paths  = (__dirname + '/../public/index.html');
let routes = routesContainer;


/*******************
 * end imports
 *******************/


//redux store and state we might have to dispatch stuff according to the url we are rendering
const store = configureStore();
const initialState = store.getState();

//from environment variable grab our data and the backend data
const hostname = process.env.HOSTNAME || "localhost";
const restHostUrl = process.env.SERVER_URL || "localhost";
const restHostProtocol = process.env.SERVER_PROTOCOL || "http";
const restHostPort = process.env.SERVER_PROTOCOL || "1337";

//creating hapi server - popping my cherry with hapi on this one - im more of an express kinda guy.
const server = new Server();
server.connection({host: hostname, port: process.env.PORT || 8000});
server.register(
  [
    h2o2,
    inert,
    // WebpackPlugin
  ],
  (err) => {
  if (err) {
    throw err;
  }

  server.start(() => {
    console.info("==> ✅  Server is listening");
    console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
  });
});

//serve static files
server.route({
  method:  "GET",
  path:    "/{params*}",
  handler: {
    file: (request) => "static" + request.path
  }
});

//proxy my server urls
server.route({
  method: "GET",
  path: "/api/{path*}",
  handler: {
    proxy: {
      passThrough: true,
      mapUri (request, callback) {
        callback(null, url.format({
          protocol: restHostProtocol,
          host:     restHostUrl,
          pathname: request.params.path,
          query:    request.query,
          port: restHostPort
        }));
      },
      onResponse (err, res, request, reply, settings, ttl) {
        reply(res);
      }
    }
  }
});

//these are dynamic requests i need to render
server.ext("onPreResponse", (request, reply) => {

  match({routes: routes, location: request.path}, (error, redirectLocation, renderProps) => {
    console.log(routes);

    if (redirectLocation) {
        reply.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    else if (error || !renderProps) {
        reply.continue();
    }
    else {
      console.log(renderProps);
      //router rendering
      const reactString = ReactDOM.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
  const webserver = __PRODUCTION__ ? "" : `//${hostname}:8080`;

      let output = (
    `<!doctype html>
    <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <title>Hapi Universal Redux</title>
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="stylesheet" href="${webserver}/static/dist/client.css" />
      </head>
      <body>
        <div id="root">${reactString}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
        </script>
        <script src=${webserver}/dist/client.js></script>
      </body>
    </html>`
    );

      //grab the index file from dist and serve the index content with what we rendered
      // const template = fs.readFileSync(paths, 'utf-8');
      // const injectedManifest = template.replace(
      //   new RegExp(`<div id="root">`),
      //   `<div id="root">` + reactString
      // );
      console.log(output);
      reply(output);

    }
  });
});
