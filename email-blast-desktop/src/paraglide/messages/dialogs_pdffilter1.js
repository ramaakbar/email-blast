/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Dialogs_Pdffilter1Inputs */

const en_dialogs_pdffilter1 = /** @type {(inputs: Dialogs_Pdffilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PDF`)
};

const id_dialogs_pdffilter1 = /** @type {(inputs: Dialogs_Pdffilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PDF`)
};

/**
* | output |
* | --- |
* | "PDF" |
*
* @param {Dialogs_Pdffilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const dialogs_pdffilter1 = /** @type {((inputs?: Dialogs_Pdffilter1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dialogs_Pdffilter1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_dialogs_pdffilter1(inputs)
	return en_dialogs_pdffilter1(inputs)
});
export { dialogs_pdffilter1 as "dialogs.pdfFilter" }