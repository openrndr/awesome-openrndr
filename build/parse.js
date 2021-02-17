// Run with `node parse.js`

var fs = require('fs');
var counter = 1
var items = []

function printTitle(it) {
  console.log('\n### ' + it + '\n')
}

function formatEntry(it, description) {
  let days = Math.floor((Date.now() -
    Date.parse(it.updated_at)) / (3600*24*1000))

  return `- ${counter++}. [${it.html_url}](${it.owner.login}) ` +
    (it.fork ? ' [fork] - ' : ' - ') +
    description + ` (${days} days ago)`
}

console.log('# awesome-openrndr\n')
console.log('Community maintained and scraped list of OPENRNDR based and related projects\n')

// Read json files
let fileCounter = 1
while(true) {
  let fileName = `page${fileCounter}.json`
  if(!fs.existsSync(fileName)) {
    break
  }
  let obj = JSON.parse(fs.readFileSync(fileName, 'utf8'))
  items.push(...obj.items)
  fileCounter++
}

let tweaks = JSON.parse(fs.readFileSync('tweaks.json', 'utf8'))
console.log('## Other\n')
tweaks.urls.forEach(it => {
  console.log(`* [${it.url}](${it.name}) - ${it.description}`)
})

console.log('\n## git repos\n')

// Sort entries
items.sort(function(a, b) {
  let sortA = 'name'
  if(a[sortA] < b[sortA]) return -1
  if(a[sortA] > b[sortA]) return 1

  let sortB = 'updated_at'
  if(a[sortB] < b[sortB]) return 1
  if(a[sortB] > b[sortB]) return -1

  return 0
});

let archived = items.filter(it => it.archived).map(it => it.name)
let skip = []
let lastName = ''
let lastDescription = ''

items.forEach(it => {
  let description = ''
  let hidden = false

  // if description changes, update description
  if(it.description && lastDescription != it.description) {
    lastDescription = it.description
    description = it.description
  }

  let forkOfArchived = (it.fork && archived.includes(it.name))
  let tweakData = tweaks.items[it.full_name]
  if(tweakData) {
    hidden = tweakData.hidden
    if(tweakData.description) {
      description = tweakData.description
    } else {
      description += tweakData.append || ''
    }
  }
  let entry = formatEntry(it, description)
  if(!hidden) {
    if(!it.archived && !forkOfArchived) {
      // if name changes, title
      if(lastName != it.name) {
        lastName = it.name
        printTitle(it.name)
      }
      console.log(entry)
    } else {
      skip.push(entry)
    }
  }
})

printTitle('archived or fork of archived')

skip.forEach(skipped => console.log(skipped))

