/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Messagesubjectrequired2Inputs */

const en_validation_messagesubjectrequired2 = /** @type {(inputs: Validation_Messagesubjectrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subject is required.`)
};

const id_validation_messagesubjectrequired2 = /** @type {(inputs: Validation_Messagesubjectrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subjek wajib diisi.`)
};

/**
* | output |
* | --- |
* | "Subject is required." |
*
* @param {Validation_Messagesubjectrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_messagesubjectrequired2 = /** @type {((inputs?: Validation_Messagesubjectrequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Messagesubjectrequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_messagesubjectrequired2(inputs)
	return en_validation_messagesubjectrequired2(inputs)
});
export { validation_messagesubjectrequired2 as "validation.messageSubjectRequired" }