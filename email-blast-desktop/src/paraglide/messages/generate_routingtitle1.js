/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Routingtitle1Inputs */

const en_generate_routingtitle1 = /** @type {(inputs: Generate_Routingtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template routing`)
};

const id_generate_routingtitle1 = /** @type {(inputs: Generate_Routingtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Perutean template`)
};

/**
* | output |
* | --- |
* | "Template routing" |
*
* @param {Generate_Routingtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_routingtitle1 = /** @type {((inputs?: Generate_Routingtitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Routingtitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_routingtitle1(inputs)
	return en_generate_routingtitle1(inputs)
});
export { generate_routingtitle1 as "generate.routingTitle" }