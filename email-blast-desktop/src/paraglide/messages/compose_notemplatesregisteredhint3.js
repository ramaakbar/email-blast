/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Notemplatesregisteredhint3Inputs */

const en_compose_notemplatesregisteredhint3 = /** @type {(inputs: Compose_Notemplatesregisteredhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`first, then come back.`)
};

const id_compose_notemplatesregisteredhint3 = /** @type {(inputs: Compose_Notemplatesregisteredhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`dulu, lalu kembali lagi.`)
};

/**
* | output |
* | --- |
* | "first, then come back." |
*
* @param {Compose_Notemplatesregisteredhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_notemplatesregisteredhint3 = /** @type {((inputs?: Compose_Notemplatesregisteredhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Notemplatesregisteredhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_notemplatesregisteredhint3(inputs)
	return en_compose_notemplatesregisteredhint3(inputs)
});
export { compose_notemplatesregisteredhint3 as "compose.noTemplatesRegisteredHint" }