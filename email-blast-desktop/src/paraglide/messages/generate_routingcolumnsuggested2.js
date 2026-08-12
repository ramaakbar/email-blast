/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Generate_Routingcolumnsuggested2Inputs */

const en_generate_routingcolumnsuggested2 = /** @type {(inputs: Generate_Routingcolumnsuggested2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} (suggested)`)
};

const id_generate_routingcolumnsuggested2 = /** @type {(inputs: Generate_Routingcolumnsuggested2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} (disarankan)`)
};

/**
* | output |
* | --- |
* | "{column} (suggested)" |
*
* @param {Generate_Routingcolumnsuggested2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_routingcolumnsuggested2 = /** @type {((inputs: Generate_Routingcolumnsuggested2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Routingcolumnsuggested2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_routingcolumnsuggested2(inputs)
	return en_generate_routingcolumnsuggested2(inputs)
});
export { generate_routingcolumnsuggested2 as "generate.routingColumnSuggested" }