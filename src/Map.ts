/**
 *
 */

import { Collection } from "./List";
import { Set } from "./Set";

export interface Map<K extends number | string | symbol, V> {
	clear(): void;
	containsKey(key: K): boolean;
	containsValue(value: V): boolean;
	entrySet(): Set<Entry<K, V>>;
	equals(o: Map<K, V>): boolean;
	get(key: K): V;
	hashCode(): number;
	isEmpty(): boolean;
	keySet(): Set<K>;
	put(key: K, value: V): V;
	putAll(map: Map<K, V>): void;
	remove(key: K): V;
	replace(key: K, value: V): V;
	size(): number;
	values(): Collection<V>;
}

export interface Entry<K extends number | string | symbol, V> {
	key: K;
	value: V;
}
