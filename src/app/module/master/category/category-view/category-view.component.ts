import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  categoryForm: FormGroup;
  imageList: any;
  id:any;
  urls :any;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly utilityService: UtilityService,
    private readonly router:Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly customHttpService: CustomHttpService) {
    this.setupForm(undefined);
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if(this.id){
      this.getById();
    }
  }

  ngOnInit(): void {
  }


  save(): void {
    if (this.categoryForm.invalid) {
      this.validateAllFormFields(this.categoryForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('category/save', this.categoryForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.id=response.data.id;
        this.router.navigate(['master/category/category-view'],{ queryParams: { id: response.data.id } });
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
  setupForm(event:any):void {
    this.categoryForm = this.formBuilder.group({
      id: [event&&event.id?event.id:''],
      name: [event&&event.name?event.name:'', Validators.required],
      code: [event&&event.code?event.code:'', Validators.required],
      status: [event&&event.status?event.status:'true']
    });
  }

  getById(){
    this.customHttpService.get('category/findbyid?id='+ this.id)
    .pipe(skipWhile((item: any) => !item))
    .subscribe((response: any) => {
      document.getElementById('loader').classList.remove('loading');
      this.setupForm(response.data);
      this.urls=response.data.image;
    },
      error => {
        this.utilityService.showError(error.error.message);
        document.getElementById('loader').classList.remove('loading');
      });
}


  handle(files: any) {
    if (files.length > 0) {
     this.imageList=files[0];
     this.saveImage(this.id);
    }
  }

  saveImage(id:any): void {
    const formData = new FormData();
      formData.append("file", this.imageList);
    formData.append("categoryId", id);
    this.customHttpService.postMultiPartMultipleFile('category/save_image', formData)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.getById();
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['master/category/category-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(){
    this.router.navigate(['master/category/category-list']);
  }

  get f() { return this.categoryForm.controls; }
}
