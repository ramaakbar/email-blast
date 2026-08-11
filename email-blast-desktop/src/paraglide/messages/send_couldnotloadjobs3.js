/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Couldnotloadjobs3Inputs */

const en_send_couldnotloadjobs3 = /** @type {(inputs: Send_Couldnotloadjobs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load past generate jobs.`)
};

const id_send_couldnotloadjobs3 = /** @type {(inputs: Send_Couldnotloadjobs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat memuat riwayat generate.`)
};

/**
* | output |
* | --- |
* | "Could not load past generate jobs." |
*
* @param {Send_Couldnotloadjobs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_couldnotloadjobs3 = /** @type {((inputs?: Send_Couldnotloadjobs3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Couldnotloadjobs3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_couldnotloadjobs3(inputs)
	return en_send_couldnotloadjobs3(inputs)
});
export { send_couldnotloadjobs3 as "send.couldNotLoadJobs" }