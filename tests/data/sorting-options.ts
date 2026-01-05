export const sortTitles = ['name,asc', 'name,desc'] as const;
export const sortPrices = ['price,asc', 'price,desc'] as const;
export type sortTitlesOptions = (typeof sortTitles)[number];
export type sortPricesOptions = (typeof sortPrices)[number];
export const allSortOption = [...sortPrices, ...sortTitles] as const;
export type allSortOption = (typeof sortTitles)[number];
