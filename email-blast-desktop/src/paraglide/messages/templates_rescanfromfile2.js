/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Rescanfromfile2Inputs */

const en_templates_rescanfromfile2 = /** @type {(inputs: Templates_Rescanfromfile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rescan from file`)
};

const id_templates_rescanfromfile2 = /** @type {(inputs: Templates_Rescanfromfile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pindai ulang dari file`)
};

/**
* | output |
* | --- |
* | "Rescan from file" |
*
* @param {Templates_Rescanfromfile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_rescanfromfile2 = /** @type {((inputs?: Templates_Rescanfromfile2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Rescanfromfile2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_rescanfromfile2(inputs)
	return en_templates_rescanfromfile2(inputs)
});
export { templates_rescanfromfile2 as "templates.rescanFromFile" }