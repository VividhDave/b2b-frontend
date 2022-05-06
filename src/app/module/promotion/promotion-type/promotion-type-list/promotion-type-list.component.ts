import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../../master/constant/column-data';

@Component({
  selector: 'app-promotion-type-list',
  templateUrl: './promotion-type-list.component.html',
  styleUrls: ['./promotion-type-list.component.scss']
})
export class PromotionTypeListComponent implements OnInit {
  cols: any[] = TableColumnData.PROMOTION_TYPE_COLUMN_NAME;
  dataSource: any[];
  totalElement: number = 0;
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService:UtilityService
  ) {
  }

  ngOnInit(): void {
  }

  getList(event: Page): void {
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows+'')
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams('promotion_type/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content;
        this.totalElement = response.data.totalElements;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }


  create(): void {
    this.router.navigate(['promotion/promo-type/promotion-type-view']);
  }

  edit(event: any): void {
    this.router.navigate(['promotion/promo-type/promotion-type-view'],{ queryParams: { id: event.id } });
  }
}
