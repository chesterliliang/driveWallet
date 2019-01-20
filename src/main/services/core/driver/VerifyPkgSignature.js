const { Api } = require('./common');

const hexstring_to_buffer = strHex => {
  // eslint-disable-line camelcase
  let pbData = null;
  let tmpStr = '';

  if (!strHex || typeof strHex !== 'string') {
    return pbData;
  }

  pbData = new Buffer(strHex.length / 2);
  for (let i = 0; i < strHex.length - 1; i += 2) {
    tmpStr = strHex[i] + strHex[i + 1];
    pbData[i / 2] = parseInt(tmpStr, 16);
  }

  return pbData;
};

const verifyPkgSignature = async (filePath, signature) => {
  try {
    const signatureBuf = hexstring_to_buffer(signature);
    console.log('filePath, signature, signatureLen', filePath, signatureBuf);
    const res = await Api.PAEW_VerifyFileECCSignature(
      filePath,
      signatureBuf,
      signatureBuf.length
    );
    console.log('verify file result: ', res);
    if (res === 0) return { result: 0 };
    return { result: -6 };
  } catch (e) {
    console.log('verify file fail: ', e);
    return { result: -6 };
  }
};

export default verifyPkgSignature;
