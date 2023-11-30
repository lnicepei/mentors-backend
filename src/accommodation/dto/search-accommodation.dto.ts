export type TPriceOptions = `${number}-${number}`;

export type TSortOptions =
  | 'price:asc'
  | 'price:desc'
  | 'rating:asc'
  | 'rating:desc';

// export type TSearchOptions = IPaginationOptions & {
//   sort: TSortOptions | '';
//   price: TPriceOptions;
// };

export class AccommodationSearchDto {
  price: TPriceOptions;
  location?: string;
  q?: string;
  options?: {
    page?: number;
    limit?: number;
  };
}
