import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const COLUMNS: string[] = [
  'filterName',
  'city',
  'currency',
  'minPrice',
  'maxPrice',
  'roomsNumber',
  'edit',
  'delete',
];
const mockData: IFIlter[] = [
  {
    filterName: 'Фильтр 1',
    city: 'Минск',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
  {
    filterName: 'Фильтр 2',
    city: 'Гродно',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
  {
    filterName: 'Фильтр 3',
    city: 'Жодино',
    currency: 'USD',
    minPrice: 10,
    maxPrice: 100,
    roomsNumber: 1,
  },
  {
    filterName: 'Фильтр 4',
    city: 'Брест',
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
export class FiltersComponent implements AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<IFIlter>;
  filters: IFIlter[];

  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  constructor() {
    this.displayedColumns = COLUMNS;
    this.dataSource = new MatTableDataSource<IFIlter>(mockData);
    this.filters = mockData;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
