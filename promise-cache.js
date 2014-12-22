if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) { module.exports = factory(require, exports, module) }
}

define(function (require, exports, module) {

  var Promise = require('bluebird')
    , MemCache = require('mem-cache')
    , cache = new MemCache()

  function promiseCache(url, fn, timeout) {
    var cachedPromise = cache.get(url)
    return cachedPromise ? cachedPromise : cache.set(url, new Promise(fn), timeout)
  }

  promiseCache.flush = function () {
    cache.flush()
  }

  return promiseCache
})