/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Customfields1Inputs */

const en_recipients_customfields1 = /** @type {(inputs: Recipients_Customfields1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Custom fields`)
};

const id_recipients_customfields1 = /** @type {(inputs: Recipients_Customfields1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bidang kustom`)
};

/**
* | output |
* | --- |
* | "Custom fields" |
*
* @param {Recipients_Customfields1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_customfields1 = /** @type {((inputs?: Recipients_Customfields1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Customfields1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_customfields1(inputs)
	return en_recipients_customfields1(inputs)
});
export { recipients_customfields1 as "recipients.customFields" }