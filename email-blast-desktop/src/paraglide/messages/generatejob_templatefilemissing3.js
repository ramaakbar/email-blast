/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ path: NonNullable<unknown> }} Generatejob_Templatefilemissing3Inputs */

const en_generatejob_templatefilemissing3 = /** @type {(inputs: Generatejob_Templatefilemissing3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The template file is missing: "${i?.path}". It may have been moved or deleted.`)
};

const id_generatejob_templatefilemissing3 = /** @type {(inputs: Generatejob_Templatefilemissing3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`File template tidak ditemukan: "${i?.path}". Mungkin telah dipindah atau dihapus.`)
};

/**
* | output |
* | --- |
* | "The template file is missing: \"{path}\". It may have been moved or deleted." |
*
* @param {Generatejob_Templatefilemissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_templatefilemissing3 = /** @type {((inputs: Generatejob_Templatefilemissing3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Templatefilemissing3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_templatefilemissing3(inputs)
	return en_generatejob_templatefilemissing3(inputs)
});
export { generatejob_templatefilemissing3 as "generateJob.templateFileMissing" }