import { EmlakService } from './emlak.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private servis: EmlakService) { }

  girisKontrol() {
    if (localStorage.getItem("UTID")) {
      this.servis.KullaniciTipiByIdServis(localStorage.getItem("UTID")).subscribe(res => {
        return res
      })
    }
    else {
      return null
    }
  }

}
