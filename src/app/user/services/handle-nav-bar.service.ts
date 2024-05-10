import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HandleNavBarService {
  public isLoggedSubject:BehaviorSubject<boolean>;          
  
  constructor() {
    this.isLoggedSubject=new BehaviorSubject<boolean>(false);
   }

   getLoggedStatus(){
    // return this.isLoggedSubject;                     //this function return  subject
    return this.isLoggedSubject.asObservable();       //for security :this function return observable not subject
                                                    //to can subscribe on isLoggedSubject only
                                                    //and prevent using next with isLoggedSubject to 
                                                    //prevent changing its value
  }
}
