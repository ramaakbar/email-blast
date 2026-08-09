/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotlayouttitle2Inputs */

const en_templates_slotlayouttitle2 = /** @type {(inputs: Templates_Slotlayouttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Position text on image`)
};

const id_templates_slotlayouttitle2 = /** @type {(inputs: Templates_Slotlayouttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Posisikan teks pada gambar`)
};

/**
* | output |
* | --- |
* | "Position text on image" |
*
* @param {Templates_Slotlayouttitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotlayouttitle2 = /** @type {((inputs?: Templates_Slotlayouttitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotlayouttitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotlayouttitle2(inputs)
	return en_templates_slotlayouttitle2(inputs)
});
export { templates_slotlayouttitle2 as "templates.slotLayoutTitle" }