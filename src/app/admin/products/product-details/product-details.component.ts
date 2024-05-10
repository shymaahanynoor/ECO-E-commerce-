import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../models/IProduct';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  showAlert: boolean = false;
  alertMessage:string='';
  alertType:string='';
  productForm: FormGroup;
  productId: string;
  productToEdit:IProduct;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router:Router,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe(product=>{
      this.productToEdit=product;
      this.initializeForm();
    });

  }
  initializeForm():void{
  this.productForm = this.fb.group({
    proName: [this.productToEdit.proName, [Validators.required, Validators.minLength(3)]],
    proDescription: [this.productToEdit.proDescription, [Validators.required, Validators.minLength(5)]],
    proCategory: [this.productToEdit.proCategory, [Validators.required, Validators.minLength(2)]],
    proPrice: [this.productToEdit.proPrice, [Validators.required, Validators.min(1)]],
    proImg: [this.productToEdit.proImg, Validators.required]
  });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: IProduct = { ...this.productForm.value };
      updatedProduct.proPrice= updatedProduct.proPrice.toString();
      this.productService.editProductService(this.productId, updatedProduct).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          this.riseAlert("Product updated successfully","success")
        },
        (error) => {
          console.error(`Error updating product:${error} , try to re-login `);
          this.riseAlert("Product Couldn't be updated , Check the console for more details ","danger")
          // Handle error
        }
      );
    } else {
      // Form is invalid, display error messages
      this.riseAlert("the form has invalid fields you need to resolve them first ","danger")

    }
  }

  riseAlert(message: string, type: string) {
    if(type==='success')
    this.alertMessage = message+"Redirecting to Products page...";
    else
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => {
      if(type==='success'){
        this.router.navigate(['admin/products']);
      }
      this.showAlert = false;
    }, 3000); // Hide the alert after 3 seconds
  }

  hideAlert() {
    this.showAlert = false;
  }

  validateField(field: string) {
    const control = this.productForm.get(field);
    if (control) {
      control.markAsTouched();
      control.markAsDirty();
    }
  }

  isFieldInvalid(field: string) {
    const control = this.productForm.get(field);
    return control && control.invalid && (control.dirty || control.touched);
  }

  // Function to validate all form fields
  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     } else {
  //       control.markAsTouched({ onlySelf: true });
  //     }
  //   });
  // }
}
