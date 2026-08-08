/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Onlyfinishedcanretry4Inputs */

const en_sendjob_onlyfinishedcanretry4 = /** @type {(inputs: Sendjob_Onlyfinishedcanretry4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only a finished job can be retried.`)
};

const id_sendjob_onlyfinishedcanretry4 = /** @type {(inputs: Sendjob_Onlyfinishedcanretry4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hanya pekerjaan yang sudah selesai yang bisa diulang.`)
};

/**
* | output |
* | --- |
* | "Only a finished job can be retried." |
*
* @param {Sendjob_Onlyfinishedcanretry4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_onlyfinishedcanretry4 = /** @type {((inputs?: Sendjob_Onlyfinishedcanretry4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Onlyfinishedcanretry4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_onlyfinishedcanretry4(inputs)
	return en_sendjob_onlyfinishedcanretry4(inputs)
});
export { sendjob_onlyfinishedcanretry4 as "sendJob.onlyFinishedCanRetry" }