/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ address: NonNullable<unknown> }} Compose_Senderdiffersfromprofile3Inputs */

const en_compose_senderdiffersfromprofile3 = /** @type {(inputs: Compose_Senderdiffersfromprofile3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`This From address differs from the profile's default (${i?.address}). The server may reject it.`)
};

const id_compose_senderdiffersfromprofile3 = /** @type {(inputs: Compose_Senderdiffersfromprofile3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Alamat pengirim ini berbeda dari bawaan profil (${i?.address}). Server mungkin menolaknya.`)
};

/**
* | output |
* | --- |
* | "This From address differs from the profile's default ({address}). The server may reject it." |
*
* @param {Compose_Senderdiffersfromprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_senderdiffersfromprofile3 = /** @type {((inputs: Compose_Senderdiffersfromprofile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Senderdiffersfromprofile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_senderdiffersfromprofile3(inputs)
	return en_compose_senderdiffersfromprofile3(inputs)
});
export { compose_senderdiffersfromprofile3 as "compose.senderDiffersFromProfile" }