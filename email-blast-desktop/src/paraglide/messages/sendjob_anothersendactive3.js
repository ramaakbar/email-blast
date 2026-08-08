/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Anothersendactive3Inputs */

const en_sendjob_anothersendactive3 = /** @type {(inputs: Sendjob_Anothersendactive3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Another send is in progress or paused. Pause or finish it first.`)
};

const id_sendjob_anothersendactive3 = /** @type {(inputs: Sendjob_Anothersendactive3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ada pengiriman lain yang sedang berjalan atau dijeda. Jeda atau selesaikan dulu.`)
};

/**
* | output |
* | --- |
* | "Another send is in progress or paused. Pause or finish it first." |
*
* @param {Sendjob_Anothersendactive3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_anothersendactive3 = /** @type {((inputs?: Sendjob_Anothersendactive3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Anothersendactive3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_anothersendactive3(inputs)
	return en_sendjob_anothersendactive3(inputs)
});
export { sendjob_anothersendactive3 as "sendJob.anotherSendActive" }