/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Outputfolder1Inputs */

const en_welcome_outputfolder1 = /** @type {(inputs: Welcome_Outputfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output folder`)
};

const id_welcome_outputfolder1 = /** @type {(inputs: Welcome_Outputfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Folder output`)
};

/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Welcome_Outputfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_outputfolder1 = /** @type {((inputs?: Welcome_Outputfolder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Outputfolder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_outputfolder1(inputs)
	return en_welcome_outputfolder1(inputs)
});
export { welcome_outputfolder1 as "welcome.outputFolder" }