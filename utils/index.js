import { createHmac } from 'crypto';
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const tip = text => console.log(`-----《 ${text} 》-----`);

/**
 *
 * @param {Object} obj
 * @param {String} secret
 * @returns
 */
export function makeCrypto(obj, secret) {
  const msg = JSON.stringify(obj);
  const algorithm = 'sha256';
  const actual = createHmac(algorithm, secret).update(msg).digest('hex');
  return actual;
}
