/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Importrecipients2Inputs */

const en_importpage_importrecipients2 = /** @type {(inputs: Importpage_Importrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import recipients`)
};

const id_importpage_importrecipients2 = /** @type {(inputs: Importpage_Importrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor penerima`)
};

/**
* | output |
* | --- |
* | "Import recipients" |
*
* @param {Importpage_Importrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importrecipients2 = /** @type {((inputs?: Importpage_Importrecipients2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importrecipients2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importrecipients2(inputs)
	return en_importpage_importrecipients2(inputs)
});
export { importpage_importrecipients2 as "importPage.importRecipients" }