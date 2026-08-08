/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Edithint1Inputs */

const en_smtp_edithint1 = /** @type {(inputs: Smtp_Edithint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The stored password is never shown; leave the field blank to keep it.`)
};

const id_smtp_edithint1 = /** @type {(inputs: Smtp_Edithint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kata sandi tersimpan tidak pernah ditampilkan; biarkan kosong untuk tetap memakainya.`)
};

/**
* | output |
* | --- |
* | "The stored password is never shown; leave the field blank to keep it." |
*
* @param {Smtp_Edithint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_edithint1 = /** @type {((inputs?: Smtp_Edithint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Edithint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_edithint1(inputs)
	return en_smtp_edithint1(inputs)
});
export { smtp_edithint1 as "smtp.editHint" }