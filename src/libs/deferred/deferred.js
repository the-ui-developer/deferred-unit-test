export default class Deferred {
  constructor (handler = () => {}) {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
      handler(resolve, reject)
    })

    this.promise.resolve = (...args) => {
      this.resolve(...args)

      return this.promise
    }
    this.promise.reject = (error) => {
      this.reject(error)

      return this.promise
    }

    return this.promise
  }

  promise

  resolve

  reject
}

/*
  // How to use.
  const promise = new Deferred((resolve, reject) => {
    // Use like normal Promise.
  });

  // both of these return a reference to the base promise
  // so they can be await(ed) inside an async function (like a test)
  promise.resolve(); // Resolve from any context.
  promise.reject(); // Reject from any context.
*/
