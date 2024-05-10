import { Component, DoCheck, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderStatus } from '../models/order-status.enum';
import { IOrder } from '../models/IOrder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit ,DoCheck{
  showAlert: boolean = false;
  alertMessage:string='';
  alertType:string='';
  selectedStatus: string='';
  orderStatuses:string[]=Object.values(OrderStatus);
  orders:IOrder[]=[];
  constructor(private orderService:OrderService) {}
  ngDoCheck(): void {
    // console.log("selected state",this.selectedStatus)
    // console.log("orders",this.orders)
    // console.log("filtered orders",this.orders.filter(order => order.state === this.selectedStatus) )
  }
  ngOnInit(): void {
   this.loadOrders();
  }

loadOrders():void{
  this.orderService.getOrders().subscribe(orders=>
    {
      this.orders=orders
    console.log(orders)
    },
    error=>{
      alert("Error on loading orders see  console for more info ")
      console.error('Error in loading Orders',error)
    }
    )
}
confirmStateChange(order:IOrder,index){
  if(confirm(`Do you want to change order ${index} \n that belongs to user: ${order.userEmail}`)){
    console.log(order.state)
     this.orderService.updateOrderState(order._id,order.state).subscribe(response=>{
      this.riseAlert("Changed the order state successfully",'success')
      console.log(response.message)
     },error=>{
      this.riseAlert("Failed to change the order state , see console for more details ",'danger')
      console.log(error)
     })
  }
}
riseAlert(message: string, type: string) {
  this.alertMessage = message;
  this.alertType = type;
  this.showAlert = true;
  setTimeout(() => {
    this.showAlert = false;
  }, 3000); // Hide the alert after 3 seconds
}

get filteredOrders(): IOrder[] {
  return this.selectedStatus ? this.orders.filter(order => order.state === this.selectedStatus) : this.orders;
}
}
