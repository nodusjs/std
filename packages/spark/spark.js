import { registry } from "./registry";

/**
 * Objeto `spark` expõe acesso dinâmico ao registro de transformadores.
 *
 * @description
 * Ele permite a recuperação (`get`) e o registro (`set`) de funções que transformam
 * valores no fluxo dos arcos do Echo. Cada função registrada pode ser referenciada
 * por nome em protocolos declarativos como: `source/event:type/sink|add=1|len`.
 *
 * @example
 * spark.get("len")("abc") // 3
 * spark.set("double", x => x * 2)
 */
const spark = {
	/**
	 * Recupera uma função registrada pelo nome.
	 *
	 * @param {string} name - Nome do spark.
	 * @returns {Function} A função correspondente ou uma função no-op.
	 *
	 * @example
	 * spark.get("len")("abc") // 3
	 * spark.get("desconhecido")(42) // 42 (no-op)
	 */
	get(name) {
		return registry[name] ?? ((x) => x);
	},

	/**
	 * Registra uma nova função spark.
	 *
	 * @param {string} name - Nome da função.
	 * @param {Function} fn - Função a ser registrada.
	 * @returns {typeof spark} Retorna a própria API para encadeamento.
	 *
	 * @example
	 * spark.set("square", x => x * x)
	 */
	set(name, fn) {
		registry[name] = fn;
		return spark;
	},
};

export default spark;
