/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Profiledeleted1Inputs */

const en_smtp_profiledeleted1 = /** @type {(inputs: Smtp_Profiledeleted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile deleted.`)
};

const id_smtp_profiledeleted1 = /** @type {(inputs: Smtp_Profiledeleted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profil dihapus.`)
};

/**
* | output |
* | --- |
* | "Profile deleted." |
*
* @param {Smtp_Profiledeleted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_profiledeleted1 = /** @type {((inputs?: Smtp_Profiledeleted1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Profiledeleted1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_profiledeleted1(inputs)
	return en_smtp_profiledeleted1(inputs)
});
export { smtp_profiledeleted1 as "smtp.profileDeleted" }