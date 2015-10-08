var di = require('../lib');
var expect = require('chai').expect;

describe('di', function () {

  describe('Inject', function () {
    describe('#constructor()', function () {
      it('should accept variable arguments', function () {
        var inject = new di.Inject(String, Object);
        expect(inject.injectables).to.eql([String, Object]);
      });
    });
  });

  describe('annotate', function () {
    describe('#constructor()', function () {
      it('should inject annotate function constructor with injectables', function () {
        function Service(configuration) {
          this.configuration = configuration;
        }

        function Configuration() {
          this.database = 'mongo';
        }

        di.annotate(Service, new di.Inject(Configuration));

        expect(Service.$inject).to.eql([Configuration]);
      });
    });
  });

  describe('Injector', function (){
    describe('#get()', function () {
      it('should create an instance, if it\'s function constructor', function () {
        function Service() { }

        var injector = new di.Injector([]);
        var i = injector.get(Service);
        expect(i).to.be.an.instanceof(Service);
      });


      it('should return same instance on multiple call of get', function () {
        function Service() { }

        var injector = new di.Injector([]);
        expect(injector.get(Service)).to.equal(injector.get(Service));
      });

      it('should return object if it is not function constructor', function () {
        var o = 123456;

        var injector = new di.Injector([]);
        expect(injector.get(o)).to.equal(injector.get(o));
      });

      it('should create instance with depencies', function () {
        function Service(configuration) {
          this.configuration = configuration;
        }

        function Configuration(){
          this.database = 'mongo';
        }
        di.annotate(Service, new di.Inject(Configuration));

        var injector = new di.Injector([]);
        var i = injector.get(Service);
        expect(i.configuration).to.be.an.instanceof(Configuration);
        expect(i.configuration.database).to.equal('mongo');
      });
    });
  });

});
