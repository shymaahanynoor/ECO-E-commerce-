import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  showAlert: boolean = false;
  alertMessage:string='';
  alertType:string='';


constructor(
  private fb: FormBuilder,
  private productService: ProductService,
  private route: ActivatedRoute,
  private router:Router,
  private snackBar:MatSnackBar
) {

}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      proName: ['', [Validators.required, Validators.minLength(3)]],
      proDescription: ['', [Validators.required, Validators.minLength(5)]],
      proCategory: ['', [Validators.required, Validators.minLength(2)]],
      proPrice: ['', [Validators.required, Validators.min(1)]],
      proImg: ['', Validators.required]
    })
  }
onSubmit() {
  if(this.productForm.valid){
    const ProductToAdd:IProduct={...this.productForm.value}
    ProductToAdd.proPrice=ProductToAdd.proPrice.toString();
    this.productService.addProductService(ProductToAdd).subscribe((response)=>{
      console.log('Product Added successfully ',response)
      this.riseAlert("Product Added successfully","success")
    },(error)=>{
      console.error(`Error updating product:${error} , try to re-login `);
      this.riseAlert("Product Couldn't be Added , Check the console for more details ","danger")
    });
  }
  else{
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
isFieldInvalid(field: string): any {
  const control = this.productForm.get(field);
  return control && control.invalid && (control.dirty || control.touched);
}
}
