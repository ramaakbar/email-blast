/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Jobrecipientshint2Inputs */

const en_send_jobrecipientshint2 = /** @type {(inputs: Send_Jobrecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients whose generation failed are flagged - they can still receive the message, without the PDF.`)
};

const id_send_jobrecipientshint2 = /** @type {(inputs: Send_Jobrecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima yang gagal generate ditandai - mereka tetap bisa menerima pesan, tanpa PDF.`)
};

/**
* | output |
* | --- |
* | "Recipients whose generation failed are flagged - they can still receive the message, without the PDF." |
*
* @param {Send_Jobrecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_jobrecipientshint2 = /** @type {((inputs?: Send_Jobrecipientshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Jobrecipientshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_jobrecipientshint2(inputs)
	return en_send_jobrecipientshint2(inputs)
});
export { send_jobrecipientshint2 as "send.jobRecipientsHint" }