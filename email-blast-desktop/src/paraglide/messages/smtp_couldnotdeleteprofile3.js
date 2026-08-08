/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Couldnotdeleteprofile3Inputs */

const en_smtp_couldnotdeleteprofile3 = /** @type {(inputs: Smtp_Couldnotdeleteprofile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the profile.`)
};

const id_smtp_couldnotdeleteprofile3 = /** @type {(inputs: Smtp_Couldnotdeleteprofile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menghapus profil.`)
};

/**
* | output |
* | --- |
* | "Could not delete the profile." |
*
* @param {Smtp_Couldnotdeleteprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_couldnotdeleteprofile3 = /** @type {((inputs?: Smtp_Couldnotdeleteprofile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Couldnotdeleteprofile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_couldnotdeleteprofile3(inputs)
	return en_smtp_couldnotdeleteprofile3(inputs)
});
export { smtp_couldnotdeleteprofile3 as "smtp.couldNotDeleteProfile" }