import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const isAdmin=AuthService.isAdmin();
  if(isAdmin){
    return true;
  }
  else{
    const router =new Router();
     router.navigate(['/unauthorized'])
    return false;
  }
};
