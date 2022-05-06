import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../constant/column-data';
import { Page } from '../../../../models/page';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  cols: any[] = TableColumnData.BRAND_COLUMN_NAME;
  dataSource: any[];
  totalElement: number = 0;
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService:UtilityService
  ) {
    // this.getBrandList('');
  }

  ngOnInit(): void {
  }

  getBrandList(brandName: Page): void {
    const params = new HttpParams()
      .set('pageIndex', brandName.first / 10 + '')
      .set('pageSize', brandName.rows+'')
      .set('sortOrder', brandName.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', brandName.sortField ? brandName.sortField : '');

      // .set('brandName', brandName);
    this.customHttpService.postWithParams('brand/getAll', '',params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
         this.dataSource=response.data.content
         this.totalElement = response.data.totalElements;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }


  createBrand(): void {
    this.router.navigate(['master/brand/brand-view']);
  }

  edit(event: any): void {
    this.router.navigate(['master/brand/brand-view'],{ queryParams: { id: event.id } });
  }
}
