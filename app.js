

const Vue = require('vue')
const server = require('express')()
const fs = require('fs')
const renderer = require('vue-server-renderer').createRenderer({
  // add the template
  template: fs.readFileSync('./index.template.html', 'utf-8'),

})


// create the server
// listen to all the routes
server.get('*', (req, res) => {

  // create the vue Instance
  const App = new Vue({
    template: `
      <div>
        <h1>serverside rendering example</h1>
        <h3>app vue is rendered</h3>
      </div>`,

  })

  // create the context which allow to import some meta data to the head.
  const context = {
    title: 'home page',
  }
  // render the Vue instance to HTML
  renderer.renderToString(App, context).then(html => {
    // no err then the html is insert to the body
    res.end(html)
  }).catch(err => {
    console.log('there is an error')
    res.status(500).end('Internal server error')
    console.log(err)
  })
})

server.listen(8080, () => {
  console.log('server is starting . . .')
})
