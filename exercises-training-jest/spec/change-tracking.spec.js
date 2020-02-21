/*
GIVEN:
- a plain object which is not observable

EXERCISES:
1. making a single static property of an object observable
2. making two properties observable (different channels)
*/

describe('Observable Object', () => {

  it('should notify subscribers after property changed', () => {
    const obj = {
      data: "some data",
      irrelevant: "stuff",
    }
          
    // NOTIFY the spy function with future changes
    const spy = jest.fn()
    obj.subscribe('data', spy)

    // no changes yet
    expect(spy).not.toHaveBeenCalled()

    obj.data = 'new data'
    expect(spy).toHaveBeenCalledWith('new data')
    expect(obj.data).toEqual('new data')

    obj.data = 'another data'
    expect(spy).toHaveBeenCalledWith('another data')
    expect(obj.data).toEqual('another data')
  })

  it('should notify subscribers on property-per-topic basis', () => {
    const config = {
      region: "EMEA",
      language: "en-us",
      authToken: "5675-9754-1674-7237-2675-2753",
    }

    const spyRegion = jest.fn()
    config.subscribe('region', spyRegion)

    const spyLanguage = jest.fn()
    config.subscribe('language', spyLanguage)

    // no changes yet
    expect(spyRegion).not.toHaveBeenCalled()
    expect(spyLanguage).not.toHaveBeenCalled()

    expect(config.region).toEqual('EMEA')
    config.region = 'APAC'
    expect(spyRegion).toHaveBeenCalledWith('APAC')
    expect(config.region).toEqual('APAC')
    expect(spyLanguage).not.toHaveBeenCalled()

    expect(config.language).toEqual('en-us')
    config.language = 'zh-ch'
    expect(spyLanguage).toHaveBeenCalledWith('zh-ch')
    expect(config.language).toEqual('zh-ch')

    config.authToken = "7237-2753-5675-9754-2675-1674"
    expect(spyRegion).toHaveBeenCalledTimes(1)
    expect(spyLanguage).toHaveBeenCalledTimes(1)
  })
})
