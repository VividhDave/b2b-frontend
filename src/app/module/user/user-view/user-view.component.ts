import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../service/utility/utility.service';
import { TableColumnData } from '../../master/constant/column-data';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  public userForm: FormGroup;
  public id: any;
  public isReadonly: boolean = false;
  public show:boolean = false;
  public role_button:any = 'SUPPORTER ROLE';
  public roleList: any[] = [
    { id: 1, name: 'ROLE_ADMIN' },
    { id: 2, name: 'ROLE_SUPPORTER' },
    { id: 3, name: 'WEB_USER' },
  ]

  cols: any[] = TableColumnData.USER_ADDRESS_COLUMN_NAME;
  dataSource: any[];
  totalElement: number = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly utilityService: UtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly customHttpService: CustomHttpService
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.setupForm(undefined);
    if (this.id) {
      this.isReadonly = true;
      this.getUserById(this.id);
    }
  }

  ngOnInit(): void {  }

  setupForm(event: any) {
    this.userForm = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      firstName: [event && event.firstName ? event.firstName : '', Validators.required],
      lastName: [event && event.lastName ? event.lastName : '', Validators.required],
      username: [event && event.username ? event.username : '', Validators.required],
      email: [event && event.email ? event.email : '', Validators.required],
      // phone: [event && event.whatsappMobileNumber ? event.whatsappMobileNumber : '', Validators.required],
      password: [event && event.password ? event.password : '', Validators.required],
      // shopName: [event && event.shopName ? event.shopName : ''],
      enabled: [event && event.enabled !== null ? event.enabled : true],
      // gstin: [event && event.gstin ? event.gstin : ''],
      // licenseNumber: [event && event.licenseNumber ? event.licenseNumber : ''],
      accountNonExpired: [event && event.accountNonExpired !== null ? event.accountNonExpired : true],
      accountNonLocked: [event && event.accountNonLocked !== null ? event.accountNonLocked : true],
      credentialsNonExpired: [event && event.credentialsNonExpired !== null ? event.credentialsNonExpired : true],
      masterDataModule: [event && event.masterDataModule !== null ? event.masterDataModule : ''],
      productDataModule: [event && event.productDataModule !== null ? event.productDataModule : ''],
      orderHistoryModule: [event && event.orderHistoryModule !== null ? event.orderHistoryModule : ''],
      // userListModule: [event && event.userListModule !== null ? event.userListModule : ''],
      // paymentHistoryModule: [event && event.paymentHistoryModule !== null ? event.paymentHistoryModule : ''],
      // logHistoryModule: [event && event.logHistoryModule !== null ? event.logHistoryModule : ''],
      roleId: [event&&event.roles&&event.roles.length>0?event.roles[0].id:'']
    });
  }

  // toggle() {
  //   this.show = !this.show;
  //   if(this.show)  
  //     this.role_button = "Clear";
  //   else
  //     this.role_button = "Allowed Module";
  // }

  getUserById(id: number): void {
    this.customHttpService.get('user/findbyid?id=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.setupForm(response.data);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  save(): void {
    if (this.userForm.invalid) {
      this.validateAllFormFields(this.userForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.put('user/webSave', this.userForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['user/user-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getAddressList(event: any): void {
    this.customHttpService.get('user/getAddress?userId=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.dataSource = response.data
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  create(): void {
    this.router.navigate(['user/address-view'], { queryParams: { userId: this.id } });
  }

  edit(event: any): void {
    this.router.navigate(['user/address-view'], { queryParams: { userId: this.id,addressId:event.id } });
  }

  back(): void {
    this.router.navigate(['user/user-list']);
  }

  changeDropDownValue(event: any, type: any): void {
    console.log(event.target.value);
  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get f() { return this.userForm.controls; }

}
