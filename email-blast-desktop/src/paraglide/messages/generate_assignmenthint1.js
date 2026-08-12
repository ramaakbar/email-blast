/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Assignmenthint1Inputs */

const en_generate_assignmenthint1 = /** @type {(inputs: Generate_Assignmenthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients whose value is not assigned to any template block generation until it is.`)
};

const id_generate_assignmenthint1 = /** @type {(inputs: Generate_Assignmenthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima yang nilainya belum ditetapkan ke template mana pun memblokir generate sampai ditetapkan.`)
};

/**
* | output |
* | --- |
* | "Recipients whose value is not assigned to any template block generation until it is." |
*
* @param {Generate_Assignmenthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_assignmenthint1 = /** @type {((inputs?: Generate_Assignmenthint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Assignmenthint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_assignmenthint1(inputs)
	return en_generate_assignmenthint1(inputs)
});
export { generate_assignmenthint1 as "generate.assignmentHint" }