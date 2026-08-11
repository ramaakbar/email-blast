/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Failedgeneratetitle2Inputs */

const en_send_failedgeneratetitle2 = /** @type {(inputs: Send_Failedgeneratetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generation failed - the message goes out without the PDF`)
};

const id_send_failedgeneratetitle2 = /** @type {(inputs: Send_Failedgeneratetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate gagal - pesan terkirim tanpa PDF`)
};

/**
* | output |
* | --- |
* | "Generation failed - the message goes out without the PDF" |
*
* @param {Send_Failedgeneratetitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_failedgeneratetitle2 = /** @type {((inputs?: Send_Failedgeneratetitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Failedgeneratetitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_failedgeneratetitle2(inputs)
	return en_send_failedgeneratetitle2(inputs)
});
export { send_failedgeneratetitle2 as "send.failedGenerateTitle" }