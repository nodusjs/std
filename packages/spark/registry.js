import { add } from "./add";
import { dec } from "./dec";
import { different } from "./different";
import { equals } from "./equals";
import { gt } from "./gt";
import { gte } from "./gte";
import { inc } from "./inc";
import { len } from "./len";
import { lt } from "./lt";
import { lte } from "./lte";
import { not } from "./not";
import { prop } from "./prop";
import { subtract } from "./subtract";
import { truthy } from "./truthy";

/**
 * Objeto contendo todos os sparks registrados.
 * Cada chave corresponde ao nome da função utilizada no arco.
 */
export const registry = {
	add,
	dec,
	different,
	equals,
	gt,
	gte,
	inc,
	len,
	lt,
	lte,
	not,
	prop,
	subtract,
	truthy,
};
