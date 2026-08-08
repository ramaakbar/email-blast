/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Loadingprofiles1Inputs */

const en_smtp_loadingprofiles1 = /** @type {(inputs: Smtp_Loadingprofiles1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading profiles…`)
};

const id_smtp_loadingprofiles1 = /** @type {(inputs: Smtp_Loadingprofiles1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memuat profil…`)
};

/**
* | output |
* | --- |
* | "Loading profiles…" |
*
* @param {Smtp_Loadingprofiles1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_loadingprofiles1 = /** @type {((inputs?: Smtp_Loadingprofiles1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Loadingprofiles1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_loadingprofiles1(inputs)
	return en_smtp_loadingprofiles1(inputs)
});
export { smtp_loadingprofiles1 as "smtp.loadingProfiles" }