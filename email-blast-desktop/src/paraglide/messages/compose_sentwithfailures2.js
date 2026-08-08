/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown> }} Compose_Sentwithfailures2Inputs */

const en_compose_sentwithfailures2 = /** @type {(inputs: Compose_Sentwithfailures2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent, ${i?.failed} failed. Retry the failures below.`)
};

const id_compose_sentwithfailures2 = /** @type {(inputs: Compose_Sentwithfailures2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} terkirim, ${i?.failed} gagal. Ulangi yang gagal di bawah.`)
};

/**
* | output |
* | --- |
* | "{sent} sent, {failed} failed. Retry the failures below." |
*
* @param {Compose_Sentwithfailures2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sentwithfailures2 = /** @type {((inputs: Compose_Sentwithfailures2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sentwithfailures2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sentwithfailures2(inputs)
	return en_compose_sentwithfailures2(inputs)
});
export { compose_sentwithfailures2 as "compose.sentWithFailures" }