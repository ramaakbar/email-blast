/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Messagebodyrequired2Inputs */

const en_validation_messagebodyrequired2 = /** @type {(inputs: Validation_Messagebodyrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTML body is required.`)
};

const id_validation_messagebodyrequired2 = /** @type {(inputs: Validation_Messagebodyrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Isi HTML wajib diisi.`)
};

/**
* | output |
* | --- |
* | "HTML body is required." |
*
* @param {Validation_Messagebodyrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_messagebodyrequired2 = /** @type {((inputs?: Validation_Messagebodyrequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Messagebodyrequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_messagebodyrequired2(inputs)
	return en_validation_messagebodyrequired2(inputs)
});
export { validation_messagebodyrequired2 as "validation.messageBodyRequired" }