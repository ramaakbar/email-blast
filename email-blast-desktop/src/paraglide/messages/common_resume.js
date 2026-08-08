/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_ResumeInputs */

const en_common_resume = /** @type {(inputs: Common_ResumeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resume`)
};

const id_common_resume = /** @type {(inputs: Common_ResumeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanjutkan`)
};

/**
* | output |
* | --- |
* | "Resume" |
*
* @param {Common_ResumeInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_resume = /** @type {((inputs?: Common_ResumeInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ResumeInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_resume(inputs)
	return en_common_resume(inputs)
});
export { common_resume as "common.resume" }