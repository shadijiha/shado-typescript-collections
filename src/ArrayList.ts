import { Collection, Iterator, List } from "./List";
import { Stream, StreamImplt } from "./Stream";

export class ArrayList<E> implements List<E> {
	private readonly hash: number;
	private array: E[] = [];

	public constructor(...elements: E[]) {
		for (const e of elements) this.add(e);

		this.hash = Math.floor(Math.random() * 10e9);
	}

	public stream(): Stream<E> {
		return new StreamImplt(this.array);
	}

	public addAt(index: number, element: E) {
		this.array.splice(index, 0, element);
	}

	addAllAt(index: number, c: Collection<E>) {
		let i = index;
		for (const e of c.iterator()) {
			this.addAt(i, e);
			i++;
		}
		return true;
	}

	get(index: number) {
		this.checkIndex(index);
		return this.array[index];
	}

	indexOf(e: E) {
		for (let i = 0; i < this.array.length; i++) {
			if (this.array[i] == e) return i;
		}
		return -1;
	}

	set(index: number, e: E) {
		this.checkIndex(index);
		this.array[index] = e;
	}

	sort(func: (a: E, b: E) => number) {
		this.array.sort(func);
	}

	subList(start: number, end: number): List<E> {
		this.checkIndex(start);
		this.checkIndex(end);

		const list = new ArrayList<E>();
		for (let i = start; i < end; i++) {
			list.add(this.get(i));
		}
		return list;
	}

	add(e: E) {
		this.array.push(e);
		return true;
	}

	addAll(c: Collection<E>) {
		for (const e of c.iterator()) {
			this.add(e);
		}
		return true;
	}

	clear() {
		this.array = [];
	}

	contains(o: object) {
		for (let i = 0; i < this.array.length; i++) {
			if (this.array[i] == o) return true;
		}
		return false;
	}

	containsAll(c: Collection<E>) {
		for (const e of c.iterator()) {
			if (!this.contains(<object>e)) {
				return false;
			}
		}

		return true;
	}

	equals(o: object) {
		if (!(o instanceof ArrayList)) return false;

		const list = o as ArrayList<E>;
		if (list.size() != this.size()) return false;

		for (let i = 0; i < this.array.length; i++) {
			if (this.array[i] != list.get(i)) return false;
		}
		return true;
	}

	hashCode() {
		return this.hash;
	}

	isEmpty() {
		return this.array.length == 0;
	}

	iterator(): Iterator<E> {
		return new ListIterator<E>(this);
	}

	remove(o: object) {
		const index = this.indexOf(o as E);
		if (index > -1) {
			this.array.splice(index, 1);
			return true;
		} else return false;
	}

	removeAll(c: Collection<E>) {
		for (const e of c.iterator()) {
			this.remove(<object>e);
		}
		return true;
	}

	removeIf(cond: (e: E) => boolean) {
		let count = 0;

		for (let i = 0; i < this.size(); i++) {
			if (cond(this.array[i])) {
				this.removeAt(i);
				count++;
			}
		}

		return count;
	}

	removeAt(i: number) {
		this.checkIndex(i);
		this.array.splice(i, 1);
	}

	size() {
		return this.array.length;
	}

	toArray() {
		return this.array;
	}

	private checkIndex(i: number) {
		if (i < 0 || i >= this.array.length)
			throw new ArrayIndexOutOfBound(i, this.array);
	}
}

class ListIterator<E> implements Iterator<E> {
	private currentIndex: number = 0;
	public constructor(private readonly list: List<E>) {}

	[Symbol.iterator]() {
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

	hasNext() {
		return this.currentIndex < this.list.size();
	}
	next() {
		return this.list.get(this.currentIndex++);
	}
	remove() {
		this.list.removeAt(this.currentIndex);
	}
}

class ArrayIndexOutOfBound extends Error {
	constructor(i: number, arr: any[]) {
		super(`Cannot get index ${i} for array of size ${arr.length}`);
	}
}
