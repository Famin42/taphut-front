import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {IPagination, IProduct} from '../../utils/models';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  productsPage!: IPagination<IProduct[]>;
  limit = 10;

  constructor(private productService: ProductService) { }

  // MatPaginator Output
  // pageEvent: PageEvent;

  ngOnInit(): void {
    this.productService.getProductPage(this.limit).subscribe(
      res => {
        this.productsPage = res;
      }
    );
  }

  onScroll() {
    this.productService.getProductPage(this.limit).subscribe(
      res => {
        this.productsPage = res;
      }
    );
  }
}
