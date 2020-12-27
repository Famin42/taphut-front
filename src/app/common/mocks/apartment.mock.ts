export const MOCK_SCANNED_COUNT = 10;

export const MOCK_NEXT_TOKEN: string | undefined = 'MOCK_NEXT_TOKEN';

export const MOCK_ONLINER_APARTMENTS: OnlinerResData = {
  nextToken: MOCK_NEXT_TOKEN,
  scannedCount: MOCK_SCANNED_COUNT,
  items: [],
};

export const MOCK_ONLINER_PAGINATION_RES: IOnlinerPaginationRes = {
  onlinerApartments: MOCK_ONLINER_APARTMENTS,
};
