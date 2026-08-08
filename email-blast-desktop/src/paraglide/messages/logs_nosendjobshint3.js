/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Nosendjobshint3Inputs */

const en_logs_nosendjobshint3 = /** @type {(inputs: Logs_Nosendjobshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send a campaign from the compose wizard and it will appear here.`)
};

const id_logs_nosendjobshint3 = /** @type {(inputs: Logs_Nosendjobshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim kampanye dari wizard compose dan akan muncul di sini.`)
};

/**
* | output |
* | --- |
* | "Send a campaign from the compose wizard and it will appear here." |
*
* @param {Logs_Nosendjobshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nosendjobshint3 = /** @type {((inputs?: Logs_Nosendjobshint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nosendjobshint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_nosendjobshint3(inputs)
	return en_logs_nosendjobshint3(inputs)
});
export { logs_nosendjobshint3 as "logs.noSendJobsHint" }