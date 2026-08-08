/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Dialogs_Excelfilter1Inputs */

const en_dialogs_excelfilter1 = /** @type {(inputs: Dialogs_Excelfilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Excel`)
};

const id_dialogs_excelfilter1 = /** @type {(inputs: Dialogs_Excelfilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Excel`)
};

/**
* | output |
* | --- |
* | "Excel" |
*
* @param {Dialogs_Excelfilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const dialogs_excelfilter1 = /** @type {((inputs?: Dialogs_Excelfilter1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dialogs_Excelfilter1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_dialogs_excelfilter1(inputs)
	return en_dialogs_excelfilter1(inputs)
});
export { dialogs_excelfilter1 as "dialogs.excelFilter" }