describe('Properties', () => {
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
    [Symbol('SSN')]: "626-78-6874",
    [Symbol.for('credit-card')]: "377393246768711",
  }

  describe('Standard Properties', () => {
    it('should be indexable', () => {
      const props = Object.getOwnPropertyNames(john);
      expect(props).toEqual( /* YOUR ANSWER HERE */ );
    });
  });

  describe('Symbols', () => {
    it('should be indexable', () => {
      const symbols = Object.getOwnPropertySymbols(john);
      expect(symbols).toEqual( /* YOUR ANSWER HERE */ );
    });
  });

  describe('Descriptors', () => {
    it('should be indexable', () => {
      const descriptors = Object.getOwnPropertyDescriptors(john);

      expect(Array.isArray(descriptors)).toEqual( /* YOUR ANSWER HERE */ );
      expect(Object.keys(descriptors)).toEqual( /* YOUR ANSWER HERE */ );
      
      // find a way to access both standard properties and symbols of a given object:
      // define `keysWithSymbols` here

      expect(keysWithSymbols.length).toEqual(6);
      expect(keysWithSymbols.includes(Symbol.for('credit-card'))).toEqual(true);
    });
  });
});
