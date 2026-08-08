/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Cancelsendconfirm2Inputs */

const en_compose_cancelsendconfirm2 = /** @type {(inputs: Compose_Cancelsendconfirm2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.current} of ${i?.total} sent - cancel anyway?`)
};

const id_compose_cancelsendconfirm2 = /** @type {(inputs: Compose_Cancelsendconfirm2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.current} dari ${i?.total} terkirim - tetap batalkan?`)
};

/**
* | output |
* | --- |
* | "{current} of {total} sent - cancel anyway?" |
*
* @param {Compose_Cancelsendconfirm2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_cancelsendconfirm2 = /** @type {((inputs: Compose_Cancelsendconfirm2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Cancelsendconfirm2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_cancelsendconfirm2(inputs)
	return en_compose_cancelsendconfirm2(inputs)
});
export { compose_cancelsendconfirm2 as "compose.cancelSendConfirm" }