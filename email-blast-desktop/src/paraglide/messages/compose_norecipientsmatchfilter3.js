/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Norecipientsmatchfilter3Inputs */

const en_compose_norecipientsmatchfilter3 = /** @type {(inputs: Compose_Norecipientsmatchfilter3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients match this filter`)
};

const id_compose_norecipientsmatchfilter3 = /** @type {(inputs: Compose_Norecipientsmatchfilter3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima yang cocok dengan filter ini`)
};

/**
* | output |
* | --- |
* | "No recipients match this filter" |
*
* @param {Compose_Norecipientsmatchfilter3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_norecipientsmatchfilter3 = /** @type {((inputs?: Compose_Norecipientsmatchfilter3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Norecipientsmatchfilter3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_norecipientsmatchfilter3(inputs)
	return en_compose_norecipientsmatchfilter3(inputs)
});
export { compose_norecipientsmatchfilter3 as "compose.noRecipientsMatchFilter" }