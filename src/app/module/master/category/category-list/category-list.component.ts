import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../constant/column-data';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  cols: any[] = TableColumnData.CATEGORY_COLUMN_NAME;
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
    this.customHttpService.postWithParams('category/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content
        this.totalElement = response.data.totalElements;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  create(): void {
    this.router.navigate(['master/category/category-view']);
  }

  edit(event: any): void {
    this.router.navigate(['master/category/category-view'], { queryParams: { id: event.id } });
  }

  delete(event: any): void {
    this.customHttpService.delete(`category/delete?id=${event.id}`)
    .subscribe((response) => {
      this.dataSource.splice(event.id, 1)
      this.utilityService.showSuccess(response.message);
      window.location.reload();
    },
    error => {
      this.utilityService.showError("Delete Sub Category of that Category");
      document.getElementById('loader').classList.remove('loading');
    });
  }
}
