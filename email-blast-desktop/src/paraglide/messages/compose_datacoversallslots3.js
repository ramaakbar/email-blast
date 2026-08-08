/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Datacoversallslots3Inputs */

const en_compose_datacoversallslots3 = /** @type {(inputs: Compose_Datacoversallslots3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients, data covers all slots`)
};

const id_compose_datacoversallslots3 = /** @type {(inputs: Compose_Datacoversallslots3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima, data mencakup semua slot`)
};

/**
* | output |
* | --- |
* | "{count} recipients, data covers all slots" |
*
* @param {Compose_Datacoversallslots3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_datacoversallslots3 = /** @type {((inputs: Compose_Datacoversallslots3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Datacoversallslots3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_datacoversallslots3(inputs)
	return en_compose_datacoversallslots3(inputs)
});
export { compose_datacoversallslots3 as "compose.dataCoversAllSlots" }