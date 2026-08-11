/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Sourcefromjob2Inputs */

const en_send_sourcefromjob2 = /** @type {(inputs: Send_Sourcefromjob2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`From a Generate Job`)
};

const id_send_sourcefromjob2 = /** @type {(inputs: Send_Sourcefromjob2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dari Generate Job`)
};

/**
* | output |
* | --- |
* | "From a Generate Job" |
*
* @param {Send_Sourcefromjob2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_sourcefromjob2 = /** @type {((inputs?: Send_Sourcefromjob2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Sourcefromjob2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_sourcefromjob2(inputs)
	return en_send_sourcefromjob2(inputs)
});
export { send_sourcefromjob2 as "send.sourceFromJob" }