/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotlayoutimagefailed3Inputs */

const en_templates_slotlayoutimagefailed3 = /** @type {(inputs: Templates_Slotlayoutimagefailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load the template image.`)
};

const id_templates_slotlayoutimagefailed3 = /** @type {(inputs: Templates_Slotlayoutimagefailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat gambar template.`)
};

/**
* | output |
* | --- |
* | "Could not load the template image." |
*
* @param {Templates_Slotlayoutimagefailed3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotlayoutimagefailed3 = /** @type {((inputs?: Templates_Slotlayoutimagefailed3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotlayoutimagefailed3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotlayoutimagefailed3(inputs)
	return en_templates_slotlayoutimagefailed3(inputs)
});
export { templates_slotlayoutimagefailed3 as "templates.slotLayoutImageFailed" }