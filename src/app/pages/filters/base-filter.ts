import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

export const CURRENCY_VALUES = ['USD', 'BYN'];

export class BaseFilter {
  filterForm: FormGroup;

  get filterName(): AbstractControl | null {
    return this.filterForm.get(`filterName`);
  }
  get currency(): AbstractControl | null {
    return this.filterForm.get(`currency`);
  }
  get city(): AbstractControl | null {
    return this.filterForm.get(`city`);
  }
  get minPrice(): AbstractControl | null {
    return this.filterForm.get(`minPrice`);
  }
  get maxPrice(): AbstractControl | null {
    return this.filterForm.get(`maxPrice`);
  }
  get roomsNumber(): AbstractControl | null {
    return this.filterForm.get(`roomsNumber`);
  }

  get getFilterValue(): IFilter {
    let filter: IFilter = Object.keys(this.filterForm.value).reduce(
      (prev: IFilter, key: string) => {
        const value = this.filterForm.value[key];
        if (value) {
          prev = {
            ...prev,
            [key]: value,
          };
        }
        return prev;
      },
      {} as IFilter
    );

    const filterName: string = this.filterName?.value;
    filter = { ...filter, filterName };

    return filter;
  }

  constructor(isFilterName = true) {
    if (isFilterName) {
      this.filterForm = new FormGroup({
        filterName: new FormControl('', [Validators.required]), //                    string,
        currency: new FormControl('', [Validators.required]), //                      Currency,
        city: new FormControl(''), //                                                 string | undefined,
        minPrice: new FormControl(''), //                                             number | undefined,
        maxPrice: new FormControl(''), //                                             number | undefined,
        roomsNumber: new FormControl('', [Validators.min(1), Validators.max(10)]), // number | undefined,
      });
    } else {
      this.filterForm = new FormGroup({
        currency: new FormControl('', [Validators.required]), //                      Currency,
        city: new FormControl(''), //                                                 string | undefined,
        minPrice: new FormControl(''), //                                             number | undefined,
        maxPrice: new FormControl(''), //                                             number | undefined,
        roomsNumber: new FormControl('', [Validators.min(1), Validators.max(10)]), // number | undefined,
      });
    }
  }
}
