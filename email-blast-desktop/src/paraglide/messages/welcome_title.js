/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_TitleInputs */

const en_welcome_title = /** @type {(inputs: Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Welcome to Email Blast`)
};

const id_welcome_title = /** @type {(inputs: Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selamat datang di Email Blast`)
};

/**
* | output |
* | --- |
* | "Welcome to Email Blast" |
*
* @param {Welcome_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_title = /** @type {((inputs?: Welcome_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_title(inputs)
	return en_welcome_title(inputs)
});
export { welcome_title as "welcome.title" }