type Currency = 'USD' | 'BYN';

interface IFIlter {
  filterName: string;
  city?: string;
  currency?: Currency;
  minPrice?: number;
  maxPrice?: number;
  roomsNumber?: number;
}

declare const enum FilterPageMode {
  EDIT = 'edit',
  CREATE = 'create',
}
