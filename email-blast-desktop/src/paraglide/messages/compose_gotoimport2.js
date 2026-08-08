/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Gotoimport2Inputs */

const en_compose_gotoimport2 = /** @type {(inputs: Compose_Gotoimport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Import`)
};

const id_compose_gotoimport2 = /** @type {(inputs: Compose_Gotoimport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buka Impor`)
};

/**
* | output |
* | --- |
* | "Go to Import" |
*
* @param {Compose_Gotoimport2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_gotoimport2 = /** @type {((inputs?: Compose_Gotoimport2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Gotoimport2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_gotoimport2(inputs)
	return en_compose_gotoimport2(inputs)
});
export { compose_gotoimport2 as "compose.goToImport" }