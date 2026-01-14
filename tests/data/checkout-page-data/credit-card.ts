export const getHalfYearFromToday = (): string => {
  const d = new Date();

  d.setMonth(d.getMonth() + 6);

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());

  return `${month}/${year}`;
};

export const dummyCardData = {
  number: '1111-1111-1111-1111',
  expirationDate: getHalfYearFromToday(),
  cvv: '111',
  name: 'Afanasij',
};
