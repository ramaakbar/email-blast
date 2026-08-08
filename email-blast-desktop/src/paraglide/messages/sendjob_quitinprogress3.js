/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ sent: NonNullable<unknown>, total: NonNullable<unknown> }} Sendjob_Quitinprogress3Inputs */

const en_sendjob_quitinprogress3 = /** @type {(inputs: Sendjob_Quitinprogress3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Send in progress - ${i?.sent} of ${i?.total} sent. The job will pause and you can resume it later from Logs.`)
};

const id_sendjob_quitinprogress3 = /** @type {(inputs: Sendjob_Quitinprogress3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pengiriman berlangsung - ${i?.sent} dari ${i?.total} terkirim. Pekerjaan akan dijeda dan Anda dapat melanjutkannya nanti dari Log.`)
};

/**
* | output |
* | --- |
* | "Send in progress - {sent} of {total} sent. The job will pause and you can resume it later from Logs." |
*
* @param {Sendjob_Quitinprogress3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_quitinprogress3 = /** @type {((inputs: Sendjob_Quitinprogress3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Quitinprogress3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_quitinprogress3(inputs)
	return en_sendjob_quitinprogress3(inputs)
});
export { sendjob_quitinprogress3 as "sendJob.quitInProgress" }