import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../models/page';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../service/utility/utility.service';
import { TableColumnData } from '../../master/constant/column-data';

@Component({
  selector: 'app-payment-history-list',
  templateUrl: './payment-history-list.component.html',
  styleUrls: ['./payment-history-list.component.scss']
})
export class PaymentHistoryListComponent implements OnInit {
  cols: any[] = TableColumnData.PAYMENT_HISTORY_COLUMN_NAME;
  dataSource: any[];
  totalElement: number = 0;
  filteredProduct: any[];
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
    this.customHttpService.postWithParams('webhook/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content,
        this.totalElement = response.data.totalElements;
        this.dataSource.forEach(data => {
          data.virtual_account_id = data.virtual_account_id,
          data.transaction_id = data.transaction_id,
          data.user_name = data.user_name,
          data.created_date = new Date(data.created_date).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getListByProductName(event: Page, userName: String): void {
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString());
      let search = {
        'userName': userName.toString(),
      }
     
    this.customHttpService.postWithParams('webhook/getAll', search, params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content,
        this.totalElement = response.data.totalElements;
        this.filteredProduct = [...this.dataSource];
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  filter(event) {
    const page = new Page();
    page.first = 0;
    page.rows = 10;
    page.sortField = '';
    page.sortOrder = 1;
    this.getListByProductName(page, event);
  }

  

  view(): void {
    this.router.navigate(['master/category/category-view']);
  }
}
