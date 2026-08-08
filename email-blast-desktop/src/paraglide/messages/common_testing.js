/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_TestingInputs */

const en_common_testing = /** @type {(inputs: Common_TestingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testing…`)
};

const id_common_testing = /** @type {(inputs: Common_TestingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menguji…`)
};

/**
* | output |
* | --- |
* | "Testing…" |
*
* @param {Common_TestingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_testing = /** @type {((inputs?: Common_TestingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_TestingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_testing(inputs)
	return en_common_testing(inputs)
});
export { common_testing as "common.testing" }