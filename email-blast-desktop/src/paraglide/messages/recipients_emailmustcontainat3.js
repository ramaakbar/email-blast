/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Emailmustcontainat3Inputs */

const en_recipients_emailmustcontainat3 = /** @type {(inputs: Recipients_Emailmustcontainat3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email must contain @.`)
};

const id_recipients_emailmustcontainat3 = /** @type {(inputs: Recipients_Emailmustcontainat3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email harus mengandung @.`)
};

/**
* | output |
* | --- |
* | "Email must contain @." |
*
* @param {Recipients_Emailmustcontainat3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_emailmustcontainat3 = /** @type {((inputs?: Recipients_Emailmustcontainat3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Emailmustcontainat3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_emailmustcontainat3(inputs)
	return en_recipients_emailmustcontainat3(inputs)
});
export { recipients_emailmustcontainat3 as "recipients.emailMustContainAt" }