import { Component, OnInit } from '@angular/core';
import { ApartmentsService } from '../apartments.service';
import { IProduct } from '../../../utils/models';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  productList: IProduct[] = [];
  token?: string;
  limit = 10;

  constructor(private productService: ApartmentsService) {
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
