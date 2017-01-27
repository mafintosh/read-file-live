var fs = require('fs')

module.exports = readFile

function readFile (name, notify) {
  var watcher = null
  var checks = 0
  var intervals = [100, 500, 1000]
  var stopped = false
  var once = false

  check()
  return uncheck

  function check () {
    if (stopped) return
    if (watcher) watcher.close()
    watcher = null

    fs.stat(name, function (err) {
      if (stopped) return

      if (err) {
        update(null)
        setTimeout(check, intervals[checks++] || 1000)
        return
      }

      checks = 0
      watcher = fs.watch(name, check)

      fs.readFile(name, function (_, data) {
        update(data)
      })
    })
  }

  function update (data) {
    if (data) {
      once = true
      notify(data)
      return
    }
    if (once) {
      once = false
      notify(null)
    }
  }

  function uncheck () {
    stopped = true
    if (watcher) watcher.close()
  }
}
