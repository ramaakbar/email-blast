/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Addfont1Inputs */

const en_templates_addfont1 = /** @type {(inputs: Templates_Addfont1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add font…`)
};

const id_templates_addfont1 = /** @type {(inputs: Templates_Addfont1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah huruf…`)
};

/**
* | output |
* | --- |
* | "Add font…" |
*
* @param {Templates_Addfont1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addfont1 = /** @type {((inputs?: Templates_Addfont1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addfont1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_addfont1(inputs)
	return en_templates_addfont1(inputs)
});
export { templates_addfont1 as "templates.addFont" }