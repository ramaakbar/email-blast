/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Recipients_Selectrecipient1Inputs */

const en_recipients_selectrecipient1 = /** @type {(inputs: Recipients_Selectrecipient1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select ${i?.name}`)
};

const id_recipients_selectrecipient1 = /** @type {(inputs: Recipients_Selectrecipient1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pilih ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Select {name}" |
*
* @param {Recipients_Selectrecipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_selectrecipient1 = /** @type {((inputs: Recipients_Selectrecipient1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Selectrecipient1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_selectrecipient1(inputs)
	return en_recipients_selectrecipient1(inputs)
});
export { recipients_selectrecipient1 as "recipients.selectRecipient" }