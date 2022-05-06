import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-chilled-category-view',
  templateUrl: './chilled-category-view.component.html',
  styleUrls: ['./chilled-category-view.component.scss']
})
export class ChilledCategoryViewComponent implements OnInit {
  chilledCategoryForm: FormGroup;
  subCategoryList: any[] = [];
  imageList: any;
  id:any;
  urls :any;
  constructor(
    private readonly router: Router,
    private readonly utilityService: UtilityService,
    private readonly formBuilder: FormBuilder,
    private readonly customHttpService: CustomHttpService,
    private readonly activateRoute: ActivatedRoute,
  ) {
    this.getSubCategoryList();
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


  getSubCategoryList(): void {
    this.customHttpService.get('subcategory/get_all_record')
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
    if (this.chilledCategoryForm.invalid) {
      this.validateAllFormFields(this.chilledCategoryForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('chilled_cat/save', this.chilledCategoryForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.id=response.data.id;
        this.router.navigate(['master/chilled-category/chilled-category-view'],{ queryParams: { id: response.data.id } });
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
    this.chilledCategoryForm = this.formBuilder.group({
      id: [event&&event.id?event.id:''],
      name: [event&&event.name?event.name:'', Validators.required],
      code: [event&&event.code?event.code:'', Validators.required],
      status: [event&&event.status?event.status:'true'],
      subCategory: this.formBuilder.group({
        id: [event&&event.subCategory?event.subCategory.id:'',Validators.required],
      }),
    });
  }

  getById(){
    this.customHttpService.get('chilled_cat/findbyid?id='+ this.id)
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
    formData.append("chilledCategoryId", id);
    this.customHttpService.postMultiPartMultipleFile('chilled_cat/save_image', formData)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.getById();
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['master/chilled-category/chilled-category-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(){
    this.router.navigate(['master/chilled-category/chilled-category-list']);
  }


  get f() { return this.chilledCategoryForm.controls; }
  get f1() {
    const subCategory: any = this.chilledCategoryForm.controls.subCategory;
    return subCategory.controls;
  }
}
