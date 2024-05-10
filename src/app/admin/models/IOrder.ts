import { OrderStatus } from "./order-status.enum";

export interface IOrder{
  _id:string,
  userEmail:string,
  date:Date,
  totalPrice:number,
  productTitle:string,
  state:OrderStatus

}