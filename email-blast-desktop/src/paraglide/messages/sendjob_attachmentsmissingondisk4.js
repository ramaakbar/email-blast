/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Attachmentsmissingondisk4Inputs */

const en_sendjob_attachmentsmissingondisk4 = /** @type {(inputs: Sendjob_Attachmentsmissingondisk4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The generated attachment files no longer exist on disk. Generate the PDFs again.`)
};

const id_sendjob_attachmentsmissingondisk4 = /** @type {(inputs: Sendjob_Attachmentsmissingondisk4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File lampiran hasil generate sudah tidak ada di disk. Buat PDF-nya lagi.`)
};

/**
* | output |
* | --- |
* | "The generated attachment files no longer exist on disk. Generate the PDFs again." |
*
* @param {Sendjob_Attachmentsmissingondisk4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_attachmentsmissingondisk4 = /** @type {((inputs?: Sendjob_Attachmentsmissingondisk4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Attachmentsmissingondisk4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_attachmentsmissingondisk4(inputs)
	return en_sendjob_attachmentsmissingondisk4(inputs)
});
export { sendjob_attachmentsmissingondisk4 as "sendJob.attachmentsMissingOnDisk" }