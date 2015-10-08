module.exports = {
  Injector: Injector,
  Inject: Inject,
  annotate: annotate
};

function Injector(providers) {
  this.providers = providers;
  this.classFnMap = new Map();
}

Injector.prototype = {
  constructor: Injector,
  get: function (classFn) {
    var that = this;

    if (that.classFnMap.has(classFn)) {
      return that.classFnMap.get(classFn);
    }

    var args = [];

    if (classFn.$inject) {
      args = classFn.$inject.map(function (injectable) {
        return that.get(injectable);
      });
    }
    var instance;
    //We have function constructor
    if (typeof classFn === 'function') {
      instance = createInstance(classFn, args);
    } else {
      instance = classFn;
    }
    that.classFnMap.set(classFn, instance);
    return instance;
  }
};

function createInstance(classFn, args) {
  var instance = Object.create(classFn.prototype);
  classFn.apply(instance, args);
  return instance;
}

function annotate(classFn, inject) {
  classFn.$inject = inject.injectables;
}

function Inject() {
  var injectables = [].slice.call(arguments, 0);

  this.injectables = injectables;
}
