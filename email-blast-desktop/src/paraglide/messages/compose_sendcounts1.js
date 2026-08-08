/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Sendcounts1Inputs */

const en_compose_sendcounts1 = /** @type {(inputs: Compose_Sendcounts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent · ${i?.failed} failed · ${i?.pending} pending`)
};

const id_compose_sendcounts1 = /** @type {(inputs: Compose_Sendcounts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} terkirim · ${i?.failed} gagal · ${i?.pending} menunggu`)
};

/**
* | output |
* | --- |
* | "{sent} sent · {failed} failed · {pending} pending" |
*
* @param {Compose_Sendcounts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcounts1 = /** @type {((inputs: Compose_Sendcounts1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcounts1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendcounts1(inputs)
	return en_compose_sendcounts1(inputs)
});
export { compose_sendcounts1 as "compose.sendCounts" }