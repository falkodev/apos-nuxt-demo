#!/usr/bin/env node

const path = require('path')
const chokidar = require('chokidar')
const anymatch = require('anymatch')
const clear = require('clear-module')
const logger = require('pino')({ prettyPrint: true })

let apos = null

// Mutex for concurency
let restartable, timeout

const directory = process.cwd()
const pckg = require(path.resolve(directory, 'package.json'))
const entry = path.resolve(directory, pckg.main)

logger.info(`Starting application and watching changes in ${directory}`)

// Functions interacting with application status

const start = async () => {
  if (apos) {
    logger.warn('Restarting in response to changes')
  }
  apos = require(entry)
  apos.options.afterListen = err => {
    if (err) logger.error(err)
    logger.info('Waiting for changes...')
    restartable = true
  }
}

const change = filename => {
  if (restartable === undefined || filename === module.filename) {
    return
  }
  clear(filename)
  clear(entry)
  // mutex to ensure safe restart
  if (!restartable) {
    if (!timeout) {
      // delay recursive calls
      timeout = setTimeout(() => {
        timeout = null
        return change(filename)
      }, 100)
    }
    return
  }
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  restart()
}

const restart = () => {
  restartable = false
  return apos.destroy(err => {
    if (err) {
      logger.error(err)
      process.exit(1)
    }
    start()
  })
}

start()

// Some files have to be ignored because there are not relevant to restart the
// application. It constructs patterns in a anymatch compatible definition for
// chokidar.

const ignored = ['.*', 'public/**', 'locales/**', 'data/**', 'node_modules/**'].map(rule => path.join(directory, rule))

// Watching files changes to restart the application on the fly. Only add and
// changed events are triggered to avoid unecessary restart during development.

const events = ['add', 'change']
const options = {
  ignored: file => anymatch(ignored, file),
  persistent: true,
}

chokidar.watch(directory, options).on('all', (event, filename) => {
  if (events.includes(event)) {
    change(filename)
  }
})
