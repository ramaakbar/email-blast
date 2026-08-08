/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Quitandpause3Inputs */

const en_sendjob_quitandpause3 = /** @type {(inputs: Sendjob_Quitandpause3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quit & Pause`)
};

const id_sendjob_quitandpause3 = /** @type {(inputs: Sendjob_Quitandpause3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keluar & Jeda`)
};

/**
* | output |
* | --- |
* | "Quit & Pause" |
*
* @param {Sendjob_Quitandpause3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_quitandpause3 = /** @type {((inputs?: Sendjob_Quitandpause3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Quitandpause3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_quitandpause3(inputs)
	return en_sendjob_quitandpause3(inputs)
});
export { sendjob_quitandpause3 as "sendJob.quitAndPause" }