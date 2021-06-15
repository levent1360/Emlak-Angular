import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { KullaniciTipi } from '../models/model';
import { EmlakService } from './emlak.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  uyeTip:KullaniciTipi;
  constructor(private authservis:AuthService,private router:Router, private toastr: ToastrService){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem("UID")) {
        return true;
      }
      else {
        this.toastr.error("Bu sayfaya ulaşmak için giriş yapınız.")
        this.router.navigate([""]);
        return false;
      }      
  }

  
}
