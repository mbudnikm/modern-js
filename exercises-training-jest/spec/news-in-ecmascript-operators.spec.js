/*
EXERCISE:
- let's remind some behavior of JS coercion
*/

describe('Falsy Values', () => {
  it('weak comparisons', () => {

    expect(null === undefined).toBe(false)
    expect(null === 0).toBe(false)
    expect(null === false).toBe(false)
    expect(null === '').toBe(false)

    expect(null == undefined).toBe(true)
    expect(null == 0).toBe(false)
    expect(null == false).toBe(false)
    expect(null == '').toBe(false)
  })

  // ?.
  // (optional chaining) is the same as:
  // ACCESS == null ? undefined : ACCESS

  it('should potentially return undefined with optional chaining', () => {
    const john = {
      firstName: "John",
      lastName: "Lennon",
      band: {
        name: "The Beatles",
        active: {
          from: 1960,
          to: 1970
        }
      },
      tagline() {
        return `${this.firstName} ${this.lastName}, member of ${this.band.name}`
      }
    }

    // optional static property access

    const instrumentPrice = john?.instrument?.price
    expect( instrumentPrice ).toBeUndefined()

    // this one exists, but turn it into optional chaining anyway
    const bandName = john?.band?.name
    expect( bandName ).toBe("The Beatles")

    // nested
    const JohnBandActiveFrom = john.band.active.from
    expect( JohnBandActiveFrom ).toBe(1960)

    // root reference is not defined
    let ricky = {}

    const RickyMartinBandActiveFrom = ricky?.band?.active?.from
    expect( RickyMartinBandActiveFrom ).toBeUndefined()

    // optional dynamic property access
    let prop
  
    prop = 'firstName'
    const johnFirstName = john[prop]
    expect(johnFirstName).toEqual("John")

    prop = 'lastName'
    const johnLastName = john[prop]
    expect(johnLastName).toEqual("Lennon")

    prop = 'address'
    const johnHomeCity = john[prop]?.city
    expect(johnHomeCity).toBeUndefined()



    // optional function or method call

    const greeting = john.sayHello?.()
    expect( greeting ).toBeUndefined()

    // this one exists, but turn it into optional chaining anyway
    const tagline = john.tagline()
    expect( tagline ).toEqual("John Lennon, member of The Beatles")
  })

  // nullish coalescing provides a default value for one of the following:
  // (no value), undefined, null
  // X ?? Y
  // potenciallyEmpty ?? Y <- if empty give me Y
  // potenciallyEmpty is null or undefined or no value
  it('works with nullish coalescing', () => {
    const office = {
      address: {
        owner: null,
        floor: 0,
        flatNumber: '',
        forSale: false
      }
    };
    
    const undefinedValue = office.address.undefinedThing ?? 'default'
    expect(undefinedValue).toEqual('default')

    const owner = office.address.owner ?? 'Mike'
    expect(owner).toEqual('Mike')
    
    const flatNumber = office.address.flatNumber ?? '45'
    expect(flatNumber).toEqual('')
    
    const floor = office.address.floor ?? 3
    expect(floor).toEqual(0)
    
    const forSale = office.address.forSale ?? true
    expect(forSale).toEqual(false)
  })
})

/*
EXERCISE:
- decide how do we handle lack of values throughout the entire system (normalize)
- don't be surprised in situations like this:
  - our codebase operates on null and undefined but does it differently and we've got potential bugs all around 
*/

describe('Handling default values', () => {
  describe('returning a "default" value', () => {

    it('when passing undefined or no param', () => {
      function defaultValue(arg) {
        return arg
      }
      
      expect( defaultValue()          ).toBe("default") // !
      expect( defaultValue(null)      ).toBe(null)
      expect( defaultValue(undefined) ).toBe("default") // !
      expect( defaultValue('')        ).toBe("")
      expect( defaultValue(false)     ).toBe(false)
      expect( defaultValue(0)         ).toBe(0)
    })

    it('when passing any falsy value', () => {
      function defaultValue(arg) {
        return arg
      }
      
      expect( defaultValue()          ).toBe("default") // !
      expect( defaultValue(null)      ).toBe("default") // !
      expect( defaultValue(undefined) ).toBe("default") // !
      expect( defaultValue('')        ).toBe("default") // !
      expect( defaultValue(false)     ).toBe("default") // !
      expect( defaultValue(0)         ).toBe("default") // !
    })

    it('when passing null, undefined or no param (since 0, false and empty string have different meaning)', () => {
      function defaultValue(arg) {
        return arg
      }
      
      expect( defaultValue()          ).toBe("default") // !
      expect( defaultValue(null)      ).toBe("default") // !
      expect( defaultValue(undefined) ).toBe("default") // !
      expect( defaultValue('')        ).toBe("")
      expect( defaultValue(false)     ).toBe(false)
      expect( defaultValue(0)         ).toBe(0)
    })
  })
})
