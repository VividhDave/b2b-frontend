import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-promotion-type-view',
  templateUrl: './promotion-type-view.component.html',
  styleUrls: ['./promotion-type-view.component.scss']
})
export class PromotionTypeViewComponent implements OnInit {

  public promotionTypeForm: FormGroup;
  public id: any;

  public isReadonly: boolean = false;

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
      this.getPromotionTypeById(this.id);
    }
  }

  ngOnInit(): void {

  }

  setupForm(event: any) {
    this.promotionTypeForm = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      promoType: [event && event.promoType ? event.promoType : '', Validators.required],
      promoTypeCode: [event && event.promoTypeCode ? event.promoTypeCode : '', Validators.required],
      status: [event && event.status ? event.status : true],
    });
  }

  getPromotionTypeById(id: number): void {
    this.customHttpService.get('promotion_type/findbyid?id=' + this.id)
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
    if (this.promotionTypeForm.invalid) {
      this.validateAllFormFields(this.promotionTypeForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('promotion_type/save', this.promotionTypeForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['promotion/promo-type/promotion-type-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(): void {
    this.router.navigate(['promotion/promo-type/promotion-type-list']);
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

  get f() { return this.promotionTypeForm.controls; }

}
