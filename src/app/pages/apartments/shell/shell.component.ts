import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../utils/models';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  productList: IProduct[] = [];
  token?: string;
  limit = 10;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.downloadData();
  }

  onScroll(): void {
    this.downloadData();
  }

  downloadData(): void {
    if(!this.token && this.productList.length) { return; }

    this.productService.getProductPage(this.limit, this.token).subscribe(
      res => {
        this.productList = [...this.productList, ...res.data];
        this.token = res.token;
      }
    );
  }
}
