/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Positiontextonimage3Inputs */

const en_templates_positiontextonimage3 = /** @type {(inputs: Templates_Positiontextonimage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Position text on image…`)
};

const id_templates_positiontextonimage3 = /** @type {(inputs: Templates_Positiontextonimage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Posisikan teks pada gambar…`)
};

/**
* | output |
* | --- |
* | "Position text on image…" |
*
* @param {Templates_Positiontextonimage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_positiontextonimage3 = /** @type {((inputs?: Templates_Positiontextonimage3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Positiontextonimage3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_positiontextonimage3(inputs)
	return en_templates_positiontextonimage3(inputs)
});
export { templates_positiontextonimage3 as "templates.positionTextOnImage" }