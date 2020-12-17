import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IPagination, IProduct} from '../utils/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {
  }

  // TODO add
  getProductPage(limit: number, token?: string): Observable<IPagination<IProduct[]>> {
    const product = {
      id: '0',
      title: 'Some product title',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
        '      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
        '      bred for hunting.',
      price: '20 By',
      location: 'Misk',
      sourceLink: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageLink: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    };

    return of({
      token: 'page',
      limit: 10,
      data: [product, product, product, product, product, product, product, product, product, product],
    });
  }
}
