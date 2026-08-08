/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Sendcountother2Inputs */

const en_compose_sendcountother2 = /** @type {(inputs: Compose_Sendcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Send ${i?.count} emails`)
};

const id_compose_sendcountother2 = /** @type {(inputs: Compose_Sendcountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Kirim ${i?.count} email`)
};

/**
* | output |
* | --- |
* | "Send {count} emails" |
*
* @param {Compose_Sendcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcountother2 = /** @type {((inputs: Compose_Sendcountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendcountother2(inputs)
	return en_compose_sendcountother2(inputs)
});
export { compose_sendcountother2 as "compose.sendCountOther" }