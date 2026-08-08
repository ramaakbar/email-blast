/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Campaignsummary1Inputs */

const en_compose_campaignsummary1 = /** @type {(inputs: Compose_Campaignsummary1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Campaign summary`)
};

const id_compose_campaignsummary1 = /** @type {(inputs: Compose_Campaignsummary1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ringkasan kampanye`)
};

/**
* | output |
* | --- |
* | "Campaign summary" |
*
* @param {Compose_Campaignsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_campaignsummary1 = /** @type {((inputs?: Compose_Campaignsummary1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Campaignsummary1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_campaignsummary1(inputs)
	return en_compose_campaignsummary1(inputs)
});
export { compose_campaignsummary1 as "compose.campaignSummary" }