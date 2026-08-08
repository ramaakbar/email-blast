/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_PhoneInputs */

const en_recipients_phone = /** @type {(inputs: Recipients_PhoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Phone`)
};

const id_recipients_phone = /** @type {(inputs: Recipients_PhoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telepon`)
};

/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Recipients_PhoneInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_phone = /** @type {((inputs?: Recipients_PhoneInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_PhoneInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_phone(inputs)
	return en_recipients_phone(inputs)
});
export { recipients_phone as "recipients.phone" }