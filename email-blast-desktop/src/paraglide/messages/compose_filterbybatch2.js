/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Filterbybatch2Inputs */

const en_compose_filterbybatch2 = /** @type {(inputs: Compose_Filterbybatch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by import batch`)
};

const id_compose_filterbybatch2 = /** @type {(inputs: Compose_Filterbybatch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saring berdasarkan batch impor`)
};

/**
* | output |
* | --- |
* | "Filter by import batch" |
*
* @param {Compose_Filterbybatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_filterbybatch2 = /** @type {((inputs?: Compose_Filterbybatch2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Filterbybatch2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_filterbybatch2(inputs)
	return en_compose_filterbybatch2(inputs)
});
export { compose_filterbybatch2 as "compose.filterByBatch" }