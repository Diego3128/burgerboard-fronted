type CurrencyCode = "USD";

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = "USD",
  locale: string = "en-US"
) => {
  return new Intl.NumberFormat(locale, { currency, style: "currency" }).format(amount);
};
