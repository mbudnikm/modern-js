import {
  API_URL, PAGE_SIZE,
  getPage, getCount
} from '../api'

const salarySum = (employees) =>
  employees.reduce((sum, e) => sum + e.salary, 0)

describe('Async Function', () => {
  it('should scrape entire collection page by page', async () => {
    // scraping entire collection from a REST API might take long time (these are real calls)
    // you can either (or both):
    // jest.setTimeout(30000) // make the accepted timeout longer
    // npm start -- -d 10 // mock API: restart with a shorter delay parameter

    // loads all pages one by one
    function entireEmployeesCollection(){}

    const resultItems = entireEmployeesCollection()
    expect( resultItems ).toHaveLength(1311)
    expect( salarySum(resultItems) ).toBe(7208512)
  })

  // different strategies to implement
  it('should scrape entire collection and notify on each page', async () => {
    const spy = jest.fn()

    function entireEmployeesCollection(){}

    const resultItems = entireEmployeesCollection()
    expect(spy).toHaveBeenCalledTimes(27)
    expect( resultItems ).toHaveLength(1311)
    expect( salarySum(resultItems) ).toBe(7208512)
  })
})

describe('Async Iterators', () => {

  describe('Function', () => {
    it('should paginate over entire collection', async () => {
      // can only go forward (next page)
      // use ASYNC ITERATORS

      function paginateEmployees(){}
  
      const resultPages = [];
  
      expect( resultPages[0] ).toHaveLength(50)
      expect( salarySum(resultPages[0]) ).toBe(270997)
  
      expect( resultPages[1] ).toHaveLength(50)
      expect( salarySum(resultPages[1]) ).toBe(246712)
  
      expect( resultPages[26] ).toHaveLength(11)
      expect( salarySum(resultPages[26]) ).toBe(63394)      
    })
  })

  describe('Object', () => {
    it('should paginate over entire collection', async () => {
      // can go both forward (next page) and backwards (prev page)

      const paginator = {}
  
      let page
  
      // 1st page, http://localhost:3000/employees?_page=1
      page = await paginator.reload()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(270997)
      
      // 2nd page, http://localhost:3000/employees?_page=2
      page = await paginator.next()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(246712)
  
      // 1st page again
      page = await paginator.prev()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(270997)
    })
  })

  describe('Class', () => {
    it('should paginate over entire collection', async () => {
      // same as above:
      // - can go both forward (next page) and backwards (prev page)
      // but also supports last page. How to achieve that? http://www.rumah2lantai.com/wp-content/uploads/2018/12/hmm.jpg

      const paginator = {}
      let page
  
      page = await paginator.reload()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(270997)
  
      page = await paginator.next()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(246712)
  
      page = await paginator.prev()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(270997)
  
      // 27th page, http://localhost:3000/employees?_page=27
      page = await paginator.last()
      expect( page ).toHaveLength(11)
      expect( salarySum(page) ).toBe(63394)
  
      page = await paginator.first()
      expect( page ).toHaveLength(50)
      expect( salarySum(page) ).toBe(270997)
    })
  })
})
