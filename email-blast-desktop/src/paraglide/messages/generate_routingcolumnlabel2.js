/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Routingcolumnlabel2Inputs */

const en_generate_routingcolumnlabel2 = /** @type {(inputs: Generate_Routingcolumnlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Route by column`)
};

const id_generate_routingcolumnlabel2 = /** @type {(inputs: Generate_Routingcolumnlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rutekan berdasarkan kolom`)
};

/**
* | output |
* | --- |
* | "Route by column" |
*
* @param {Generate_Routingcolumnlabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_routingcolumnlabel2 = /** @type {((inputs?: Generate_Routingcolumnlabel2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Routingcolumnlabel2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_routingcolumnlabel2(inputs)
	return en_generate_routingcolumnlabel2(inputs)
});
export { generate_routingcolumnlabel2 as "generate.routingColumnLabel" }