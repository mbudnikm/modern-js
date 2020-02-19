describe('Properties', () => {
  const ssn = Symbol('SSN')

  const john = {
    name: "John",
    hi(){
      return `Hi, I'm ${this.name}`
    },
    get age(){ return  },
    numbers: function*(){
      while (true){
        yield Math.round(Math.random() * 1000)
      }
    },
    [ssn]: "626-78-6874",
    [Symbol.for('credit-card')]: "377393246768711",
  }

  describe('Standard Properties', () => {
    it('should be indexable', () => {
      const props = Object.getOwnPropertyNames(john);
      expect(props).toEqual(['name', 'hi', 'age', 'numbers'])
    });
  });

  describe('Symbols', () => {
    it('should be indexable', () => {
      const symbols = Object.getOwnPropertySymbols(john);
      expect(symbols).toEqual([ssn, Symbol.for('credit-card')]);
    });
  });

  describe('Descriptors', () => {
    it('should be indexable', () => {
      const descriptors = Object.getOwnPropertyDescriptors(john);

      expect(Array.isArray(descriptors)).toEqual(false);
      expect(Object.keys(descriptors)).toEqual(['name', 'hi', 'age', 'numbers']);
      
      // find a way to access both standard properties and symbols of a given object:
      // define `keysWithSymbols` here
      const getkeysWithSymbols = (obj) => {
        return [
          ...Object.getOwnPropertyNames(obj),
          ...Object.getOwnPropertySymbols(obj)
        ]
      }

      const keysWithSymbols = getkeysWithSymbols(john)

      expect(keysWithSymbols.length).toEqual(6);
      expect(keysWithSymbols.includes(Symbol.for('credit-card'))).toEqual(true);
    });
  });
});
