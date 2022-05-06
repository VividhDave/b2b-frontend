import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../../master/constant/column-data';

@Component({
  selector: 'app-order-details-view',
  templateUrl: './order-details-view.component.html',
  styleUrls: ['./order-details-view.component.scss']
})
export class OrderDetailsViewComponent implements OnInit {
  cols: any[] = TableColumnData.PLACED_ORDER_PRODUCT_COLUMN_NAME;
  orderStatusCols: any[] = TableColumnData.PLACED_ORDER_STATUS_COLUMN_NAME;
  orderStatus: any[] = TableColumnData.ORDER_STATUS_DROPDOWN_VALUE;
  productDataSource: any[];
  orderStatusDataSource: any[];
  totalElement: number = 0;
  statsTotalElement: number = 0;
  id: any;
  orderStatusFrom: FormGroup;
  orderFrom: FormGroup;
  @ViewChild('successModal') public successModal: ModalDirective;
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService,
    private readonly activateRoute: ActivatedRoute,
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (!this.id) {
      this.router.navigate(['order/order-detail/order-details-list']);
    }

  }

  ngOnInit(): void {
    this.setupForm();
    this.setupOrderForm(undefined);
    this.getOrderDetailById();
  }

  getOrderDetailById() {
    this.customHttpService.get('placeOrder/findbyid?orderId=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.orderStatusDataSource = response.data;
        this.statsTotalElement = response.data.length;
        this.setupOrderForm(response.data);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getList(event: any): void {
    this.customHttpService.get('placeOrder/findByOrderId?orderId=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.productDataSource = response.data,
        this.totalElement = response.data.totalElements;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getOrderStatusList(event: any): void {
    const data = this.orderStatusFrom.value;
    const params = new HttpParams()
      .set('pageIndex', event.first / 10 + '')
      .set('pageSize', event.rows.toString())
      .set('sortOrder', event.sortOrder === 1 ? 'ASC' : 'DESC')
      .set('sortValue', event.sortField ? event.sortField : '')
      .set('orderId', data.orderId);
    this.customHttpService.postWithParamss('orderStatus/getAll', '', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.orderStatusDataSource = response.data.content,
        this.statsTotalElement = response.data.totalElements;
        this.orderStatusDataSource.forEach(d => {
          d.orderId = d.placeOrder.id,
          d.notified = new Date (d.lastModifiedDate).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  setupForm() {
    this.orderStatusFrom = this.formBuilder.group({
      description: [''],
      orderId: [this.id, Validators.required],
      statusMessage: ['', Validators.required]
    });
  }

  setupOrderForm(event: any): any {
    this.orderFrom = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      productTotalAmount: [event && event.productTotalAmount ? event.productTotalAmount : 0],
      shippingCharge: [event && event.shippingCharge ? event.shippingCharge : 0],
      discount: [event && event.discount ? event.discount : 0],
      orderDate: [event && event.orderDate ? event.orderDate : ''],
      totalSaleAmount: [event && event.totalSaleAmount ? event.totalSaleAmount : 0],
      remark: [event && event.remark ? event.remark : ''],
      promoCode: [event && event.promoCode ? event.promoCode : ''],
      status: [event && event.status ? event.status : ''],
      user: this.formBuilder.group({
        id: [event && event.user.id ? event.user.id : ''],
        username: [event && event.user.username ? event.user.username : ''],
        email: [event && event.user.email ? event.user.email : ''],
        gstin: [event && event.user.gstin ? event.user.gstin : ''],
        customerId: [event && event.user.customerId ? event.user.customerId : ''],
        firstName: [event && event.user.firstName ? event.user.firstName : ''],
      }),
      deliveryAddress: this.formBuilder.group({
        id: [event && event.deliveryAddress.id ? event.deliveryAddress.id : ''],
        address: [event && event.deliveryAddress.address ? event.deliveryAddress.address : ''],
        city: [event && event.deliveryAddress.city ? event.deliveryAddress.city : ''],
        state: [event && event.deliveryAddress.state ? event.deliveryAddress.state : ''],
        pincode: [event && event.deliveryAddress.pincode ? event.deliveryAddress.pincode : ''],
        phone: [event && event.deliveryAddress.phone ? event.deliveryAddress.phone : ''],
        addressType: [event && event.deliveryAddress.addressType ? event.deliveryAddress.addressType : ''],
      }),
    });

  }

  save(): void {
    if (this.orderStatusFrom.invalid) {
      this.validateAllFormFields(this.orderStatusFrom);
      return;
    }

    const data = this.orderStatusFrom.value;

    document.getElementById('loader').classList.add('loading');
    this.customHttpService.get('placeOrder/orderStatus?status=' + data.statusMessage + '&orderId=' + data.orderId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.successModal.hide();
        window.location.reload();
        this.getOrderStatusList('');
        this.getList('');
        this.getOrderDetailById();
        this.orderStatusDataSource = response.data.content,
        this.totalElement = response.data.totalElements;
        this.orderStatusDataSource.forEach(d => {
          d.statusMessage = d.statusMessage;
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
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

  get f() { return this.orderStatusFrom.controls; }
}