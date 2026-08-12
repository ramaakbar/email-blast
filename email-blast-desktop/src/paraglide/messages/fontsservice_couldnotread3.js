/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ path: NonNullable<unknown> }} Fontsservice_Couldnotread3Inputs */

const en_fontsservice_couldnotread3 = /** @type {(inputs: Fontsservice_Couldnotread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not read "${i?.path}".`)
};

const id_fontsservice_couldnotread3 = /** @type {(inputs: Fontsservice_Couldnotread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Tidak dapat membaca "${i?.path}".`)
};

/**
* | output |
* | --- |
* | "Could not read \"{path}\"." |
*
* @param {Fontsservice_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const fontsservice_couldnotread3 = /** @type {((inputs: Fontsservice_Couldnotread3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fontsservice_Couldnotread3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_fontsservice_couldnotread3(inputs)
	return en_fontsservice_couldnotread3(inputs)
});
export { fontsservice_couldnotread3 as "fontsService.couldNotRead" }