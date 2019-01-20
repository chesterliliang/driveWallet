function* handleHttpError(error, effects) {
  const { response: { body } } = error;
  const { code } = body || { code: 10001 };

  switch (code) {
    case 20003: { // token expired
      if (effects && effects.put) {
        yield effects.put({ type: 'auth/enterLogin' });
        return true;
      }
      break;
    }

    case 20304: { // utxo not enough
      window.showError('创建交易失败：UTXO不够');
      return true;
    }

    case 20305: { // utxo not enough after tx compose
      window.showError('创建交易失败：UTXO不够');
      return true;
    }

    default:
  }

  return false;
}

export function* handle(error, effects) {
  if (error.response && error.status) {
    const result = yield handleHttpError(error, effects);
    return result;
  }

  return false;
}
