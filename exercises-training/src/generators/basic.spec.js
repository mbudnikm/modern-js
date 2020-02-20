describe('generators', () => {

	it('should yield values and terminate', () => {
		function* reciteHamletPrinceOfDenmark() {
			yield "to"
			yield "be"
			yield "or"
			yield "not"
			yield "to"
			yield "be"
		}

		const hamlet = reciteHamletPrinceOfDenmark()

		expect(hamlet.next().value).toBe("to")
		expect(hamlet.next().value).toBe("be")
		expect(hamlet.next().value).toBe("or")
		expect(hamlet.next().value).toBe("not")
		expect(hamlet.next().value).toBe("to")
		expect(hamlet.next().value).toBe("be")
		expect(hamlet.next().value).toBe(undefined)
	})

	it('should yield objects with value and done properties', () => {
		function* oddNumbers() {
			yield 1
			yield 3
			yield 5
			yield 7
			yield 9
		}

		const odds = oddNumbers()

		expect(odds.next().value).toBe(1)
		expect(odds.next().value).toBe(3)
		expect(odds.next().done).toBe(false)
		odds.next()
		expect(odds.next().value).toBe(9)
		expect(odds.next().done).toBe(true)
	})

	it('can be iterated over', () => {
		function* evenNumbers() {
			yield 2
			yield 4
			yield 6
			yield 8
		}

		let sum = 0
		for (let even of evenNumbers()) {
			sum = sum + even
		}

		expect(sum).toBe(20)
	})

	it('can accept values from outside', () => {
		function* fibonacci(){
			var fn1 = 0;
			var fn2 = 1;
			while (true){
				var current = fn1;
				fn1 = fn2;
				fn2 = current + fn1;
				var reset = yield current; // pierwsze yield, potem przypisanie do reseta

				if (reset){
						fn1 = 0;
						fn2 = 1;
				}
			}
		}

		var fib = fibonacci()

		expect(fib.next().value).toBe(0)
		expect(fib.next().value).toBe(1)
		expect(fib.next().value).toBe(1)
		expect(fib.next().done).toBe(false) // 2
		fib.next() // 3
		expect(fib.next().value).toBe(5)
		expect(fib.next().value).toBe(8)
		expect(fib.next(true).done).toBe(false) // reset -> 0
		expect(fib.next().value).toBe(1)
		fib.next()
		expect(fib.next(false).value).toBe(2)
		expect(fib.next(undefined).value).toBe(3)
		expect(fib.next("training hell yeah!").value).toBe(0)
		expect(fib.next().done).toBe(false)
	})
})
