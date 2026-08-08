/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Couldnotloadprofiles3Inputs */

const en_smtp_couldnotloadprofiles3 = /** @type {(inputs: Smtp_Couldnotloadprofiles3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load SMTP profiles.`)
};

const id_smtp_couldnotloadprofiles3 = /** @type {(inputs: Smtp_Couldnotloadprofiles3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat profil SMTP.`)
};

/**
* | output |
* | --- |
* | "Could not load SMTP profiles." |
*
* @param {Smtp_Couldnotloadprofiles3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_couldnotloadprofiles3 = /** @type {((inputs?: Smtp_Couldnotloadprofiles3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Couldnotloadprofiles3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_couldnotloadprofiles3(inputs)
	return en_smtp_couldnotloadprofiles3(inputs)
});
export { smtp_couldnotloadprofiles3 as "smtp.couldNotLoadProfiles" }