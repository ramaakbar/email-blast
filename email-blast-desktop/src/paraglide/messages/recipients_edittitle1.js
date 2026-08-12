/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Edittitle1Inputs */

const en_recipients_edittitle1 = /** @type {(inputs: Recipients_Edittitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit recipient`)
};

const id_recipients_edittitle1 = /** @type {(inputs: Recipients_Edittitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit penerima`)
};

/**
* | output |
* | --- |
* | "Edit recipient" |
*
* @param {Recipients_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_edittitle1 = /** @type {((inputs?: Recipients_Edittitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Edittitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_edittitle1(inputs)
	return en_recipients_edittitle1(inputs)
});
export { recipients_edittitle1 as "recipients.editTitle" }