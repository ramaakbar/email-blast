/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Alreadysending2Inputs */

const en_sendjob_alreadysending2 = /** @type {(inputs: Sendjob_Alreadysending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This job is already sending.`)
};

const id_sendjob_alreadysending2 = /** @type {(inputs: Sendjob_Alreadysending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan ini sedang mengirim.`)
};

/**
* | output |
* | --- |
* | "This job is already sending." |
*
* @param {Sendjob_Alreadysending2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_alreadysending2 = /** @type {((inputs?: Sendjob_Alreadysending2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Alreadysending2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_alreadysending2(inputs)
	return en_sendjob_alreadysending2(inputs)
});
export { sendjob_alreadysending2 as "sendJob.alreadySending" }