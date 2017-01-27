# read-file-live

Read a file and re-read it when it changes

```
npm install read-file-live
```

Useful if you are writing command line tools that monitor configuration files.

## Usage

``` js
var readFile = require('read-file-live')

readFile('somefile.txt', function (buf) {
  // is the file had been deleted buf === null
  console.log('somefile.txt updated. content ->', buf)
})
```

## API

#### `var stop = readFile(onread)`

Read a file and re-read it when it changes. `onread` will be called with a buffer of the file content when the file changes or is being read the first time. If the file has been deleted the content buffer will be `null`.

Call `stop` to stop reading.

## License

MIT
