import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../../service/utility/utility.service';

@Component({
  selector: 'app-sub-category-view',
  templateUrl: './sub-category-view.component.html',
  styleUrls: ['./sub-category-view.component.scss']
})
export class SubCategoryViewComponent implements OnInit {
  subCategoryForm: FormGroup;
  categoryList: any[] = [];
  imageList: any;
  id: any;
  urls: any;
  constructor(
    private readonly router: Router,
    private readonly utilityService: UtilityService,
    private readonly formBuilder: FormBuilder, private readonly activateRoute: ActivatedRoute,
    private readonly customHttpService: CustomHttpService) {
    this.setupForm(undefined);
    this.getCategoryList();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.getById();
    }

  }
  ngOnInit(): void {
  }

  getCategoryList(): void {
    this.customHttpService.get('category/get_all_record')
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.categoryList = response.data;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  save(): void {
    if (this.subCategoryForm.invalid) {
      this.validateAllFormFields(this.subCategoryForm);
      return;
    }
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('subcategory/save', this.subCategoryForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);
        this.id = response.data.id;
        this.router.navigate(['master/sub-category/sub-category-view'],{ queryParams: { id: response.data.id } });
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
    this.subCategoryForm = this.formBuilder.group({
      id: [event&&event.id?event.id:''],
      name: [event&&event.name?event.name:'', Validators.required],
      code: [event&&event.code?event.code:'', Validators.required],
      status: [event&&event.status?event.status:'true'],
      category: this.formBuilder.group({
        id: [event&&event.category? event.category.id:''],
      }),
    });
  }

  getById(){
    this.customHttpService.get('subcategory/findbyid?id='+ this.id)
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
    formData.append("subCategoryId", id);
    this.customHttpService.postMultiPartMultipleFile('subcategory/save_image', formData)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.getById();
        this.utilityService.showSuccess(response.message);
        this.router.navigate(['master/sub-category/sub-category-list']);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(){
    this.router.navigate(['master/sub-category/sub-category-list']);
  }


  get f() { return this.subCategoryForm.controls; }
  get f1() {
    const category: any = this.subCategoryForm.controls.category;
    return category.controls;
  }
}
