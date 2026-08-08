/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Searchplaceholder1Inputs */

const en_recipients_searchplaceholder1 = /** @type {(inputs: Recipients_Searchplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search name, email, phone, or any field…`)
};

const id_recipients_searchplaceholder1 = /** @type {(inputs: Recipients_Searchplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cari nama, email, telepon, atau bidang apa pun…`)
};

/**
* | output |
* | --- |
* | "Search name, email, phone, or any field…" |
*
* @param {Recipients_Searchplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_searchplaceholder1 = /** @type {((inputs?: Recipients_Searchplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Searchplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_searchplaceholder1(inputs)
	return en_recipients_searchplaceholder1(inputs)
});
export { recipients_searchplaceholder1 as "recipients.searchPlaceholder" }