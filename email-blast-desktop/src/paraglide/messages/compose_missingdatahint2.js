/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Missingdatahint2Inputs */

const en_compose_missingdatahint2 = /** @type {(inputs: Compose_Missingdatahint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fix the recipients' data or pick another template before continuing - missing slots produce broken PDFs.`)
};

const id_compose_missingdatahint2 = /** @type {(inputs: Compose_Missingdatahint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Perbaiki data penerima atau pilih template lain sebelum melanjutkan - slot yang kosong menghasilkan PDF rusak.`)
};

/**
* | output |
* | --- |
* | "Fix the recipients' data or pick another template before continuing - missing slots produce broken PDFs." |
*
* @param {Compose_Missingdatahint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingdatahint2 = /** @type {((inputs?: Compose_Missingdatahint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingdatahint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_missingdatahint2(inputs)
	return en_compose_missingdatahint2(inputs)
});
export { compose_missingdatahint2 as "compose.missingDataHint" }