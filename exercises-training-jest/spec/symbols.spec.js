describe('Symbols', () => {

  it('should be unique', () => {
    var s1 = Symbol('secret');
    var s2 = Symbol('secret');
    var s3 = Symbol('secret');
    expect(s1 == s2).toEqual( /* YOUR ANSWER HERE */ );
    expect(s2 == s3).toEqual( /* YOUR ANSWER HERE */ );
    expect(s1 == s3).toEqual( /* YOUR ANSWER HERE */ );
  });

  it('should be shared in global symbol registry', () => {
    var s1 = Symbol.for('secret');
    var s2 = Symbol.for('secret');
    expect(s1 == s2).toEqual( /* YOUR ANSWER HERE */ );
  });

  it('should unique and shared symbols in separate registries', () => {
    var s1 = Symbol('secret');
    var s2 = Symbol.for('secret');
    expect(s1 == s2).toEqual( /* YOUR ANSWER HERE */ );
  });

  it('should (appear/not appear) in Object.keys|values|entries', () => {
    var s1 = Symbol('secret');
    var s2 = Symbol.for('secret');
    var secretObject = {
      [s1]: 'some',
      [s2]: 'secret',
    }
    expect(Object.keys(secretObject).length).toEqual( /* YOUR ANSWER HERE */ );
    expect(Object.values(secretObject).length).toEqual( /* YOUR ANSWER HERE */ );
    expect(Object.entries(secretObject).length).toEqual( /* YOUR ANSWER HERE */ );
  });

});
