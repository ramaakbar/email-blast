/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ missing: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Missingdatasummary2Inputs */

const en_compose_missingdatasummary2 = /** @type {(inputs: Compose_Missingdatasummary2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.missing} of ${i?.count} selected recipients are missing data for:`)
};

const id_compose_missingdatasummary2 = /** @type {(inputs: Compose_Missingdatasummary2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.missing} dari ${i?.count} penerima terpilih kekurangan data untuk:`)
};

/**
* | output |
* | --- |
* | "{missing} of {count} selected recipients are missing data for:" |
*
* @param {Compose_Missingdatasummary2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingdatasummary2 = /** @type {((inputs: Compose_Missingdatasummary2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingdatasummary2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_missingdatasummary2(inputs)
	return en_compose_missingdatasummary2(inputs)
});
export { compose_missingdatasummary2 as "compose.missingDataSummary" }