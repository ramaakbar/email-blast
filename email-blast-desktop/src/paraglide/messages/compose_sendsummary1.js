/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendsummary1Inputs */

const en_compose_sendsummary1 = /** @type {(inputs: Compose_Sendsummary1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send summary`)
};

const id_compose_sendsummary1 = /** @type {(inputs: Compose_Sendsummary1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ringkasan pengiriman`)
};

/**
* | output |
* | --- |
* | "Send summary" |
*
* @param {Compose_Sendsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendsummary1 = /** @type {((inputs?: Compose_Sendsummary1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendsummary1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendsummary1(inputs)
	return en_compose_sendsummary1(inputs)
});
export { compose_sendsummary1 as "compose.sendSummary" }