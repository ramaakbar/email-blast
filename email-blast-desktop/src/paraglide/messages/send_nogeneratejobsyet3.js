/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Nogeneratejobsyet3Inputs */

const en_send_nogeneratejobsyet3 = /** @type {(inputs: Send_Nogeneratejobsyet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No generate jobs yet`)
};

const id_send_nogeneratejobsyet3 = /** @type {(inputs: Send_Nogeneratejobsyet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada riwayat generate.`)
};

/**
* | output |
* | --- |
* | "No generate jobs yet" |
*
* @param {Send_Nogeneratejobsyet3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_nogeneratejobsyet3 = /** @type {((inputs?: Send_Nogeneratejobsyet3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Nogeneratejobsyet3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_nogeneratejobsyet3(inputs)
	return en_send_nogeneratejobsyet3(inputs)
});
export { send_nogeneratejobsyet3 as "send.noGenerateJobsYet" }