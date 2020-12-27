interface IApartmentsParams {
  limit: number;
  token?: string;
}

type IOnlinerPaginationRes = {
  onlinerApartments: OnlinerResData;
};

type OnlinerResData = {
  nextToken: string | undefined; // if undefined, then it is the last page
  scannedCount: number; // same as limit, but in the answer
  items: OnlinerApartmentRow[];
};
type OnlinerApartmentRow = {
  id: number;
  status: ApartmentStatus;
  apartment: OnlinerApartment;
  createdAt: string;
  updatedAt?: string;
  expirationTime: number;
};

type ApartmentStatus = 'NEW' | 'IN_FLIGHT' | 'ERROR' | 'OLD';

type OnlinerApartment = {
  id: number;
  price: {
    amount: string;
    currency: OnlinerCurrences;
    converted: {
      [key: string]: {
        // key ca be: USD and BYN
        amount: string;
        currency: OnlinerCurrences;
      };
    };
  };
  rent_type: OnlinerRentType;
  location: IOnlinerApartmentLocation;
  photo: string;
  contact: {
    owner: boolean;
  };
  created_at: string;
  last_time_up: string;
  up_available_in: number;
  url: string;
};

type OnlinerCurrences = 'USD' | 'BYN';

type OnlinerRentType = '1_rooms' | '2_rooms' | '3_rooms' | '4_rooms' | '5_rooms';

interface IOnlinerApartmentLocation {
  address: string;
  user_address: string;
}
