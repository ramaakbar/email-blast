/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Usernamelabel1Inputs */

const en_compose_usernamelabel1 = /** @type {(inputs: Compose_Usernamelabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username (email address)`)
};

const id_compose_usernamelabel1 = /** @type {(inputs: Compose_Usernamelabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama pengguna (alamat email)`)
};

/**
* | output |
* | --- |
* | "Username (email address)" |
*
* @param {Compose_Usernamelabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_usernamelabel1 = /** @type {((inputs?: Compose_Usernamelabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Usernamelabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_usernamelabel1(inputs)
	return en_compose_usernamelabel1(inputs)
});
export { compose_usernamelabel1 as "compose.usernameLabel" }