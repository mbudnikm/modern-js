fdescribe('Tree Iterators', () => {

	const tree = {
		value: 'A',
		children: [{
			value: 'B',
			children: [{
				value: 'E'
			}, {
				value: 'F'
			}, {
				value: 'G'
			}]
		}, {
			value: 'C',
			children: [{
				value: 'M',
				children: [{
					value: 'R'
				}]
			}, {
				value: 'N',
				children: [{
					value: 'S'
				}]
			}]
		}, {
			value: 'D',
			children: []
		}]
	};

	describe('with functions', () => {

		it('performs depth-first traversal', () => {
			// implement a function that will do a depth-first traversal on a given tree (1st param)
			// and execute the callback (2nd param) on each node, in appropriate order

			// define traverseDepth function here

			const traverseDepth = (node, fn) => {
				fn(node.value)
				if(node.children) {
					node.children.forEach(child => traverseDepth(child, fn))
				}
			}

			let tmp1 = '';
			const op1 = (item) => tmp1 += item;
			traverseDepth(tree, op1);
			expect(tmp1).toEqual('ABEFGCMRNSD');

			let tmp2 = [];
			const op2 = (item) => tmp2.push(item);
			traverseDepth(tree, op2);
			expect(tmp2).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);
		});

		it('performs breadth-first traversal', () => {
			// implement a function that will do a breadth-first traversal on a given tree (1st param)
			// and execute the callback (2nd param) on each node, in appropriate order

			// define traverseBreadth function here

			const traversBreadth = (node, fn) => {
				const queue = [node] // feed with root
				while(queue.length > 0) {
					const item = queue.shift()
					fn(item.value)
					if(item.children){
						queue.push(...item.children)
					}
				}

				/* 
					fn(queue[0].value)
					if(queue[0].children){
						queue.push(...queue[0].children)
					} 
					queue.shift()
				*/
			}

			let tmp1 = '';
			const op1 = (item) => tmp1 += item;
			traverseBreadth(tree, op1);
			expect(tmp1).toEqual('ABCDEFGMNRS');

			let tmp2 = [];
			const op2 = (item) => tmp2.push(item);
			traverseBreadth(tree, op2);
			expect(tmp2).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);
		});

	});

	fdescribe('with generators', () => {

		fit('performs depth-first traversal', () => {
			// now, instead of a function, implement a generator that will iterate over
			// the tree structure, in depth-first order

			// implement iterateDepthFirst generator here
			function* iterateDepthFirst(node) {
				yield node.value
				if(node.children) {
					for (var child of node.children) {
						yield* iterateDepthFirst(child)
					}
				}
			}

			let iterator = iterateDepthFirst(tree);
			expect([...iterator]).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);

			/* var myTree = {
				...tree, 
				[Symbol.iterator]: function() {	// fabryka iteratorów - wtedy jedna domyślna metoda iterowania
					return iterateDepthFirst(this)
				},
				depthFirstIterator: function() {	// fabryka iteratorów
					return iterateDepthFirst(this)
				}
			}

			expect([...myTree]).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D'])
			expect([...myTree.depthFirstIterator()]).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']); */

			iterator = iterateDepthFirst(tree);
			expect(iterator.next().value).toEqual('A');
			expect(iterator.next().value).toEqual('B');
			expect(iterator.next().value).toEqual('E');
			expect(iterator.next().value).toEqual('F');
		});

		it('performs breadth-first traversal', () => {
			// same as above, instead of a function, implement a generator for a breadth-first order

			// implement iterateBreadthFirst generator here

			let iterator = iterateBreadthFirst(tree);
			expect([...iterator]).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);

			iterator = iterateBreadthFirst(tree);
			expect(iterator.next().value).toEqual('A');
			expect(iterator.next().value).toEqual('B');
			expect(iterator.next().value).toEqual('C');
			expect(iterator.next().value).toEqual('D');
		});

	});

});
