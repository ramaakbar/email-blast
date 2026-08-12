/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Routingcolumnrequired3Inputs */

const en_generatejob_routingcolumnrequired3 = /** @type {(inputs: Generatejob_Routingcolumnrequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a template column, or leave routing off.`)
};

const id_generatejob_routingcolumnrequired3 = /** @type {(inputs: Generatejob_Routingcolumnrequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih kolom template, atau matikan perutean.`)
};

/**
* | output |
* | --- |
* | "Choose a template column, or leave routing off." |
*
* @param {Generatejob_Routingcolumnrequired3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_routingcolumnrequired3 = /** @type {((inputs?: Generatejob_Routingcolumnrequired3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Routingcolumnrequired3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_routingcolumnrequired3(inputs)
	return en_generatejob_routingcolumnrequired3(inputs)
});
export { generatejob_routingcolumnrequired3 as "generateJob.routingColumnRequired" }