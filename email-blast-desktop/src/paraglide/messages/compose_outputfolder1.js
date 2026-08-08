/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Outputfolder1Inputs */

const en_compose_outputfolder1 = /** @type {(inputs: Compose_Outputfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output folder`)
};

const id_compose_outputfolder1 = /** @type {(inputs: Compose_Outputfolder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Folder output`)
};

/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Compose_Outputfolder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_outputfolder1 = /** @type {((inputs?: Compose_Outputfolder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Outputfolder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_outputfolder1(inputs)
	return en_compose_outputfolder1(inputs)
});
export { compose_outputfolder1 as "compose.outputFolder" }