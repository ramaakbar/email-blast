/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Noemailaddress2Inputs */

const en_recipients_noemailaddress2 = /** @type {(inputs: Recipients_Noemailaddress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No email address`)
};

const id_recipients_noemailaddress2 = /** @type {(inputs: Recipients_Noemailaddress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada alamat email`)
};

/**
* | output |
* | --- |
* | "No email address" |
*
* @param {Recipients_Noemailaddress2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_noemailaddress2 = /** @type {((inputs?: Recipients_Noemailaddress2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Noemailaddress2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_noemailaddress2(inputs)
	return en_recipients_noemailaddress2(inputs)
});
export { recipients_noemailaddress2 as "recipients.noEmailAddress" }