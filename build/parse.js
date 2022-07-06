// Run with `node parse.js`

var fs = require('fs');
var items = []

console.log('# ' + new Date())
console.log("")

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

items.forEach(it => {
  it.days = Math.floor((Date.now() -
    Date.parse(it.updated_at)) / (3600*24*1000))
})

// Sort entries
items.sort(function(a, b) {
  let sortA = 'days' //name
  if(a[sortA] < b[sortA]) return -1
  if(a[sortA] > b[sortA]) return 1

  let sortB = 'updated_at'
  if(a[sortB] < b[sortB]) return 1
  if(a[sortB] > b[sortB]) return -1

  return 0
});

//  ${it.name}
//  ${it.fork}
//  ${it.full_name}
//  ${it.archived}
//  ${it.owner.login}
//
items.forEach(it => {
  console.log(
    `${it.days} days ago - ${it.html_url}
    ${it.description}
`
  )
})

