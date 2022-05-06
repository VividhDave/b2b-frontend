import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-promotion-view',
  templateUrl: './promotion-view.component.html',
  styleUrls: ['./promotion-view.component.scss'],
  providers: [DatePipe]
})
export class PromotionViewComponent implements OnInit {
  promotionForm: FormGroup;
  buyerPurchaseList: Array<any> = [
    { id: 'At least this quantity of items', name: 'At least this quantity of items' },
    { id: 'At least this amount (in INR)', name: 'At least this amount (in INR)' },
    { id: 'For every quantity of items purchased', name: 'For every quantity of items purchased' },
  ];
  productSelectionList: Array<any> = [
    { id: '1', name: 'Product 1' },
  ];
  buyerGetsList: Array<any> = [
    { id: 'Percent off', name: 'Percent off' },
    { id: 'Free Shipping', name: 'Free Shipping' },
  ];
  appliesToList: Array<any> = [
    { id: 'Purchased Items', name: 'Purchased Items' },
    { id: 'Pre Order', name: 'Pre Order' },
  ];
  claimCodeTypeList: Array<any> = [
    { id: 'Single-use', name: 'Single-use' },
    { id: 'Group', name: 'Group' },
    { id: 'None', name: 'None' },
  ];
  claimCodeCombinabilityList: Array<any> = [
    { id: 'Exclusive', name: 'Exclusive' },
    { id: 'Unrestricted', name: 'Unrestricted' },
  ];

  id: any;
  myDate: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService,
    private datePipe: DatePipe
  ) {
    this.myDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.setupForm(undefined);
    // if (this.id) {
    //   this.getProductById(this.id);
    // }
  }

  ngOnInit(): void {
  }

  setupForm(event: any) {
    this.promotionForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      buyerPurchases: [event && event.buyerPurchases ? event.buyerPurchases : '', Validators.required],
      buyerPurchasesValue: [event && event.buyerPurchasesValue ? event.buyerPurchasesValue : '', Validators.required],
      productSelectionId: [event && event.productSelectionId ? event.productSelectionId : '', Validators.required],
      buyerGets: [event && event.buyerGets ? event.buyerGets : '', Validators.required],
      buyerGetsValue: [event && event.buyerGetsValue ? event.buyerGetsValue : '', Validators.required],
      appliesTo: [event && event.appliesTo ? event.appliesTo : '', Validators.required],
      startDate: [event && event.startDate ? event.startDate : '', Validators.required],
      endDate: [event && event.endDate ? event.endDate : '', Validators.required],
      internalDescription: [event && event.internalDescription ? event.internalDescription : '', Validators.required],
      trackingId: [event && event.trackingId ? event.trackingId : '', Validators.required],
      claimCodeType: [event && event.claimCodeType ? event.claimCodeType : '', Validators.required],
      redemptionPerCustomer: [event && event.redemptionPerCustomer ? event.redemptionPerCustomer : '', Validators.required],
      claimCode: [event && event.claimCode ? event.claimCode : '', Validators.required],
      claimCodeCombinability: [event && event.claimCodeCombinability ? event.claimCodeCombinability : '', Validators.required],
      checkoutDisplayText: [event && event.checkoutDisplayText ? event.checkoutDisplayText : '', Validators.required],
      shortDisplayName: [event && event.shortDisplayName ? event.shortDisplayName : '', Validators.required],
      displayDescription: [event && event.displayDescription ? event.displayDescription : '', Validators.required],
    });
  }

  back(): void {
    this.router.navigate(['promotion/promotion-master/promotion-creation']);
  }

  get f() {
    return this.promotionForm.controls;
  }

  save(): void {
    if (this.promotionForm.invalid) {
      this.validateAllFormFields(this.promotionForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('promotion_header/save', this.promotionForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['promotion/promotion-master/promotion-creation']);
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

  validClaimCode(): void {
    const code = document.getElementById('claimCode');
    this.customHttpService.get('promotion_header/validClaimCode?code=' + code)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showError('Not Available');
      },
        error => {
          this.utilityService.showSuccess('Available');
          document.getElementById('loader').classList.remove('loading');
        });
  }

}
