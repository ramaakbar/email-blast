/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Norecipientsexist3Inputs */

const en_generatejob_norecipientsexist3 = /** @type {(inputs: Generatejob_Norecipientsexist3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None of the selected recipients still exist.`)
};

const id_generatejob_norecipientsexist3 = /** @type {(inputs: Generatejob_Norecipientsexist3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima terpilih yang masih ada.`)
};

/**
* | output |
* | --- |
* | "None of the selected recipients still exist." |
*
* @param {Generatejob_Norecipientsexist3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_norecipientsexist3 = /** @type {((inputs?: Generatejob_Norecipientsexist3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Norecipientsexist3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_norecipientsexist3(inputs)
	return en_generatejob_norecipientsexist3(inputs)
});
export { generatejob_norecipientsexist3 as "generateJob.noRecipientsExist" }