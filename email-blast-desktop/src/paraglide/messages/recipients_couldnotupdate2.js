/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Couldnotupdate2Inputs */

const en_recipients_couldnotupdate2 = /** @type {(inputs: Recipients_Couldnotupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not update the recipient.`)
};

const id_recipients_couldnotupdate2 = /** @type {(inputs: Recipients_Couldnotupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memperbarui penerima.`)
};

/**
* | output |
* | --- |
* | "Could not update the recipient." |
*
* @param {Recipients_Couldnotupdate2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_couldnotupdate2 = /** @type {((inputs?: Recipients_Couldnotupdate2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Couldnotupdate2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_couldnotupdate2(inputs)
	return en_recipients_couldnotupdate2(inputs)
});
export { recipients_couldnotupdate2 as "recipients.couldNotUpdate" }