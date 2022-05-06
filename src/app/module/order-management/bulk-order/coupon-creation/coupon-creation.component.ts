import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coupon-creation',
  templateUrl: './coupon-creation.component.html',
  styleUrls: ['./coupon-creation.component.scss']
})
export class CouponCreationComponent implements OnInit {
  public myGroup: FormGroup;
  public id: any;
  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.setupForm(undefined);
    if (this.id) {
      this.getBulkOrderById(this.id);
    }
  }

  ngOnInit(): void {
  }

  setupForm(event: any) {
    this.myGroup = this.formBuilder.group({
      productName: [event && event.product.productName ? event.product.productName : '', Validators.required],
      userName: [event && event.user.firstName ? event.user.firstName : '', Validators.required],
      requestQuantity: [event && event.quantity ? event.quantity : '', Validators.required],
      userNegotiatePrice: [event && event.userNegotiatePrice ? event.userNegotiatePrice : '', Validators.required],
      description: [event && event.description ? event.description : ''],
      adminNegotiatePrice: [event && event.adminNegotiatePrice ? event.adminNegotiatePrice : '', Validators.required],
      comment: [event && event.comment ? event.comment : '']
    });
  }

  getBulkOrderById(id: number): void {
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.get('bulkOrder/bulkOrderEdit?status=false&orderStatus=REQUEST_BY_USER&id=' + this.id)
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

  save(): void {
    if (this.myGroup.invalid) {
      this.validateAllFormFields(this.myGroup);
      return;
    }
    this.myGroup.value.productAttribute = [];
    this.myGroup.value.productImage = [];
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('bulkOrder/approveOrRejectOrder?status=true&orderStatus=PRICE_NEGOTIABLE_BY_ADMIN&id=' + this.id + '&negotiablePrice=' + this.myGroup.value.adminNegotiatePrice + '&comment=' + this.myGroup.value.comment, this.myGroup.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['order/bulk-order/bulk-order-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  get f() { return this.myGroup.controls; }

}
