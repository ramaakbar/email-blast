/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ms: NonNullable<unknown> }} Compose_Sendingratems2Inputs */

const en_compose_sendingratems2 = /** @type {(inputs: Compose_Sendingratems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ms} ms / email`)
};

const id_compose_sendingratems2 = /** @type {(inputs: Compose_Sendingratems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ms} ms / email`)
};

/**
* | output |
* | --- |
* | "{ms} ms / email" |
*
* @param {Compose_Sendingratems2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingratems2 = /** @type {((inputs: Compose_Sendingratems2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingratems2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendingratems2(inputs)
	return en_compose_sendingratems2(inputs)
});
export { compose_sendingratems2 as "compose.sendingRateMs" }