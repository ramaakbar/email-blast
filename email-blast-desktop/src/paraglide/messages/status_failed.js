/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_FailedInputs */

const en_status_failed = /** @type {(inputs: Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed`)
};

const id_status_failed = /** @type {(inputs: Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal`)
};

/**
* | output |
* | --- |
* | "Failed" |
*
* @param {Status_FailedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_failed = /** @type {((inputs?: Status_FailedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_FailedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_failed(inputs)
	return en_status_failed(inputs)
});
export { status_failed as "status.failed" }