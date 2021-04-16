declare const enum FilterPageMode {
  EDIT = 'edit',
  CREATE = 'create',
}

type Currency = 'USD' | 'BYN';

interface IFilter {
  filterName: string;
  city?: string;
  currency?: Currency;
  minPrice?: number;
  maxPrice?: number;
  roomsNumber?: number;
}

interface IFilterRow {
  chatId: string;
  filterName: string;
  createdAt: string;
  updatedAt: string;
  filter: IFilter;
}

type FilterArgs = IFilter & { chatId: string };

interface IQueryFilters {
  filters: IFilterRow[];
}
interface IQueryFilterByName {
  filterByName: IFilterRow;
}
interface IMutationCreateFilter {
  createFilter: IFilterRow;
}
interface IMutationUpdateFilter {
  updateFilter: IFilterRow;
}
interface IMutationDeleteFilter {
  deleteFilter: IFilterRow;
}
