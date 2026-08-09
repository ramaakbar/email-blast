/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Identityhint1Inputs */

const en_smtp_identityhint1 = /** @type {(inputs: Smtp_Identityhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The send step prefills these from the profile; each job can still override them.`)
};

const id_smtp_identityhint1 = /** @type {(inputs: Smtp_Identityhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Langkah kirim mengisi kolom ini dari profil; setiap pengiriman tetap bisa mengubahnya.`)
};

/**
* | output |
* | --- |
* | "The send step prefills these from the profile; each job can still override them." |
*
* @param {Smtp_Identityhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_identityhint1 = /** @type {((inputs?: Smtp_Identityhint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Identityhint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_identityhint1(inputs)
	return en_smtp_identityhint1(inputs)
});
export { smtp_identityhint1 as "smtp.identityHint" }