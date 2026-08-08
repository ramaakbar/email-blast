/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ sent: NonNullable<unknown>, total: NonNullable<unknown> }} Logs_Pausedprogress1Inputs */

const en_logs_pausedprogress1 = /** @type {(inputs: Logs_Pausedprogress1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Paused - ${i?.sent} of ${i?.total} sent`)
};

const id_logs_pausedprogress1 = /** @type {(inputs: Logs_Pausedprogress1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Dijeda - ${i?.sent} dari ${i?.total} terkirim`)
};

/**
* | output |
* | --- |
* | "Paused - {sent} of {total} sent" |
*
* @param {Logs_Pausedprogress1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_pausedprogress1 = /** @type {((inputs: Logs_Pausedprogress1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Pausedprogress1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_pausedprogress1(inputs)
	return en_logs_pausedprogress1(inputs)
});
export { logs_pausedprogress1 as "logs.pausedProgress" }