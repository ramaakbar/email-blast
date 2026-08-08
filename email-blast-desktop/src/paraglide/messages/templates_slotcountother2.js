/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountother2Inputs */

const en_templates_slotcountother2 = /** @type {(inputs: Templates_Slotcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} slots · ${i?.stamp}`)
};

const id_templates_slotcountother2 = /** @type {(inputs: Templates_Slotcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} slot · ${i?.stamp}`)
};

/**
* | output |
* | --- |
* | "{count} slots · {stamp}" |
*
* @param {Templates_Slotcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotcountother2 = /** @type {((inputs: Templates_Slotcountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotcountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotcountother2(inputs)
	return en_templates_slotcountother2(inputs)
});
export { templates_slotcountother2 as "templates.slotCountOther" }