/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Compose_Bodyplaceholder1Inputs */

const en_compose_bodyplaceholder1 = /** @type {(inputs: Compose_Bodyplaceholder1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`<p>Dear ${i?.name},</p>
<p>Congratulations on your scholarship.</p>`)
};

const id_compose_bodyplaceholder1 = /** @type {(inputs: Compose_Bodyplaceholder1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`<p>Yth. ${i?.name},</p>
<p>Selamat atas beasiswa Anda.</p>`)
};

/**
* | output |
* | --- |
* | "<p>Dear {name},</p> <p>Congratulations on your scholarship.</p>" |
*
* @param {Compose_Bodyplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_bodyplaceholder1 = /** @type {((inputs: Compose_Bodyplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Bodyplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_bodyplaceholder1(inputs)
	return en_compose_bodyplaceholder1(inputs)
});
export { compose_bodyplaceholder1 as "compose.bodyPlaceholder" }