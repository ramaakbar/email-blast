/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_ComposeInputs */

const en_nav_compose = /** @type {(inputs: Nav_ComposeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compose`)
};

const id_nav_compose = /** @type {(inputs: Nav_ComposeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buat Email`)
};

/**
* | output |
* | --- |
* | "Compose" |
*
* @param {Nav_ComposeInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_compose = /** @type {((inputs?: Nav_ComposeInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ComposeInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_nav_compose(inputs)
	return en_nav_compose(inputs)
});
export { nav_compose as "nav.compose" }