/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Searchplaceholder1Inputs */

const en_compose_searchplaceholder1 = /** @type {(inputs: Compose_Searchplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search name, email, or any field…`)
};

const id_compose_searchplaceholder1 = /** @type {(inputs: Compose_Searchplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cari nama, email, atau bidang apa pun…`)
};

/**
* | output |
* | --- |
* | "Search name, email, or any field…" |
*
* @param {Compose_Searchplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_searchplaceholder1 = /** @type {((inputs?: Compose_Searchplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Searchplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_searchplaceholder1(inputs)
	return en_compose_searchplaceholder1(inputs)
});
export { compose_searchplaceholder1 as "compose.searchPlaceholder" }