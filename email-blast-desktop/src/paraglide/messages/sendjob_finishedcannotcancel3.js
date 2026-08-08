/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Finishedcannotcancel3Inputs */

const en_sendjob_finishedcannotcancel3 = /** @type {(inputs: Sendjob_Finishedcannotcancel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This job already finished; it cannot be cancelled.`)
};

const id_sendjob_finishedcannotcancel3 = /** @type {(inputs: Sendjob_Finishedcannotcancel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan ini sudah selesai; tidak bisa dibatalkan.`)
};

/**
* | output |
* | --- |
* | "This job already finished; it cannot be cancelled." |
*
* @param {Sendjob_Finishedcannotcancel3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_finishedcannotcancel3 = /** @type {((inputs?: Sendjob_Finishedcannotcancel3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Finishedcannotcancel3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_finishedcannotcancel3(inputs)
	return en_sendjob_finishedcannotcancel3(inputs)
});
export { sendjob_finishedcannotcancel3 as "sendJob.finishedCannotCancel" }