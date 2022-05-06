import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../models/page';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../service/utility/utility.service';
import { TableColumnData } from '../../master/constant/column-data';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  cols: any[] = TableColumnData.USER_COLUMN_NAME;
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
      .set('userRole', "WEB_USER")
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString())
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '');
    this.customHttpService.postWithParams('user/user_list', '', params)
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


  create(): void {
    this.router.navigate(['user/user-view']);
  }

  edit(event: any): void {
    console.log(event);
    this.router.navigate(['user/user-view'], { queryParams: { id: event.id } });
  }
}
