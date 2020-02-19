describe('[].flat', () => {
  it('should flatten an array', () => {
    var arr = [1, 2, 3]
    expect(arr.flat()).toEqual(/* YOUR ANSWER HERE */)

    var arr = [1, [2], [3]]
    expect(arr.flat()).toEqual(/* YOUR ANSWER HERE */)

    var arr = [1, [[2], [3]]]
    expect(arr.flat()).toEqual(/* YOUR ANSWER HERE */)
  });
});

describe('[].flatMap', () => {
  it('should flatten the product of mapping the array', () => {
    const numberAndHalf = x => [x, x + 0.5]

    // let's start with an ordinayr [].map
    var arr = [1, 2, 3]
    expect(arr.map(numberAndHalf)).toEqual(/* YOUR ANSWER HERE */)

    var arr = [1, 2, 3]
    expect(arr.flatMap(numberAndHalf)).toEqual(/* YOUR ANSWER HERE */)

    // fix the following
    expect(arr.flatMap(numberAndHalf)).toEqual( arr.map(numberAndHalf) /* YOUR ANSWER HERE */ )
  })
})

/*
EXERCISE:
- generating data for a dropdown; a user chooses tax rates
*/

describe('Object.fromEntries', () => {

  const roundTo2 = value => Math.round(value * 100) / 100
  const percentLabel = (value) => `${roundTo2(value * 100)}%`

  it('should produce a new object with primitive values', () => {

    const highestTaxValues = {
      taxPL: 0.23,
      taxDE: 0.19,
      taxFR: 0.20,
      taxUK: 0.20,
    }

    // map all tax values using `percentLabel` and produce a new object
    // use Object.fromEntries
    const highestTaxLabels = {}

    // no mutations on original object
    expect(highestTaxLabels).not.toBe(highestTaxValues)
    expect(highestTaxLabels).toEqual({
      taxPL: '23%',
      taxDE: '19%',
      taxFR: '20%',
      taxUK: '20%',
    })
  })

  it('should produce a new object with array values', () => {
    const allTaxValues = {
      taxPL: [0, 0.05, 0.08, 0.23],
      taxDE: [0, 0.07, 0.19],
      taxFR: [0, 0.021, 0.055, 0.10, 0.20],
      taxUK: [0, 0.05, 0.20],
    }

    // similar as above, but map an array of numbers instead of just a number
    const allTaxLabels = {}

    // no mutations on original object
    expect(allTaxLabels).not.toBe(allTaxValues)
    expect(allTaxLabels).toEqual({
      taxPL: ['0%', '5%', '8%', '23%'],
      taxDE: ['0%', '7%', '19%'],
      taxFR: ['0%', '2.1%', '5.5%', '10%', '20%'],
      taxUK: ['0%', '5%', '20%'],
    })
  })

  it('should produce a new object that includes original pairs and the newly computed pairs', () => {
    const allTaxValues = {
      taxPL: [0, 0.05, 0.08, 0.23],
      taxDE: [0, 0.07, 0.19],
      taxFR: [0, 0.021, 0.055, 0.10, 0.20],
      taxUK: [0, 0.05, 0.20],
    }

    // similar as above, but include both original values AND the labels
    const allTaxValuesAndLabels = {}

    // no mutations on original object
    expect(allTaxValuesAndLabels).not.toBe(allTaxValues)
    expect(allTaxValuesAndLabels).toEqual({
      taxPL: [0, 0.05, 0.08, 0.23],
      taxPLPercent: ['0%', '5%', '8%', '23%'],
      taxDE: [0, 0.07, 0.19],
      taxDEPercent: ['0%', '7%', '19%'],
      taxFR: [0, 0.021, 0.055, 0.10, 0.20],
      taxFRPercent: ['0%', '2.1%', '5.5%', '10%', '20%'],
      taxUK: [0, 0.05, 0.20],
      taxUKPercent: ['0%', '5%', '20%'],
    })
  })
})
