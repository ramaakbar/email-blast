/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Roleskip2Inputs */

const en_importpage_roleskip2 = /** @type {(inputs: Importpage_Roleskip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skip`)
};

const id_importpage_roleskip2 = /** @type {(inputs: Importpage_Roleskip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lewati`)
};

/**
* | output |
* | --- |
* | "Skip" |
*
* @param {Importpage_Roleskip2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_roleskip2 = /** @type {((inputs?: Importpage_Roleskip2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Roleskip2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_roleskip2(inputs)
	return en_importpage_roleskip2(inputs)
});
export { importpage_roleskip2 as "importPage.roleSkip" }