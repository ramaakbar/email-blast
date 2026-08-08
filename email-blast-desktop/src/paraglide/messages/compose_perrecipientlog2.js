/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Perrecipientlog2Inputs */

const en_compose_perrecipientlog2 = /** @type {(inputs: Compose_Perrecipientlog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Per-recipient log`)
};

const id_compose_perrecipientlog2 = /** @type {(inputs: Compose_Perrecipientlog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Log per penerima`)
};

/**
* | output |
* | --- |
* | "Per-recipient log" |
*
* @param {Compose_Perrecipientlog2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_perrecipientlog2 = /** @type {((inputs?: Compose_Perrecipientlog2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Perrecipientlog2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_perrecipientlog2(inputs)
	return en_compose_perrecipientlog2(inputs)
});
export { compose_perrecipientlog2 as "compose.perRecipientLog" }