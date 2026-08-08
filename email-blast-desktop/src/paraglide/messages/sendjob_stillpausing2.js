/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Stillpausing2Inputs */

const en_sendjob_stillpausing2 = /** @type {(inputs: Sendjob_Stillpausing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This job is still pausing - try again in a moment.`)
};

const id_sendjob_stillpausing2 = /** @type {(inputs: Sendjob_Stillpausing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan ini masih menjeda - coba lagi sebentar lagi.`)
};

/**
* | output |
* | --- |
* | "This job is still pausing - try again in a moment." |
*
* @param {Sendjob_Stillpausing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_stillpausing2 = /** @type {((inputs?: Sendjob_Stillpausing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Stillpausing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_stillpausing2(inputs)
	return en_sendjob_stillpausing2(inputs)
});
export { sendjob_stillpausing2 as "sendJob.stillPausing" }