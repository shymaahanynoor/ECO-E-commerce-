import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
products: IProduct[]=[];

constructor(private productService:ProductService,private router:Router) {}
ngOnInit(): void {
  this.LoadProducts();
}
LoadProducts(){
this.productService.getAllProductsService().subscribe((products:IProduct[])=>{
  this.products=products;
})
}
editProduct(productId:string) {
  this.router.navigate(['/admin/products', productId]);
}

deleteProduct(productId: string) {
  this.productService.deleteProductService(productId).subscribe(() => {
    // Reload products after deletion
    this.LoadProducts();
  });
}
addNewProduct() {
this.router.navigate(['admin/products/add'])
}

}
