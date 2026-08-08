/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Allemailssent2Inputs */

const en_compose_allemailssent2 = /** @type {(inputs: Compose_Allemailssent2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} emails sent.`)
};

const id_compose_allemailssent2 = /** @type {(inputs: Compose_Allemailssent2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Semua ${i?.count} email terkirim.`)
};

/**
* | output |
* | --- |
* | "All {count} emails sent." |
*
* @param {Compose_Allemailssent2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allemailssent2 = /** @type {((inputs: Compose_Allemailssent2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allemailssent2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_allemailssent2(inputs)
	return en_compose_allemailssent2(inputs)
});
export { compose_allemailssent2 as "compose.allEmailsSent" }