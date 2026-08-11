/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Jobrecipients1Inputs */

const en_send_jobrecipients1 = /** @type {(inputs: Send_Jobrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients of this job`)
};

const id_send_jobrecipients1 = /** @type {(inputs: Send_Jobrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima pekerjaan ini`)
};

/**
* | output |
* | --- |
* | "Recipients of this job" |
*
* @param {Send_Jobrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_jobrecipients1 = /** @type {((inputs?: Send_Jobrecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Jobrecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_jobrecipients1(inputs)
	return en_send_jobrecipients1(inputs)
});
export { send_jobrecipients1 as "send.jobRecipients" }