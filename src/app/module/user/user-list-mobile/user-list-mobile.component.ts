import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../models/page';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { TableColumnData } from '../../master/constant/column-data';
import { UtilityService } from '../../../service/utility/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-mobile',
  templateUrl: './user-list-mobile.component.html',
  styleUrls: ['./user-list-mobile.component.scss']
})

export class UserListMobileComponent implements OnInit {
  cols: any[] = TableColumnData.USER_COLUMN_NAME_MOBILE;
  dataSource: any[];
  totalElement: number = 0;
  filteredProduct: any[];
  // userRole: "ROLE_USER";
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService
  ) {
  }

  ngOnInit(): void {
  }
  // ?userRole=ROLE_USER
  getList(event: Page): void {
    const params = new HttpParams()
      .set('userRole','ROLE_USER')
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString())
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams("user/user_list", '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data
        this.totalElement = response.data.length;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getListByProductName(event: Page, username): void {
    const params = new HttpParams()
      .set('username', username)
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString());
    this.customHttpService.postWithParams('user/findByUsername', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data
        this.totalElement = response.data.length;
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

}

