/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotlayoutdone2Inputs */

const en_templates_slotlayoutdone2 = /** @type {(inputs: Templates_Slotlayoutdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Done`)
};

const id_templates_slotlayoutdone2 = /** @type {(inputs: Templates_Slotlayoutdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selesai`)
};

/**
* | output |
* | --- |
* | "Done" |
*
* @param {Templates_Slotlayoutdone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotlayoutdone2 = /** @type {((inputs?: Templates_Slotlayoutdone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotlayoutdone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotlayoutdone2(inputs)
	return en_templates_slotlayoutdone2(inputs)
});
export { templates_slotlayoutdone2 as "templates.slotLayoutDone" }