/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Generatejob_Couldnotfill3Inputs */

const en_generatejob_couldnotfill3 = /** @type {(inputs: Generatejob_Couldnotfill3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not fill the letter: ${i?.message}`)
};

const id_generatejob_couldnotfill3 = /** @type {(inputs: Generatejob_Couldnotfill3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Gagal mengisi surat: ${i?.message}`)
};

/**
* | output |
* | --- |
* | "Could not fill the letter: {message}" |
*
* @param {Generatejob_Couldnotfill3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_couldnotfill3 = /** @type {((inputs: Generatejob_Couldnotfill3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Couldnotfill3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_couldnotfill3(inputs)
	return en_generatejob_couldnotfill3(inputs)
});
export { generatejob_couldnotfill3 as "generateJob.couldNotFill" }