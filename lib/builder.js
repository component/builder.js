
/**
 * Module dependencies.
 */

var Resolver = require('./resolver');
var Build = require('./build');
var Batch = require('batch');

/**
 * Expose `Builder`
 */

module.exports = Builder;

/**
 * Expose plugins
 */

Builder.copy = require('./plugins/copy');
Builder.symlink = require('./plugins/symlink');
Builder.concat = require('./plugins/concat');
Builder.commonjs = require('./plugins/commonjs');
Builder.rewriteUrls = require('./plugins/rewrite-urls');

/**
 * Initialize a new `Builder`.
 *
 * @param {String} path
 * @api public
 */

function Builder(path, configName){
  if (!(this instanceof Builder)) return new Builder(path);
  this.resolver = new Resolver(path);
  this.resolver.configName = configName || 'component.json';
  this.batch = new Batch;
  this.batch.concurrency(1);
}

/**
 * Allow dev dependencies.
 *
 * @api public
 */

Builder.prototype.development = function(){
  this.dev = true;
  this.resolver.development();
  return this;
};

/**
 * Add global relative path.
 *
 * @param {String} path
 * @api public
 */

Builder.prototype.path = function(path){
  this.resolver.add(path);
  return this;
};

/**
 * Use the given `fn`.
 *
 * @param {Function} fn
 * @api private
 */

Builder.prototype.use = function(fn){
  var self = this;

  this.batch.push(function(done){
    fn(self._build, done);
  });

  return this;
};

/**
 * Build and call `fn(err, build)`.
 *
 * @param {Function} fn
 * @api private
 */

Builder.prototype.build = function(fn){
  var self = this;
  this.resolver.end(function(err, list){
    if (err) return fn(err);
    self._build = new Build(list);
    self._build.dev = self.dev;
    self.batch.end(function(err){
      if (err) return fn(err);
      fn(null, self._build);
    });
  });
};
