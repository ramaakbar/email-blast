/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, stamp: NonNullable<unknown> }} Compose_Batchoption1Inputs */

const en_compose_batchoption1 = /** @type {(inputs: Compose_Batchoption1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients · ${i?.stamp}`)
};

const id_compose_batchoption1 = /** @type {(inputs: Compose_Batchoption1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima · ${i?.stamp}`)
};

/**
* | output |
* | --- |
* | "{count} recipients · {stamp}" |
*
* @param {Compose_Batchoption1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_batchoption1 = /** @type {((inputs: Compose_Batchoption1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Batchoption1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_batchoption1(inputs)
	return en_compose_batchoption1(inputs)
});
export { compose_batchoption1 as "compose.batchOption" }