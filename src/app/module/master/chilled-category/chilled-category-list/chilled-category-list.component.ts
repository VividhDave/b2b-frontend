import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../constant/column-data';

@Component({
  selector: 'app-chilled-category-list',
  templateUrl: './chilled-category-list.component.html',
  styleUrls: ['./chilled-category-list.component.scss']
})
export class ChilledCategoryListComponent implements OnInit {
  cols: any[] = TableColumnData.CHILLED_CATEGORY_COLUMN_NAME;
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

  getChilledCategoryList(event: Page): void {
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows+'')
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams('chilled_cat/getAll', '', params)
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
    this.router.navigate(['master/chilled-category/chilled-category-view']);
  }

  edit(event: any): void {
    this.router.navigate(['master/chilled-category/chilled-category-view'],{ queryParams: { id: event.id } });
  }
}
