/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_CancelledInputs */

const en_status_cancelled = /** @type {(inputs: Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancelled`)
};

const id_status_cancelled = /** @type {(inputs: Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dibatalkan`)
};

/**
* | output |
* | --- |
* | "Cancelled" |
*
* @param {Status_CancelledInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_cancelled = /** @type {((inputs?: Status_CancelledInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_CancelledInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_cancelled(inputs)
	return en_status_cancelled(inputs)
});
export { status_cancelled as "status.cancelled" }