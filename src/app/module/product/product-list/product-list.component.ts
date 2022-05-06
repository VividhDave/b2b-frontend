import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../models/page';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../service/utility/utility.service';
import { TableColumnData } from '../../master/constant/column-data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  cols: any[] = TableColumnData.PRODUCT_COLUMN_NAME;
  dataSource: any[]; //users
  totalElement: number = 0;
  productFile: any;
  filteredDataSource: any[];
  filteredProduct: any[];
  filterBy;
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService
  ) {
  }

  ngOnInit(): void {
  }

  // getList(event: Page, productName: String): void {
  getList(event: Page): void {

    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString())
      .set('sortOrder', event.sortOrder === 1 ? 'DESC' : 'ASC')
      .set('sortValue', event.sortField ? event.sortField : '')
      .set('isImage', true + '')

    this.customHttpService.postWithParams('product/getAll', '', params)
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

  globalSearch(event: Page, globalSearch): void {
    const params = new HttpParams()
      .set('globalSearch', globalSearch)
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString());
    this.customHttpService.postWithParams('product/globalSearch', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data.content
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
    // this.getListByProductName(page, event);
    this.globalSearch(page, event)
  }

  handle(files: any) {
    this.productFile = files[0];
    const page = new Page();
    page.first = 0;
    page.rows = 10;
    page.sortField = '';
    page.sortOrder = 1;
    this.getList(page);
  }



  saveProductUsingFile() {
    const formData = new FormData();
    formData.append("files", this.productFile);
    this.customHttpService.postMultiPartMultipleFile('product/save_using_file', formData)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        const page = new Page();
        page.first = 0;
        page.rows = 10;
        page.sortField = '';
        page.sortOrder = 1;
        this.getList(page);
        this.utilityService.showSuccess(response.message);
        window.location.reload();
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  create(): void {
    this.router.navigate(['product/product-view']);
  }

  edit(event: any): void {
    console.log(event);
    this.router.navigate(['product/product-view'], { queryParams: { id: event.id } });
  }

  delete(event: any): void {
    this.customHttpService.delete(`product/delete?id=${event.id}`)
      .subscribe((response) => {
        this.dataSource.splice(event.id, 1)
        this.utilityService.showSuccess(response.message);
        window.location.reload();

      },
        error => {
          this.utilityService.showError("Error");
          document.getElementById('loader').classList.remove('loading');
        });
  }



  fileReset() {
    window.location.reload();
  }


  quotationCreation(event: any): void {
    this.router.navigate(['product/request-for-quotation'], { queryParams: { id: event.id } });
  }
}
