/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Missingslothint2Inputs */

const en_compose_missingslothint2 = /** @type {(inputs: Compose_Missingslothint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Those recipients will fail at send time while the rest of the batch continues. Fix their data to avoid failures.`)
};

const id_compose_missingslothint2 = /** @type {(inputs: Compose_Missingslothint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima itu akan gagal saat pengiriman sementara sisanya terus berjalan. Perbaiki datanya untuk menghindari kegagalan.`)
};

/**
* | output |
* | --- |
* | "Those recipients will fail at send time while the rest of the batch continues. Fix their data to avoid failures." |
*
* @param {Compose_Missingslothint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingslothint2 = /** @type {((inputs?: Compose_Missingslothint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingslothint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_missingslothint2(inputs)
	return en_compose_missingslothint2(inputs)
});
export { compose_missingslothint2 as "compose.missingSlotHint" }