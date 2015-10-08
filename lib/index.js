module.exports = {
  Injector: Injector,
  Inject: Inject,
  Provide: Provide,
  annotate: annotate
};

/**
 * Main function for injections
 * @param providers
 * @constructor
 */
function Injector(providers) {
  this.providerMap = createProviderMap(providers);
  this.classFnMap = new Map();
}

Injector.prototype = {
  constructor: Injector,
  get: function (classFn) {
    var that = this;

    var fromProvider = that.providerMap.get(classFn);
    if (fromProvider) {
      classFn = fromProvider;
    }

    var fromClassMap = that.classFnMap.get(classFn);
    if (fromClassMap) {
      return fromClassMap;
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

function createProviderMap(providers) {
  var map = new Map();
  providers.forEach(function (provider) {
    var source = provider.$inject[0];
    provider.$inject = source.$inject;

    map.set(source, provider);
  });
  return map;
}

function createInstance(classFn, args) {
  return new (Function.bind.apply(classFn, [null].concat(args)));
}

/***
 * Annotates dependencies
 * @param classFn
 * @param inject
 */
function annotate(classFn, inject) {
  classFn.$inject = inject.injectables;
}

/***
 * Presents injection unit, which accepts variable amount of constructorFunctions
 * @constructor
 */
function Inject() {
  this.injectables = [].slice.call(arguments, 0);
}
/***
 * Presents injection unit for replacement
 * @param mockClassFn
 * @constructor
 */
function Provide(mockClassFn) {
  this.injectables = [mockClassFn];
}
