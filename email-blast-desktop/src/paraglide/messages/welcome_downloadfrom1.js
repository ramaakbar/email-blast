/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Downloadfrom1Inputs */

const en_welcome_downloadfrom1 = /** @type {(inputs: Welcome_Downloadfrom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download it from`)
};

const id_welcome_downloadfrom1 = /** @type {(inputs: Welcome_Downloadfrom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unduh dari`)
};

/**
* | output |
* | --- |
* | "Download it from" |
*
* @param {Welcome_Downloadfrom1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_downloadfrom1 = /** @type {((inputs?: Welcome_Downloadfrom1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Downloadfrom1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_downloadfrom1(inputs)
	return en_welcome_downloadfrom1(inputs)
});
export { welcome_downloadfrom1 as "welcome.downloadFrom" }