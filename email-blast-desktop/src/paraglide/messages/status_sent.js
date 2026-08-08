/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_SentInputs */

const en_status_sent = /** @type {(inputs: Status_SentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sent`)
};

const id_status_sent = /** @type {(inputs: Status_SentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Terkirim`)
};

/**
* | output |
* | --- |
* | "Sent" |
*
* @param {Status_SentInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_sent = /** @type {((inputs?: Status_SentInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_SentInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_sent(inputs)
	return en_status_sent(inputs)
});
export { status_sent as "status.sent" }