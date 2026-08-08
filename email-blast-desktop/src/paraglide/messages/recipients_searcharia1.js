/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Searcharia1Inputs */

const en_recipients_searcharia1 = /** @type {(inputs: Recipients_Searcharia1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipients`)
};

const id_recipients_searcharia1 = /** @type {(inputs: Recipients_Searcharia1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cari penerima`)
};

/**
* | output |
* | --- |
* | "Search recipients" |
*
* @param {Recipients_Searcharia1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_searcharia1 = /** @type {((inputs?: Recipients_Searcharia1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Searcharia1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_searcharia1(inputs)
	return en_recipients_searcharia1(inputs)
});
export { recipients_searcharia1 as "recipients.searchAria" }