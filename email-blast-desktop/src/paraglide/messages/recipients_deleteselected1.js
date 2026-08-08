/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Deleteselected1Inputs */

const en_recipients_deleteselected1 = /** @type {(inputs: Recipients_Deleteselected1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete selected`)
};

const id_recipients_deleteselected1 = /** @type {(inputs: Recipients_Deleteselected1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hapus yang dipilih`)
};

/**
* | output |
* | --- |
* | "Delete selected" |
*
* @param {Recipients_Deleteselected1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deleteselected1 = /** @type {((inputs?: Recipients_Deleteselected1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deleteselected1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deleteselected1(inputs)
	return en_recipients_deleteselected1(inputs)
});
export { recipients_deleteselected1 as "recipients.deleteSelected" }