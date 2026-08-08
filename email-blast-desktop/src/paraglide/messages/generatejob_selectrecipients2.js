/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Selectrecipients2Inputs */

const en_generatejob_selectrecipients2 = /** @type {(inputs: Generatejob_Selectrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select at least one recipient.`)
};

const id_generatejob_selectrecipients2 = /** @type {(inputs: Generatejob_Selectrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih minimal satu penerima.`)
};

/**
* | output |
* | --- |
* | "Select at least one recipient." |
*
* @param {Generatejob_Selectrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_selectrecipients2 = /** @type {((inputs?: Generatejob_Selectrecipients2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Selectrecipients2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_selectrecipients2(inputs)
	return en_generatejob_selectrecipients2(inputs)
});
export { generatejob_selectrecipients2 as "generateJob.selectRecipients" }