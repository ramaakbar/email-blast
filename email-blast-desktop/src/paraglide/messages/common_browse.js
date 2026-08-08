/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_BrowseInputs */

const en_common_browse = /** @type {(inputs: Common_BrowseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browse…`)
};

const id_common_browse = /** @type {(inputs: Common_BrowseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jelajahi…`)
};

/**
* | output |
* | --- |
* | "Browse…" |
*
* @param {Common_BrowseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_browse = /** @type {((inputs?: Common_BrowseInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BrowseInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_browse(inputs)
	return en_common_browse(inputs)
});
export { common_browse as "common.browse" }