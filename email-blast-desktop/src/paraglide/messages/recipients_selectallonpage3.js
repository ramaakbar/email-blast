/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Selectallonpage3Inputs */

const en_recipients_selectallonpage3 = /** @type {(inputs: Recipients_Selectallonpage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select all recipients on this page`)
};

const id_recipients_selectallonpage3 = /** @type {(inputs: Recipients_Selectallonpage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih semua penerima di halaman ini`)
};

/**
* | output |
* | --- |
* | "Select all recipients on this page" |
*
* @param {Recipients_Selectallonpage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_selectallonpage3 = /** @type {((inputs?: Recipients_Selectallonpage3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Selectallonpage3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_selectallonpage3(inputs)
	return en_recipients_selectallonpage3(inputs)
});
export { recipients_selectallonpage3 as "recipients.selectAllOnPage" }