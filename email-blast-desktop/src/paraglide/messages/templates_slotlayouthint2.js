/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotlayouthint2Inputs */

const en_templates_slotlayouthint2 = /** @type {(inputs: Templates_Slotlayouthint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drag each text box into place. Text renders on one line and shrinks to fit the box width.`)
};

const id_templates_slotlayouthint2 = /** @type {(inputs: Templates_Slotlayouthint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Seret setiap kotak teks ke tempatnya. Teks dirender satu baris dan mengecil agar muat di lebar kotak.`)
};

/**
* | output |
* | --- |
* | "Drag each text box into place. Text renders on one line and shrinks to fit the box width." |
*
* @param {Templates_Slotlayouthint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotlayouthint2 = /** @type {((inputs?: Templates_Slotlayouthint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotlayouthint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotlayouthint2(inputs)
	return en_templates_slotlayouthint2(inputs)
});
export { templates_slotlayouthint2 as "templates.slotLayoutHint" }