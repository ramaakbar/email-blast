/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Templatesfolder1Inputs */

const en_welcome_templatesfolder1 = /** @type {(inputs: Welcome_Templatesfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates folder`)
};

const id_welcome_templatesfolder1 = /** @type {(inputs: Welcome_Templatesfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Folder template`)
};

/**
* | output |
* | --- |
* | "Templates folder" |
*
* @param {Welcome_Templatesfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_templatesfolder1 = /** @type {((inputs?: Welcome_Templatesfolder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Templatesfolder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_templatesfolder1(inputs)
	return en_welcome_templatesfolder1(inputs)
});
export { welcome_templatesfolder1 as "welcome.templatesFolder" }