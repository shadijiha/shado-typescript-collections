/**
 *
 */

import { Stream } from "./Stream";

export interface Iterator<E> {
	hasNext: () => boolean;
	next: () => E;
	remove: () => void;

	[Symbol.iterator](): { next: () => { value: E; done: boolean } };
}

export interface Collection<E> {
	add: (e: E) => boolean;
	addAll: (c: Collection<E>) => boolean;
	clear: () => void;
	contains: (o: object) => boolean;
	containsAll: (c: Collection<E>) => boolean;
	equals: (o: object) => boolean;
	hashCode: () => number;
	isEmpty: () => boolean;
	iterator: () => Iterator<E>;
	remove: (o: object) => boolean;
	removeAll: (c: Collection<E>) => boolean;
	removeIf: (cond: (e: E) => boolean) => number;
	size: () => number;
	toArray: () => E[];
	stream(): Stream<E>;
}

export interface List<E> extends Collection<E> {
	addAt: (index: number, element: E) => void;
	addAllAt: (index: number, c: Collection<E>) => boolean;
	get: (index: number) => E;
	indexOf: (e: E) => number;
	set: (index: number, e: E) => void;
	sort: (func: (a: E, b: E) => number) => void;
	subList: (start: number, end: number) => List<E>;
	removeAt: (i: number) => void;
}
