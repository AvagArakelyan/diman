# diman [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Small Dependency Injection management library


## Install

```sh
$ npm install --save diman
```


## Usage

### Simple Injection

```js
var di = require('diman');

function Service(configuration) {
  this.configuration = configuration;
}
di.annotate(Service, new di.Inject(Configuration));

function Configuration(){
  this.database = 'mongo';
}

var injector = new di.Injector([]);
var service = injector.get(Service);
console.log( service.configuration.database );   //'mongo'
```

### Mocked Injection

```js
function Service(configuration) {
  this.configuration = configuration;
}
di.annotate(Service, new di.Inject(Configuration));

function Configuration(){
  this.database = 'mongo';
}

function DevConfiguration(){
  this.database = 'dev-mongo';
}
di.annotate(DevConfiguration, new di.Provide(Configuration));


var injector = new di.Injector([DevConfiguration]);
var service = injector.get(Service);
console.log( service.configuration.database );   //'dev-mongo'
```

## License

MIT © [Avag Arakelyan]()


[npm-image]: https://badge.fury.io/js/diman.svg
[npm-url]: https://npmjs.org/package/diman
[travis-image]: https://travis-ci.org/AvagArakelyan/diman.svg?branch=master
[travis-url]: https://travis-ci.org/AvagArakelyan/diman
[daviddm-image]: https://david-dm.org/AvagArakelyan/diman.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/AvagArakelyan/diman
[coveralls-image]: https://coveralls.io/repos/AvagArakelyan/diman/badge.svg
[coveralls-url]: https://coveralls.io/r/AvagArakelyan/diman
