import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-promotion-view',
  templateUrl: './promotion-view.component.html',
  styleUrls: ['./promotion-view.component.scss']
})
export class PromotionViewComponent implements OnInit {
  public promotionForm: FormGroup;
  public id: any;
  public promotionTypeList: any = [];
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
      this.getUserById(this.id);
    }
  }

  ngOnInit(): void {

  }

  setupForm(event: any) {
    this.promotionForm = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      promoName: [event && event.promoName ? event.promoName : '', Validators.required],
      promoCode: [event && event.promoCode ? event.promoCode : '', Validators.required],
      promotionType: this.formBuilder.group({
        id: [event && event.promotionType ? event.promotionType.id : '', Validators.required],
      }),
    });
  }

  changeDropDownValue(event: any, type: any): void {
    console.log(event.target.value);
  }


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
    if (this.promotionForm.invalid) {
      this.validateAllFormFields(this.promotionForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('user/save', this.promotionForm.value)
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

  back(): void {
    this.router.navigate(['user/user-list']);
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

  get f() { return this.promotionForm.controls; }

  get pt() {
    const promotionType: any = this.promotionForm.controls.promotionType;
    return promotionType.controls;
  }

}
