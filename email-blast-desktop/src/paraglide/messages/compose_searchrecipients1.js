/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Searchrecipients1Inputs */

const en_compose_searchrecipients1 = /** @type {(inputs: Compose_Searchrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipients`)
};

const id_compose_searchrecipients1 = /** @type {(inputs: Compose_Searchrecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cari penerima`)
};

/**
* | output |
* | --- |
* | "Search recipients" |
*
* @param {Compose_Searchrecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_searchrecipients1 = /** @type {((inputs?: Compose_Searchrecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Searchrecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_searchrecipients1(inputs)
	return en_compose_searchrecipients1(inputs)
});
export { compose_searchrecipients1 as "compose.searchRecipients" }