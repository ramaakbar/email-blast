/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown> }} Validation_Slotlayoutinvalid2Inputs */

const en_validation_slotlayoutinvalid2 = /** @type {(inputs: Validation_Slotlayoutinvalid2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot "${i?.slot}" has an invalid text position configuration.`)
};

const id_validation_slotlayoutinvalid2 = /** @type {(inputs: Validation_Slotlayoutinvalid2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot "${i?.slot}" memiliki konfigurasi posisi teks yang tidak valid.`)
};

/**
* | output |
* | --- |
* | "Slot \"{slot}\" has an invalid text position configuration." |
*
* @param {Validation_Slotlayoutinvalid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_slotlayoutinvalid2 = /** @type {((inputs: Validation_Slotlayoutinvalid2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Slotlayoutinvalid2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_slotlayoutinvalid2(inputs)
	return en_validation_slotlayoutinvalid2(inputs)
});
export { validation_slotlayoutinvalid2 as "validation.slotLayoutInvalid" }