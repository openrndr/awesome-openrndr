// Run with `node parse.js`

var fs = require('fs');
var counter = 1
var items = []
for(var i=1; i<=6; i++) {
  var obj = JSON.parse(fs.readFileSync('page' + i + '.json', 'utf8'));
  obj.items.forEach(function(it) {
    items.push(it);
  });
}

items.sort(function(a, b) {
  if(a.updated_at < b.updated_at) return 1;
  if(a.updated_at > b.updated_at) return -1;
  return 0;
});

items.forEach(function(it) {
  console.log(counter + '. ' +
    it.full_name +
    (it.archived ? ' [archived] ' : '') +
    (it.fork ? ' [fork] - ' : ' - ') +
    (it.description ? it.description + ' ' : ' ') +
    (it.updated_at)
   );
  counter++;
});

