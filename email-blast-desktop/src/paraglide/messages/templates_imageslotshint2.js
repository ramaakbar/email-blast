/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Imageslotshint2Inputs */

const en_templates_imageslotshint2 = /** @type {(inputs: Templates_Imageslotshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter the slot names the certificate needs, e.g. nama, instansi.`)
};

const id_templates_imageslotshint2 = /** @type {(inputs: Templates_Imageslotshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Masukkan nama slot yang dibutuhkan sertifikat, mis. nama, instansi.`)
};

/**
* | output |
* | --- |
* | "Enter the slot names the certificate needs, e.g. nama, instansi." |
*
* @param {Templates_Imageslotshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_imageslotshint2 = /** @type {((inputs?: Templates_Imageslotshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Imageslotshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_imageslotshint2(inputs)
	return en_templates_imageslotshint2(inputs)
});
export { templates_imageslotshint2 as "templates.imageSlotsHint" }