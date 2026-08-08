/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown> }} Validation_Templatepatternunknownslot3Inputs */

const en_validation_templatepatternunknownslot3 = /** @type {(inputs: Validation_Templatepatternunknownslot3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The output pattern references "${i?.slot}", which is not one of the template's slots.`)
};

const id_validation_templatepatternunknownslot3 = /** @type {(inputs: Validation_Templatepatternunknownslot3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pola output mereferensikan "${i?.slot}", yang bukan salah satu slot template.`)
};

/**
* | output |
* | --- |
* | "The output pattern references \"{slot}\", which is not one of the template's slots." |
*
* @param {Validation_Templatepatternunknownslot3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templatepatternunknownslot3 = /** @type {((inputs: Validation_Templatepatternunknownslot3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templatepatternunknownslot3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_templatepatternunknownslot3(inputs)
	return en_validation_templatepatternunknownslot3(inputs)
});
export { validation_templatepatternunknownslot3 as "validation.templatePatternUnknownSlot" }