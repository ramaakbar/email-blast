/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Filterbybatch2Inputs */

const en_recipients_filterbybatch2 = /** @type {(inputs: Recipients_Filterbybatch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by import batch`)
};

const id_recipients_filterbybatch2 = /** @type {(inputs: Recipients_Filterbybatch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saring berdasarkan batch impor`)
};

/**
* | output |
* | --- |
* | "Filter by import batch" |
*
* @param {Recipients_Filterbybatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_filterbybatch2 = /** @type {((inputs?: Recipients_Filterbybatch2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Filterbybatch2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_filterbybatch2(inputs)
	return en_recipients_filterbybatch2(inputs)
});
export { recipients_filterbybatch2 as "recipients.filterByBatch" }