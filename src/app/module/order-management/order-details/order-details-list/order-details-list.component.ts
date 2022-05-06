import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../../master/constant/column-data';

@Component({
  selector: 'app-order-details-list',
  templateUrl: './order-details-list.component.html',
  styleUrls: ['./order-details-list.component.scss']
})
export class OrderDetailsListComponent implements OnInit {
  cols: any[] = TableColumnData.PLACED_ORDER_COLUMN_NAME;
  dataSource: any[];
  totalElement: number = 0;
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService
  ) {
  }

  ngOnInit(): void {
  }

  getList(event: Page): void {
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString())
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams('placeOrder/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content;
        this.totalElement = response.data.totalElements;
        this.dataSource.forEach(data => {
          data.createdDate = new Date(data.createdDate).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  view(): void {
  }

  details(event: any): void {
    this.router.navigate(['order/order-detail/order-details-view'], { queryParams: { id: event.id } });
  }
}
