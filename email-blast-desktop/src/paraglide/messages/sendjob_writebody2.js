/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Writebody2Inputs */

const en_sendjob_writebody2 = /** @type {(inputs: Sendjob_Writebody2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write an email body.`)
};

const id_sendjob_writebody2 = /** @type {(inputs: Sendjob_Writebody2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tulis isi email.`)
};

/**
* | output |
* | --- |
* | "Write an email body." |
*
* @param {Sendjob_Writebody2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_writebody2 = /** @type {((inputs?: Sendjob_Writebody2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Writebody2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_writebody2(inputs)
	return en_sendjob_writebody2(inputs)
});
export { sendjob_writebody2 as "sendJob.writeBody" }