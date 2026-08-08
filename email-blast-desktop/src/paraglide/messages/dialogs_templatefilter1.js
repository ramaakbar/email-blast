/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Dialogs_Templatefilter1Inputs */

const en_dialogs_templatefilter1 = /** @type {(inputs: Dialogs_Templatefilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

const id_dialogs_templatefilter1 = /** @type {(inputs: Dialogs_Templatefilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Template" |
*
* @param {Dialogs_Templatefilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const dialogs_templatefilter1 = /** @type {((inputs?: Dialogs_Templatefilter1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dialogs_Templatefilter1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_dialogs_templatefilter1(inputs)
	return en_dialogs_templatefilter1(inputs)
});
export { dialogs_templatefilter1 as "dialogs.templateFilter" }