/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotmaxwidthauto3Inputs */

const en_templates_slotmaxwidthauto3 = /** @type {(inputs: Templates_Slotmaxwidthauto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auto (to the page edge)`)
};

const id_templates_slotmaxwidthauto3 = /** @type {(inputs: Templates_Slotmaxwidthauto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Otomatis (hingga tepi halaman)`)
};

/**
* | output |
* | --- |
* | "Auto (to the page edge)" |
*
* @param {Templates_Slotmaxwidthauto3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotmaxwidthauto3 = /** @type {((inputs?: Templates_Slotmaxwidthauto3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotmaxwidthauto3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotmaxwidthauto3(inputs)
	return en_templates_slotmaxwidthauto3(inputs)
});
export { templates_slotmaxwidthauto3 as "templates.slotMaxWidthAuto" }