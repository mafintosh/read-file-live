var readFile = require('./')

readFile('example.js', function (data) {
  console.log('example.js', data && data.length)
})
