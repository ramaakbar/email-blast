/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Templates_Slotcountone2Inputs */

const en_templates_slotcountone2 = /** @type {(inputs: Templates_Slotcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} slot · ${i?.stamp}`)
};

const id_templates_slotcountone2 = /** @type {(inputs: Templates_Slotcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} slot · ${i?.stamp}`)
};

/**
* | output |
* | --- |
* | "{count} slot · {stamp}" |
*
* @param {Templates_Slotcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotcountone2 = /** @type {((inputs: Templates_Slotcountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotcountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotcountone2(inputs)
	return en_templates_slotcountone2(inputs)
});
export { templates_slotcountone2 as "templates.slotCountOne" }