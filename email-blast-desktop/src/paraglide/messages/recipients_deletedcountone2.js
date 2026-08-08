/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletedcountone2Inputs */

const en_recipients_deletedcountone2 = /** @type {(inputs: Recipients_Deletedcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Deleted ${i?.count} recipient.`)
};

const id_recipients_deletedcountone2 = /** @type {(inputs: Recipients_Deletedcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima dihapus.`)
};

/**
* | output |
* | --- |
* | "Deleted {count} recipient." |
*
* @param {Recipients_Deletedcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletedcountone2 = /** @type {((inputs: Recipients_Deletedcountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletedcountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deletedcountone2(inputs)
	return en_recipients_deletedcountone2(inputs)
});
export { recipients_deletedcountone2 as "recipients.deletedCountOne" }