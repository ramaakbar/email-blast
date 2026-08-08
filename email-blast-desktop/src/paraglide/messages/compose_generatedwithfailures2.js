/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Generatedwithfailures2Inputs */

const en_compose_generatedwithfailures2 = /** @type {(inputs: Compose_Generatedwithfailures2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} generated, ${i?.failed} failed. Failed recipients are excluded from the send automatically.`)
};

const id_compose_generatedwithfailures2 = /** @type {(inputs: Compose_Generatedwithfailures2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} berhasil, ${i?.failed} gagal. Penerima yang gagal otomatis dikeluarkan dari pengiriman.`)
};

/**
* | output |
* | --- |
* | "{generated} generated, {failed} failed. Failed recipients are excluded from the send automatically." |
*
* @param {Compose_Generatedwithfailures2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedwithfailures2 = /** @type {((inputs: Compose_Generatedwithfailures2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedwithfailures2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generatedwithfailures2(inputs)
	return en_compose_generatedwithfailures2(inputs)
});
export { compose_generatedwithfailures2 as "compose.generatedWithFailures" }