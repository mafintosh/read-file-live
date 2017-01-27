var fs = require('fs')

module.exports = readFile

function readFile (name, notify) {
  var watcher = null
  var checks = 0
  var intervals = [100, 500, 1000]
  var stopped = false

  check()
  return uncheck

  function check () {
    if (stopped) return
    if (watcher) watcher.close()
    watcher = null

    fs.stat(name, function (err) {
      if (stopped) return
      if (err) return setTimeout(check, intervals[checks++] || 1000)

      checks = 0
      watcher = fs.watch(name, check)

      fs.readFile(name, function (_, data) {
        notify(data || null)
      })
    })
  }

  function uncheck () {
    stopped = true
    if (watcher) watcher.close()
  }
}
