import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { Page } from '../../../../models/page';
import { HttpParams } from '@angular/common/http';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from '../../../master/constant/column-data';

@Component({
  selector: 'app-promotion-creation',
  templateUrl: './promotion-creation.component.html',
  styleUrls: ['./promotion-creation.component.scss']
})
export class PromotionCreationComponent implements OnInit {
  cols: any[] = TableColumnData.CREATE_PROMOTION_COLUMN_NAME;
  promotionCols: any[] = TableColumnData.PROMOTION_LIST;
  dataSource: any[];
  promotionDataSource: any[];

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
    this.customHttpService.postWithParams('promotion_type/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  create(event: any): void {
    this.router.navigate(['promotion/promotion-master/promotion-view'], { queryParams: { id: event.id } });
  }

  getPromotionList(): void {
    this.customHttpService.post('promotion_header/get_all_record', '')
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.promotionDataSource = response.data;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

}
