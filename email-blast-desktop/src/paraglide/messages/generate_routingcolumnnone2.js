/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Routingcolumnnone2Inputs */

const en_generate_routingcolumnnone2 = /** @type {(inputs: Generate_Routingcolumnnone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None - one template for all recipients`)
};

const id_generate_routingcolumnnone2 = /** @type {(inputs: Generate_Routingcolumnnone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada - satu template untuk semua penerima`)
};

/**
* | output |
* | --- |
* | "None - one template for all recipients" |
*
* @param {Generate_Routingcolumnnone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_routingcolumnnone2 = /** @type {((inputs?: Generate_Routingcolumnnone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Routingcolumnnone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_routingcolumnnone2(inputs)
	return en_generate_routingcolumnnone2(inputs)
});
export { generate_routingcolumnnone2 as "generate.routingColumnNone" }