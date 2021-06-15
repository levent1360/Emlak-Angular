import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KullaniciTipi } from './../../../models/model';
import { AuthService } from './../../../services/auth.service';
import { EmlakService } from './../../../services/emlak.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Kullanici } from 'src/app/models/model';
import { Router } from '@angular/router';
import { CikisDialogComponent } from '../yonetici-dialog/cikis-dialog/cikis-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  girisKullanici: Kullanici;
  kullaniciId: string;
  yetki: KullaniciTipi;
  admin: boolean;
  kullanicitipid: string;

  cikisYapDialogRef: MatDialogRef<CikisDialogComponent>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private servis: EmlakService,
    private router: Router,
    private toastr:ToastrService,
    private authervis: AuthService,
    private matdialog: MatDialog
  ) { }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  ngOnInit() {
    this.kullanicitipid = sessionStorage.getItem("UTID");
    this.kullaniciId = sessionStorage.getItem("UID");
    this.girisKontrol(this.kullanicitipid);
  }

  kullaniciKontrol() {
    this.servis.KullaniciByIdServis(this.kullaniciId).subscribe((res: Kullanici) => {
      this.girisKullanici = res;
    })
  }

  girisKontrol(utid) {
    if (sessionStorage.getItem("UID") && sessionStorage.getItem("UTID")) {
      this.servis.KullaniciTipiByIdServis(utid).subscribe((res: KullaniciTipi) => {
        this.yetki = res;
        if (this.yetki.KullaniciTipAd == "Admin") {
          this.admin = true
        } else {
          this.admin = false
        }
      })
      this.kullaniciKontrol();
    } else {
      this.router.navigate([""]);

    }


  }

  CikisYap() {
    this.cikisYapDialogRef = this.matdialog.open(CikisDialogComponent, {
      width: "300px",
      data: {}
    })

    this.cikisYapDialogRef.afterClosed().subscribe(d => {
      if (d == true) {
          sessionStorage.removeItem("UID");
          sessionStorage.removeItem("UTID")
          this.router.navigate(['/'])
          this.toastr.success("Sistemden başarıyla çıkış yapıldı.")
      }
      else if (d == false) {
        this.toastr.warning("Çıkış yapmaktan vazgeçildi.")
      }
    })
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
