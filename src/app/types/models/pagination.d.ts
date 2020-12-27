interface IProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  sourceLink: string;
  imageLink: string;
  currency: string;
}

interface IPagination<T> {
  token?: string;
  limit: number;
  data: T;
}
