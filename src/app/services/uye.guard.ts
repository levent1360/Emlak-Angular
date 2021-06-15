import { ToastrService } from 'ngx-toastr';
import { KullaniciTipi } from '../models/model';
import { EmlakService } from './emlak.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UyeGuard implements CanActivate {

  uyeTip: KullaniciTipi;
  uyeTipAd: string;
  constructor(private servis: EmlakService, private router: Router, private toastr: ToastrService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem("UTAD") == "Üye") {
      this.toastr.success("Giriş başarılı")
      this.router.navigate(['/kullanicilar'])
      return true;
    }
    else {
      this.toastr.error("Lütfen giriş yapınız")
      this.router.navigate(['/'])
      return false;
    }

  }


}
