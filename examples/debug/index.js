var Builder = require('../..');

var builder = new Builder(__dirname + '/components/hello');

builder.addLookup('examples/debug/components');

builder.development()
builder.addSourceURLs()

builder.build(function(err, res){
  if (err) throw err;
  // console.log(res)
  require('fs').writeFileSync(__dirname+'/built.js', res.require + res.js, 'utf-8')  
  console.log('Done!')
});