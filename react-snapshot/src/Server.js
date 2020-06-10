/* Spin up a simple express server */
import express from 'express'
import path from 'path'

export default class Server {
  constructor(baseDir, publicPath) {
    const app = express()

    app.get('*', (req, res, next) => {
      // This makes sure the sockets close down so that
      // we can gracefully shutdown the server
      res.set('Connection', 'close')
      next()
    })

    app.use(publicPath, express.static(baseDir))

    // Serve 200.html instead of 404 for react routing
    app.use(publicPath, (req, res, next) => {
      res.sendFile(path.join(baseDir, '200.html'))
    })

    this.start = this.start.bind(this, app)
  }

  start(app) {
    return new Promise((resolve, reject) => {
      this.instance = app.listen(0, (err) => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })
  }

  port() {
    return this.instance.address().port
  }

  stop() {
    this.instance.close()
  }
}
