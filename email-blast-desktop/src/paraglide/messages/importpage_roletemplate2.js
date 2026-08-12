/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Roletemplate2Inputs */

const en_importpage_roletemplate2 = /** @type {(inputs: Importpage_Roletemplate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

const id_importpage_roletemplate2 = /** @type {(inputs: Importpage_Roletemplate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Template" |
*
* @param {Importpage_Roletemplate2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_roletemplate2 = /** @type {((inputs?: Importpage_Roletemplate2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Roletemplate2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_roletemplate2(inputs)
	return en_importpage_roletemplate2(inputs)
});
export { importpage_roletemplate2 as "importPage.roleTemplate" }