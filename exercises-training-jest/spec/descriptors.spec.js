describe('Descriptors', () => {
  it('should create fully customizable properties', () => {
    var johnLiteral = {
      firstName: 'John',
      lastName: 'Lennon',
      name(){ return `${this.firstName} ${this.lastName}` }
      // get fullname(){ return `${this.firstName} ${this.lastName}`}
    }

    Object.defineProperties(johnLiteral, {
      fullname: {
        enumerable: false,
        // value: johnLiteral.name() <-- trzymamy rzecz dynamiczną, jak ją później zmienimy to będzie błąd
        get (){ return this.name() }
        // get (){ return `${this.firstName} ${this.lastName}`}
      }
    })
    
    // define a property on johnLiteral here

    expect(johnLiteral.fullname).toBe('John Lennon')
    //expect(Object.keys(johnLiteral).length).toBe(3)
    expect(Object.keys(johnLiteral)).toHaveLength(3)

    johnLiteral.firstName = "Sir John"
    expect(johnLiteral.fullname).toBe("Sir John Lennon")
  })

  it('should create fully customizable properties on classes', () => {
    class Person {
      constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
      }

      name(){ return `${this.firstName} ${this.lastName}` }
    }

    Object.defineProperties(Person.prototype, {
      fullname: {
        enumerable: false,
        get (){ return this.name() }
      }
    })

    // define a property on Person class here

    var johnPerson = new Person('John', 'Lennon')

    expect(johnPerson.fullname).toBe('John Lennon')
    expect(Object.keys(johnPerson)).toEqual(['firstName', 'lastName'])
  });
});
