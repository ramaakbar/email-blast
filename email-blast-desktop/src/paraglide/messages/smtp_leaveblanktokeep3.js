/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Leaveblanktokeep3Inputs */

const en_smtp_leaveblanktokeep3 = /** @type {(inputs: Smtp_Leaveblanktokeep3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leave blank to keep the current one`)
};

const id_smtp_leaveblanktokeep3 = /** @type {(inputs: Smtp_Leaveblanktokeep3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biarkan kosong untuk memakai kata sandi yang tersimpan`)
};

/**
* | output |
* | --- |
* | "Leave blank to keep the current one" |
*
* @param {Smtp_Leaveblanktokeep3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_leaveblanktokeep3 = /** @type {((inputs?: Smtp_Leaveblanktokeep3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Leaveblanktokeep3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_leaveblanktokeep3(inputs)
	return en_smtp_leaveblanktokeep3(inputs)
});
export { smtp_leaveblanktokeep3 as "smtp.leaveBlankToKeep" }