/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountone2Inputs */

const en_compose_sendcountone2 = /** @type {(inputs: Compose_Sendcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Send ${i?.count} email`)
};

const id_compose_sendcountone2 = /** @type {(inputs: Compose_Sendcountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Kirim ${i?.count} email`)
};

/**
* | output |
* | --- |
* | "Send {count} email" |
*
* @param {Compose_Sendcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcountone2 = /** @type {((inputs: Compose_Sendcountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendcountone2(inputs)
	return en_compose_sendcountone2(inputs)
});
export { compose_sendcountone2 as "compose.sendCountOne" }