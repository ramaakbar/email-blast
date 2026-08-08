/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Norecipientsyet2Inputs */

const en_compose_norecipientsyet2 = /** @type {(inputs: Compose_Norecipientsyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients yet`)
};

const id_compose_norecipientsyet2 = /** @type {(inputs: Compose_Norecipientsyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada penerima`)
};

/**
* | output |
* | --- |
* | "No recipients yet" |
*
* @param {Compose_Norecipientsyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_norecipientsyet2 = /** @type {((inputs?: Compose_Norecipientsyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Norecipientsyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_norecipientsyet2(inputs)
	return en_compose_norecipientsyet2(inputs)
});
export { compose_norecipientsyet2 as "compose.noRecipientsYet" }