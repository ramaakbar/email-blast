/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Jobcouldnotbecreated5Inputs */

const en_generatejob_jobcouldnotbecreated5 = /** @type {(inputs: Generatejob_Jobcouldnotbecreated5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The job could not be created.`)
};

const id_generatejob_jobcouldnotbecreated5 = /** @type {(inputs: Generatejob_Jobcouldnotbecreated5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan tidak dapat dibuat.`)
};

/**
* | output |
* | --- |
* | "The job could not be created." |
*
* @param {Generatejob_Jobcouldnotbecreated5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_jobcouldnotbecreated5 = /** @type {((inputs?: Generatejob_Jobcouldnotbecreated5Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Jobcouldnotbecreated5Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_jobcouldnotbecreated5(inputs)
	return en_generatejob_jobcouldnotbecreated5(inputs)
});
export { generatejob_jobcouldnotbecreated5 as "generateJob.jobCouldNotBeCreated" }