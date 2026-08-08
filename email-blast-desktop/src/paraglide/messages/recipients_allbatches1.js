/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Allbatches1Inputs */

const en_recipients_allbatches1 = /** @type {(inputs: Recipients_Allbatches1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All batches`)
};

const id_recipients_allbatches1 = /** @type {(inputs: Recipients_Allbatches1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Semua batch`)
};

/**
* | output |
* | --- |
* | "All batches" |
*
* @param {Recipients_Allbatches1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_allbatches1 = /** @type {((inputs?: Recipients_Allbatches1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Allbatches1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_allbatches1(inputs)
	return en_recipients_allbatches1(inputs)
});
export { recipients_allbatches1 as "recipients.allBatches" }