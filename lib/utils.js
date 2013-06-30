
var fs = require('fs')

/**
 * Strip `str` quotes.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.stripQuotes = function(str) {
  if ('"' == str[0] || "'" == str[0]) return str.slice(1, -1);
  return str;
};

/**
 * Normalize `conf`.
 *
 * @param {Object} conf
 * @api private
 */

exports.normalizeConfig = function(conf){
  // support "./" in main
  if (conf.main) conf.main = conf.main.replace(/^\.\//, '');
};

/**
 * Copy file `src` to `dest`
 *
 * @param {String} src
 * @param {String} dest
 * @param {Function} cb
 * @api private
 */

exports.copy = function (src, dest, cb) {
  function next(err) {
    if (!done) {
      done = true;
      cb(err);
    }
  }

  var done = false
    , read = fs.createReadStream(src)
    , write = fs.createWriteStream(dest);

  write
    .on('error', next)
    .on('close', next);

  read
    .on('error', next)
    .pipe(write);
};
