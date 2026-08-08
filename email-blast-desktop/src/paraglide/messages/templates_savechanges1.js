/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Savechanges1Inputs */

const en_templates_savechanges1 = /** @type {(inputs: Templates_Savechanges1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save changes`)
};

const id_templates_savechanges1 = /** @type {(inputs: Templates_Savechanges1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan perubahan`)
};

/**
* | output |
* | --- |
* | "Save changes" |
*
* @param {Templates_Savechanges1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_savechanges1 = /** @type {((inputs?: Templates_Savechanges1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Savechanges1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_savechanges1(inputs)
	return en_templates_savechanges1(inputs)
});
export { templates_savechanges1 as "templates.saveChanges" }