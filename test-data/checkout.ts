export interface CreditCardData {
  number: string;
  expirationDate: string;
  cvv: string;
  holderName: string;
}

function getExpirationDate(): string {
  const date = new Date();

  date.setMonth(date.getMonth() + 6);

  return `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

export const checkoutData = {
  state: 'Test State',
  postalCode: '10001',
  card: {
    number: '1111-1111-1111-1111',
    expirationDate: getExpirationDate(),
    cvv: '111',
    holderName: 'Test User',
  } satisfies CreditCardData,
};
