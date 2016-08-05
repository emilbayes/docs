var fs = require('fs')
var ndjson = require('ndjson')

try {
  fs.statSync('docs/modules/', function (err, stat) {
    if (!stat.isDirectory()) fs.mkdirSync('docs/modules/')
  })
} catch (e) {
  fs.mkdirSync('docs/modules/')
}

process.stdin.pipe(ndjson.parse()).on('data', function (obj) {
  fs.writeFileSync('docs/modules/' + obj.name + '.md', obj.readme)
})