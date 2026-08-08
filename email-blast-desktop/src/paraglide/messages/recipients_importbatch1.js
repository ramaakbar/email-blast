/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Importbatch1Inputs */

const en_recipients_importbatch1 = /** @type {(inputs: Recipients_Importbatch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import batch`)
};

const id_recipients_importbatch1 = /** @type {(inputs: Recipients_Importbatch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Batch impor`)
};

/**
* | output |
* | --- |
* | "Import batch" |
*
* @param {Recipients_Importbatch1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_importbatch1 = /** @type {((inputs?: Recipients_Importbatch1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Importbatch1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_importbatch1(inputs)
	return en_recipients_importbatch1(inputs)
});
export { recipients_importbatch1 as "recipients.importBatch" }