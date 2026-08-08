/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Roleemail2Inputs */

const en_importpage_roleemail2 = /** @type {(inputs: Importpage_Roleemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

const id_importpage_roleemail2 = /** @type {(inputs: Importpage_Roleemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

/**
* | output |
* | --- |
* | "Email" |
*
* @param {Importpage_Roleemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_roleemail2 = /** @type {((inputs?: Importpage_Roleemail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Roleemail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_roleemail2(inputs)
	return en_importpage_roleemail2(inputs)
});
export { importpage_roleemail2 as "importPage.roleEmail" }