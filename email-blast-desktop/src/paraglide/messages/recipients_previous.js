/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_PreviousInputs */

const en_recipients_previous = /** @type {(inputs: Recipients_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous`)
};

const id_recipients_previous = /** @type {(inputs: Recipients_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sebelumnya`)
};

/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Recipients_PreviousInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_previous = /** @type {((inputs?: Recipients_PreviousInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_PreviousInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_previous(inputs)
	return en_recipients_previous(inputs)
});
export { recipients_previous as "recipients.previous" }