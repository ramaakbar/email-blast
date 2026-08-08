/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_NextInputs */

const en_recipients_next = /** @type {(inputs: Recipients_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const id_recipients_next = /** @type {(inputs: Recipients_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Berikutnya`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Recipients_NextInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_next = /** @type {((inputs?: Recipients_NextInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_NextInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_next(inputs)
	return en_recipients_next(inputs)
});
export { recipients_next as "recipients.next" }