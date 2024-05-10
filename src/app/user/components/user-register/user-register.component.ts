import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/iuser';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  httpOption;
  userRegisterForm:FormGroup;
  @ViewChild('alertDiv') alertDiv?:ElementRef;
  @ViewChild('alertParagraph') alertParagraph?:ElementRef;
 
  

constructor(private httpClient:HttpClient){
this.httpOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};
this.userRegisterForm=new FormGroup(
  {
    userName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('^[a-zA-Z\\s]+$')]),
    userEmail:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(255),Validators.email]),
    userPassword:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(1024)]),
    //isAdmin:new FormControl(false)           //(default value)
    
  }
);
}



userName(){
return this.userRegisterForm.get('userName');
}
userEmail(){
return this.userRegisterForm.get('userEmail');
}
userPassword(){
return this.userRegisterForm.get('userPassword');
}



submit(){
let User:IUser = this.userRegisterForm.value as IUser;       //user is the object that will be sent to the backend in the request body
//or let User:IUser = <IUser>this.userRegisterForm.value ;

//call api 
                    //ApiResponse is an interface which i made to can access response.message
                    //to make the typescript understand that the return of httpClient.post is an object has message field 
this.httpClient.post<ApiResponse>('http://localhost:3000/api/v1/register', User)
  .subscribe(
    response => {
      console.log('Response:', response);
       //alert(response.message);
       this.showAlert(response.message);
    },
    error => {
      console.error('Error:', error);
     // alert(error);
     this.showAlert(error.message);
    }
  );

}



showAlert(message: string) {
if (this.alertDiv && this.alertParagraph) {
    this.alertParagraph.nativeElement.textContent = message;
    this.alertDiv.nativeElement.style.display="block";
    setTimeout(()=>{
      if(this.alertDiv)
      {
        this.alertDiv.nativeElement.style.display="none";
      }
    },3000);
}
}




//don't forget to run the node project to can send requests
}
