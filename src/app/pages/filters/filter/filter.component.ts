import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  pageMode: Observable<FilterPageMode>;

  constructor(private route: ActivatedRoute) {
    this.pageMode = this.route.data.pipe(map((data: Data) => data.mode));
  }
}
