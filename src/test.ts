/**
 *
 */

import { ArrayList } from "./ArrayList";
import { Collection, List } from "./List";
import { Set } from "./Set";

function main() {
	const list: Collection<number> = new Set<number>(1, 2, 3, 4, -10, 5, 6, 5);

	const stream = list.stream().sorted((a, b) => a - b);

	console.log(stream.forEach((e) => console.log(e)));
	console.log(stream.mean((e) => e));
	console.log(stream.median((e) => e));
}
main();
