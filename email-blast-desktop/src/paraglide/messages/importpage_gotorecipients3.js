/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Gotorecipients3Inputs */

const en_importpage_gotorecipients3 = /** @type {(inputs: Importpage_Gotorecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Recipients`)
};

const id_importpage_gotorecipients3 = /** @type {(inputs: Importpage_Gotorecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buka Penerima`)
};

/**
* | output |
* | --- |
* | "Go to Recipients" |
*
* @param {Importpage_Gotorecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_gotorecipients3 = /** @type {((inputs?: Importpage_Gotorecipients3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Gotorecipients3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_gotorecipients3(inputs)
	return en_importpage_gotorecipients3(inputs)
});
export { importpage_gotorecipients3 as "importPage.goToRecipients" }