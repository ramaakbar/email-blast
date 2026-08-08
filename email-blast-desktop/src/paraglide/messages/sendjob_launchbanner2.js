/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ subject: NonNullable<unknown>, sent: NonNullable<unknown>, total: NonNullable<unknown> }} Sendjob_Launchbanner2Inputs */

const en_sendjob_launchbanner2 = /** @type {(inputs: Sendjob_Launchbanner2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Send paused: ${i?.subject} - ${i?.sent} of ${i?.total} sent.`)
};

const id_sendjob_launchbanner2 = /** @type {(inputs: Sendjob_Launchbanner2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pengiriman dijeda: ${i?.subject} - ${i?.sent} dari ${i?.total} terkirim.`)
};

/**
* | output |
* | --- |
* | "Send paused: {subject} - {sent} of {total} sent." |
*
* @param {Sendjob_Launchbanner2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_launchbanner2 = /** @type {((inputs: Sendjob_Launchbanner2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Launchbanner2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_launchbanner2(inputs)
	return en_sendjob_launchbanner2(inputs)
});
export { sendjob_launchbanner2 as "sendJob.launchBanner" }