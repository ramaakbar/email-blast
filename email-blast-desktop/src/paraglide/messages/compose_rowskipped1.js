/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Rowskipped1Inputs */

const en_compose_rowskipped1 = /** @type {(inputs: Compose_Rowskipped1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (` - skipped`)
};

const id_compose_rowskipped1 = /** @type {(inputs: Compose_Rowskipped1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (` - dilewati`)
};

/**
* | output |
* | --- |
* | "- skipped" |
*
* @param {Compose_Rowskipped1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_rowskipped1 = /** @type {((inputs?: Compose_Rowskipped1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Rowskipped1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_rowskipped1(inputs)
	return en_compose_rowskipped1(inputs)
});
export { compose_rowskipped1 as "compose.rowSkipped" }