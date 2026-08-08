/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedfailedfooter2Inputs */

const en_compose_generatedfailedfooter2 = /** @type {(inputs: Compose_Generatedfailedfooter2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} generated, ${i?.failed} failed`)
};

const id_compose_generatedfailedfooter2 = /** @type {(inputs: Compose_Generatedfailedfooter2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} berhasil, ${i?.failed} gagal`)
};

/**
* | output |
* | --- |
* | "{generated} generated, {failed} failed" |
*
* @param {Compose_Generatedfailedfooter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedfailedfooter2 = /** @type {((inputs: Compose_Generatedfailedfooter2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedfailedfooter2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generatedfailedfooter2(inputs)
	return en_compose_generatedfailedfooter2(inputs)
});
export { compose_generatedfailedfooter2 as "compose.generatedFailedFooter" }