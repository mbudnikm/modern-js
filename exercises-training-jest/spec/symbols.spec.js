describe('Symbols', () => {

  it('should be unique', () => {
    var s1 = Symbol('secret');
    var s2 = Symbol('secret');
    var s3 = Symbol('secret');
    expect(s1 == s2).toEqual(false);
    expect(s2 == s3).toEqual(false);
    expect(s1 == s3).toEqual(false);
  });

  it('should be shared in global symbol registry', () => {
    var s1 = Symbol.for('secret');
    var s2 = Symbol.for('secret');
    expect(s1 == s2).toEqual(true);
  });

  it('should unique and shared symbols in separate registries', () => {
    var s1 = Symbol('secret');
    var s2 = Symbol.for('secret');
    expect(s1 == s2).toEqual(false);
  });

  it('should (appear/not appear) in Object.keys|values|entries', () => {
    var s1 = Symbol('secret');
    var s2 = Symbol.for('secret');
    var secretObject = {
      [s1]: 'some',
      [s2]: 'secret',
    }
    expect(Object.keys(secretObject).length).toEqual(0);
    expect(Object.values(secretObject).length).toEqual(0);
    expect(Object.entries(secretObject).length).toEqual(0);
  });

});
