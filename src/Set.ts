import { Collection, Iterator } from "./List";
import { Stream, StreamImplt } from "./Stream";

export class Set<E> implements Collection<E> {
	private set: E[] = [];
	private hash: number;

	public constructor(...elements: E[]) {
		for (const e of elements) {
			this.add(e);
		}
		this.hash = Math.floor(Math.random() * 10e9);
	}

	stream(): Stream<E> {
		return new StreamImplt(this.set);
	}

	add(e: E) {
		if (!this.contains(<object>e)) {
			this.set.push(e);
			return true;
		}
		return false;
	}

	addAll(c: Collection<E>) {
		let result = true;
		for (const e of c.iterator()) {
			result = result && this.add(e);
		}
		return result;
	}

	clear() {
		this.set = [];
	}

	contains(o: object) {
		for (const e of this.set) {
			if (o == e) return true;
		}
		return false;
	}

	containsAll(c: Collection<E>) {
		for (const e of c.iterator()) {
			if (!this.contains(<object>e)) return false;
		}
		return true;
	}

	equals(o: object) {
		if (!(o instanceof Set)) return false;

		const otherSet = <Set<E>>o;
		for (let i = 0; i < this.size(); i++) {
			if (this.set[i] != otherSet.set[i]) return false;
		}
		return true;
	}

	hashCode() {
		return this.hash;
	}

	isEmpty() {
		return this.set.length == 0;
	}

	iterator() {
		return new SetIterator<E>(this.set);
	}

	remove(o: object) {
		for (let i = 0; i < this.set.length; i++) {
			if (this.set[i] == o) {
				this.set.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	removeAll(c: Collection<E>) {
		let result = true;
		for (const e of c.iterator()) {
			result = result && this.remove(<object>e);
		}
		return result;
	}

	removeIf(cond: (e: E) => boolean) {
		let count = 0;

		for (const e of this.set) {
			if (cond(e)) {
				this.remove(<object>e);
				count++;
			}
		}

		return count;
	}

	size() {
		return this.set.length;
	}

	toArray() {
		return this.set;
	}
}

class SetIterator<E> implements Iterator<E> {
	private currentIndex = 0;

	public constructor(private readonly set: E[]) {}

	hasNext() {
		return this.currentIndex < this.set.length;
	}

	next() {
		return this.set[this.currentIndex++];
	}

	remove() {
		this.set.splice(this.currentIndex, 1);
	}

	[Symbol.iterator](): { next: () => { value: E; done: boolean } } {
		return {
			next: () => {
				if (this.hasNext()) {
					return {
						value: this.next(),
						done: false,
					};
				} else {
					return {
						value: <E>null,
						done: true,
					};
				}
			},
		};
	}
}
