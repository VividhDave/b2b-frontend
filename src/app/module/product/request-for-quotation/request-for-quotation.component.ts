import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomHttpService} from '../../../service/custom-service/custom-http.service';
import {UtilityService} from '../../../service/utility/utility.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {skipWhile} from 'rxjs/operators';

@Component({
  selector: 'app-request-for-quotation',
  templateUrl: './request-for-quotation.component.html',
  styleUrls: ['./request-for-quotation.component.scss']
})
export class RequestForQuotationComponent implements OnInit {
  public rfqForm: FormGroup;
  public id: any;
  urls = new Array<any>();
  public subCategoryList: any[];

  constructor(
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService,
    private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
  ) {
    this.setupForm(undefined);
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.getProductById(this.id);
    }
  }

  ngOnInit(): void {
  }

  setupForm(event: any) {
    this.rfqForm = this.formBuilder.group({
      productName: [event && event.productName ? event.productName : '', Validators.required],
      minQuantity: [event && event.minQuantity ? event.minQuantity : '', Validators.required],
      maxQuantity: [event && event.maxQuantity ? event.maxQuantity : '', Validators.required],
      preferredUnitPrice: [event && event.preferredUnitPrice ? event.preferredUnitPrice : '', Validators.required],
      details: [event && event.details ? event.details : '', Validators.required],
      product: this.formBuilder.group({
        id: [event && event.id ? event.id : '', Validators.required],
      }),
      user: this.formBuilder.group({
        id: 1,
      }),
      attribute: this.formBuilder.array([])
    });
  }

  getProductById(id: number): void {
    this.customHttpService.get('product/findbyid?id=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
          document.getElementById('loader').classList.remove('loading');
          this.getSubCategoryListByCategoryId(response.data.category.id);
          this.urls = response.data.productImage;
          this.setupForm(response.data);
        },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getSubCategoryListByCategoryId(id: number): void {
    this.customHttpService.get('subcategory/get_by_cat?categoryId=' + id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
          document.getElementById('loader').classList.remove('loading');
          this.subCategoryList = response.data;
        },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  save(): void {
    if (this.rfqForm.invalid) {
      this.validateAllFormFields(this.rfqForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('quotationRequest/save', this.rfqForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
          document.getElementById('loader').classList.remove('loading');
          this.utilityService.showSuccess(response.message);
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

  back(): void {
    this.router.navigate(['product/product-list']);
  }

  get f() { return this.rfqForm.controls; }

}
