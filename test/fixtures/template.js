require.register("templates/index.html", function(exports, require, module){
module.exports = '<div></div>';
});
require.register("templates/index.json", function(exports, require, module){
module.exports = '{\n  "name": "blah"\n}\n';
});
require.register("templates/index.css", function(exports, require, module){
module.exports = 'h2 {\n  background: pink;\n}\n';
});
