import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { skipWhile } from 'rxjs/operators';
import { Page } from '../../../../models/page';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { TableColumnData } from '../../../master/constant/column-data';

@Component({
  selector: 'app-return-order-view',
  templateUrl: './return-order-view.component.html',
  styleUrls: ['./return-order-view.component.scss']
})
export class ReturnOrderViewComponent implements OnInit {
  cols: any[] = TableColumnData.RETURN_ORDER_PRODUCT_COLUMN_NAME;
  returnOrderStatusCol: any[] = TableColumnData.RETURN_ORDER_STATUS_COLUMN_NAME;
  orderStatus: any[] = TableColumnData.RETURN_STATUS_DROPDOWN_VALUE;
  productDataSource: any[];
  dataSource: any[];
  returnOrderStatusDataSource: any[];
  totalElement: number = 0;
  statusTotalElement: number = 0;
  id: any;
  returnOrderFrom: FormGroup;
  orderFrom: FormGroup;
  orderStatusFrom: FormGroup;
  errorMessage: any;
  productDetailList: Array<any> = [];
  returnTotalPrice = 0;
  discount = 0;
  shippingCharge = 0;
  orderDetails: any;

  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('successModal2') public successModal2: ModalDirective;
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
      this.router.navigate(['order/return-order/return-order-list']);
    }

  }

  ngOnInit(): void {
    this.setupForm(undefined);
    this.setupOrderForm(undefined);
    this.getReturnOrderDetails();
    this.setupOrderStatusForm();
  }
  setupOrderStatusForm() {
    this.orderStatusFrom = this.formBuilder.group({
      description: [''],
      returnOrderId: [this.id, Validators.required],
      statusMessage: ['', Validators.required]
    });
  }

  getReturnOrderDetails() {
    this.customHttpService.get('return_or_cancel_order/findbyid?returnId=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.getOrderDetailById(response.data.placeOrder.id);
        this.returnOrderStatusDataSource = response.data,
        this.totalElement = response.data.totalElements;
        this.returnOrderStatusDataSource.forEach(data => {
          data.notified = new Date(data.lastModifiedDate).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getOrderDetailById(id: any) {
    this.customHttpService.get('placeOrder/findbyid?orderId=' + id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.orderDetails = response.data;
        this.setupOrderForm(response.data);
        this.setupForm(response.data);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getList(event: Page): void {
    this.customHttpService.get('return_or_cancel_order/product_detail?returnId=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.productDataSource = response.data;
        this.prepareProductPriceList(response.data);
        this.totalElement = response.data.length;
        this.productDataSource.forEach(data => {
          data.orderId = data.placeOrder.id,
          data.createdDate = new Date(data.createdDate).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  prepareProductPriceList(data: any) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      this.returnTotalPrice += (element.qty * element.product.price)
      const product = {
        name: element.product.displayName,
        price: element.product.price,
        qty: element.qty,
        totalPrice: (element.qty * element.product.price)
      };
      this.productDetailList.push(product);
    }
    if (data.length > 0) {
      this.discount = data[0].returnOrCancelOrder.placeOrder.discount;
      this.shippingCharge = data[0].returnOrCancelOrder.placeOrder.shippingCharge;
      this.returnTotalPrice = this.returnTotalPrice - data[0].returnOrCancelOrder.placeOrder.discount - data[0].returnOrCancelOrder.placeOrder.shippingCharge;
    }
    this.returnOrderFrom.controls.amount.setValue(this.returnTotalPrice);
  }

  getReturnOrderStatusList(event: any): void {
    this.customHttpService.get('returnStatus/findByReturnOrderId?return_id=' + this.id + "&pageIndex=" + event.first / 10 + "&pageSize="+event.rows.toString())
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.returnOrderStatusDataSource = response.data;
        this.statusTotalElement = response.data.length;
       this.returnOrderStatusDataSource.forEach(data => {
          data.notified = new Date(data.lastModifiedDate).toLocaleDateString();
        });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  setupForm(event: any) {
    this.returnOrderFrom = this.formBuilder.group({
      amount: ['', Validators.required],
      paymentId: ['', Validators.required],
      userId: [event && event.user.id ? event.user.id : '', Validators.required],
      orderId: [event && event.id ? event.id : '', Validators.required],
      returnId: [this.id, Validators.required],
    });
  }

  setupOrderForm(event: any): any {
    this.orderFrom = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      productTotalAmount: [event && event.productTotalAmount ? event.productTotalAmount : ''],
      shippingCharge: [event && event.shippingCharge ? event.shippingCharge : ''],
      discount: [event && event.discount ? event.discount : ''],
      orderDate: [event && event.orderDate ? event.orderDate : ''],
      totalSaleAmount: [event && event.totalSaleAmount ? event.totalSaleAmount : ''],
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
    if (this.returnOrderFrom.invalid) {
      this.validateAllFormFields(this.returnOrderFrom);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('orderStatus/save', this.returnOrderFrom.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.successModal.hide();
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }
  

  saveOrderStatus() {
    if (this.orderStatusFrom.invalid) {
      this.validateAllFormFields(this.orderStatusFrom);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('returnStatus/save', this.orderStatusFrom.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.successModal2.hide();
        this.utilityService.showSuccess(response.message);
        this.getReturnOrderStatusList('');
      },
      // this.customHttpService.post('return_or_cancel_order/orderStatus' , this.)
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

  returnAmount() {
    if (this.returnOrderFrom.invalid) {
      this.validateAllFormFields(this.returnOrderFrom);
      if (!this.returnOrderFrom.value.paymentId) {
        this.errorMessage = "payment id is required";
      } else {
        this.errorMessage = "user id or order id is required";
      }
      return;
    }
    let params = new HttpParams()
      .set('amount', this.returnOrderFrom.value.amount)
      .set('userId', this.returnOrderFrom.value.userId)
      .set('paymentId', this.returnOrderFrom.value.paymentId)
      .set('orderId', this.returnOrderFrom.value.orderId)
      .set('returnId', this.returnOrderFrom.value.returnId)
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.postWithParams('refund/payment', "", params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.successModal.hide();
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  get f1() { return this.returnOrderFrom.controls; }
  get f2() { return this.orderStatusFrom.controls; }
  get f() { return this.orderFrom.controls; }
}