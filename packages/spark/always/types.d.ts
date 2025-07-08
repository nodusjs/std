/**
 * Declaração de tipo para o spark 'always'.
 *
 * @description
 * Retorna o segundo argumento que recebe, ignorando o primeiro. É usado
 * em um pipeline de dados para substituir o valor atual por um valor
 * constante e pré-definido.
 *
 * @param _token - O valor atual no pipeline de dados (este valor é ignorado).
 * @param value - O valor constante que será retornado.
 * @returns O valor do segundo argumento (`value`).
 *
 * @example
 * // Em um dataflow de Echo: `on="...|always=meuValorFixo"`
 * // O `always` receberá (dadoDoEvento, "meuValorFixo") e retornará "meuValorFixo".
 */
export declare function always(_token: any, value: any): any;
