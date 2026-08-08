/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Resetmapping2Inputs */

const en_importpage_resetmapping2 = /** @type {(inputs: Importpage_Resetmapping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset mapping`)
};

const id_importpage_resetmapping2 = /** @type {(inputs: Importpage_Resetmapping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Atur ulang pemetaan`)
};

/**
* | output |
* | --- |
* | "Reset mapping" |
*
* @param {Importpage_Resetmapping2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_resetmapping2 = /** @type {((inputs?: Importpage_Resetmapping2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Resetmapping2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_resetmapping2(inputs)
	return en_importpage_resetmapping2(inputs)
});
export { importpage_resetmapping2 as "importPage.resetMapping" }