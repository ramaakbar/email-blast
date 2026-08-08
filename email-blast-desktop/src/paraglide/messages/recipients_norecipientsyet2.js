/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Norecipientsyet2Inputs */

const en_recipients_norecipientsyet2 = /** @type {(inputs: Recipients_Norecipientsyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients yet`)
};

const id_recipients_norecipientsyet2 = /** @type {(inputs: Recipients_Norecipientsyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada penerima`)
};

/**
* | output |
* | --- |
* | "No recipients yet" |
*
* @param {Recipients_Norecipientsyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_norecipientsyet2 = /** @type {((inputs?: Recipients_Norecipientsyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Norecipientsyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_norecipientsyet2(inputs)
	return en_recipients_norecipientsyet2(inputs)
});
export { recipients_norecipientsyet2 as "recipients.noRecipientsYet" }