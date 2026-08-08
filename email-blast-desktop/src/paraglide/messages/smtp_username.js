/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_UsernameInputs */

const en_smtp_username = /** @type {(inputs: Smtp_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username`)
};

const id_smtp_username = /** @type {(inputs: Smtp_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama pengguna`)
};

/**
* | output |
* | --- |
* | "Username" |
*
* @param {Smtp_UsernameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_username = /** @type {((inputs?: Smtp_UsernameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_UsernameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_username(inputs)
	return en_smtp_username(inputs)
});
export { smtp_username as "smtp.username" }