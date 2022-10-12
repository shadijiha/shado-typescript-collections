import { ArrayList } from "./ArrayList";
import { List } from "./List";
import { Set } from "./Set";

export interface Stream<E> {
	allMatch(cond: (e: E) => boolean): boolean;
	anyMatch(cond: (e: E) => boolean): boolean;
	noneMatch(cond: (e: E) => boolean): boolean;

	toList(): List<E>;
	toSet(): Set<E>;
	toArray(): E[];

	count(): number;
	distinct(): Stream<E>;
	empty(): boolean;
	filter(func: (e: E) => boolean): Stream<E>;

	findAny(): E | null;
	findFirst(): E | null;
	flatMap<R>(): Stream<R>;

	forEach(func: (e: E) => void): void;

	limit(max: number): Stream<E>;
	skip(n: number): Stream<E>;

	map<R>(func: (e: E) => R): Stream<R>;

	max(comparator: (a: E, b: E) => number): E | null;
	min(comparator: (a: E, b: E) => number): E | null;
	reduce(identity: E, accumulator: (acc: E, num: E) => E): E;

	sorted(func: (a: E, b: E) => number): Stream<E>;
}

export class StreamImplt<E> implements Stream<E> {
	private functions: ((e: E) => boolean)[] = [];
	private compators: ((a: E, b: E) => number)[] = [];
	private _limit: number = -1;
	private _skip: number = 0;

	private sortFunction: ((a: E, b: E) => number) | null = null;
	private mapFunction: ((e: any) => any) | null = null;

	public constructor(private readonly data: any[] = []) {
		this._limit = this.data.length;
	}

	allMatch(cond: (e: E) => boolean): boolean {
		const newdata = this.execute();

		for (const e of newdata) {
			if (!cond(e)) return false;
		}

		return true;
	}

	anyMatch(cond: (e: E) => boolean): boolean {
		const newdata = this.execute();

		for (const e of newdata) {
			if (cond(e)) return true;
		}

		return false;
	}

	noneMatch(cond: (e: E) => boolean): boolean {
		const newdata = this.execute();

		for (const e of newdata) {
			if (cond(e)) return false;
		}

		return true;
	}

	toList(): List<E> {
		const newData = this.execute();
		const set = new ArrayList<E>();
		for (const e of newData) {
			set.add(e);
		}
		return set;
	}

	toSet(): Set<E> {
		const newData = this.execute();
		const set = new Set<E>();
		for (const e of newData) {
			set.add(e);
		}
		return set;
	}

	toArray(): E[] {
		return this.execute();
	}

	count(): number {
		const newData = this.execute();
		return newData.length;
	}

	distinct(): Stream<E> {
		const newData = this.execute();
		const set = new Set<E>();
		for (const e of newData) {
			set.add(e);
		}
		return new StreamImplt<E>(set.toArray());
	}

	empty(): boolean {
		const newData = this.execute();
		return newData.length == 0;
	}

	filter(func: (e: E) => boolean): Stream<E> {
		this.functions.push(func);
		return this;
	}

	findAny(): E | null {
		throw new Error("Method not implemented.");
	}

	findFirst(): E | null {
		const newData = this.execute();
		if (this.empty()) return null;
		return newData[0];
	}

	flatMap<R>(): Stream<R> {
		throw new Error("Method not implemented.");
	}

	forEach(func: (e: E) => void): void {
		const newData = this.execute();
		for (const e of newData) {
			func(e);
		}
	}

	limit(max: number): Stream<E> {
		this._limit = max;
		return this;
	}

	skip(n: number): Stream<E> {
		this._skip = n;
		return this;
	}

	map<R>(func: (e: E) => R): Stream<R> {
		this.mapFunction = func;
		const newData = this.execute();
		return new StreamImplt<R>(newData);
	}

	max(comparator: (a: E, b: E) => number): E | null {
		const newData = this.execute();

		let toReturn: E | null = null;
		for (const e of newData) {
			if (comparator(<E>toReturn, e) < 0) {
				toReturn = e;
			}
		}
		return toReturn;
	}

	min(comparator: (a: E, b: E) => number): E | null {
		const newData = this.execute();

		let toReturn: E | null = null;
		for (const e of newData) {
			if (comparator(<E>toReturn, e) > 0) {
				toReturn = e;
			}
		}
		return toReturn;
	}

	reduce(identity: E, accumulator: (acc: E, num: E) => E): E {
		const newData = this.execute();

		let toReturn: E = identity;
		for (const e of newData) {
			toReturn = accumulator(toReturn, e);
		}
		return toReturn;
	}

	sorted(func: (a: E, b: E) => number): Stream<E> {
		this.sortFunction = func;
		return this;
	}

	private execute(): any[] {
		const copy = [...this.data];
		if (this.sortFunction) {
			copy.sort(this.sortFunction);
		}

		const toReturn = [];
		for (let i = this._skip; i < this._limit + this._skip; i++) {
			let insert = true;
			for (const func of this.functions) {
				insert = insert && func(copy[i]);
			}
			if (insert) {
				toReturn.push(copy[i]);
			}
		}

		if (this.mapFunction) {
			for (let i = 0; i < toReturn.length; i++) {
				toReturn[i] = this.mapFunction(toReturn[i]);
			}
		}

		return toReturn;
	}
}
