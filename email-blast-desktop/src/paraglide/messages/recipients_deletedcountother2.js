/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountother2Inputs */

const en_recipients_deletedcountother2 = /** @type {(inputs: Recipients_Deletedcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Deleted ${i?.count} recipients.`)
};

const id_recipients_deletedcountother2 = /** @type {(inputs: Recipients_Deletedcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima dihapus.`)
};

/**
* | output |
* | --- |
* | "Deleted {count} recipients." |
*
* @param {Recipients_Deletedcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletedcountother2 = /** @type {((inputs: Recipients_Deletedcountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletedcountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deletedcountother2(inputs)
	return en_recipients_deletedcountother2(inputs)
});
export { recipients_deletedcountother2 as "recipients.deletedCountOther" }