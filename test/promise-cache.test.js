var expect = require('chai').expect
  , Promise = require('bluebird')

describe('Promise Cache', function () {

  var promiseCache = require('../promise-cache')

  afterEach(function () {

    promiseCache.flush()

  })

  it('should return a Promise', function () {

    var promise = promiseCache('/foo/bar', Function.prototype)

    expect(promise).to.be.an.instanceof(Promise)

  })

  it('should fulfill the promise', function (done) {

    var promise = promiseCache('/foo/bar', resolvePromise)

    promise.then(function(d) {

      expect(d).to.equal('foo')

      done()

    })

  })

  it('should reject the promise', function (done) {

    var promise = promiseCache('/foo/bar', rejectPromise)

    promise.catch(function(error) {

      expect(error).to.be.an.instanceof(Error)

      done()

    })

  })

  it('should fetch a promise from the cache', function (done) {

    var promise1 = promiseCache('/foo/bar', resolvePromise)
    var promise2 = promiseCache('/foo/bar', rejectPromise)

    expect(promise2).to.equal(promise1)

    promise2.then(function(d) {

      expect(d).to.equal('foo')

      done()

    })

  })

  function resolvePromise(resolve) {

    resolve('foo')

  }

  function rejectPromise(resolve, reject) {

    reject(new Error())

  }

})