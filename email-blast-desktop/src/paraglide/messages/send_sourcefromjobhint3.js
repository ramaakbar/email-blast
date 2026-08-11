/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Sourcefromjobhint3Inputs */

const en_send_sourcefromjobhint3 = /** @type {(inputs: Send_Sourcefromjobhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email previously generated PDFs without regenerating anything.`)
};

const id_send_sourcefromjobhint3 = /** @type {(inputs: Send_Sourcefromjobhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim email PDF hasil generate sebelumnya tanpa membuat ulang.`)
};

/**
* | output |
* | --- |
* | "Email previously generated PDFs without regenerating anything." |
*
* @param {Send_Sourcefromjobhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_sourcefromjobhint3 = /** @type {((inputs?: Send_Sourcefromjobhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Sourcefromjobhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_sourcefromjobhint3(inputs)
	return en_send_sourcefromjobhint3(inputs)
});
export { send_sourcefromjobhint3 as "send.sourceFromJobHint" }