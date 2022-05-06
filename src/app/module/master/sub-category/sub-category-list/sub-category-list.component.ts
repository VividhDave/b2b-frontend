import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../constant/column-data';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {
  cols: any[] = TableColumnData.SUB_CATEGORY_COLUMN_NAME;
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

  getSubCategoryList(event: Page): void {
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows + '')
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams('subcategory/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content;
        this.totalElement = response.data.totalElements;
        this.dataSource.forEach(data => {
            data.gst = data.subCategory.gst,
            data.createdDate = new Date(data.createdDate).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  createSubCategory(): void {
    this.router.navigate(['master/sub-category/sub-category-view']);
  }

  edit(event: any): void {
    this.router.navigate(['master/sub-category/sub-category-view'], { queryParams: { id: event.id } });
  }

  delete(event: any): void {
    this.customHttpService.delete(`subcategory/delete?id=${event.id}`)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response) => {
        this.dataSource.splice(event.id, 1)
        this.utilityService.showSuccess(response.message);
        window.location.reload();
      },
        error => {
          this.utilityService.showError("Delete product of that particular sub category");
          document.getElementById('loader').classList.remove('loading');
        });
  }
}
