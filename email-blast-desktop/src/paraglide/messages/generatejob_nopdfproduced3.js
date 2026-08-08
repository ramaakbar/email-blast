/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Nopdfproduced3Inputs */

const en_generatejob_nopdfproduced3 = /** @type {(inputs: Generatejob_Nopdfproduced3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice produced no PDF for this letter.`)
};

const id_generatejob_nopdfproduced3 = /** @type {(inputs: Generatejob_Nopdfproduced3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice tidak menghasilkan PDF untuk surat ini.`)
};

/**
* | output |
* | --- |
* | "LibreOffice produced no PDF for this letter." |
*
* @param {Generatejob_Nopdfproduced3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_nopdfproduced3 = /** @type {((inputs?: Generatejob_Nopdfproduced3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Nopdfproduced3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_nopdfproduced3(inputs)
	return en_generatejob_nopdfproduced3(inputs)
});
export { generatejob_nopdfproduced3 as "generateJob.noPdfProduced" }