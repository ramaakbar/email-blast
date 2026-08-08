/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Gotoimport2Inputs */

const en_recipients_gotoimport2 = /** @type {(inputs: Recipients_Gotoimport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Import`)
};

const id_recipients_gotoimport2 = /** @type {(inputs: Recipients_Gotoimport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buka Impor`)
};

/**
* | output |
* | --- |
* | "Go to Import" |
*
* @param {Recipients_Gotoimport2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_gotoimport2 = /** @type {((inputs?: Recipients_Gotoimport2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Gotoimport2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_gotoimport2(inputs)
	return en_recipients_gotoimport2(inputs)
});
export { recipients_gotoimport2 as "recipients.goToImport" }