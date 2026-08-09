/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ provider: NonNullable<unknown>, domain: NonNullable<unknown>, from: NonNullable<unknown> }} Compose_Senderdomainmismatch2Inputs */

const en_compose_senderdomainmismatch2 = /** @type {(inputs: Compose_Senderdomainmismatch2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The ${i?.provider} server only accepts From addresses in the ${i?.domain} domain - ${i?.from} will likely be rejected.`)
};

const id_compose_senderdomainmismatch2 = /** @type {(inputs: Compose_Senderdomainmismatch2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Server ${i?.provider} hanya menerima alamat pengirim dari domain ${i?.domain} - ${i?.from} kemungkinan ditolak.`)
};

/**
* | output |
* | --- |
* | "The {provider} server only accepts From addresses in the {domain} domain - {from} will likely be rejected." |
*
* @param {Compose_Senderdomainmismatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_senderdomainmismatch2 = /** @type {((inputs: Compose_Senderdomainmismatch2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Senderdomainmismatch2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_senderdomainmismatch2(inputs)
	return en_compose_senderdomainmismatch2(inputs)
});
export { compose_senderdomainmismatch2 as "compose.senderDomainMismatch" }