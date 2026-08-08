/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Recipientnoemail3Inputs */

const en_sendjob_recipientnoemail3 = /** @type {(inputs: Sendjob_Recipientnoemail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This recipient has no email address.`)
};

const id_sendjob_recipientnoemail3 = /** @type {(inputs: Sendjob_Recipientnoemail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima ini tidak punya alamat email.`)
};

/**
* | output |
* | --- |
* | "This recipient has no email address." |
*
* @param {Sendjob_Recipientnoemail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_recipientnoemail3 = /** @type {((inputs?: Sendjob_Recipientnoemail3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Recipientnoemail3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_recipientnoemail3(inputs)
	return en_sendjob_recipientnoemail3(inputs)
});
export { sendjob_recipientnoemail3 as "sendJob.recipientNoEmail" }