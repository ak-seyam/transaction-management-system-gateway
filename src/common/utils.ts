const currencyFractionalDigits = {
  AED: 2,
};

const schemaAcceptorCountryToCurrencyMap = {
  ARE: 'AED',
};

export function getCurrencyFromCountry(country: string): string {
  return schemaAcceptorCountryToCurrencyMap[country];
}

export function getFractionalDigitsByCurrency(currency: string) {
  if (!(currency in currencyFractionalDigits)) {
    throw new Error('Unsupported currency'); // TODO throw domain specific errors
  }
  return currencyFractionalDigits[currency];
}

export function getAmountInBaseCurerncy(currency: string, amount: number) {
  if (!(currency in currencyFractionalDigits)) {
    throw new Error('Unsupported currency'); // TODO throw domain specific errors
  }
  return amount * Math.pow(10, currencyFractionalDigits[currency]);
}
