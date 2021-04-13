import { Component, OnInit } from '@angular/core';

const mockData: IFIlter[] = [
  {
    filterName: '',
    city: '',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
  {
    filterName: '',
    city: '',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
  {
    filterName: '',
    city: '',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
  {
    filterName: '',
    city: '',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filters: IFIlter[];

  constructor() {
    this.filters = mockData;
  }
}
