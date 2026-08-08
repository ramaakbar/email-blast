/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Profilename1Inputs */

const en_smtp_profilename1 = /** @type {(inputs: Smtp_Profilename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile name`)
};

const id_smtp_profilename1 = /** @type {(inputs: Smtp_Profilename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama profil`)
};

/**
* | output |
* | --- |
* | "Profile name" |
*
* @param {Smtp_Profilename1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_profilename1 = /** @type {((inputs?: Smtp_Profilename1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Profilename1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_profilename1(inputs)
	return en_smtp_profilename1(inputs)
});
export { smtp_profilename1 as "smtp.profileName" }