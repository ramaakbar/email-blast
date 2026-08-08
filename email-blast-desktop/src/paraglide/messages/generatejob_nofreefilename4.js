/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Generatejob_Nofreefilename4Inputs */

const en_generatejob_nofreefilename4 = /** @type {(inputs: Generatejob_Nofreefilename4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not find a free file name for "${i?.name}".`)
};

const id_generatejob_nofreefilename4 = /** @type {(inputs: Generatejob_Nofreefilename4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Tidak dapat menemukan nama file yang tersedia untuk "${i?.name}".`)
};

/**
* | output |
* | --- |
* | "Could not find a free file name for \"{name}\"." |
*
* @param {Generatejob_Nofreefilename4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_nofreefilename4 = /** @type {((inputs: Generatejob_Nofreefilename4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Nofreefilename4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_nofreefilename4(inputs)
	return en_generatejob_nofreefilename4(inputs)
});
export { generatejob_nofreefilename4 as "generateJob.noFreeFileName" }