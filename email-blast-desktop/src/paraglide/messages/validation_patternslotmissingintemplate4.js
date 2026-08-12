/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown>, name: NonNullable<unknown> }} Validation_Patternslotmissingintemplate4Inputs */

const en_validation_patternslotmissingintemplate4 = /** @type {(inputs: Validation_Patternslotmissingintemplate4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The output pattern references "${i?.slot}", which template "${i?.name}" does not declare.`)
};

const id_validation_patternslotmissingintemplate4 = /** @type {(inputs: Validation_Patternslotmissingintemplate4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pola nama berkas merujuk "${i?.slot}", yang tidak dideklarasikan oleh template "${i?.name}".`)
};

/**
* | output |
* | --- |
* | "The output pattern references \"{slot}\", which template \"{name}\" does not declare." |
*
* @param {Validation_Patternslotmissingintemplate4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_patternslotmissingintemplate4 = /** @type {((inputs: Validation_Patternslotmissingintemplate4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Patternslotmissingintemplate4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_patternslotmissingintemplate4(inputs)
	return en_validation_patternslotmissingintemplate4(inputs)
});
export { validation_patternslotmissingintemplate4 as "validation.patternSlotMissingInTemplate" }