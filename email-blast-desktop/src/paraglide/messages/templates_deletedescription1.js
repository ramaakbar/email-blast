/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Deletedescription1Inputs */

const en_templates_deletedescription1 = /** @type {(inputs: Templates_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The template is removed from the app. The file itself stays where it is.`)
};

const id_templates_deletedescription1 = /** @type {(inputs: Templates_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template dihapus dari aplikasi. File-nya tetap di tempat semula.`)
};

/**
* | output |
* | --- |
* | "The template is removed from the app. The file itself stays where it is." |
*
* @param {Templates_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_deletedescription1 = /** @type {((inputs?: Templates_Deletedescription1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Deletedescription1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_deletedescription1(inputs)
	return en_templates_deletedescription1(inputs)
});
export { templates_deletedescription1 as "templates.deleteDescription" }