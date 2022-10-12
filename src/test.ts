/**
 *
 */

import { ArrayList } from "./ArrayList";
import { Collection, List } from "./List";
import { Set } from "./Set";

function main() {
	const list: Collection<number> = new Set<number>(1, 2, 3, 4, 5, 6, 5);

	list
		.stream()
		.map((e) => e * 2)
		.filter((e) => e >= 8)
		.forEach((e) => console.log(e));
}
main();
