class Human {
    #dateOfBirth = "2020-01-01"

    sayHi() {
        return `I was born on ${this.#dateOfBirth}`
    }
}

describe('Module...', () => {
    it('should ...', () => {
        expect(0).toBe(0)
    })
})

describe('Human', () => {
    it('should display date of birth', () => {
        const h = new Human
        const msg = h.sayHi()
        expect(msg).toEqual('I was born on 2020-01-01')
    });
})

