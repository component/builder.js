var Builder = require('..');
var concat = Builder.concat;

var Batch = require('batch');
Batch.prototype.concurrency = function () {
  this.n = 1;
};

describe('concat(type)', function(){
  it('should concat `type`', function(done){
    var builder = new Builder('test/fixtures/hello');
    builder.path('..');
    builder.use(concat('styles'));
    builder.build(function(err, build){
      if (err) return done(err);
      build.styles.should.eql('emitter {\n  \n}foo {\n  bar: \'baz\';\n}bar {\n  baz: \'raz\';\n}');
      done();
    });
  })
})
