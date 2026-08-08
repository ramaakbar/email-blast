/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Nojobsmatchfilters3Inputs */

const en_logs_nojobsmatchfilters3 = /** @type {(inputs: Logs_Nojobsmatchfilters3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No jobs match your filters`)
};

const id_logs_nojobsmatchfilters3 = /** @type {(inputs: Logs_Nojobsmatchfilters3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada pekerjaan yang cocok dengan filter`)
};

/**
* | output |
* | --- |
* | "No jobs match your filters" |
*
* @param {Logs_Nojobsmatchfilters3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nojobsmatchfilters3 = /** @type {((inputs?: Logs_Nojobsmatchfilters3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nojobsmatchfilters3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_nojobsmatchfilters3(inputs)
	return en_logs_nojobsmatchfilters3(inputs)
});
export { logs_nojobsmatchfilters3 as "logs.noJobsMatchFilters" }