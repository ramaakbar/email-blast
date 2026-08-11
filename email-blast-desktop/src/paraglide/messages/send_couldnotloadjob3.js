/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Couldnotloadjob3Inputs */

const en_send_couldnotloadjob3 = /** @type {(inputs: Send_Couldnotloadjob3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load the generate job.`)
};

const id_send_couldnotloadjob3 = /** @type {(inputs: Send_Couldnotloadjob3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat memuat generate job.`)
};

/**
* | output |
* | --- |
* | "Could not load the generate job." |
*
* @param {Send_Couldnotloadjob3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_couldnotloadjob3 = /** @type {((inputs?: Send_Couldnotloadjob3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Couldnotloadjob3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_couldnotloadjob3(inputs)
	return en_send_couldnotloadjob3(inputs)
});
export { send_couldnotloadjob3 as "send.couldNotLoadJob" }