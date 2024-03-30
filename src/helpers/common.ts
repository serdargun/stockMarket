const convertFormattedCurrencyToBare = (numberString: string) => {
  let withoutThousandsSeparator = numberString.replace(/\./g, '');
  let replaceComma = withoutThousandsSeparator.replace(',', '.');

  return parseFloat(replaceComma);
};

export default {convertFormattedCurrencyToBare};
