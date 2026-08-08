/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Onlysendingcanpause4Inputs */

const en_sendjob_onlysendingcanpause4 = /** @type {(inputs: Sendjob_Onlysendingcanpause4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only a sending job can be paused.`)
};

const id_sendjob_onlysendingcanpause4 = /** @type {(inputs: Sendjob_Onlysendingcanpause4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hanya pekerjaan yang sedang mengirim yang bisa dijeda.`)
};

/**
* | output |
* | --- |
* | "Only a sending job can be paused." |
*
* @param {Sendjob_Onlysendingcanpause4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_onlysendingcanpause4 = /** @type {((inputs?: Sendjob_Onlysendingcanpause4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Onlysendingcanpause4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_onlysendingcanpause4(inputs)
	return en_sendjob_onlysendingcanpause4(inputs)
});
export { sendjob_onlysendingcanpause4 as "sendJob.onlySendingCanPause" }