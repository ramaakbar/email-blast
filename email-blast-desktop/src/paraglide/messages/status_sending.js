/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_SendingInputs */

const en_status_sending = /** @type {(inputs: Status_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending`)
};

const id_status_sending = /** @type {(inputs: Status_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mengirim`)
};

/**
* | output |
* | --- |
* | "Sending" |
*
* @param {Status_SendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_sending = /** @type {((inputs?: Status_SendingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_SendingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_sending(inputs)
	return en_status_sending(inputs)
});
export { status_sending as "status.sending" }