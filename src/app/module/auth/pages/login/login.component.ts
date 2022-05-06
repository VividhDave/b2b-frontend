import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { User } from '../../../../models/user';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public user: User = new User();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly customHttpService: CustomHttpService,
    private readonly utilityService: UtilityService
  ) {
    this.setupForm();
  }

  ngOnInit(): void {

  }

  setupForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);
    formData.append('grant_type', 'password');
    const params = new HttpParams({
      fromObject: {
        // grant_type: 'password',
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        grant_type: 'password'
      }
    });
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.postLogin('oauth/token', params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        if (response.role && response.role.length > 0 && (response.role[0] === 'ROLE_SUPER_ADMIN' || response.role[0] === 'ROLE_ADMIN' || response.role[0] === 'WEB_USER' || response.role[0] === 'ROLE_SUPPORTER')) {
          this.user.token = response.access_token;
          this.customHttpService.setUser(this.user)
          this.router.navigate(['product/product-list']);
        } else {
          this.utilityService.showError("Your account is not authorize to log in");
        }
      },
        error => {
          this.utilityService.showError(error.error.error_description);
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
  get f() { return this.loginForm.controls; }
}
