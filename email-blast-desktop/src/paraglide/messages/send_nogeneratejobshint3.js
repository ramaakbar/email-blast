/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Nogeneratejobshint3Inputs */

const en_send_nogeneratejobshint3 = /** @type {(inputs: Send_Nogeneratejobshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate documents first - their PDFs become the attachments this workspace sends.`)
};

const id_send_nogeneratejobshint3 = /** @type {(inputs: Send_Nogeneratejobshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buat dokumen dulu - PDF-nya menjadi lampiran yang dikirim workspace ini.`)
};

/**
* | output |
* | --- |
* | "Generate documents first - their PDFs become the attachments this workspace sends." |
*
* @param {Send_Nogeneratejobshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_nogeneratejobshint3 = /** @type {((inputs?: Send_Nogeneratejobshint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Nogeneratejobshint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_nogeneratejobshint3(inputs)
	return en_send_nogeneratejobshint3(inputs)
});
export { send_nogeneratejobshint3 as "send.noGenerateJobsHint" }