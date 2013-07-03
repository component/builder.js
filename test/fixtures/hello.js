require.register("component-emitter/index.js", function(exports, require, module){
module.exports = 'emitter';
});
require.register("hello/foo.js", function(exports, require, module){
module.exports = 'foo';
});
require.register("hello/bar.js", function(exports, require, module){
module.exports = 'bar';
});
require.alias("component-emitter/index.js", "hello/deps/emitter/index.js");
require.alias("component-emitter/index.js", "hello/deps/component-emitter/index.js");
require.alias("component-emitter/index.js", "emitter/index.js");
