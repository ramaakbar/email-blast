/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_ImportInputs */

const en_nav_import = /** @type {(inputs: Nav_ImportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import`)
};

const id_nav_import = /** @type {(inputs: Nav_ImportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor`)
};

/**
* | output |
* | --- |
* | "Import" |
*
* @param {Nav_ImportInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_import = /** @type {((inputs?: Nav_ImportInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ImportInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_nav_import(inputs)
	return en_nav_import(inputs)
});
export { nav_import as "nav.import" }