/**
 *
 */
import { Collection } from "./List";
import { Entry, Map } from "./Map";
import { Set } from "./Set";

export class HashMap<K extends number | string | symbol, V>
	implements Map<K, V>
{
	private hash: number;

	public constructor(private map: Record<K, V>) {
		this.hash = Math.floor(Math.random() * 10e9);
	}

	clear(): void {
		this.map = <Record<K, V>>{};
	}

	containsKey(key: K): boolean {
		return this.map[key] != undefined;
	}

	containsValue(value: V): boolean {
		for (const key in this.map) {
			if (this.map[key] == value) return true;
		}
		return false;
	}

	entrySet(): Set<Entry<K, V>> {
		const set = new Set<Entry<K, V>>();
		for (const e in this.map) {
			set.add({ key: e, value: this.map[e] });
		}
		return set;
	}

	equals(o: Map<K, V>): boolean {
		return false;
	}

	get(key: K): V {
		return this.map[key];
	}

	hashCode(): number {
		return this.hash;
	}

	isEmpty(): boolean {
		return (
			this.map && // 👈 null and undefined check
			Object.keys(this.map).length === 0
		);
	}

	keySet(): Set<K> {
		const set = new Set<K>();
		for (const e in this.map) {
			set.add(e);
		}
		return set;
	}

	put(key: K, value: V): V {
		this.map[key] = value;
		return value;
	}

	putAll(map: Map<K, V>): void {
		for (const e of map.entrySet().iterator()) {
			this.map[e.key] = e.value;
		}
	}

	remove(key: K): V {
		const e = this.map[key];
		delete this.map[key];
		return e;
	}

	replace(key: K, value: V): V {
		this.map[key] = value;
		return value;
	}

	size(): number {
		return Object.keys(this.map).length;
	}

	values(): Collection<V> {
		const set = new Set<V>();
		for (const e in this.map) {
			set.add(this.map[e]);
		}
		return set;
	}
}
