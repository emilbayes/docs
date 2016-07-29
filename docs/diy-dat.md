# DIY Dat

This document will show a user how to develop apps with the dat toolset. We can also highlight projects that use the dat modules (beaker, hyperirc, etc.)

* ~~display a file (this file?) with custom dat module~~
* download all files to fs
* Sharing a file with custom dat module
* Starting to build more complex apps, hypercore/hyperdrive difference, etc

---

In this guide, we will show how to develop applications with the `dat` ecosystem. Dat will help you build modules that do **(x, y, x)**. For example, **(things you build with dat modules)**

You will need node and npm installed to build with dat. [Read more](https://github.com/maxogden/dat/blob/master/CONTRIBUTING.md#development-workflow) about our development workflow. 

The three essential node modules are called [hyperdrive](https://npmjs.org/hyperdrive), [hyperdrive-archive-swarm](https://npmjs.org/hyperdrive-archive-swarm) and [level](https://npmjs.org/level). Hyperdrive does file synchronization and versioning, hyperdrive-archive-swarm does peer discovery over local networks and the Internet, and level provides a local LevelDB for storing metadata. More details are available in [How Dat Works](how-dat-works.md). The [dat](https://npmjs.org/dat) module itself is just some code that combines these modules and wraps them in a command-line API.

## Module #1: Download a File

Our first module will download files from a dat link entered by the user. View the code for this module on [Github](https://github.com/joehand/dat-examples/module-1).

```
`mkdir module-1 && cd module-1`
`npm init`
`npm install --save hyperdrive memdb hyperdrive-archive-swarm`
`touch index.js`
```

For each dat, we need three things: 

1. A database
2. A hyperdrive archive
3. A peer group


For this example, we will use memdb for the database, and hyperdrive-archive-swarm for the peer group. In your `index.js` file, require the modules and set them up:

```js
var memdb = require('memdb')
var hyperdrive = require('hyperdrive')
var Swarm = require('hyperdrive-archive-swarm')

var link = process.argv[2] // user inputs the dat link

var db = memdb()
var drive = hyperdrive(db)
var archive = drive.createArchive(link)
var swarm = Swarm(archive)
```

Notice, the user will input the link for the second argument The easiest way to get a file from a hyperdrive archive is to make a read stream. `archive.createFileReadStream` accepts the index number of filename for the first argument. To display the file, we can create a file stream and pipe it to stdout. 

```js
var stream = archive.createFileReadStream(0) // get the first file
stream.pipe(process.stdout)
```

Now, you can run the module! To download the first file from our docs dat, run:

```
node index.js <add link here>
```

You should see the first file in our docs repo!

#### Module #1 Bonus: Display any file in the Dat

With a few more lines of code, the user can enter a file to display from the dat link.

Challenge: create a module that will allow the user to input a dat link and a filename: `node bonus.js <dat-link> <filename>`. The module will print out that file from the link, as we did above. To get a specific file you can change the file stream to use the filename instead of the index number:

```js
var stream = archive.createFileReadStream(fileName)
```

Once you are finished, see if you can view this file by running:

```
node bonus.js <add link here> diy-dat.md
```

[See the full module](https://github.com/joehand/dat-examples/module-1/bonus.js). 

## Module #2: Download all files to computer

```js
// run this like: node thisfile.js 4c325f7874b4070blahblahetc
// the dat link someone sent us, we want to download the data from it
var link = new Buffer(process.argv[2], 'hex')

var Hyperdrive = require('hyperdrive')
var Swarm = require('hyperdrive-archive-swarm')
var level = require('level')
var raf = require('random-access-file')
var each = require('stream-each')

var db = level('./dat.db')
var drive = Hyperdrive(db)
var archive = drive.createArchive(link, {
  file: function (name) {
    return raf(path.join(self.dir, name))
  }
})
var swarm = Swarm(archive)

archive.open(function (err) {
  if (err) return console.error(err)
  each(archive.list({live: archive.live}), function (data, next) {
    var startBytes = self.stats.bytesDown
    archive.download(data, function (err) {
      if (err) return console.error(err)
      console.log('file downloaded', data.relname)
      next()
    })
  }, done)
})

```
