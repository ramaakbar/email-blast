/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Savechanges1Inputs */

const en_smtp_savechanges1 = /** @type {(inputs: Smtp_Savechanges1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save changes`)
};

const id_smtp_savechanges1 = /** @type {(inputs: Smtp_Savechanges1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan perubahan`)
};

/**
* | output |
* | --- |
* | "Save changes" |
*
* @param {Smtp_Savechanges1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_savechanges1 = /** @type {((inputs?: Smtp_Savechanges1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Savechanges1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_savechanges1(inputs)
	return en_smtp_savechanges1(inputs)
});
export { smtp_savechanges1 as "smtp.saveChanges" }