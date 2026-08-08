/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown> }} Generatejob_Missingslotdata3Inputs */

const en_generatejob_missingslotdata3 = /** @type {(inputs: Generatejob_Missingslotdata3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Missing data for slot "${i?.slot}".`)
};

const id_generatejob_missingslotdata3 = /** @type {(inputs: Generatejob_Missingslotdata3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Data untuk slot "${i?.slot}" tidak ada.`)
};

/**
* | output |
* | --- |
* | "Missing data for slot \"{slot}\"." |
*
* @param {Generatejob_Missingslotdata3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_missingslotdata3 = /** @type {((inputs: Generatejob_Missingslotdata3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Missingslotdata3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_missingslotdata3(inputs)
	return en_generatejob_missingslotdata3(inputs)
});
export { generatejob_missingslotdata3 as "generateJob.missingSlotData" }