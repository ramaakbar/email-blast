/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Onlypausedcanresume4Inputs */

const en_sendjob_onlypausedcanresume4 = /** @type {(inputs: Sendjob_Onlypausedcanresume4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only a paused job can be resumed.`)
};

const id_sendjob_onlypausedcanresume4 = /** @type {(inputs: Sendjob_Onlypausedcanresume4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hanya pekerjaan yang dijeda yang bisa dilanjutkan.`)
};

/**
* | output |
* | --- |
* | "Only a paused job can be resumed." |
*
* @param {Sendjob_Onlypausedcanresume4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_onlypausedcanresume4 = /** @type {((inputs?: Sendjob_Onlypausedcanresume4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Onlypausedcanresume4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_onlypausedcanresume4(inputs)
	return en_sendjob_onlypausedcanresume4(inputs)
});
export { sendjob_onlypausedcanresume4 as "sendJob.onlyPausedCanResume" }