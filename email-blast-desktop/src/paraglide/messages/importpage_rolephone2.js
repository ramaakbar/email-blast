/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Rolephone2Inputs */

const en_importpage_rolephone2 = /** @type {(inputs: Importpage_Rolephone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Phone`)
};

const id_importpage_rolephone2 = /** @type {(inputs: Importpage_Rolephone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telepon`)
};

/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Importpage_Rolephone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rolephone2 = /** @type {((inputs?: Importpage_Rolephone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rolephone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_rolephone2(inputs)
	return en_importpage_rolephone2(inputs)
});
export { importpage_rolephone2 as "importPage.rolePhone" }