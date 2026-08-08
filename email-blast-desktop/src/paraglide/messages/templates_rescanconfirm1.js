/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Rescanconfirm1Inputs */

const en_templates_rescanconfirm1 = /** @type {(inputs: Templates_Rescanconfirm1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replace the slots below with the file's placeholders?`)
};

const id_templates_rescanconfirm1 = /** @type {(inputs: Templates_Rescanconfirm1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ganti slot di bawah dengan placeholder dari file?`)
};

/**
* | output |
* | --- |
* | "Replace the slots below with the file's placeholders?" |
*
* @param {Templates_Rescanconfirm1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_rescanconfirm1 = /** @type {((inputs?: Templates_Rescanconfirm1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Rescanconfirm1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_rescanconfirm1(inputs)
	return en_templates_rescanconfirm1(inputs)
});
export { templates_rescanconfirm1 as "templates.rescanConfirm" }