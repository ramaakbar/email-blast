/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Smtp_Profilesaved1Inputs */

const en_smtp_profilesaved1 = /** @type {(inputs: Smtp_Profilesaved1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Profile "${i?.name}" saved.`)
};

const id_smtp_profilesaved1 = /** @type {(inputs: Smtp_Profilesaved1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Profil "${i?.name}" tersimpan.`)
};

/**
* | output |
* | --- |
* | "Profile \"{name}\" saved." |
*
* @param {Smtp_Profilesaved1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_profilesaved1 = /** @type {((inputs: Smtp_Profilesaved1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Profilesaved1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_profilesaved1(inputs)
	return en_smtp_profilesaved1(inputs)
});
export { smtp_profilesaved1 as "smtp.profileSaved" }