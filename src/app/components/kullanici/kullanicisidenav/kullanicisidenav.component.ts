import { Kullanici } from './../../../models/model';
import { EmlakService } from './../../../services/emlak.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-kullanicisidenav',
  templateUrl: './kullanicisidenav.component.html',
  styleUrls: ['./kullanicisidenav.component.scss']
})
export class KullanicisidenavComponent implements OnInit {

  girisKullanici:Kullanici;
  kullaniciId:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,private servis:EmlakService) { }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  ngOnInit() {
    this.girisKontrol();    
  }

  kullaniciKontrol(){
    this.servis.KullaniciByIdServis(this.kullaniciId).subscribe((res:Kullanici)=>{
      this.girisKullanici=res;
    })
  }

  girisKontrol() {
    if (sessionStorage.getItem("UID") && sessionStorage.getItem("UTID")) {
      this.kullaniciId=sessionStorage.getItem("UID")
      this.kullaniciKontrol();
    } else {
      this.router.navigate(["/"]);
    }
  }

  CikisYap(){
    
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
