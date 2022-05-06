import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../service/utility/utility.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  public userAddressForm: FormGroup;
  public userId: any;
  public addressId: any;
  public addressTypeList: any[] = [
    { id: "HOME", name: 'Home' },
    { id: "OFFICE", name: 'Office' },
    { id: "OTHER", name: 'OTHER' },
  ]
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly utilityService: UtilityService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly customHttpService: CustomHttpService
  ) {
    this.activateRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.addressId = params['addressId'];
    });
    if(!this.userId){
      this.location.back();
    }
    this.setupForm(undefined);
    if (this.userId&&this.addressId) {
      this.getUserAddressById();
    }
  }

  ngOnInit(): void {

  }

  setupForm(event: any) {
    this.userAddressForm = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      address: [event && event.address ? event.address : '', Validators.required],
      city: [event && event.city ? event.city : '', Validators.required],
      state: [event && event.state ? event.state : '', Validators.required],
      pincode: [event && event.pincode ? event.pincode : '', Validators.required],
      phone: [event && event.phone ? event.phone : '', Validators.required],
      addressType: [event && event.addressType ? event.addressType : '',Validators.required],
      status: [event && event.status !== null ? event.status : true],
      userId: [this.userId]
    });
  }

  getUserAddressById(): void {
    this.customHttpService.get('user/findAddressById?id=' + this.addressId)
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
    if (this.userAddressForm.invalid) {
      this.validateAllFormFields(this.userAddressForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('user/saveAddress', this.userAddressForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['user/user-view'], { queryParams: { id: this.userId } });
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(): void {
    this.router.navigate(['user/user-view'], { queryParams: { id: this.userId } });
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

  get f() { return this.userAddressForm.controls; }
}