import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../../master/constant/column-data';

@Component({
  selector: 'app-bulk-order-list',
  templateUrl: './bulk-order-list.component.html',
  styleUrls: ['./bulk-order-list.component.scss']
})
export class BulkOrderListComponent implements OnInit {
  cols: any[] = TableColumnData.BULK_ORDER;
  public id: any;
  dataSource: any[];
  totalElement: number = 0;
  clicked = false;
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

  getList(event: Page): void {
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString())
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams('bulkOrder/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content
        this.totalElement = response.data.totalElements;
        // approvedDisabled
        this.dataSource.forEach(data => {
          if (data.orderStatus == "ACCEPT_BY_USER") {
            data.approvedDisabled = true
            data.rejectDisabled = true
            data.editDisabled = true
          }
          else if (data.orderStatus == "REJECT_BY_ADMIN") {
            data.rejectDisabled = true
            data.approvedDisabled = true
            data.editDisabled = true
          }
          else if (data.orderStatus == "APPROVE_BY_ADMIN") {
            data.approvedDisabled = true
            data.rejectDisabled = true
            data.editDisabled = true
          }
          else if (data.orderStatus == "PRICE_NEGOTIABLE_BY_ADMIN") {
            data.approvedDisabled = true
            data.rejectDisabled = true
            data.editDisabled = true
          }
        });

      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  approveOrRejectBulkOrder(event: any, status: String, orderStatus: String): void {
    const params = new HttpParams()
      .set('id', event.id)
      .set('status', status.toString())
      .set('orderStatus', orderStatus.toString())
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.postWithParams('bulkOrder/approveOrRejectOrder', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess("Order Update Successfully");
        window.location.reload();
        this.getList(event);
        this.router.navigate(['order/bulk-order/bulk-order-list']);
      },
        error => {
          this.utilityService.showError("Already Rejected or Approved");
          document.getElementById('loader').classList.remove('loading');
        });
  }

  editBulkOrder(event: any): void {
    this.router.navigate(['order/bulk-order/coupon-creation'], { queryParams: { id: event.id } });
  }

}
