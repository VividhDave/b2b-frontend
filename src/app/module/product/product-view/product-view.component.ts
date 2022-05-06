import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { CustomHttpService } from '../../../service/custom-service/custom-http.service';
import { UtilityService } from '../../../service/utility/utility.service';
import { AppUtility } from '../../../utility/app.utility';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  public productForm: FormGroup;
  public categoryList: any[];
  public subCategoryList: any[];
  public chilledCategoryList: any[];
  public brandList: any[];
  public attributeList: any[];
  public id: any;
  public productImage: any;
  dataSource: any[];
  urls = new Array<any>();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly utilityService: UtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly customHttpService: CustomHttpService) {
    this.setupForm(undefined);
    this.getCategoryList();
    this.getBrandList();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.getProductById(this.id);
    }
  }

  ngOnInit(): void {
  }

  getProductById(id: number): void {
    this.customHttpService.get('product/findbyid?id=' + this.id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.getSubCategoryListByCategoryId(response.data.category.id);
        this.getChilledCategoryListBySubCategoryId(response.data.subCategory.id);
        this.urls = response.data.productImage
        this.setupForm(response.data);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  setupForm(event: any) {
    this.productForm = this.formBuilder.group({
      id: [event && event.id ? event.id : ''],
      productName: [event && event.productName ? event.productName : '', Validators.required],
      description: [event && event.description ? event.description : '', Validators.required],
      price: [event && event.price ? event.price : '', Validators.required],
      displayName: [event && event.displayName ? event.displayName : '', Validators.required],
      productCode: [event && event.productCode ? event.productCode : '', Validators.required],
      hsnCode: [event && event.hsnCode ? event.hsnCode : '', Validators.required],
      technicalName: [event && event.technicalName ? event.technicalName : '', Validators.required],
      packaging: [event && event.packaging ? event.packaging : '', Validators.required],
      discountPrice: [event && event.discountPrice ? event.discountPrice : ''],
      shippingCharge: [event && event.shippingCharge ? event.shippingCharge : ''],
      margin: [event && event.margin ? event.margin : ''],
      specification: [event && event.specification ? event.specification : ''],
      qty: [event && event.qty ? event.qty : '', Validators.required],
      category: this.formBuilder.group({
        id: [event && event.category ? event.category.id : '', Validators.required],
      }),
      subCategory: this.formBuilder.group({
        id: [event && event.subCategory ? event.subCategory.id : '', Validators.required],
      }),
      chilledCategory: this.formBuilder.group({
        id: [event && event.chilledCategory ? event.chilledCategory.id : ''],
      }),
      brand: this.formBuilder.group({
        id: [event && event.brand ? event.brand.id : '', Validators.required]
      }),
      attribute: this.formBuilder.array([])
    });
    if (this.id) {
      this.prepareAttributeForm(event.productAttribute);
    }
  }

  prepareAttributeForm(attributeList: any[]): void {
    const attributes: any = this.productForm.controls.attribute;
    if (this.id) {
      attributeList.sort((b, a) => b.attribute.id - a.attribute.id);
      this.attributeList = [];
      attributeList.forEach(element => {
        const formGroups = this.formBuilder.group({
          attribute: this.formBuilder.group({
            id: [element.attribute.id]
          }),
          id: [element.id],
          value: [element && element.value ? element.value : '', AppUtility.prepareValidation(element.required)]
        });
        // formGroups.addControl(element.key, new FormControl('', AppUtility.prepareValidation(element.required)));
        attributes.push(formGroups);
        element.attribute.formGroup = formGroups;
        this.attributeList.push(element.attribute);
      });
    } else {
      attributeList.forEach(element => {
        const formGroups = this.formBuilder.group({
          attribute: this.formBuilder.group({
            id: [element.id]
          }),
          id: [element.id],
          value: ['', AppUtility.prepareValidation(element.required)]
        });
        // formGroups.addControl(element.key, new FormControl('', AppUtility.prepareValidation(element.required)));
        attributes.push(formGroups);
        element.formGroup = formGroups;
      });
      this.attributeList = attributeList;
    }
    // this.productForm.controls.attribute = attribute;

  }

  save(): void {
    if (this.productForm.invalid) {
      this.validateAllFormFields(this.productForm);
      return;
    }
    if (!this.productForm.value.chilledCategory.id) {
      this.productForm.value.chilledCategory = null;
    }
    this.productForm.value.productAttribute = [];
    this.productForm.value.productImage = [];
    document.getElementById('loader').classList.add('loading');
    this.customHttpService.post('product/save', this.productForm.value)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showSuccess(response.message);

        if (!this.id) {
          this.router.navigate(['product/add-image'], { queryParams: { id: response.data.id } });
        }
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getAttributeList(id): void {
    this.customHttpService.get('attribute/get_by_cat?categoryId=' + id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.prepareAttributeForm(response.data);
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  getBrandList(): void {
    this.customHttpService.get('brand/get_all_record')
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.brandList = response.data;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
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

  getChilledCategoryListBySubCategoryId(id: number): void {
    this.customHttpService.get('chilled_cat/get_by_sub_cat?subCategoryId=' + id)
      .pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.chilledCategoryList = response.data;
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  addImage() {
    this.router.navigate(['product/add-image'], { queryParams: { id: this.id } });
  }

  deleteImage(urls: any): void {
    this.customHttpService.delete(`product_image/delete?id=${urls}`)
      .subscribe((response) => {
        this.urls.splice(urls, 1)
        this.utilityService.showSuccess(response.message);
        window.location.reload();
      },
        error => {
          this.utilityService.showError(error.error.message);
          document.getElementById('loader').classList.remove('loading');
        });
  }

  back(): void {
    this.router.navigate(['product/product-list']);
  }

  changeDropDownValue(event: any, type: any): void {
    let i = -1;
    switch (type) {
      case 'category':
        this.getAttributeList(event.target.value);
        this.productForm.value.subCategory.id = 0;
        this.productForm.value.chilledCategory.id = 0;
        this.attributeList = [];
        this.getSubCategoryListByCategoryId(event.target.value);
        break;
      case 'subCategory':
        this.productForm.value.chilledCategory.id = 0;
        this.getChilledCategoryListBySubCategoryId(event.target.value);
        break;
      case 'chilledCategory':
        break;

      default:
        break;
    }
    console.log(event.target.value);
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

  get f() { return this.productForm.controls; }

  get c() {
    const category: any = this.productForm.controls.category;
    return category.controls;
  }
  get sb() {
    const subCategory: any = this.productForm.controls.subCategory;
    return subCategory.controls;
  }

  get ch() {
    const chilledCategory: any = this.productForm.controls.chilledCategory;
    return chilledCategory.controls;
  }

  get br() {
    const brand: any = this.productForm.controls.brand;
    return brand.controls;
  }

  get att() {
    const attribute: any = this.productForm.controls.attribute;
    return attribute.controls;
  }
}
