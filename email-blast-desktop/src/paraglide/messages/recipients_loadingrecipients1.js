/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Loadingrecipients1Inputs */

const en_recipients_loadingrecipients1 = /** @type {(inputs: Recipients_Loadingrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading recipients…`)
};

const id_recipients_loadingrecipients1 = /** @type {(inputs: Recipients_Loadingrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memuat penerima…`)
};

/**
* | output |
* | --- |
* | "Loading recipients…" |
*
* @param {Recipients_Loadingrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_loadingrecipients1 = /** @type {((inputs?: Recipients_Loadingrecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Loadingrecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_loadingrecipients1(inputs)
	return en_recipients_loadingrecipients1(inputs)
});
export { recipients_loadingrecipients1 as "recipients.loadingRecipients" }