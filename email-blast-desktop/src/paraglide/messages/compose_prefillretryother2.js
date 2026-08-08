/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefillretryother2Inputs */

const en_compose_prefillretryother2 = /** @type {(inputs: Compose_Prefillretryother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry pre-filled from Logs: ${i?.count} failed recipients, the same template, message, and SMTP.`)
};

const id_compose_prefillretryother2 = /** @type {(inputs: Compose_Prefillretryother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima gagal diisi ulang dari Log: template, pesan, dan SMTP yang sama.`)
};

/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipients, the same template, message, and SMTP." |
*
* @param {Compose_Prefillretryother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefillretryother2 = /** @type {((inputs: Compose_Prefillretryother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefillretryother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_prefillretryother2(inputs)
	return en_compose_prefillretryother2(inputs)
});
export { compose_prefillretryother2 as "compose.prefillRetryOther" }