/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Writesubject2Inputs */

const en_sendjob_writesubject2 = /** @type {(inputs: Sendjob_Writesubject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write a subject.`)
};

const id_sendjob_writesubject2 = /** @type {(inputs: Sendjob_Writesubject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tulis subjek.`)
};

/**
* | output |
* | --- |
* | "Write a subject." |
*
* @param {Sendjob_Writesubject2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_writesubject2 = /** @type {((inputs?: Sendjob_Writesubject2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Writesubject2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_writesubject2(inputs)
	return en_sendjob_writesubject2(inputs)
});
export { sendjob_writesubject2 as "sendJob.writeSubject" }