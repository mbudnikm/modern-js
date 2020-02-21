const { getEmployee } = require('../data')

describe('Iteration Protocol', () => {
/*
ITERATION PROTOCOL

- built-in iterables
  - String
  - Array
  - TypedArray
  - Map
  - Set

- expect iterables
  - for..of loop
  - spread operator
  - destructuring
  - Array.from
  - yield*
*/

  function* iterateObject(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        yield key
      }
    }
  }

  it('should return iterator', () => {
    const array = ['a', 'b', 'c']
    expect(array.entries() instanceof Array).toBe(false)

    const set = new Set(['a', 'b', 'c'])
    expect(set.entries() instanceof Array).toBe(false)

    //...
  })
  
  it('should iterate over object keys', () => {
    // define iterateObject generator

    const employee = getEmployee()
    const keys = ["id", "nationality", "keycardId", "account", "salary", "office", "departmentId", "firstName", "lastName", "title", "contractType", "email", "hiredAt", "expiresAt", "personalInfo", "skills", "bio", "imgURL"]

    let keysIterator = iterateObject(employee)
		expect([...keysIterator]).toEqual(keys)

		keysIterator = iterateObject(employee)
		expect(keysIterator.next().value).toEqual("id")
    expect(keysIterator.next().value).toEqual("nationality")
    expect(keysIterator.next().value).toEqual("keycardId")
    //...
  })

  it('should make an object iterable', () => {
    const iterableEmployee = getEmployee()
    // I solution
    iterableEmployee[Symbol.iterator] = function* iterateObject() {
      for (var key in this) {
          yield key
      }
    }

    // II solution
    /* iterableEmployee[Symbol.iterator] = function(){
      return iterateObject(this)
    } */

    // III solution
    /* let iterableEmployee = {
      ...getEmployee(),
      [Symbol.iterator]() { return iterateObject(this)}
    } */

    //IV solution
    /* iterableEmployee[Symbol.iterator] = function* (){
      yield* iterateObject(this)
    } */

    const keys = ["id", "nationality", "keycardId", "account", "salary", "office", "departmentId", "firstName", "lastName", "title", "contractType", "email", "hiredAt", "expiresAt", "personalInfo", "skills", "bio", "imgURL"]

    expect([...iterableEmployee]).toEqual(keys)
  })

  describe('FUN ZONE', () => {
    it('should expand a number into a range', () => {
      // python-alike syntax
      // [...5] => [0, 1, 2, 3, 4, 5]
      // [...-5] => [0, -1, -2, -3, -4, -5]
      
      // make dreams come true!
      // figure it out!

      /*Number.prototype[Symbol.iterator] = function* () {
        const sign = Math.sign(this)
        for (var value = 0; value != this; value += sign) {
          yield value
        }
        yield value
      }*/

      Number.prototype[Symbol.iterator] = function* () {
        if (this > 0) {
          for (var value = 0; value <= this; value++) {
            yield value
          }
        } else {
          for (var value = 0; value >= this; value--) {
            yield value
          }
        }
      }

      expect([...10]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      expect([...(-10)]).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10])
    })
  })

  
})
