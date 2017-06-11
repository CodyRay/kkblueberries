import url from 'url'
import path from 'path'
import jsdom from 'jsdom'
import snapshot from './snapshot'

export default class Crawler {
  constructor(baseUrl, snapshotDelay) {
    this.baseUrl = baseUrl
    const { protocol, host, path } = url.parse(baseUrl)
    this.protocol = protocol
    this.host = host
    this.paths = [path]
    this.processed = {}
    this.snapshotDelay = snapshotDelay
  }

  crawl(handler) {
    this.handler = handler
    console.log(`>   Starting crawling ${this.baseUrl}`)
    return this.snap()
      .then(() => console.log('>   Finished crawling.'))
  }

  snap() {
    let urlPath = this.paths.shift()
    if (!urlPath) return Promise.resolve()
    urlPath = url.resolve('/', urlPath) // Resolve removes trailing slashes
    if (this.processed[urlPath]) {
      return this.snap()
    } else {
      this.processed[urlPath] = true
    }
    return snapshot(this.protocol, this.host, urlPath, this.snapshotDelay).then(window => {
      const html = jsdom.serializeDocument(window.document)
      this.extractNewLinks(window, urlPath)
      this.handler({ urlPath, html })
      window.close() // Release resources used by jsdom
      return this.snap()
    }, err => {
      console.log(`> ${err}`)
    })
  }

  extractNewLinks(window, currentPath) {
    const document = window.document
    const tagAttributeMap = {
      'a': 'href',
      'iframe': 'src'
    }

    Object.keys(tagAttributeMap).forEach(tagName => {
      const urlAttribute = tagAttributeMap[tagName]
      Array.from(document.querySelectorAll(`${tagName}[${urlAttribute}]`)).forEach(element => {
        if (element.getAttribute('target') === '_blank') {
          return
        }
        const href = url.parse(element.getAttribute(urlAttribute))
        if (href.protocol || href.host || href.path === null) {
          return;
        }
        const relativePath = url.resolve(currentPath, href.path)
        if (path.extname(relativePath) !== '.html' && path.extname(relativePath) !== '') {
          return;
        }
        if (this.processed[relativePath]) {
          return;
        }
        this.paths.push(relativePath)
      })
    })
  }
}
