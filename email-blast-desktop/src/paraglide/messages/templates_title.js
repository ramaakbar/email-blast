/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_TitleInputs */

const en_templates_title = /** @type {(inputs: Templates_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates`)
};

const id_templates_title = /** @type {(inputs: Templates_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Templates_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_title = /** @type {((inputs?: Templates_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_title(inputs)
	return en_templates_title(inputs)
});
export { templates_title as "templates.title" }