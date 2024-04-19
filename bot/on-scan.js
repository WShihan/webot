// 扫码登录
import Qrterminal from 'qrcode-terminal'

/**
 *
 * @param {String} qrcode
 * @param {Number} status
 */
export function onScan(qrcode, status) {
  console.log('qrcode', qrcode);
  // 在console端显示二维码
  Qrterminal.generate(qrcode);
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);
}
export default onScan;
