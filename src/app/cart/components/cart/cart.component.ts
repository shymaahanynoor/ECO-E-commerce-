import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.getCartProduct();

    console.log(this.total);
  }
  constructor(private services: CartService) {}
  total: any = 0;
  cartProducts: any[] = [];
  user: any;
  getCartProduct() {
    this.services.getCart().subscribe((data: any) => {
      this.cartProducts = data;
      console.log(data);
    });
    this.getTotal();
  }
  getTotal() {
    this.services.getCart().subscribe((data: any) => {
      this.cartProducts = data;
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.total +=
          parseInt(this.cartProducts[i].proPrice) *
          parseInt(this.cartProducts[i].quantity);
      }
    });
  }

  plusItem(i) {
    if (i.quantity < 10) {
      this.services.addOneItem(i).subscribe((data: any) => {
        console.log(data, 'From Components');
      });
      this.getTotal();
    }
  }
  minItem(i) {
    if (i.quantity > 1) {
      this.services.minusOneItem(i).subscribe((data: any) => {
        console.log(data, 'From Components');
      });
      this.getTotal();
    }
  }
  deleteAllFun() {
    this.services.deleteAllFromCart().subscribe((data: any) => {
      if (!data) {
        alert('Cart Is Empty');
      }
    });
    this.getCartProduct();
    this.getTotal();
  }
  status: boolean;
  deleteCurrentItem(proId) {
    this.services.delItemFromCart(proId).subscribe((data: any) => {
      console.log(data);
    });
    this.getCartProduct();
    this.getTotal();
  }
  addFromCartToOrder(item) {
    this.services.addCartToIrder(item).subscribe((data: any) => {
      console.log(data);
    });
    this.services.delItemFromCart(item.proId).subscribe((data: any) => {
      console.log(data);
    });
  }
}
