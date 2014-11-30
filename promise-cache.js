if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function (require) {

    var Promise = require('bluebird')
      , MemCache = require('mem-cache')
      , cache = new MemCache()

    function promiseCache (url, fn, timeout) {

      var cachedPromise = cache.get(url)

      return cachedPromise ? cachedPromise : cache.set(url, new Promise(fn), timeout)

    }

    promiseCache.flush = function() {

      cache.flush()

    }

    return promiseCache

  }
)