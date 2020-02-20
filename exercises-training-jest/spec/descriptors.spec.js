describe('Descriptors', () => {
  it('should create fully customizable properties', () => {
    var johnLiteral = {
      firstName: 'John',
      lastName: 'Lennon',
      name(){ return `${this.firstName} ${this.lastName}` }
    }
    
    // define a property on johnLiteral here

    expect(johnLiteral.fullname).toBe('John Lennon')
  })

  it('should create fully customizable properies on classes', () => {
    class Person {
      constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
      }

      name(){ return `${this.firstName} ${this.lastName}` }
    }

    // define a property on Person class here

    var johnPerson = new Person('John', 'Lennon')

    expect(johnPerson.fullname).toBe('John Lennon')
  });
});
